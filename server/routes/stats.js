const express = require('express');
const router = express.Router();

// In-memory cache: { key -> { data, expiresAt } }
const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 min

function getCached(key) {
  const entry = cache.get(key);
  if (!entry || Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCached(key, data) {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL });
}

async function ghFetch(url) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-stats',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

// GET /api/github-stats
router.get('/github-stats', async (req, res) => {
  const cached = getCached('github');
  if (cached) return res.json(cached);

  try {
    const username = 'GM-897';
    const [user, repos] = await Promise.all([
      ghFetch(`https://api.github.com/users/${username}`),
      ghFetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`),
    ]);

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

    const langMap = {};
    repos.forEach(r => {
      if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
    });
    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang]) => lang);

    const latestOwn = repos.find(r => !r.fork) || repos[0];

    const data = {
      username,
      name: user.name || username,
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars,
      topLanguages,
      latestRepo: latestOwn
        ? { name: latestOwn.name, url: latestOwn.html_url, language: latestOwn.language }
        : null,
      profileUrl: `https://github.com/${username}`,
    };

    setCached('github', data);
    res.json(data);
  } catch (err) {
    console.error('GitHub stats error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/leetcode-stats
router.get('/leetcode-stats', async (req, res) => {
  const cached = getCached('leetcode');
  if (cached) return res.json(cached);

  const username = 'beastgm10';

  try {
    const query = `
      query userProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          profile {
            ranking
          }
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
          topPercentage
          attendedContestsCount
        }
      }
    `;

    const lcRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
        Origin: 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    const json = await lcRes.json();
    const matchedUser = json.data?.matchedUser;
    const contest = json.data?.userContestRanking;
    const allQ = json.data?.allQuestionsCount || [];

    if (!matchedUser) {
      return res.status(404).json({ message: 'LeetCode user not found' });
    }

    const subs = matchedUser.submitStats?.acSubmissionNum || [];
    const totalSolved  = subs.find(s => s.difficulty === 'All')?.count    || 0;
    const easySolved   = subs.find(s => s.difficulty === 'Easy')?.count   || 0;
    const mediumSolved = subs.find(s => s.difficulty === 'Medium')?.count || 0;
    const hardSolved   = subs.find(s => s.difficulty === 'Hard')?.count   || 0;

    const totalEasy   = allQ.find(q => q.difficulty === 'Easy')?.count   || 873;
    const totalMedium = allQ.find(q => q.difficulty === 'Medium')?.count || 1833;
    const totalHard   = allQ.find(q => q.difficulty === 'Hard')?.count   || 810;

    const data = {
      username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalEasy,
      totalMedium,
      totalHard,
      globalRanking: matchedUser.profile?.ranking || null,
      contestRating: contest?.rating ? Math.round(contest.rating) : null,
      contestCount: contest?.attendedContestsCount ?? null,
      profileUrl: `https://leetcode.com/u/${username}/`,
    };

    setCached('leetcode', data);
    res.json(data);
  } catch (err) {
    console.error('LeetCode stats error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

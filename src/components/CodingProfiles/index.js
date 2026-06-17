import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useApi } from '../../hooks/useApi';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  'C#': '#178600',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
};

// ─── Animations ────────────────────────────────────────────────────
const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

// ─── Section Layout ────────────────────────────────────────────────
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 80px;
  position: relative;
  z-index: 1;
  @media (max-width: 960px) {
    padding: 24px 16px 48px;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  opacity: 0.7;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
`;

// ─── Base Card ─────────────────────────────────────────────────────
const Card = styled.a`
  width: 330px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  border: 1px solid ${({ $accent }) => $accent}44;
  box-shadow: 0 4px 24px ${({ $accent }) => $accent}18;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 14px 36px ${({ $accent }) => $accent}38;
    border-color: ${({ $accent }) => $accent}88;
  }
  @media (max-width: 500px) {
    width: calc(100vw - 48px);
    max-width: 330px;
  }
`;

// ─── Card Header ───────────────────────────────────────────────────
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWrap = styled.div`
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const PlatformName = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  flex: 1;
`;

const ExtLink = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.4;
  transition: opacity 0.2s;
  ${Card}:hover & {
    opacity: 0.9;
  }
`;

// ─── Divider ───────────────────────────────────────────────────────
const Sep = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.text_primary}14;
`;

// ─── Stats Row ─────────────────────────────────────────────────────
const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StatNum = styled.div`
  font-size: ${({ $size }) => $size || 22}px;
  font-weight: 700;
  color: ${({ $color, theme }) => $color || theme.text_primary};
  line-height: 1;
`;

const StatLbl = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.text_secondary};
`;

// ─── Language Pills ────────────────────────────────────────────────
const LangRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const LangPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 20px;
  background: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}44;
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    flex-shrink: 0;
  }
`;

const RepoHint = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  span {
    color: #58a6ff;
    font-weight: 600;
    margin-right: 5px;
  }
`;

// ─── LeetCode: Solved block ────────────────────────────────────────
const SolvedBlock = styled.div`
  text-align: center;
`;

const BigNum = styled.div`
  font-size: 42px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1;
`;

const BigSub = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 5px;
`;

// ─── LeetCode: Difficulty bars ─────────────────────────────────────
const DiffList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DiffLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DiffTag = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  width: 44px;
  flex-shrink: 0;
`;

const BarBg = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 4px;
  background: ${({ $color }) => $color}25;
  overflow: hidden;
`;

const BarFg = styled.div`
  height: 100%;
  border-radius: 4px;
  background: ${({ $color }) => $color};
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
`;

const DiffCount = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  width: 32px;
  text-align: right;
  flex-shrink: 0;
`;

// ─── Static card image ─────────────────────────────────────────────
const PlatformImg = styled.img`
  width: 100%;
  height: 130px;
  object-fit: contain;
  border-radius: 10px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.04);
`;

const UsernameTag = styled.div`
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.65;
`;

// ─── Skeleton bone ─────────────────────────────────────────────────
const Bone = styled.div`
  height: ${({ $h }) => $h || 14}px;
  width: ${({ $w }) => $w || '100%'};
  border-radius: ${({ $round }) => ($round ? '20px' : '6px')};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.text_primary}0d 25%,
    ${({ theme }) => theme.text_primary}1f 50%,
    ${({ theme }) => theme.text_primary}0d 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  flex-shrink: 0;
`;

// ─── SVG Icons ─────────────────────────────────────────────────────
const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LeetCodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

// ─── GitHub Card ───────────────────────────────────────────────────
const GitHubCard = ({ data, loading }) => {
  if (loading) {
    return (
      <Card as="div" $accent="#238636" style={{ cursor: 'default', pointerEvents: 'none' }}>
        <CardHeader>
          <Bone $h={22} $w="22px" $round />
          <Bone $h={16} $w="90px" />
        </CardHeader>
        <StatsRow>
          {[0, 1, 2].map(i => (
            <StatBox key={i}>
              <Bone $h={22} $w="40px" />
              <Bone $h={10} $w="48px" />
            </StatBox>
          ))}
        </StatsRow>
        <Sep />
        <LangRow>
          {[72, 90, 68, 80].map((w, i) => (
            <Bone key={i} $h={22} $w={`${w}px`} $round />
          ))}
        </LangRow>
        <Bone $h={14} $w="55%" />
      </Card>
    );
  }

  if (!data) {
    return (
      <Card href="https://github.com/GM-897" target="_blank" rel="noopener noreferrer" $accent="#238636">
        <CardHeader>
          <IconWrap $color="#58a6ff"><GitHubIcon /></IconWrap>
          <PlatformName>GitHub</PlatformName>
          <ExtLink>↗</ExtLink>
        </CardHeader>
        <div style={{ textAlign: 'center', padding: '20px 0', opacity: 0.4, fontSize: '13px' }}>
          Stats unavailable
        </div>
      </Card>
    );
  }

  return (
    <Card href={data.profileUrl} target="_blank" rel="noopener noreferrer" $accent="#238636">
      <CardHeader>
        <IconWrap $color="#58a6ff"><GitHubIcon /></IconWrap>
        <PlatformName>GitHub</PlatformName>
        <ExtLink>↗</ExtLink>
      </CardHeader>

      <StatsRow>
        <StatBox>
          <StatNum $color="#58a6ff">{data.publicRepos}</StatNum>
          <StatLbl>Repos</StatLbl>
        </StatBox>
        <StatBox>
          <StatNum $color="#e3b341">{data.totalStars}</StatNum>
          <StatLbl>Stars</StatLbl>
        </StatBox>
        <StatBox>
          <StatNum $color="#58a6ff">{data.followers}</StatNum>
          <StatLbl>Followers</StatLbl>
        </StatBox>
      </StatsRow>

      <Sep />

      {data.topLanguages?.length > 0 && (
        <LangRow>
          {data.topLanguages.map(lang => (
            <LangPill key={lang} $color={LANG_COLORS[lang] || '#8b949e'}>
              {lang}
            </LangPill>
          ))}
        </LangRow>
      )}

      {data.latestRepo && (
        <RepoHint>
          <span>Latest</span>{data.latestRepo.name}
        </RepoHint>
      )}
    </Card>
  );
};

// ─── LeetCode Card ─────────────────────────────────────────────────
const LeetCodeCard = ({ data, loading }) => {
  if (loading) {
    return (
      <Card as="div" $accent="#FFA116" style={{ cursor: 'default', pointerEvents: 'none' }}>
        <CardHeader>
          <Bone $h={22} $w="22px" $round />
          <Bone $h={16} $w="90px" />
        </CardHeader>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Bone $h={42} $w="70px" />
        </div>
        <DiffList>
          {[0, 1, 2].map(i => (
            <DiffLine key={i}>
              <Bone $h={12} $w="44px" />
              <Bone $h={6} style={{ flex: 1 }} />
              <Bone $h={12} $w="28px" />
            </DiffLine>
          ))}
        </DiffList>
        <Sep />
        <StatsRow>
          {[0, 1, 2].map(i => (
            <StatBox key={i}>
              <Bone $h={18} $w="55px" />
              <Bone $h={10} $w="48px" />
            </StatBox>
          ))}
        </StatsRow>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card href="https://leetcode.com/u/beastgm10/" target="_blank" rel="noopener noreferrer" $accent="#FFA116">
        <CardHeader>
          <IconWrap $color="#FFA116"><LeetCodeIcon /></IconWrap>
          <PlatformName>LeetCode</PlatformName>
          <ExtLink>↗</ExtLink>
        </CardHeader>
        <div style={{ textAlign: 'center', padding: '20px 0', opacity: 0.4, fontSize: '13px' }}>
          Stats unavailable
        </div>
      </Card>
    );
  }

  const easyPct  = data.totalEasy   ? (data.easySolved   / data.totalEasy)   * 100 : 0;
  const medPct   = data.totalMedium ? (data.mediumSolved  / data.totalMedium) * 100 : 0;
  const hardPct  = data.totalHard   ? (data.hardSolved    / data.totalHard)   * 100 : 0;

  return (
    <Card href={data.profileUrl} target="_blank" rel="noopener noreferrer" $accent="#FFA116">
      <CardHeader>
        <IconWrap $color="#FFA116"><LeetCodeIcon /></IconWrap>
        <PlatformName>LeetCode</PlatformName>
        <ExtLink>↗</ExtLink>
      </CardHeader>

      <SolvedBlock>
        <BigNum>{data.totalSolved}</BigNum>
        <BigSub>Problems Solved</BigSub>
      </SolvedBlock>

      <DiffList>
        <DiffLine>
          <DiffTag $color="#00AF9B">Easy</DiffTag>
          <BarBg $color="#00AF9B"><BarFg $color="#00AF9B" $pct={easyPct} /></BarBg>
          <DiffCount>{data.easySolved}</DiffCount>
        </DiffLine>
        <DiffLine>
          <DiffTag $color="#FFB800">Med</DiffTag>
          <BarBg $color="#FFB800"><BarFg $color="#FFB800" $pct={medPct} /></BarBg>
          <DiffCount>{data.mediumSolved}</DiffCount>
        </DiffLine>
        <DiffLine>
          <DiffTag $color="#FF375F">Hard</DiffTag>
          <BarBg $color="#FF375F"><BarFg $color="#FF375F" $pct={hardPct} /></BarBg>
          <DiffCount>{data.hardSolved}</DiffCount>
        </DiffLine>
      </DiffList>

      <Sep />

      <StatsRow>
        <StatBox>
          <StatNum $size={16} $color="#FFA116">
            {data.globalRanking ? `#${data.globalRanking.toLocaleString()}` : 'N/A'}
          </StatNum>
          <StatLbl>Global Rank</StatLbl>
        </StatBox>
        {data.contestRating != null && (
          <StatBox>
            <StatNum $size={16} $color="#FFA116">{data.contestRating}</StatNum>
            <StatLbl>Rating</StatLbl>
          </StatBox>
        )}
        {data.contestCount != null && (
          <StatBox>
            <StatNum $size={16}>{data.contestCount}</StatNum>
            <StatLbl>Contests</StatLbl>
          </StatBox>
        )}
      </StatsRow>
    </Card>
  );
};

// ─── Static Card (CodeChef, CodeForces) ───────────────────────────
const StaticCard = ({ title, image, link, username }) => (
  <Card href={link} target="_blank" rel="noopener noreferrer" $accent="#306EE8">
    <CardHeader>
      <PlatformName style={{ textAlign: 'center', flex: 'unset', width: '100%' }}>
        {title}
      </PlatformName>
      <ExtLink>↗</ExtLink>
    </CardHeader>
    <PlatformImg src={image} alt={title} />
    {username && <UsernameTag>{username}</UsernameTag>}
  </Card>
);

// ─── Main Component ────────────────────────────────────────────────
const CodingProfiles = () => {
  const { data: ghData, loading: ghLoading } = useApi('/github-stats');
  const { data: lcData, loading: lcLoading } = useApi('/leetcode-stats');

  return (
    <Section id="coding">
      <Title>Coding Profiles</Title>
      <Subtitle>Live stats · refreshed every 30 min</Subtitle>
      <Grid>
        <GitHubCard   data={ghData} loading={ghLoading} />
        <LeetCodeCard data={lcData} loading={lcLoading} />
        <StaticCard
          title="CodeChef"
          image="https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Codechef%28new%29_logo.svg/1200px-Codechef%28new%29_logo.svg.png"
          link="https://www.codechef.com/users/beastgm10"
          username="beastgm10"
        />
        <StaticCard
          title="CodeForces"
          image="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/062020/codeforces_logo.png?Qlx1_zCw.Q4T7PHPosbkLyNiBJQWX7GD&itok=6wPhjb1X"
          link="https://codeforces.com/profile/beast_gm10"
          username="beast_gm10"
        />
      </Grid>
    </Section>
  );
};

export default CodingProfiles;

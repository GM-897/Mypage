const express = require('express');
const router = express.Router();

const Bio = require('../models/Bio');
const Experience = require('../models/Experience');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Achievement = require('../models/Achievement');

router.get('/bio', async (req, res) => {
  try {
    const bio = await Bio.findOne();
    res.json(bio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/achievements', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/section-status', async (req, res) => {
  try {
    const [skills, experience, education, projects, achievements] = await Promise.all([
      Skill.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Project.countDocuments(),
      Achievement.countDocuments(),
    ]);
    res.json({ skills: skills > 0, experience: experience > 0, education: education > 0, projects: projects > 0, achievements: achievements > 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

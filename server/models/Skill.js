const mongoose = require('mongoose');

const SkillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
}, { _id: false });

const SkillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  skills: [SkillItemSchema],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);

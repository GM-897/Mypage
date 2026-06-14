const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  img: { type: String },
  role: { type: String, required: true },
  company: { type: String, required: true },
  date: { type: String },
  desc: { type: String },
  skills: [{ type: String }],
  doc: { type: String },
  type: { type: String, enum: ['internship', 'job', 'freelance', 'other'], default: 'job' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);

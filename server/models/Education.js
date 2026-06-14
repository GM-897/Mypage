const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  img: { type: String },
  school: { type: String, required: true },
  date: { type: String },
  degree: { type: String },
  desc: { type: String },
  grade: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);

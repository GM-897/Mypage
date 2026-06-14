const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String },
  img: { type: String },
  linkedin: { type: String },
  github: { type: String },
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  tags: [{ type: String }],
  category: { type: String },
  github: { type: String },
  webapp: { type: String },
  member: [MemberSchema],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

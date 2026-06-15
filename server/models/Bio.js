const mongoose = require('mongoose');

const BioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roles: [{ type: String }],
  description: { type: String },
  github: { type: String },
  resume: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  insta: { type: String },
  facebook: { type: String },
  profileImage: { type: String },
  hiddenSections: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Bio', BioSchema);

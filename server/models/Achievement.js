const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  image:       { type: String },
  link:        { type: String },
  description: { type: String },
  date:        { type: String },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);

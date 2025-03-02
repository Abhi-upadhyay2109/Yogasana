const mongoose = require("mongoose");

const YogaSchema = new mongoose.Schema({
  name: String,
  image: String,
  steps: [String],
  level: { type: String, enum: ["Easy", "Medium", "Hard"] },
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  comments: [{ user: String, comment: String, date: Date }]
},{versionKey:false});

module.exports = mongoose.model("Yoga", YogaSchema);

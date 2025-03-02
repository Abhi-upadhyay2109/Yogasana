const mongoose = require("mongoose");

const YogaTaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  yoga: { type: mongoose.Schema.Types.ObjectId, ref: "Yoga" },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
},{versionKey:false});

module.exports = mongoose.model("YogaTask", YogaTaskSchema);

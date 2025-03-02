const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  points: { type: Number, default: 0 },
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "YogaTask" }],
  lastLogDate: Date
},{versionKey:false});

module.exports = mongoose.model("User", UserSchema);

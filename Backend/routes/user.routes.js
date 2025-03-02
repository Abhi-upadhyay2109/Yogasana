const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt");
const User = require("../models/user.model");
const Yogasana = require("../models/yoga.model");
const authMiddleware = require("../middleware/authMiddleware");


const userRoutes = express.Router();

// 🟢 Register User
userRoutes.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔹 Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // 🔹 Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create and Save User
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// 🟢 Login User
userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Find User by Email and Exclude Password
    const user = await User.findOne({ email }).select("+password"); 

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // 🔹 Remove password before sending response
    const userData = user.toObject();
    delete userData.password;

    res.json({ token: generateToken(user._id), user: userData });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});



const mongoose = require("mongoose");


userRoutes.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user; 

    

  
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   

    const logs = await Yogasana.find({ user: userId})
      .sort({ date: -1 })
      .limit(5);


    res.json({ user, logs});
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = userRoutes;

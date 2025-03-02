const express = require("express");
const { addYogaTask, completeYogaTask, rateYoga, getLeaderboard, allData, taskdata, deleteTask, comment } = require("../controllers/yogaTask.controller");
const authMiddleware = require("../middleware/authMiddleware");

const yogaRouter = express.Router();

yogaRouter.post("/task", authMiddleware, addYogaTask);
yogaRouter.post("/task/complete", authMiddleware, completeYogaTask);
yogaRouter.post("/rate", authMiddleware, rateYoga);
yogaRouter.get("/leaderboard", getLeaderboard);
yogaRouter.get("/data", allData);
yogaRouter.get("/task", authMiddleware,taskdata);
yogaRouter.delete("/:id", authMiddleware,deleteTask);
yogaRouter.post("/comment", authMiddleware, comment);
module.exports = yogaRouter;

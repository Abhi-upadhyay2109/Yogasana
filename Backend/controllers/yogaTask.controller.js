const YogaTask = require("../models/YogaTask.model");
const userModel = require("../models/user.model");

exports.addYogaTask = async (req, res) => {
  try {
    const { yogaId } = req.body;
    const userId = req.user.userId;

    const task = new YogaTask({ user: userId, yoga: yogaId });
    await task.save();

    res.status(201).json({ message: "Yoga task added successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};



const User = require("../models/user.model");

const Yoga = require("../models/yoga.model");

exports.completeYogaTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const userId = req.user.userId;

    // Mark task as completed
    const task = await YogaTask.findOneAndUpdate(
      { _id: taskId, user: userId },
      { status: "Completed" },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Find yoga details
    const yoga = await Yoga.findById(task.yoga);
    const points = yoga.level === "Easy" ? 5 : yoga.level === "Medium" ? 10 : 15;
    console.log(userId)
   
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $inc: { points }, 
        $push: { completedTasks: taskId }  // 🔹 Push completed task
      },
      { new: true }
    ).populate({
      path: "completedTasks",
      populate: { path: "yoga", select: "name level image" }
    }).select("-password");

    res.json({ message: "Task completed successfully", points, updatedUser });
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).json({ message: "Error completing task", error });
  }
};




exports.rateYoga = async (req, res) => {
  try {
    const { yogaId, rating } = req.body;
    

    const yoga = await Yoga.findById(yogaId);
    if (!yoga) return res.status(404).json({ message: "Yoga not found" });

    // Update rating
    yoga.totalRatings += 1;
    yoga.rating = ((yoga.rating * (yoga.totalRatings - 1)) + rating) / yoga.totalRatings;



    await yoga.save();

    res.json({ message: "Rating submitted", yoga });
  } catch (error) {
    res.status(500).json({ message: "Error submitting rating", error });
  }
};

exports.allData = async (req ,res)=>{
  try {
    const data = await Yoga.find()
    res.json(data);
  } catch (error) {
    console.log(error)
  }
}

exports.getLeaderboard = async (req, res) => {
  try {
    // Fetch users sorted by points and populate completedTasks details
    const users = await User.find()
      .sort({ points: -1 }) // Sort by highest points
      .limit(10) // Limit to top 10 users
    

    res.json(users);
  } catch (error) {
    console.error("Leaderboard Fetch Error:", error);
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
};
exports.taskdata = async (req, res) => {
  try {
      const userId = req.user.userId; // Get the logged-in user's ID
    
      const data = await YogaTask.find({ user: userId }).populate("yoga"); // Fetch tasks only for this user
   
      res.status(200).json(data);
  } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks." });
  }
};


exports.deleteTask= async(req,res)=>{
  try {
    await YogaTask.findByIdAndDelete(req.params.id);
    res.send({msg:"deleted"});
  } catch (error) {
    
  }
}

exports.comment = async (req, res) => {
  try {
    const { yogaId, comment } = req.body;
    const userId = req.user.userId;
    const user= await userModel.find({_id:userId})
   
    const yoga = await Yoga.findById(yogaId);
    if (!yoga) return res.status(404).json({ message: "Yoga not found" });

    yoga.comments.push({comment,user:user[0].name,date:Date.now()});
    await yoga.save();


    res.json({ message: "comments submitted", yoga });
  } catch (error) {
    res.status(500).json({ message: "Error submitting ", error });
  }
};
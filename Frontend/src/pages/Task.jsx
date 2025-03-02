import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRatings from "react-star-ratings";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("https://yogabackend-yj54.onrender.com/yoga/task", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks!");
    }
  };

  const completeTask = async (taskId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `https://yogabackend-yj54.onrender.com/yoga/task/complete`,
        { taskId },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      toast.success("Task marked as completed!");
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to complete task!");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`https://yogabackend-yj54.onrender.com/yoga/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task!");
    }
  };

  const submitRating = async (yogaId, ratingValue) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `https://yogabackend-yj54.onrender.com/yoga/rate`,
        { yogaId, rating: ratingValue },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      toast.success("Rating submitted!");
      fetchTasks();
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating!");
    }
  };

  const submitComment = async (yogaId) => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `https://yogabackend-yj54.onrender.com/yoga/comment`,
        { yogaId, comment: newComment },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      toast.success("Comment added!");
      setNewComment("");
      fetchTasks();
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to add comment!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Yoga Tasks</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Fixed Image Styling */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={task.yoga.image}
                alt={task.yoga.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold">{task.yoga.name}</h2>
              <p className="text-gray-600">Level: {task.yoga.level}</p>
              <p className="text-yellow-500">
                ⭐ {parseFloat(task.yoga.rating).toFixed(1)} ({task.yoga.totalRatings} Ratings)
              </p>
              <p
                className={`mt-2 font-bold ${
                  task.status === "Completed" ? "text-green-600" : "text-red-600"
                }`}
              >
                {task.status}
              </p>

              <div className="mt-3 flex flex-col gap-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                  onClick={() => setSelectedTask(task)}
                >
                  Learn Steps
                </button>

                {task.status === "Pending" ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                    onClick={() => completeTask(task._id)}
                  >
                    Mark as Completed
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete Task
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold">{selectedTask.yoga.name}</h2>
            <p className="text-gray-700 mt-2">Level: {selectedTask.yoga.level}</p>
            <p className="text-yellow-500">
              ⭐ {parseFloat(selectedTask.yoga.rating).toFixed(1)} ({selectedTask.yoga.totalRatings} Ratings)
            </p>

            <h3 className="text-lg font-semibold mt-4">Steps:</h3>
            <ul className="list-disc ml-5 mt-2">
              {selectedTask.yoga.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4">Rate this Yoga</h3>
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              changeRating={(newRating) => {
                setRating(newRating);
                submitRating(selectedTask.yoga._id, newRating);
              }}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="5px"
            />

            <h3 className="text-lg font-semibold mt-4">Comments</h3>
            <ul className="list-disc ml-5 mt-2">
              {selectedTask.yoga.comments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.user}:</strong> {comment.comment}
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="border p-2 w-full mt-2"
            />
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => submitComment(selectedTask.yoga._id)}
            >
              Submit Comment
            </button>

            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => setSelectedTask(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Task;

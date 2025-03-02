import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YogaTaskPage = () => {
  const [yogaPoses, setYogaPoses] = useState([]);
  const [addedTasks, setAddedTasks] = useState(new Set());
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchYogaData = async () => {
      try {
        const response = await axios.get("https://yogabackend-yj54.onrender.com/yoga/data");
        setYogaPoses(response.data);
      } catch (err) {
        toast.error("Failed to fetch yoga data!");
        console.error("Error fetching yoga data:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchYogaData();
  }, []);

  const addToDashboard = async (yogaId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        "https://yogabackend-yj54.onrender.com/yoga/task",
        { yogaId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Yoga task added successfully!");
      setAddedTasks((prev) => new Set([...prev, yogaId]));
    } catch (error) {
      toast.error(error.response?.data?.message || "Login First !");
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Yoga Tasks</h1>

      {loading ? ( // Show Loader when fetching data
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {yogaPoses.map((yoga) => (
            <div key={yoga._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={yoga.image} alt={yoga.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{yoga.name}</h2>
                <p className="text-gray-600">Level: {yoga.level}</p>
                <p className="text-yellow-500">⭐ {parseFloat(yoga.rating).toFixed(1)} ({yoga.totalRatings} Ratings)</p>
                <button
                  className={`mt-3 px-4 py-2 rounded w-full ${
                    addedTasks.has(yoga._id)
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
                  onClick={() => addToDashboard(yoga._id)}
                  disabled={addedTasks.has(yoga._id)}
                >
                  {addedTasks.has(yoga._id) ? "Added" : "Add To Task"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default YogaTaskPage;


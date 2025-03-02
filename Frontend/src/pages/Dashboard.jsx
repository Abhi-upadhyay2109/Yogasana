import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch("https://yogabackend-yj54.onrender.com/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          setLogs(data.logs);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("https://yogabackend-yj54.onrender.com/yoga/leaderboard");
        const data = await response.json();
        setLeaderboard(data.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchUserData();
    fetchLeaderboard();
  }, []);

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10">
        Please login to view your dashboard.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>

     
      <div className="mb-6 p-4 bg-blue-100 rounded-lg">
        <p className="text-lg font-semibold">Welcome, {user.name}!</p>
        <p className="text-lg">
          Total Points: <span className="font-bold">{user.points}</span>
        </p>
        <p className="text-lg">
          Completed Tasks: <span className="font-bold">{user.completedTasks.length}</span>
        </p>
      </div>

      

      
      <div>
        <h3 className="text-xl font-semibold mb-2">Leaderboard (Top 5)</h3>
        <ul className="bg-green-100 p-3 rounded-lg">
          {leaderboard.map((entry, index) => (
            <li key={index} className="flex justify-between p-2 border-b last:border-b-0">
              <span className="font-medium">{entry.name}</span>
              <span className="font-bold text-blue-700">{entry.points} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

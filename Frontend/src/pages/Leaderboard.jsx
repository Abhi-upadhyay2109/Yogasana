import { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get("https://yogabackend-yj54.onrender.com/yoga/leaderboard");
        setLeaderboard(data);
      } catch (error) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Leaderboard</h1>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2">Rank</th>
                <th className="p-2">User</th>
                <th className="p-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{user.name}</td>
                  <td className="p-2 text-center">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

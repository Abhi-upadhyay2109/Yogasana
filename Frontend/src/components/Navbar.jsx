import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => localStorage.getItem("accessToken"));
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  // Sync user state whenever localStorage changes (even across tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Listen for login/logout updates inside the same tab
  useEffect(() => {
    const interval = setInterval(() => {
      setUser(localStorage.getItem("accessToken"));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo and Home Link */}
      <Link to="/" className="text-lg font-bold flex items-center space-x-2">
        <FaUserCircle className="text-2xl" />
        <span>Yogasana Community</span>
      </Link>

      {/* Mobile Menu Icon */}
      <button className="sm:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>

      {/* Navigation Links */}
      <div className={`sm:flex ${menuOpen ? "block" : "hidden"} space-x-4`}>
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
            <Link to="/task" className="hover:text-yellow-300 transition">My Task</Link>
            <Link to="/" className="hover:text-yellow-300 transition">Yogasana</Link>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout <FaSignOutAlt className="ml-2" />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
            <Link to="/register" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-700 transition">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

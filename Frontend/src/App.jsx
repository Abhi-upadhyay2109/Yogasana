import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import YogaTask from "./pages/YogaTask";
import Task from "./pages/Task";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<YogaTask />} />
        <Route path="/task" element={<PrivateRoute><Task /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
       
      </Routes>
    </>
  );
}

export default App;

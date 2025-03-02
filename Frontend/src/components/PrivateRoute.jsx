import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

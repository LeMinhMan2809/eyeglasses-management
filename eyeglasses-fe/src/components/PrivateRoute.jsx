import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");

  // If the user is not authenticated, redirect to the login page
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) { 
      localStorage.removeItem("token"); 
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
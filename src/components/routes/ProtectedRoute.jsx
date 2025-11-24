import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // Decode JWT payload
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");

      toast.error("Session expired. Please login again!", {
        position: "top-right",
      });

      return <Navigate to="/" replace />;
    }
  } catch (err) {
    // Token invalid or decode failed
    localStorage.removeItem("token");

    toast.error("Invalid session. Please login again!", {
      position: "top-right",
    });

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RouteProtected = ({ element: Element }) => {
  // Get user data from localStorage or Context
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user data is found, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component (Element)
  return <Element />;
};

export default RouteProtected;

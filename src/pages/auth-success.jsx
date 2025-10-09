"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // from updated AuthContext

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      try {
        const userObj = JSON.parse(decodeURIComponent(user));

        // Save token & user info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userObj));

        // Update AuthContext
        setUser(userObj);

        // Redirect to homepage or intended page
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Failed to parse Google user data:", err);
        navigate("/login", { replace: true });
      }
    } else {
      // Missing token/user info → fallback to login
      navigate("/login", { replace: true });
    }
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-lg">Logging in with Google...</p>
    </div>
  );
};

export default AuthSuccessPage;

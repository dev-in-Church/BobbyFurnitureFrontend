"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth(); // ✅ we'll call backend to load user info from cookie

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Call backend to get the user stored in JWT cookie
        const res = await fetch("http://localhost/5000/api/auth/current", {
          credentials: "include", // very important! send cookies
        });

        if (res.ok) {
          const data = await res.json();
          await refreshUser(); // or setUser(data.user) if you prefer direct update
          navigate("/", { replace: true });
        } else {
          console.error("Failed to fetch user from cookie session");
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Error fetching user from cookie:", err);
        navigate("/login", { replace: true });
      }
    };

    fetchUser();
  }, [navigate, refreshUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-700 text-lg">Signing you in securely...</p>
    </div>
  );
};

export default AuthSuccessPage;

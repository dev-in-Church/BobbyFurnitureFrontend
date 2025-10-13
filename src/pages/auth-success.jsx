"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user info from backend cookie session
        const res = await fetch(
          "https://bobbyfurnitureonline.onrender.com/api/auth/current",
          {
            credentials: "include", // 👈 sends cookies
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch user from cookie session");
          navigate("/login", { replace: true });
          return;
        }

        const data = await res.json();
        const user = await refreshUser(); // ensures context is updated

        if (user?.isAdmin) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
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

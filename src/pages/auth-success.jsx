"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const AuthSuccessPage = () => {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await refreshUser();
        navigate("/", { replace: true });
      } catch {
        navigate("/login", { replace: true });
      }
    };
    fetchUser();
  }, [refreshUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-700 text-lg">Signing you in securely...</p>
    </div>
  );
};

export default AuthSuccessPage;

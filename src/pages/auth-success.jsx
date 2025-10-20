"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { Loader } from "lucide-react";

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [cookiesAllowed, setCookiesAllowed] = useState(true);

  // ✅ Check if cookies are enabled in the browser
  useEffect(() => {
    try {
      document.cookie = "cookietest=1";
      const cookiesEnabled = document.cookie.indexOf("cookietest=") !== -1;
      setCookiesAllowed(cookiesEnabled);
      // Clean up
      document.cookie =
        "cookietest=1; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    } catch {
      setCookiesAllowed(false);
    }
  }, []);

  // ✅ Fetch user info if cookies are available
  useEffect(() => {
    if (!cookiesAllowed) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://bobbyfurnitureonline.onrender.com/api/auth/current",
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch user from cookie session");
          navigate("/login", { replace: true });
          return;
        }

        await refreshUser().then((user) => {
          if (user?.isAdmin) {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        });
      } catch (err) {
        console.error("Error fetching user from cookie:", err);
        navigate("/login", { replace: true });
      }
    };

    fetchUser();
  }, [cookiesAllowed, navigate, refreshUser]);

  // 🚫 Show notice if cookies are blocked
  if (!cookiesAllowed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Cookies Are Disabled
        </h2>
        <p className="text-gray-700 mb-5 max-w-md">
          To sign in securely with Google, please enable cookies in your browser
          settings and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          I’ve enabled cookies
        </button>
      </div>
    );
  }

  // Default loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loader className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-primary">Signing You in Securely...</p>
      </div>
    </div>
  );
};

export default AuthSuccessPage;

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(undefined);

const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Helper for API calls (includes credentials for cookies)
  const apiCall = async (endpoint, options = {}) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // 👈 include cookies automatically
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Network error" }));
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  };

  // ✅ On mount: check if a valid session cookie exists
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiCall("/auth/current");
        setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // ✅ Login (cookie set automatically by backend)
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setUser(response.user);
      toast.success("Login successful!");
      return { success: true, user: response.user };
    } catch (error) {
      toast.error(error.message || "Login failed");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register (cookie set automatically by backend)
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      setUser(response.user);
      toast.success("Registration successful!");
      return { success: true, user: response.user };
    } catch (error) {
      toast.error(error.message || "Registration failed");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout (backend clears cookie)
  const logout = async () => {
    try {
      await apiCall("/auth/logout", { method: "POST" });
      setUser(null);
      toast.info("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  // ✅ Refresh user data
  const refreshUser = async () => {
    try {
      const response = await apiCall("/auth/current");
      setUser(response.user);
      return response.user;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };

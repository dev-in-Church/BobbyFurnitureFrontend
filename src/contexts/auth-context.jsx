"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(undefined);

// API configuration
const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper for API calls
  const apiCall = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
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

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          // Optionally verify token with backend
          // const verified = await apiCall("/auth/verify");
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login with email/password
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const { user: userData, token } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Login successful!");
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const { user: newUser, token } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      toast.success("Registration successful!");
      return { success: true, user: newUser };
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUser = async (updatedData) => {
    try {
      const response = await apiCall("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });

      const updatedUser = response.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.message || "Failed to update profile");
      return { success: false, error: error.message };
    }
  };

  // Refresh user data from backend
  const refreshUser = async () => {
    try {
      const userData = await apiCall("/auth/me");
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      return userData.user;
    } catch (error) {
      console.error("Refresh user error:", error);
      logout();
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await apiCall("/auth/logout", { method: "POST" }).catch(() => {});
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.info("Logged out successfully");
    }
  };

  const value = {
    user,
    setUser, // needed for Google OAuth redirect
    loading,
    login,
    register,
    logout,
    updateUser,
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

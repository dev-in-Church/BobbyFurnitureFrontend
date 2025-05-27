"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(undefined);

// API configuration
const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com/api"; //"http://localhost:5000/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // API helper function
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

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const userData = await apiCall("/auth/verify");
        setUser(userData.user);
      } catch (error) {
        console.error("Token verification failed:", error);
        // Clear invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const { user: userData, token } = response;

      // Store token and user data
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

  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password, // Add password field
        }),
      });

      const { user: newUser, token } = response;

      // Store token and user data
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

  const logout = async () => {
    try {
      // Optional: Call logout endpoint to invalidate token on server
      await apiCall("/auth/logout", { method: "POST" }).catch(() => {
        // Ignore errors for logout endpoint
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local storage and state
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.info("Logged out successfully");
    }
  };

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

  const refreshUser = async () => {
    try {
      const userData = await apiCall("/auth/me");
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      return userData.user;
    } catch (error) {
      console.error("Refresh user error:", error);
      logout(); // Force logout if refresh fails
      throw error;
    }
  };

  const value = {
    user,
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

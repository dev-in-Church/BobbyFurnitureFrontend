"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: 1,
        email,
        name: email === "admin@bobbyfurniture.com" ? "Admin User" : "John Doe",
        isAdmin: email === "admin@bobbyfurniture.com",
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast.success("Login successful!");

      // Return user data for redirection logic
      return { success: true, user: mockUser };
    } catch (error) {
      toast.error("Login failed");
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - replace with actual API call
      const newUser = {
        id: Date.now(),
        ...userData,
        isAdmin: false,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Registration successful!");
      return { success: true };
    } catch (error) {
      toast.error("Registration failed");
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
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

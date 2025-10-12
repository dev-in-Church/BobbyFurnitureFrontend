"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiCall = async (endpoint, options = {}) => {
    const config = {
      headers: { "Content-Type": "application/json", ...options.headers },
      credentials: "include",
      ...options,
    };
    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Network error" }));
      throw new Error(err.message || "Request failed");
    }
    return res.json();
  };

  // Load user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiCall("/auth/current");
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setUser(res.user);
      toast.success("Login successful!");
      return { success: true, user: res.user };
    } catch (err) {
      toast.error(err.message || "Login failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      setUser(res.user);
      toast.success("Registration successful!");
      return { success: true, user: res.user };
    } catch (err) {
      toast.error(err.message || "Registration failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiCall("/auth/logout", { method: "POST" });
      setUser(null);
      toast.info("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  const refreshUser = async () => {
    try {
      const res = await apiCall("/auth/current");
      setUser(res.user);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

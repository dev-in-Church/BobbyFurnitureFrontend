// src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; // Assuming you are using axios for API calls

const Login = () => {
  const { login } = useAuth(); // Access login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { email, password }); // Send login request to the backend
      const userData = response.data; // Assuming response contains user data

      login(userData); // Call the login function to update state and localStorage

      // Redirect to homepage or dashboard based on role
      if (userData.role === "admin") {
        window.location.href = "/admin"; // Redirect to admin dashboard
      } else {
        window.location.href = "/"; // Redirect to homepage
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios"; // Always use your axios instance

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await api.post("/api/users/login", { email, password });
//       const { token, user } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       setToken(token);
//       setUser(user);

//       if (user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/login");
//       }
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Login failed");
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       await api.post("/api/users/signup", userData);
//       navigate("/login"); // Redirect to login after signup
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Signup failed");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setToken(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useState, useEffect } from "react";
import { createContext, useContext, useState } from "react"; // ✅ Ensure useContext is imported
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Always use your axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/users/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // const signup = async (userData) => {
  //   try {
  //     await api.post("/api/users/signup", userData);
  //     navigate("/login"); // Redirect to login after signup
  //   } catch (error) {
  //     throw new Error(error.response?.data?.message || "Signup failed");
  //   }
  // };

  const signup = async (userData) => {
    console.log("Signup request data:", userData); // Debugging step

    try {
      await api.post("/api/users/signup", userData);
      navigate("/login");
    } catch (error) {
      console.error("Signup error response:", error.response?.data); // Log backend response
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add and export the `useAuth` hook
export const useAuth = () => {
  return useContext(AuthContext);
};

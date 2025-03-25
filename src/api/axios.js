import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", //"https://bobbyfurnitureonline.onrender.com", // Change to your backend URL
});

// Optional: Add an interceptor to attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming token is saved in localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

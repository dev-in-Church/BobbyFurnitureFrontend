// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axios";

// const ProfilePage = () => {
//   const { user, setUser, logout } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     email: user?.email || "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);
//     setLoading(true);

//     try {
//       // Only include the password if it's provided
//       const updatedData = { ...formData };
//       if (!updatedData.password) delete updatedData.password;

//       const response = await api.put("/api/users/update-profile", updatedData);
//       setUser(response.data.user);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       setMessage("Profile updated successfully!");
//     } catch (error) {
//       setError(error.response?.data?.message || "Profile update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
//           User Profile
//         </h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}
//         {message && <p className="text-green-500 text-center">{message}</p>}

//         <form onSubmit={handleUpdate} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Enter your username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               New Password (Optional)
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter a new password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
//             />
//           </div>

//           <button
//             type="submit"
//             className={`w-full bg-blue-500 text-white py-2 rounded-md transition ${
//               loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </form>

//         <button
//           onClick={logout}
//           className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
  FaSpinner,
} from "react-icons/fa";

const ProfilePage = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const updatedData = { ...formData };
      if (!updatedData.password) delete updatedData.password;

      const response = await api.put("/api/users/update-profile", updatedData);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setMessage("Profile updated successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          User Profile
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-md px-3 py-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Password Field with Hide/Show Toggle */}
          <div className="flex items-center border rounded-md px-3 py-2 relative">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password (optional)"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none pr-8"
            />
            <button
              type="button"
              className="absolute right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center items-center bg-blue-500 text-white py-2 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <button
          onClick={logout}
          className="w-full mt-4 flex justify-center items-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

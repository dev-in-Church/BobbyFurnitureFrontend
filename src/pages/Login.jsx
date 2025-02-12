// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "password") {
//       evaluatePasswordStrength(value);
//     }
//   };

//   const evaluatePasswordStrength = (password) => {
//     if (password.length < 6) {
//       setPasswordStrength("Weak");
//     } else if (password.length < 10) {
//       setPasswordStrength("Medium");
//     } else {
//       setPasswordStrength("Strong");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       await login(formData.email, formData.password);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg transition transform hover:scale-105 duration-300">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Welcome Back 👋
//         </h2>

//         {error && (
//           <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded-md">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email Field */}
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Email Address"
//             />
//           </div>

//           {/* Password Field */}
//           <div className="relative">
//             <FaLock className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           {/* Password Strength Indicator */}
//           {formData.password && (
//             <p
//               className={`text-sm font-medium mt-1 ${
//                 passwordStrength === "Weak"
//                   ? "text-red-500"
//                   : passwordStrength === "Medium"
//                   ? "text-yellow-500"
//                   : "text-green-500"
//               }`}
//             >
//               {passwordStrength} Password
//             </p>
//           )}

//           {/* Forgot Password Link */}
//           <p className="text-right">
//             <button
//               type="button"
//               onClick={() => navigate("/forgot-password")}
//               className="text-sm text-blue-500 hover:underline"
//             >
//               Forgot password?
//             </button>
//           </p>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300"
//           >
//             Login
//           </button>
//         </form>

//         {/* Signup Link */}
//         <p className="text-center mt-4 text-gray-600">
//           Don't have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="text-blue-500 hover:underline font-medium"
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaSpinner,
} from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg transition transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <p
              className={`text-sm font-medium mt-1 ${
                passwordStrength === "Weak"
                  ? "text-red-500"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {passwordStrength} Password
            </p>
          )}

          {/* Forgot Password Link */}
          <p className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable when loading
            className={`w-full py-3 rounded-md text-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <FaSpinner className="animate-spin mr-2" /> Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

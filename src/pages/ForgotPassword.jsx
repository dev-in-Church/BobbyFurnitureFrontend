import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate sending password reset request (replace with API call)
    setTimeout(() => {
      setMessage("A password reset link has been sent to your email.");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        {message && (
          <p className="text-green-600 text-center mb-4 bg-green-100 p-2 rounded-md">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

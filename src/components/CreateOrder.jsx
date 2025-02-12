import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios"; // Import your Axios instance

const CreateOrder = ({ cart, total }) => {
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    paymentMethod: "M-Pesa",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate phone number format
  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^(07|01)[0-9]{8}$/;
    return phonePattern.test(phoneNumber);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    setGlobalError("");

    // Validate phone number
    if (!validatePhoneNumber(formData.phoneNumber)) {
      validationErrors.phoneNumber =
        "Please enter a valid Kenyan phone number starting with 07 or 01.";
    }

    // If there are validation errors, set them and return early
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const userId = user ? user.user.id : null;

      if (!userId) {
        alert("Please log in to place an order.");
        return;
      }

      // Prepare order data
      const orderData = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        totalAmount: total,
        userId: userId,
        paymentMethod: formData.paymentMethod,
        paymentStatus: "pending",
      };

      // Make POST request to create order
      const response = await api.post("/api/orders", orderData);

      if (response.data.message === "Order created successfully") {
        alert("Order placed successfully!");
      } else {
        setGlobalError("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error.response || error);
      setGlobalError("There was an error placing your order.");
    } finally {
      setLoading(false);
    }
  };

  // Display message if cart is empty
  if (!cart.length) {
    return (
      <p className="text-center text-lg font-semibold text-gray-600">
        Your cart is empty! Please add items before proceeding.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Checkout
      </h1>

      {globalError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>{globalError}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Order Summary
        </h2>
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between text-gray-600">
              <span>{item.name}</span>
              <span>
                Ksh.{(item.price * item.quantity).toFixed(2)}{" "}
                <span className="text-sm text-gray-400">
                  ({item.quantity}x)
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-semibold text-gray-800">
          Total: Ksh.{total.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block font-medium text-gray-700">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phoneNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter your phone number"
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block font-medium text-gray-700">
            Shipping Address:
          </label>
          <textarea
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your shipping address"
            required
          />
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="block font-medium text-gray-700"
          >
            Payment Method:
          </label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="M-Pesa">M-Pesa</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? (
            <span className="inline-flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Place Order"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;

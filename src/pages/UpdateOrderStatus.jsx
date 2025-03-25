"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  Loader,
  Truck,
  Package,
  Clock,
  Check,
} from "lucide-react";
import axios from "axios";

const UpdateOrderStatus = ({ orderId, currentStatus, onStatusUpdate }) => {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const statusOptions = [
    { value: "Pending", label: "Pending", icon: <Clock className="w-4 h-4" /> },
    {
      value: "Processing",
      label: "Processing",
      icon: <Package className="w-4 h-4" />,
    },
    { value: "Shipped", label: "Shipped", icon: <Truck className="w-4 h-4" /> },
    {
      value: "Delivered",
      label: "Delivered",
      icon: <Check className="w-4 h-4" />,
    },
  ];

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleUpdate = async () => {
    // If status hasn't changed, do nothing
    if (status === currentStatus) {
      return;
    }

    // If confirmation is needed and not shown yet
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsUpdating(true);
    setError(null);
    setSuccess(false);
    setShowConfirm(false);

    try {
      const response = await axios.put(
        `https://bobbyfurnitureonline.onrender.com/api/orders/${orderId}/status`,
        {
          order_status: status,
        }
      );

      if (response.status === 200) {
        setSuccess(true);

        // Call the callback function if provided
        if (onStatusUpdate) {
          onStatusUpdate(status);
        }

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update status. Please try again.");

      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Update Order Status
      </h3>

      <div className="flex flex-col space-y-4">
        {/* Current Status Display */}
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Current Status:</span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              currentStatus
            )}`}
          >
            {statusOptions.find((opt) => opt.value === currentStatus)?.icon}
            <span className="ml-1">{currentStatus}</span>
          </span>
        </div>

        {/* Status Selection */}
        <div className="grid grid-cols-2 gap-2">
          {statusOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => setStatus(option.value)}
              className={`flex items-center justify-center px-3 py-2 rounded-md text-sm border ${
                status === option.value
                  ? getStatusColor(option.value) + " ring-2 ring-offset-1"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {option.icon}
              <span className="ml-1.5">{option.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Confirmation Alert */}
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2 rounded-md text-sm flex items-center"
          >
            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Are you sure you want to change the status?</span>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm flex items-center"
          >
            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-sm flex items-center"
          >
            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Status updated successfully!</span>
          </motion.div>
        )}

        {/* Update Button */}
        <motion.button
          onClick={handleUpdate}
          disabled={isUpdating || status === currentStatus}
          className={`w-full py-2 px-4 rounded-md text-white font-medium flex items-center justify-center ${
            isUpdating || status === currentStatus
              ? "bg-gray-400 cursor-not-allowed"
              : showConfirm
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          whileTap={{ scale: 0.97 }}
        >
          {isUpdating ? (
            <>
              <Loader className="animate-spin w-4 h-4 mr-2" />
              Updating...
            </>
          ) : showConfirm ? (
            "Confirm Change"
          ) : status === currentStatus ? (
            "No Change"
          ) : (
            "Update Status"
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;

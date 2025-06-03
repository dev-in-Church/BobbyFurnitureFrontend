"use client";

import { useState, useEffect } from "react";
import { X, Check, Heart, ShoppingCart } from "lucide-react";

let toastId = 0;

const Toast = ({ id, type, title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check size={20} className="text-green-600" />;
      case "cart":
        return <ShoppingCart size={20} className="text-orange-600" />;
      case "wishlist":
        return <Heart size={20} className="text-red-600" />;
      default:
        return <Check size={20} className="text-green-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "cart":
        return "bg-orange-50 border-orange-200";
      case "wishlist":
        return "bg-red-50 border-red-200";
      default:
        return "bg-green-50 border-green-200";
    }
  };

  return (
    <div
      className={`${getBgColor()} border rounded-lg p-4 shadow-lg max-w-sm w-full animate-in slide-in-from-right duration-300`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {message && <p className="text-sm text-gray-600 mt-1">{message}</p>}
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => onClose(id)}
            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Expose addToast globally
  useEffect(() => {
    window.addToast = addToast;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[1000] space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export { ToastContainer };

// Helper function to show toasts
export const showToast = (toast) => {
  if (window.addToast) {
    window.addToast(toast);
  }
};

import React from "react";
import { Loader } from "lucide-react";

export default function PageLoader({ fadeOut }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-[9999] transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />{" "}
        <p className="text-primary font-semibold text-lg tracking-wide">
          Loading...
        </p> */}
        <img src="/logo5.png" alt="" className="h-12 animate-pulse" />
      </div>
    </div>
  );
}

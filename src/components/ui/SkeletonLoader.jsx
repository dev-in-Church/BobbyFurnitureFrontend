import React from "react";

export default function SkeletonLoader({ rows = 3 }) {
  return (
    <div className="animate-pulse space-y-3">
      {/* header */}
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>

      {/* grid items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-lg h-36 sm:h-44 md:h-52 lg:h-56"
          ></div>
        ))}
      </div>
    </div>
  );
}

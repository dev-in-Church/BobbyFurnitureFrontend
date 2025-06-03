"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [showAll, setShowAll] = useState(false);

  // Add "All Categories" option
  const allCategories = [{ slug: "", name: "All Categories" }, ...categories];

  // Show only first 6 categories by default on mobile
  const visibleCategories = showAll ? allCategories : allCategories.slice(0, 7);

  return (
    <div className="flex flex-col gap-3">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {visibleCategories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category.slug
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {category.name}
          </button>
        ))}

        {/* Show more/less button */}
        {allCategories.length > 7 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            {showAll ? (
              <>
                <span>Show Less</span>
                <ChevronLeft size={14} />
              </>
            ) : (
              <>
                <span>Show More</span>
                <ChevronRight size={14} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Selected category indicator */}
      {selectedCategory && (
        <div className="text-sm text-gray-600">
          Showing products in:{" "}
          <span className="font-medium capitalize">
            {selectedCategory.replace(/-/g, " ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;

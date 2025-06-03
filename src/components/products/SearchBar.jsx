"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  onSearch,
  initialValue = "",
  placeholder = "Search furniture...",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  // Update local state when initialValue changes
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />

        {searchQuery && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Search button for mobile */}
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors sm:hidden"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

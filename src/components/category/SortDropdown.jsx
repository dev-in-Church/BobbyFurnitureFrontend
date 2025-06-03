"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SortDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const defaultSortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
  ];

  const sortOptions = options || defaultSortOptions;

  // Get current option label
  const currentOption =
    sortOptions.find((option) => option.value === value) || sortOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          Sort by: <span className="font-medium">{currentOption.label}</span>
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white border rounded-md shadow-lg z-10">
          <ul className="py-1">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    value === option.value
                      ? "bg-gray-50 font-medium text-blue-500"
                      : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;

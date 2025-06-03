"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { fetchPriceRange } from "../../services/api";

const FilterSidebar = ({
  filters,
  onFilterChange,
  showMobile,
  onCloseMobile,
  showClearAll,
  onClearAll,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    features: true,
  });

  // Fetch price range on mount
  useEffect(() => {
    const getPriceRange = async () => {
      try {
        const range = await fetchPriceRange();
        setPriceRange(range);
      } catch (error) {
        console.error("Failed to fetch price range:", error);
      }
    };

    getPriceRange();
  }, []);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Apply filters
  const applyFilters = () => {
    onFilterChange(localFilters);
    if (showMobile) onCloseMobile();
  };

  // Reset filters
  const resetFilters = () => {
    const resetFilters = {
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      featured: null,
      onSale: null,
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (field, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: prev[field] === value ? null : value,
    }));
  };

  // Base classes for the sidebar
  const sidebarClasses = `
    bg-white rounded-lg border border-gray-200 p-4
    ${
      showMobile
        ? "fixed inset-0 z-50 overflow-auto"
        : "hidden lg:block w-64 h-fit sticky top-4"
    }
  `;

  return (
    <div className={sidebarClasses}>
      {/* Mobile Header */}
      {showMobile && (
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h2 className="font-bold text-lg">Filters</h2>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Desktop Header with Clear All */}
      {!showMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Filters</h2>
          {showClearAll && (
            <button
              onClick={onClearAll}
              className="text-sm text-primary hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <Trash2 size={14} />
              Clear All
            </button>
          )}
        </div>
      )}

      <div className="space-y-6">
        {/* Price Range Filter */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full font-semibold mb-3"
            onClick={() => toggleSection("price")}
          >
            <span>Price Range</span>
            {expandedSections.price ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {expandedSections.price && (
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <label className="text-xs text-gray-600 mb-1 block">
                    Min (KSh)
                  </label>
                  <input
                    type="number"
                    value={localFilters.minPrice}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        minPrice: e.target.value,
                      })
                    }
                    placeholder={`${priceRange.min.toLocaleString()}`}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-600 mb-1 block">
                    Max (KSh)
                  </label>
                  <input
                    type="number"
                    value={localFilters.maxPrice}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        maxPrice: e.target.value,
                      })
                    }
                    placeholder={`${priceRange.max.toLocaleString()}`}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Quick price ranges */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setLocalFilters({
                      ...localFilters,
                      minPrice: "",
                      maxPrice: "10000",
                    })
                  }
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  Under KSh 10K
                </button>
                <button
                  onClick={() =>
                    setLocalFilters({
                      ...localFilters,
                      minPrice: "10000",
                      maxPrice: "50000",
                    })
                  }
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  KSh 10K - 50K
                </button>
                <button
                  onClick={() =>
                    setLocalFilters({
                      ...localFilters,
                      minPrice: "50000",
                      maxPrice: "100000",
                    })
                  }
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  KSh 50K - 100K
                </button>
                <button
                  onClick={() =>
                    setLocalFilters({
                      ...localFilters,
                      minPrice: "100000",
                      maxPrice: "",
                    })
                  }
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  Over KSh 100K
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features Filter */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full font-semibold mb-3"
            onClick={() => toggleSection("features")}
          >
            <span>Features</span>
            {expandedSections.features ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {expandedSections.features && (
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={localFilters.featured === true}
                  onChange={() => handleCheckboxChange("featured", true)}
                  className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 text-sm text-gray-700"
                >
                  Featured Products
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="onSale"
                  checked={localFilters.onSale === true}
                  onChange={() => handleCheckboxChange("onSale", true)}
                  className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="onSale" className="ml-2 text-sm text-gray-700">
                  On Sale
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Filter Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={applyFilters}
            className="bg-blue-500 hover:bg-primary text-white py-2 px-4 rounded-md transition-colors font-medium"
          >
            Apply Filters
          </button>

          <button
            onClick={resetFilters}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/category/ProductGrid";
import FilterSidebar from "../components/category/FilterSidebar";
import SortDropdown from "../components/category/SortDropdown";
import Pagination from "../components/category/Pagination";
import MobileFilterButton from "../components/category/MobileFilterButton";
import SearchBar from "../components/products/SearchBar";
import CategoryFilter from "../components/products/CategoryFilter";
import { fetchAllProducts, fetchCategories } from "../services/api";
import { Search } from "lucide-react";

const AllProductsPage = () => {
  // Get query parameters for bookmarking filtered/sorted views
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: Number.parseInt(searchParams.get("page")) || 1,
    limit: Number.parseInt(searchParams.get("limit")) || 20,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    featured: searchParams.get("featured") === "true" ? true : null,
    onSale: searchParams.get("onSale") === "true" ? true : null,
  });
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update URL search params when filters or sort change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    // Add pagination params
    if (pagination.page > 1) {
      newSearchParams.set("page", pagination.page.toString());
    }

    // Add sort param
    if (sort !== "newest") {
      newSearchParams.set("sort", sort);
    }

    // Add filter params
    if (filters.search) newSearchParams.set("search", filters.search);
    if (filters.category) newSearchParams.set("category", filters.category);
    if (filters.minPrice) newSearchParams.set("minPrice", filters.minPrice);
    if (filters.maxPrice) newSearchParams.set("maxPrice", filters.maxPrice);
    if (filters.featured) newSearchParams.set("featured", "true");
    if (filters.onSale) newSearchParams.set("onSale", "true");

    // Update URL without reloading the page
    setSearchParams(newSearchParams);
  }, [pagination.page, sort, filters, setSearchParams]);

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    getCategories();
  }, []);

  // Fetch products when filters, sort, or pagination changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchAllProducts(
          pagination.page,
          pagination.limit,
          sort,
          filters
        );

        setProducts(response.products);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [pagination.page, pagination.limit, sort, filters]);

  // Handle page change
  const handlePageChange = (newPage) => {
    window.scrollTo(0, 0);
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page when filters change
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page when sort changes
  };

  // Handle search
  const handleSearch = (searchQuery) => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      featured: null,
      onSale: null,
    };
    setFilters(clearedFilters);
    setSort("newest");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.featured ||
    filters.onSale;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                All Furniture Products
              </h1>
              <p className="text-gray-600 mt-1">
                {loading ? "Loading..." : `${pagination.total} products found`}
                {hasActiveFilters && " (filtered)"}
              </p>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block">
              <SearchBar
                onSearch={handleSearch}
                initialValue={filters.search}
              />
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="lg:hidden mt-4">
            <SearchBar onSearch={handleSearch} initialValue={filters.search} />
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={filters.category}
              onCategoryChange={handleCategoryFilter}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="container mx-auto px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <MobileFilterButton
            onClick={toggleMobileFilters}
            isOpen={showMobileFilters}
          />

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            showMobile={showMobileFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
            showClearAll={hasActiveFilters}
            onClearAll={clearAllFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls and Results Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Showing {products.length} of {pagination.total} products
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="hidden lg:block text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <SortDropdown value={sort} onChange={handleSortChange} />
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {filters.search && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Search: "{filters.search}"
                        <button
                          onClick={() => handleSearch("")}
                          className="ml-2 text-orange-600 hover:text-orange-800"
                        >
                          ×
                        </button>
                      </span>
                    )}

                    {filters.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Category: {filters.category.replace(/-/g, " ")}
                        <button
                          onClick={() => handleCategoryFilter("")}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    )}

                    {(filters.minPrice || filters.maxPrice) && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Price: KSh {filters.minPrice || "0"} - KSh{" "}
                        {filters.maxPrice || "∞"}
                        <button
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              minPrice: "",
                              maxPrice: "",
                            }))
                          }
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )}

                    {filters.featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Featured only
                        <button
                          onClick={() =>
                            setFilters((prev) => ({ ...prev, featured: null }))
                          }
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    )}

                    {filters.onSale && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        On sale only
                        <button
                          onClick={() =>
                            setFilters((prev) => ({ ...prev, onSale: null }))
                          }
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid products={products} loading={loading} />

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* No Results Message */}
            {!loading && products.length === 0 && !error && (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  {hasActiveFilters
                    ? "Try adjusting your filters or search terms to find what you're looking for."
                    : "We couldn't find any products at the moment."}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;

"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
  const [searchParams, setSearchParams] = useSearchParams();

  // Local UI state
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    featured: searchParams.get("featured") === "true" ? true : null,
    onSale: searchParams.get("onSale") === "true" ? true : null,
  });
  const [pagination, setPagination] = useState({
    page: Number.parseInt(searchParams.get("page")) || 1,
    limit: Number.parseInt(searchParams.get("limit")) || 20,
  });

  // Update URL when filters/pagination change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (pagination.page > 1) newSearchParams.set("page", pagination.page);
    if (sort !== "newest") newSearchParams.set("sort", sort);
    if (filters.search) newSearchParams.set("search", filters.search);
    if (filters.category) newSearchParams.set("category", filters.category);
    if (filters.minPrice) newSearchParams.set("minPrice", filters.minPrice);
    if (filters.maxPrice) newSearchParams.set("maxPrice", filters.maxPrice);
    if (filters.featured) newSearchParams.set("featured", "true");
    if (filters.onSale) newSearchParams.set("onSale", "true");
    setSearchParams(newSearchParams);
  }, [pagination.page, sort, filters, setSearchParams]);

  // 🚀 React Query for Categories
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30, // 30 mins
  });

  // Memoized query key so pagination/filter changes create distinct cache entries
  const productsQueryKey = useMemo(
    () => [
      "products",
      { page: pagination.page, limit: pagination.limit, sort, filters },
    ],
    [pagination.page, pagination.limit, sort, filters]
  );

  // 🚀 React Query for Products
  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: productsQueryKey,
    queryFn: async () =>
      await fetchAllProducts(pagination.page, pagination.limit, sort, filters),
    keepPreviousData: true, // 🔥 Keeps old products visible during refetch
    staleTime: 1000 * 60 * 5, // cache 5 min
  });

  // Extract values
  const products = productsData?.products || [];
  const paginationInfo = productsData?.pagination || {
    total: 0,
    totalPages: 1,
  };

  // UI Handlers
  const handlePageChange = (newPage) => {
    window.scrollTo(0, 0);
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearch = (searchQuery) => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleCategoryFilter = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      featured: null,
      onSale: null,
    });
    setSort("newest");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters((prev) => !prev);
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.featured ||
    filters.onSale;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                All Furniture Products
              </h1>
              <p className="text-gray-600 mt-1">
                {isLoading
                  ? "Loading..."
                  : `${paginationInfo.total} products found`}
                {hasActiveFilters && " (filtered)"}
              </p>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <SearchBar
                onSearch={handleSearch}
                initialValue={filters.search}
              />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden mt-4">
            <SearchBar onSearch={handleSearch} initialValue={filters.search} />
          </div>

          {/* Categories */}
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
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            showMobile={showMobileFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
            showClearAll={hasActiveFilters}
            onClearAll={clearAllFilters}
          />

          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Showing {products.length} of {paginationInfo.total} products
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
            </div>

            {/* Error */}
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
                {error?.message || "Failed to load products"}
              </div>
            )}

            {/* Products */}
            <ProductGrid products={products} loading={isLoading} />

            {/* Pagination */}
            {!isLoading && paginationInfo.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={paginationInfo.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* No Results */}
            {!isLoading && products.length === 0 && !isError && (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  {hasActiveFilters
                    ? "Try adjusting your filters or search terms."
                    : "We couldn’t find any products at the moment."}
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

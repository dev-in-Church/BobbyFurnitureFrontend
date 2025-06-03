"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductGrid from "../components/category/ProductGrid";
import FilterSidebar from "../components/category/FilterSidebar";
import SortDropdown from "../components/category/SortDropdown";
import Pagination from "../components/category/Pagination";
import MobileFilterButton from "../components/category/MobileFilterButton";
import SearchBar from "../components/products/SearchBar";
import CategoryFilter from "../components/products/CategoryFilter";
import { searchProducts, fetchCategories } from "../services/api";
import { Search, ArrowLeft } from "lucide-react";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get search query from URL
  const searchQuery = searchParams.get("q") || "";

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
    search: searchQuery,
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    featured: searchParams.get("featured") === "true" ? true : null,
    onSale: searchParams.get("onSale") === "true" ? true : null,
  });
  const [sort, setSort] = useState(searchParams.get("sort") || "relevance");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update URL search params when filters or sort change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    // Add search query
    if (filters.search) newSearchParams.set("q", filters.search);

    // Add pagination params
    if (pagination.page > 1) {
      newSearchParams.set("page", pagination.page.toString());
    }

    // Add sort param
    if (sort !== "relevance") {
      newSearchParams.set("sort", sort);
    }

    // Add filter params
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

  // Update filters when URL search query changes
  useEffect(() => {
    const urlSearchQuery = searchParams.get("q") || "";
    if (urlSearchQuery !== filters.search) {
      setFilters((prev) => ({ ...prev, search: urlSearchQuery }));
    }
  }, [searchParams]);

  // Fetch products when filters, sort, or pagination changes
  useEffect(() => {
    const fetchProducts = async () => {
      // Don't search if no query is provided
      if (!filters.search.trim()) {
        setProducts([]);
        setPagination((prev) => ({ ...prev, total: 0, totalPages: 0 }));
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await searchProducts(
          filters.search,
          pagination.page,
          pagination.limit,
          sort,
          filters
        );

        setProducts(response.products || []);
        setPagination(
          response.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
        );
      } catch (err) {
        console.error("Error searching products:", err);
        setError("Failed to search products. Please try again later.");
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
      search: filters.search, // Keep the search query
      category: "",
      minPrice: "",
      maxPrice: "",
      featured: null,
      onSale: null,
    };
    setFilters(clearedFilters);
    setSort("relevance");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Check if any filters are active (excluding search)
  const hasActiveFilters =
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.featured ||
    filters.onSale;

  // Get sort options for search results
  const searchSortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            {/* Back button and title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>

              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {filters.search ? `Search Results` : "Product Catalog"}
                </h1>
                {filters.search && (
                  <p className="text-gray-600 mt-1">
                    {loading
                      ? "Searching..."
                      : `${pagination.total} results for "${filters.search}"`}
                    {hasActiveFilters && " (filtered)"}
                  </p>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <SearchBar
                onSearch={handleSearch}
                initialValue={filters.search}
              />
            </div>

            {/* Category Filter Tabs */}
            {filters.search && (
              <div className="mt-4">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={filters.category}
                  onCategoryChange={handleCategoryFilter}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      {filters.search && (
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
      )}

      <div className="container mx-auto px-4 py-6">
        {/* Show search prompt if no search query */}
        {!filters.search.trim() && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Start your search
            </h3>
            <p className="text-gray-500 mb-6">
              Enter a search term above to find products, brands, and
              categories.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleSearch("sofa")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
              >
                Sofa
              </button>
              <button
                onClick={() => handleSearch("dining table")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
              >
                Dining Table
              </button>
              <button
                onClick={() => handleSearch("office chair")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
              >
                Office Chair
              </button>
              <button
                onClick={() => handleSearch("bedroom")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
              >
                Bedroom
              </button>
            </div>
          </div>
        )}

        {/* Search Results */}
        {filters.search.trim() && (
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
                      {loading
                        ? "Searching..."
                        : `Showing ${products.length} of ${pagination.total} results`}
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
                    <SortDropdown
                      value={sort}
                      onChange={handleSortChange}
                      options={searchSortOptions}
                    />
                  </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
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
                              setFilters((prev) => ({
                                ...prev,
                                featured: null,
                              }))
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
              {!loading &&
                products.length === 0 &&
                filters.search.trim() &&
                !error && (
                  <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                    <Search size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      We couldn't find any products matching "{filters.search}"
                      {hasActiveFilters && " with the selected filters"}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {hasActiveFilters && (
                        <button
                          onClick={clearAllFilters}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
                        >
                          Clear filters
                        </button>
                      )}
                      <button
                        onClick={() => handleSearch("")}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-md transition-colors"
                      >
                        Clear search
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;

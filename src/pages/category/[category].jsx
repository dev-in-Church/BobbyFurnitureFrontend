"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/category/ProductGrid";
import FilterSidebar from "../../components/category/FilterSidebar";
import SortDropdown from "../../components/category/SortDropdown";
import Pagination from "../../components/category/Pagination";
import MobileFilterButton from "../../components/category/MobileFilterButton";
import CategoryBreadcrumb from "../../components/category/CategoryBreadcrumb";
import { fetchProductsByCategory } from "../../services/api";

const CategoryPage = () => {
  // Get category from URL params
  const { category } = useParams();

  // Get query parameters (for bookmarking filtered/sorted views)
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: Number.parseInt(searchParams.get("page")) || 1,
    limit: Number.parseInt(searchParams.get("limit")) || 12,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    featured: searchParams.get("featured") === "true" ? true : null,
    onSale: searchParams.get("onSale") === "true" ? true : null,
  });
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  // Format category name for display (e.g., "living-room" -> "Living Room")
  useEffect(() => {
    if (category) {
      const formatted = category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setCategoryName(formatted);
    }
  }, [category]);

  // Update URL search params when filters or sort change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    // Add pagination params
    newSearchParams.set("page", pagination.page.toString());

    // Add sort param
    if (sort !== "newest") {
      newSearchParams.set("sort", sort);
    }

    // Add filter params
    if (filters.minPrice) newSearchParams.set("minPrice", filters.minPrice);
    if (filters.maxPrice) newSearchParams.set("maxPrice", filters.maxPrice);
    if (filters.featured) newSearchParams.set("featured", "true");
    if (filters.onSale) newSearchParams.set("onSale", "true");

    // Update URL without reloading the page
    setSearchParams(newSearchParams);
  }, [pagination.page, sort, filters, setSearchParams]);

  // Fetch products when filters, sort, pagination, or category changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;

      setLoading(true);
      try {
        const response = await fetchProductsByCategory(
          category,
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
  }, [category, pagination.page, pagination.limit, sort, filters]);

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
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <CategoryBreadcrumb category={categoryName} />
          <h1 className="text-2xl font-bold mt-3 text-gray-900">
            {categoryName} Furniture
          </h1>
          <p className="text-gray-600 mt-1">
            {pagination.total} products found
          </p>
        </div>
      </div>

      {/* Mobile Filter Button - Only visible on mobile */}
      <div className="container mx-auto px-4 py-3 lg:hidden">
        <MobileFilterButton
          onClick={toggleMobileFilters}
          isOpen={showMobileFilters}
        />
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            showMobile={showMobileFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {products.length} of {pagination.total} products
              </div>
              <SortDropdown value={sort} onChange={handleSortChange} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

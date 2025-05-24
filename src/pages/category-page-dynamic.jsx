"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import {
  Filter,
  X,
  Star,
  StarHalf,
  Heart,
  ShoppingCart,
  Truck,
  Check,
  Ruler,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { fetchProductsByCategory, fetchCategories } from "../lib/api";

export default function CategoryPageDynamic() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // State variables
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFilters, setSelectedFilters] = useState({
    subcategories: [],
    materials: [],
    brands: [],
    styles: [],
    ratings: [],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  // Fetch category data and products
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get page from URL or default to 1
        const page = Number.parseInt(searchParams.get("page") || "1", 10);
        setCurrentPage(page);

        // Get sort option from URL or default
        const sort = searchParams.get("sort") || "newest";
        setSortOption(sort);

        // Fetch all categories first
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        // Find the current category
        const currentCategory =
          categoriesData.find((cat) => cat.slug === slug) || null;
        setCategory(currentCategory);

        // Fetch products for this category
        const productsData = await fetchProductsByCategory(slug, {
          page,
          limit: 12,
          sort,
          // Add other filters from selectedFilters state
          ...getApiFiltersFromState(),
        });

        setCategoryProducts(productsData.products || []);
        setTotalProducts(
          productsData.totalProducts || productsData.products?.length || 0
        );
        setTotalPages(productsData.totalPages || 1);
      } catch (err) {
        console.error("Error fetching category data:", err);
        setError("Failed to load products. Please try again later.");
        setCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug, searchParams]);

  // Convert selected filters to API parameters
  const getApiFiltersFromState = () => {
    const apiFilters = {};

    if (selectedFilters.subcategories.length > 0) {
      apiFilters.subcategories = selectedFilters.subcategories.join(",");
    }

    if (selectedFilters.materials.length > 0) {
      apiFilters.materials = selectedFilters.materials.join(",");
    }

    if (selectedFilters.brands.length > 0) {
      apiFilters.brands = selectedFilters.brands.join(",");
    }

    if (selectedFilters.styles.length > 0) {
      apiFilters.styles = selectedFilters.styles.join(",");
    }

    if (selectedFilters.ratings.length > 0) {
      apiFilters.minRating = Math.min(...selectedFilters.ratings);
    }

    if (priceRange[0] > 0 || priceRange[1] < 2000) {
      apiFilters.minPrice = priceRange[0];
      apiFilters.maxPrice = priceRange[1];
    }

    return apiFilters;
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (updated[filterType].includes(value)) {
        updated[filterType] = updated[filterType].filter(
          (item) => item !== value
        );
      } else {
        updated[filterType] = [...updated[filterType], value];
      }
      return updated;
    });
  };

  // Apply filters
  const applyFilters = () => {
    // Update URL with filters and reset to page 1
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");

    // Add filters to URL
    Object.entries(getApiFiltersFromState()).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      subcategories: [],
      materials: [],
      brands: [],
      styles: [],
      ratings: [],
    });
    setPriceRange([0, 2000]);

    // Remove filter params from URL, keep only page and sort
    const newParams = new URLSearchParams();
    newParams.set("page", searchParams.get("page") || "1");
    newParams.set("sort", searchParams.get("sort") || "newest");
    setSearchParams(newParams);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);

    // Scroll to top
    window.scrollTo(0, 0);
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortOption(value);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
  };

  if (loading && !categoryProducts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error && !categoryProducts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Products
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{category?.name || slug}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Category Banner */}
      <div className="container mx-auto px-4 mb-6">
        <div className="relative rounded-lg overflow-hidden h-40 md:h-60">
          <img
            src={category?.banner || "/placeholder.svg?height=400&width=1200"}
            alt={category?.name || slug}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
              {category?.name || slug}
            </h1>
            <p className="text-white/90 text-sm md:text-base max-w-2xl">
              {category?.description || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Toggle Button */}
          <div className="md:hidden">
            <Button
              onClick={() => setShowMobileFilters(true)}
              variant="outline"
              className="w-full mb-4 flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters & Sort
            </Button>
          </div>

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="font-semibold text-lg flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    Filters
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4 overflow-y-auto h-full pb-20">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 text-xs"
                      onClick={clearFilters}
                    >
                      Clear All
                    </Button>
                  </div>

                  <Accordion
                    type="multiple"
                    defaultValue={["subcategory", "material", "price"]}
                  >
                    {/* Subcategory Filter */}
                    <AccordionItem value="subcategory">
                      <AccordionTrigger className="py-2">
                        Furniture Type
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {category?.subcategories?.map((subcat) => (
                            <div
                              key={subcat.id || subcat}
                              className="flex items-center"
                            >
                              <Checkbox
                                id={`mobile-subcat-${subcat.id || subcat}`}
                                className="mr-2"
                                checked={selectedFilters.subcategories.includes(
                                  subcat.id || subcat
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange(
                                    "subcategories",
                                    subcat.id || subcat
                                  )
                                }
                              />
                              <label
                                htmlFor={`mobile-subcat-${subcat.id || subcat}`}
                                className="text-sm cursor-pointer"
                              >
                                {subcat.name || subcat}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Material Filter */}
                    <AccordionItem value="material">
                      <AccordionTrigger className="py-2">
                        Material
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {category?.materials?.map((material) => (
                            <div
                              key={material.id || material}
                              className="flex items-center"
                            >
                              <Checkbox
                                id={`mobile-material-${
                                  material.id || material
                                }`}
                                className="mr-2"
                                checked={selectedFilters.materials.includes(
                                  material.id || material
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange(
                                    "materials",
                                    material.id || material
                                  )
                                }
                              />
                              <label
                                htmlFor={`mobile-material-${
                                  material.id || material
                                }`}
                                className="text-sm cursor-pointer"
                              >
                                {material.name || material}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Price Range Filter */}
                    <AccordionItem value="price">
                      <AccordionTrigger className="py-2">
                        Price Range
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-2 pt-4 pb-2">
                          <Slider
                            value={priceRange}
                            min={0}
                            max={2000}
                            step={50}
                            onValueChange={setPriceRange}
                          />
                          <div className="flex justify-between mt-2">
                            <div className="text-sm">
                              KSh {priceRange[0].toLocaleString()}
                            </div>
                            <div className="text-sm">
                              KSh {priceRange[1].toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Other filters... */}
                  </Accordion>
                </div>

                {/* Apply Filters Button - Fixed at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      applyFilters();
                      setShowMobileFilters(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-full md:w-72 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-500 text-xs"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>

              <Accordion
                type="multiple"
                defaultValue={["subcategory", "material", "price"]}
              >
                {/* Subcategory Filter */}
                <AccordionItem value="subcategory">
                  <AccordionTrigger className="py-2">
                    Furniture Type
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {category?.subcategories?.map((subcat) => (
                        <div
                          key={subcat.id || subcat}
                          className="flex items-center"
                        >
                          <Checkbox
                            id={`subcat-${subcat.id || subcat}`}
                            className="mr-2"
                            checked={selectedFilters.subcategories.includes(
                              subcat.id || subcat
                            )}
                            onCheckedChange={() =>
                              handleFilterChange(
                                "subcategories",
                                subcat.id || subcat
                              )
                            }
                          />
                          <label
                            htmlFor={`subcat-${subcat.id || subcat}`}
                            className="text-sm cursor-pointer"
                          >
                            {subcat.name || subcat}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Material Filter */}
                <AccordionItem value="material">
                  <AccordionTrigger className="py-2">Material</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {category?.materials?.map((material) => (
                        <div
                          key={material.id || material}
                          className="flex items-center"
                        >
                          <Checkbox
                            id={`material-${material.id || material}`}
                            className="mr-2"
                            checked={selectedFilters.materials.includes(
                              material.id || material
                            )}
                            onCheckedChange={() =>
                              handleFilterChange(
                                "materials",
                                material.id || material
                              )
                            }
                          />
                          <label
                            htmlFor={`material-${material.id || material}`}
                            className="text-sm cursor-pointer"
                          >
                            {material.name || material}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Range Filter */}
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-2 pt-4 pb-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={2000}
                        step={50}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2">
                        <div className="text-sm">
                          KSh {priceRange[0].toLocaleString()}
                        </div>
                        <div className="text-sm">
                          KSh {priceRange[1].toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Other filters... */}
              </Accordion>

              {/* Apply Filters Button */}
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Product Count and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">
                <span className="font-medium">{totalProducts}</span> furniture
                items found
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading indicator for subsequent data fetches */}
            {loading && categoryProducts.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500 mr-2" />
                  <span className="text-gray-600">Updating results...</span>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Badge */}
                  {product.badge && (
                    <div className="relative">
                      <Badge
                        className={`absolute top-2 left-2 z-10 ${
                          product.badge === "SALE"
                            ? "bg-red-500"
                            : product.badge === "NEW"
                            ? "bg-green-500"
                            : product.badge === "BESTSELLER"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        } text-white font-bold`}
                      >
                        {product.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Product Image */}
                  <Link to={`/product/${product.id}`}>
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img
                        src={
                          product.images?.[0] ||
                          "/placeholder.svg?height=300&width=300"
                        }
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform group-hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "/placeholder.svg?height=300&width=300";
                        }}
                      />
                      <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm">
                        <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
                      </button>

                      {product.store && (
                        <Badge className="absolute bottom-2 left-2 bg-teal-600">
                          Official Store
                        </Badge>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm font-medium line-clamp-2 mb-1 h-10 hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center mb-1">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) =>
                            i < Math.floor(product.rating || 4) ? (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ) : i < Math.ceil(product.rating || 4) &&
                              (product.rating || 4) % 1 !== 0 ? (
                              <StarHalf
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ) : (
                              <Star key={i} className="h-4 w-4 text-gray-300" />
                            )
                          )}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews || "0"})
                      </span>
                    </div>

                    {/* Furniture-specific details */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 my-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Ruler className="h-3 w-3 mr-1" />
                        <span>{product.dimensions}</span>
                      </div>
                      {product.material && (
                        <div className="flex items-center">
                          <span>{product.material}</span>
                        </div>
                      )}
                      {product.color && (
                        <div className="flex items-center">
                          <span>{product.color}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col mt-2">
                      <span className="font-bold text-lg">
                        KSh {(product.price || 0).toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through text-sm">
                            KSh {product.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-green-600 text-sm">
                            {Math.round(
                              (1 - product.price / product.originalPrice) * 100
                            )}
                            % OFF
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Delivery and Assembly Info */}
                    <div className="mt-2 space-y-1">
                      {product.freeDelivery && (
                        <div className="flex items-center text-xs text-green-600">
                          <Truck className="h-3 w-3 mr-1" />
                          <span>Free Delivery</span>
                        </div>
                      )}
                      {product.assemblyRequired !== undefined && (
                        <div className="flex items-center text-xs text-gray-600">
                          <Check className="h-3 w-3 mr-1" />
                          <span>
                            {product.assemblyRequired
                              ? "Assembly Required"
                              : "No Assembly Required"}
                          </span>
                        </div>
                      )}
                      {product.express && (
                        <div className="mt-1">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-600 border-blue-200 text-xs px-1"
                          >
                            EXPRESS DELIVERY
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {!loading && categoryProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No furniture items found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or browse other categories
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current page
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if there are gaps
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <React.Fragment key={`ellipsis-${page}`}>
                            <span className="px-2 text-gray-500">...</span>
                            <Button
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              size="sm"
                              className={
                                currentPage === page
                                  ? "bg-blue-600 text-white hover:bg-blue-700"
                                  : ""
                              }
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          </React.Fragment>
                        );
                      }

                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className={
                            currentPage === page
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : ""
                          }
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

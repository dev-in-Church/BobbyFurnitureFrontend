"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import {
  Search,
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
  ArrowUpDown,
  SlidersHorizontal,
  Grid2X2,
  LayoutList,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../components/ui/sheet";
import { searchProducts, fetchCategories } from "../lib/api";

export default function SearchResultsDynamic() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // UI states
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortOption, setSortOption] = useState("relevance");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    materials: [],
    colors: [],
    brands: [],
    features: [],
  });

  // Filter options (will be fetched from API)
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    materials: [],
    colors: [],
    brands: [],
    features: [
      { id: "free-delivery", label: "Free Delivery" },
      { id: "express-delivery", label: "Express Delivery" },
      { id: "assembly-not-required", label: "No Assembly Required" },
      { id: "in-stock", label: "In Stock" },
      { id: "on-sale", label: "On Sale" },
    ],
  });

  // Related searches
  const [relatedSearches, setRelatedSearches] = useState([]);

  // Parse search query from URL and fetch results
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);

    // Get page from URL or default to 1
    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);

    // Get sort option from URL or default
    const sort = searchParams.get("sort") || "relevance";
    setSortOption(sort);

    if (query) {
      fetchSearchResults(query, page, sort);
    } else {
      setSearchResults([]);
      setLoading(false);
    }

    // Fetch filter options
    fetchFilterOptions();
  }, [location.search]);

  // Fetch search results
  const fetchSearchResults = async (query, page, sort) => {
    setLoading(true);
    setError(null);

    try {
      // Get filter parameters from active filters
      const filterParams = getApiFiltersFromState();

      // Fetch search results
      const data = await searchProducts(query, {
        page,
        limit: 12,
        sort,
        ...filterParams,
      });

      setSearchResults(data.products || []);
      setTotalResults(data.totalProducts || data.products?.length || 0);
      setTotalPages(data.totalPages || 1);

      // Set related searches if available
      if (data.relatedSearches) {
        setRelatedSearches(data.relatedSearches);
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to load search results. Please try again later.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      // Fetch categories
      const categories = await fetchCategories();

      // For other filter options, you would fetch from API
      // For now, we'll use mock data
      setFilterOptions({
        ...filterOptions,
        categories: categories.map((cat) => ({
          id: cat.slug,
          label: cat.name,
        })),
        materials: [
          { id: "wood", label: "Wood" },
          { id: "fabric", label: "Fabric" },
          { id: "leather", label: "Leather" },
          { id: "metal", label: "Metal" },
          { id: "glass", label: "Glass" },
          { id: "marble", label: "Marble" },
          { id: "wicker", label: "Wicker" },
          { id: "velvet", label: "Velvet" },
        ],
        colors: [
          { id: "black", label: "Black" },
          { id: "white", label: "White" },
          { id: "gray", label: "Gray" },
          { id: "brown", label: "Brown" },
          { id: "blue", label: "Blue" },
          { id: "green", label: "Green" },
          { id: "red", label: "Red" },
          { id: "natural", label: "Natural" },
        ],
        brands: [
          { id: "ashley-furniture", label: "Ashley Furniture" },
          { id: "ikea", label: "IKEA" },
          { id: "pottery-barn", label: "Pottery Barn" },
          { id: "west-elm", label: "West Elm" },
          { id: "wayfair", label: "Wayfair" },
          { id: "article", label: "Article" },
          { id: "herman-miller", label: "Herman Miller" },
          { id: "casper", label: "Casper" },
        ],
      });
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  };

  // Convert selected filters to API parameters
  const getApiFiltersFromState = () => {
    const apiFilters = {};

    if (activeFilters.categories.length > 0) {
      apiFilters.categories = activeFilters.categories.join(",");
    }

    if (activeFilters.materials.length > 0) {
      apiFilters.materials = activeFilters.materials.join(",");
    }

    if (activeFilters.colors.length > 0) {
      apiFilters.colors = activeFilters.colors.join(",");
    }

    if (activeFilters.brands.length > 0) {
      apiFilters.brands = activeFilters.brands.join(",");
    }

    if (activeFilters.features.length > 0) {
      activeFilters.features.forEach((feature) => {
        switch (feature) {
          case "free-delivery":
            apiFilters.freeDelivery = true;
            break;
          case "express-delivery":
            apiFilters.expressDelivery = true;
            break;
          case "assembly-not-required":
            apiFilters.assemblyRequired = false;
            break;
          case "in-stock":
            apiFilters.inStock = true;
            break;
          case "on-sale":
            apiFilters.onSale = true;
            break;
        }
      });
    }

    if (priceRange[0] > 0 || priceRange[1] < 2000) {
      apiFilters.minPrice = priceRange[0];
      apiFilters.maxPrice = priceRange[1];
    }

    return apiFilters;
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
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
    newParams.set("sort", sortOption);

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
    setActiveFilters({
      categories: [],
      materials: [],
      colors: [],
      brands: [],
      features: [],
    });
    setPriceRange([0, 2000]);

    // Remove filter params from URL, keep only q, page and sort
    const newParams = new URLSearchParams();
    newParams.set("q", searchParams.get("q") || "");
    newParams.set("page", "1");
    newParams.set("sort", searchParams.get("sort") || "relevance");
    setSearchParams(newParams);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    const newParams = new URLSearchParams();
    newParams.set("q", searchQuery);
    newParams.set("page", "1");
    newParams.set("sort", sortOption);
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

  // Count total active filters
  const totalActiveFilters =
    activeFilters.categories.length +
    activeFilters.materials.length +
    activeFilters.colors.length +
    activeFilters.brands.length +
    activeFilters.features.length +
    (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Search Header */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search furniture..."
                className="h-12 w-full rounded-md border-0 pl-10 pr-4 bg-white text-gray-900 focus-visible:ring-2 focus-visible:ring-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 bg-blue-700 hover:bg-blue-800"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-6">
        {/* Search Results Summary */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {loading && !searchResults.length ? (
              <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            ) : (
              <>
                Search results for "{searchParams.get("q")}"
                <span className="text-gray-500 font-normal text-lg ml-2">
                  ({totalResults} {totalResults === 1 ? "result" : "results"})
                </span>
              </>
            )}
          </h1>

          {/* Related Searches */}
          {!loading &&
            searchResults.length > 0 &&
            relatedSearches.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-gray-600">Related searches:</span>
                {relatedSearches.slice(0, 5).map((term, i) => (
                  <Link
                    key={i}
                    to={`/search?q=${encodeURIComponent(term)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            )}
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4">
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {totalActiveFilters > 0 && (
                    <Badge className="ml-2 bg-blue-600 text-white">
                      {totalActiveFilters}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[85vw] sm:w-[400px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Accordion
                    type="multiple"
                    defaultValue={["category", "price", "features"]}
                  >
                    {/* Category Filter */}
                    <AccordionItem value="category">
                      <AccordionTrigger className="py-2">
                        Category
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {filterOptions.categories.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center"
                            >
                              <Checkbox
                                id={`mobile-category-${category.id}`}
                                className="mr-2"
                                checked={activeFilters.categories.includes(
                                  category.id
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange("categories", category.id)
                                }
                              />
                              <label
                                htmlFor={`mobile-category-${category.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {category.label}
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

                    {/* Other mobile filters... */}
                  </Accordion>
                </div>
                <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={clearFilters}
                      disabled={totalActiveFilters === 0}
                    >
                      Clear All
                    </Button>
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        applyFilters();
                        setShowMobileFilters(false);
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="flex-1">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <span>Sort</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="w-10 p-0 flex items-center justify-center"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? (
                <LayoutList className="h-4 w-4" />
              ) : (
                <Grid2X2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-full md:w-72 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                {totalActiveFilters > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 text-xs"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <Accordion
                type="multiple"
                defaultValue={["category", "price", "features"]}
              >
                {/* Category Filter */}
                <AccordionItem value="category">
                  <AccordionTrigger className="py-2">Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {filterOptions.categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox
                            id={`category-${category.id}`}
                            className="mr-2"
                            checked={activeFilters.categories.includes(
                              category.id
                            )}
                            onCheckedChange={() =>
                              handleFilterChange("categories", category.id)
                            }
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {category.label}
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

                {/* Other desktop filters... */}
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
            {/* Desktop Sort and View Options */}
            <div className="hidden md:flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">View:</span>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {totalActiveFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.categories.map((categoryId) => {
                  const category = filterOptions.categories.find(
                    (c) => c.id === categoryId
                  );
                  return (
                    <Badge
                      key={`cat-${categoryId}`}
                      variant="secondary"
                      className="px-2 py-1"
                    >
                      {category?.label || categoryId}
                      <button
                        onClick={() =>
                          handleFilterChange("categories", categoryId)
                        }
                        className="ml-1 hover:text-red-500"
                        aria-label={`Remove ${
                          category?.label || categoryId
                        } filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}

                {/* Other active filters... */}

                {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                  <Badge variant="secondary" className="px-2 py-1">
                    KSh {priceRange[0].toLocaleString()} - KSh{" "}
                    {priceRange[1].toLocaleString()}
                    <button
                      onClick={() => setPriceRange([0, 2000])}
                      className="ml-1 hover:text-red-500"
                      aria-label="Reset price range"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={clearFilters}
                  aria-label="Clear all filters"
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Searching for products...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && searchResults.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No results found
                </h3>
                <p className="text-gray-500 mb-4">
                  We couldn't find any furniture matching "
                  {searchParams.get("q")}"
                  {totalActiveFilters > 0 ? " with your filters" : ""}
                </p>
                {totalActiveFilters > 0 ? (
                  <Button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-700">Try:</p>
                    <ul className="list-disc text-left max-w-md mx-auto space-y-1 text-gray-600">
                      <li>Checking your spelling</li>
                      <li>Using more general keywords</li>
                      <li>Searching for a related product category</li>
                    </ul>
                    <div className="pt-4">
                      <h4 className="font-medium mb-2">Popular searches:</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {relatedSearches.map((term, i) => (
                          <Link
                            key={i}
                            to={`/search?q=${encodeURIComponent(term)}`}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {term}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Products Grid */}
            {!loading && searchResults.length > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Product Image */}
                    <div
                      className={`relative bg-gray-100 ${
                        viewMode === "list"
                          ? "w-32 h-32 sm:w-48 sm:h-48"
                          : "h-56"
                      }`}
                    >
                      <Link to={`/product/${product.id}`}>
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
                      </Link>

                      {/* Badges */}
                      {product.badge && (
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
                      )}

                      <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm">
                        <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h3
                          className={`font-medium text-gray-900 hover:text-blue-600 transition-colors ${
                            viewMode === "list"
                              ? ""
                              : "text-sm line-clamp-2 mb-1 h-10"
                          }`}
                        >
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
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-gray-300"
                                />
                              )
                            )}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.reviews || "0"})
                        </span>
                      </div>

                      {/* Furniture-specific details */}
                      {viewMode === "list" && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 my-2 text-sm text-gray-600">
                          {product.dimensions && (
                            <div className="flex items-center">
                              <Ruler className="h-4 w-4 mr-1" />
                              <span>{product.dimensions}</span>
                            </div>
                          )}
                          {product.material && (
                            <div className="flex items-center">
                              <span className="font-medium mr-1">
                                Material:
                              </span>
                              <span>{product.material}</span>
                            </div>
                          )}
                          {product.color && (
                            <div className="flex items-center">
                              <span className="font-medium mr-1">Color:</span>
                              <span>{product.color}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col mt-2">
                        <span className="font-bold text-lg text-blue-600">
                          KSh {(product.price || 0).toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 line-through text-sm">
                              KSh {product.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-green-600 text-sm">
                              {Math.round(
                                (1 - product.price / product.originalPrice) *
                                  100
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
                      </div>

                      {/* Add to Cart Button */}
                      <div
                        className={`mt-3 ${
                          viewMode === "list"
                            ? ""
                            : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300 md:block hidden`}
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && searchResults.length > 0 && totalPages > 1 && (
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
      </div>
    </div>
  );
}

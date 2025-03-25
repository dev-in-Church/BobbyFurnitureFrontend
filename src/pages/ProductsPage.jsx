"use client";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Loading } from "../components/LoadingReturnTop";
import {
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaUndo,
  FaStar,
  FaPercent,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaRegStar,
  FaAngleRight,
  FaHome,
  FaTag,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    rating: true,
    availability: true,
  });

  // Search, filter, and sorting states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [categoryProducts, setCategoryProducts] = useState({});
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bobbyfurnitureonline.onrender.com/api/products"
        );
        const data = response.data;
        setProducts(data);
        setFilteredProducts(data);

        // Find max price for range slider
        const highestPrice = Math.max(...data.map((product) => product.price));
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);

        // Organize products by category
        const productsByCategory = data.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});
        setCategoryProducts(productsByCategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    // Apply category filter
    if (categoryFilter && categoryFilter !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply search query
    if (searchQuery) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply rating filter
    if (ratingFilter > 0) {
      updatedProducts = updatedProducts.filter(
        (product) => (product.rating || 0) >= ratingFilter
      );
    }

    // Apply availability filter
    if (availabilityFilter === "inStock") {
      updatedProducts = updatedProducts.filter((product) => product.stock > 0);
    } else if (availabilityFilter === "outOfStock") {
      updatedProducts = updatedProducts.filter(
        (product) => product.stock === 0
      );
    }

    // Apply featured filter
    if (featuredOnly) {
      updatedProducts = updatedProducts.filter((product) => product.featured);
    }

    // Apply sorting
    if (sortOption === "price_low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      updatedProducts.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );
    } else if (sortOption === "rating") {
      updatedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === "popularity") {
      updatedProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    setFilteredProducts(updatedProducts);

    // Count active filters
    let count = 0;
    if (categoryFilter && categoryFilter !== "all") count++;
    if (searchQuery) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    if (ratingFilter > 0) count++;
    if (availabilityFilter !== "all") count++;
    if (featuredOnly) count++;
    setActiveFiltersCount(count);

    // Generate search suggestions
    if (searchQuery.length > 1) {
      const suggestions = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
        .map((product) => product.name);
      setSearchSuggestions([...new Set(suggestions)]);
    } else {
      setSearchSuggestions([]);
    }
  }, [
    searchQuery,
    categoryFilter,
    sortOption,
    products,
    priceRange,
    ratingFilter,
    availabilityFilter,
    featuredOnly,
    maxPrice,
  ]);

  if (loading) return <Loading />;

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Generate mock ratings for products that don't have them
  const getProductRating = (product) => {
    return product.rating || Math.floor(Math.random() * 5) + 1;
  };

  // Add to Cart with Undo Feature
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);

    let toastId;
    const undoTimeout = setTimeout(() => {
      toast.dismiss(toastId);
    }, 5000);

    toastId = toast.success(
      <div>
        <p>
          <b>"{product.name}"</b> added to cart!
        </p>
        <button
          className="text-slate-700 font-bold ml-2 focus:outline-none hover:text-slate-900 transition-colors"
          onClick={() => {
            removeFromCart(product.id);
            toast.dismiss(toastId);
            clearTimeout(undoTimeout);
            toast.info(`"${product.name}" removed from cart.`);
          }}
        >
          <span className="flex items-center space-x-1">
            <FaUndo className="mr-1" />
            <span>Undo</span>
          </span>
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section],
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setSortOption("");
    setPriceRange([0, maxPrice]);
    setRatingFilter(0);
    setAvailabilityFilter("all");
    setFeaturedOnly(false);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setCategoryFilter("");
    } else {
      setCategoryFilter(category);
    }
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-gray-300" />
            )}
          </span>
        ))}
      </div>
    );
  };

  const renderProductCard = (product) => {
    const rating = getProductRating(product);

    return (
      <div
        key={product.id}
        className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex ${
          viewMode === "grid" ? "flex-col h-full" : "flex-row h-48"
        }`}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {/* Discount Badge */}
        <div
          className={`relative ${
            viewMode === "grid" ? "w-full" : "w-48 h-full"
          }`}
        >
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
            <FaPercent className="mr-1 text-xs" />
            10% OFF
          </div>

          {/* Product Image */}
          <div
            className={`overflow-hidden bg-gray-100 ${
              viewMode === "grid" ? "w-full h-64" : "w-full h-full"
            }`}
          >
            <img
              src={product.images?.[0] || "https://via.placeholder.com/200"}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Product Details */}
        <div
          className={`p-5 flex flex-col flex-grow ${
            viewMode === "list" ? "w-2/3" : ""
          }`}
        >
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {product.category}
            </span>
            {product.featured && (
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full ml-2">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className={`text-lg font-semibold text-gray-800 mb-1 ${
              viewMode === "grid" ? "line-clamp-2" : ""
            }`}
          >
            {product.name}
          </h2>

          {/* Description */}
          <p
            className={`text-gray-500 text-sm mb-3 ${
              viewMode === "grid" ? "line-clamp-2" : "line-clamp-3"
            } flex-grow`}
          >
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            {renderStarRating(rating)}
            <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 line-through text-sm">
                Ksh. {(product.price * 1.1).toLocaleString()}
              </p>
              <p className="text-gray-900 font-bold text-xl">
                Ksh. {product.price.toLocaleString()}
              </p>
            </div>

            {viewMode === "list" && (
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="py-2 px-4 rounded-lg text-white font-medium transition-all flex items-center justify-center bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            )}
          </div>

          {/* Add to Cart Button - Only for Grid View */}
          {viewMode === "grid" && (
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all flex items-center justify-center bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <FaHome className="mr-1" />
            <span>Home</span>
            <FaAngleRight className="mx-2" />
            <span className="font-medium text-gray-900">Products</span>
            {categoryFilter && (
              <>
                <FaAngleRight className="mx-2" />
                <span className="font-medium text-gray-900">
                  {categoryFilter}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
        <p className="text-gray-600">
          Discover our quality furniture collection
        </p>
      </div>

      {/* Search Bar - Sticky at Top */}
      <div className="sticky top-0 bg-white shadow-md border-b border-gray-200 z-20 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-grow" ref={searchRef}>
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 1);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 1)}
                className="p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-30">
                  <ul>
                    {searchSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                      >
                        <FaSearch className="text-gray-400 mr-2 text-sm" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={toggleFilters}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg flex items-center hover:bg-gray-50 transition-colors relative"
            >
              <FaFilter className="mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`md:w-64 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-20">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-lg">Filters</h2>
                <div className="flex items-center">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reset All
                  </button>
                  <button
                    className="md:hidden ml-4 text-gray-500"
                    onClick={toggleFilters}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium mb-3">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className={`flex items-center w-full text-left px-2 py-1 rounded-md ${
                          activeCategory === category
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {activeCategory === category && (
                          <FaCheck className="mr-2 text-blue-600 text-xs" />
                        )}
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="p-4 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-medium mb-3"
                  onClick={() => toggleFilterSection("price")}
                >
                  <span>Price Range</span>
                  {expandedFilters.price ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {expandedFilters.price && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Ksh. {priceRange[0].toLocaleString()}</span>
                      <span>Ksh. {priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          Number.parseInt(e.target.value),
                          priceRange[1],
                        ])
                      }
                      className="w-full mb-2"
                    />
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Number.parseInt(e.target.value),
                        ])
                      }
                      className="w-full"
                    />
                    <div className="flex gap-2 mt-3">
                      <input
                        type="number"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            Number.parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                      <input
                        type="number"
                        min={priceRange[0]}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Number.parseInt(e.target.value),
                          ])
                        }
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div className="p-4 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-medium mb-3"
                  onClick={() => toggleFilterSection("rating")}
                >
                  <span>Rating</span>
                  {expandedFilters.rating ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {expandedFilters.rating && (
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className={`flex items-center w-full text-left px-2 py-1 rounded-md ${
                          ratingFilter === rating
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() =>
                          setRatingFilter(ratingFilter === rating ? 0 : rating)
                        }
                      >
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < rating ? (
                                <FaStar className="text-yellow-400" />
                              ) : (
                                <FaRegStar className="text-gray-300" />
                              )}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm">
                          {rating === 1 ? "& Up" : `& Up`}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="p-4 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-medium mb-3"
                  onClick={() => toggleFilterSection("availability")}
                >
                  <span>Availability</span>
                  {expandedFilters.availability ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>

                {expandedFilters.availability && (
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        checked={availabilityFilter === "all"}
                        onChange={() => setAvailabilityFilter("all")}
                        className="mr-2"
                      />
                      <span>All</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        checked={availabilityFilter === "inStock"}
                        onChange={() => setAvailabilityFilter("inStock")}
                        className="mr-2"
                      />
                      <span>In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        checked={availabilityFilter === "outOfStock"}
                        onChange={() => setAvailabilityFilter("outOfStock")}
                        className="mr-2"
                      />
                      <span>Out of Stock</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Featured Products */}
              <div className="p-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={() => setFeaturedOnly(!featuredOnly)}
                    className="mr-2"
                  />
                  <span>Featured Products Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {products.length}
                </span>{" "}
                products
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>

            {/* Category Sections */}
            {activeCategory === "All" &&
            !searchQuery &&
            !ratingFilter &&
            availabilityFilter === "all" &&
            !featuredOnly &&
            priceRange[0] === 0 &&
            priceRange[1] === maxPrice ? (
              // Show products by category sections when no filters are applied
              Object.entries(categoryProducts).map(([category, products]) => (
                <div key={category} className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                      <FaTag className="mr-2 text-blue-600" />
                      {category}
                    </h2>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>

                  <div
                    className={`grid ${
                      viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1"
                    } gap-6`}
                  >
                    {products
                      .slice(0, 3)
                      .map((product) => renderProductCard(product))}
                  </div>
                </div>
              ))
            ) : (
              // Show filtered products
              <>
                {filteredProducts.length > 0 ? (
                  <div
                    className={`grid ${
                      viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1"
                    } gap-6`}
                  >
                    {filteredProducts.map((product) =>
                      renderProductCard(product)
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <div className="flex flex-col items-center justify-center py-12">
                      <svg
                        className="w-16 h-16 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No products found
                      </h3>
                      <p className="text-gray-500 max-w-md mb-6">
                        We couldn't find any products matching your search
                        criteria. Try adjusting your filters or search terms.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-2 rounded-md bg-blue-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    8
                  </button>
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

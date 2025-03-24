"use client";

// import Link from "next/link";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Loading } from "../components/LoadingReturnTop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  FaRegStar,
  FaAngleRight,
  FaHome,
  FaSort,
  FaList,
  FaThLarge,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useCart();

  // State variables
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    rating: true,
  });
  const [viewMode, setViewMode] = useState("grid");
  const [wishlist, setWishlist] = useState([]);

  // Category mapping
  const categoryMap = {
    "living-room": {
      name: "Living Room",
      description:
        "Transform your living space with our stylish and comfortable living room furniture. From elegant sofas to coffee tables, find everything you need to create the perfect gathering place for family and friends.",
      image: "/images/living-room.png",
      filterValue: "Living Room",
    },
    bedroom: {
      name: "Bedroom",
      description:
        "Create your dream bedroom with our collection of beds, dressers, nightstands, and more. Our bedroom furniture combines style, comfort, and functionality for a peaceful retreat.",
      image: "/images/bedroom.png",
      filterValue: "Bedroom",
    },
    dining: {
      name: "Dining",
      description:
        "Elevate your dining experience with our beautiful dining tables, chairs, and storage solutions. Perfect for family meals or entertaining guests in style.",
      image: "/images/dining.png",
      filterValue: "Dining",
    },
    office: {
      name: "Office",
      description:
        "Create a productive workspace with our ergonomic and stylish office furniture. From desks and chairs to storage solutions, we have everything you need for your home office.",
      image: "/images/office.png",
      filterValue: "Office",
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Set category information
        const category = categoryMap[categorySlug];
        if (!category) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        setCategoryName(category.name);
        setCategoryDescription(category.description);
        setCategoryImage(category.image);

        // Fetch products
        const response = await axios.get(
          "https://bobbyfurnitureonline.onrender.com/api/products"
        );

        // Filter products by category
        const categoryProducts = response.data.filter(
          (product) =>
            product.category.toLowerCase() ===
            category.filterValue.toLowerCase()
        );

        if (categoryProducts.length === 0) {
          // If no exact match, try partial match
          const partialMatchProducts = response.data.filter((product) =>
            product.category.toLowerCase().includes(categorySlug.toLowerCase())
          );

          if (partialMatchProducts.length > 0) {
            setProducts(partialMatchProducts);
            setFilteredProducts(partialMatchProducts);
          } else {
            // If still no match, just use all products for demo
            setProducts(response.data);
            setFilteredProducts(response.data);
          }
        } else {
          setProducts(categoryProducts);
          setFilteredProducts(categoryProducts);
        }

        // Find max price for range slider
        const highestPrice = Math.max(
          ...response.data.map((product) => product.price)
        );
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);

        // Load wishlist from localStorage
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        toast.error("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Reset scroll position
    window.scrollTo(0, 0);
  }, [categorySlug]);

  useEffect(() => {
    let updatedProducts = [...products];

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
  }, [searchQuery, sortOption, products, priceRange, ratingFilter]);

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
    setSortOption("");
    setPriceRange([0, maxPrice]);
    setRatingFilter(0);
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

  const toggleWishlist = (e, productId) => {
    e.stopPropagation();

    let newWishlist;
    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter((id) => id !== productId);
      toast.info("Removed from wishlist");
    } else {
      newWishlist = [...wishlist, productId];
      toast.success("Added to wishlist");
    }

    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
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
    const rating = product.rating || Math.floor(Math.random() * 5) + 1;
    const isWishlisted = wishlist.includes(product.id);

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

          {/* Wishlist Button */}
          <button
            onClick={(e) => toggleWishlist(e, product.id)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10 transition-colors hover:bg-gray-100"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </button>

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

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Browse All Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {/* Category Hero Banner */}
      <div className="relative">
        <div className="h-64 md:h-80 w-full overflow-hidden">
          <img
            src={categoryImage || "/placeholder.svg"}
            alt={categoryName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-6 md:px-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {categoryName}
            </h1>
            <p className="text-white text-sm md:text-base max-w-2xl">
              {categoryDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <FaHome className="mr-1" />
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <FaAngleRight className="mx-2" />
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
            <FaAngleRight className="mx-2" />
            <span className="font-medium text-gray-900">{categoryName}</span>
          </div>
        </div>
      </div>

      {/* Search Bar - Sticky at Top */}
      <div className="sticky top-16 bg-white shadow-md border-b border-gray-200 z-20 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${categoryName} products...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <button
              onClick={toggleFilters}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg flex items-center hover:bg-gray-50 transition-colors relative"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <FaThLarge className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <FaList className="h-5 w-5" />
              </button>
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sort by: Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`md:w-64 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-36">
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

              <div className="hidden md:block">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                  <FaSort className="text-gray-400 mr-2" />
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
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {filteredProducts.map((product) => renderProductCard(product))}
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
                    We couldn't find any products matching your search criteria.
                    Try adjusting your filters or search terms.
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

export default CategoryPage;

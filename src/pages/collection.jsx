"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
  FaChevronLeft,
  FaAngleRight,
  FaHome,
  FaThLarge,
  FaList,
  FaEye,
  FaTimes,
  FaArrowRight,
  FaPercent,
} from "react-icons/fa";

const Collection = () => {
  const { collectionSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useCart();
  const [activeTab, setActiveTab] = useState("all");

  // State variables
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const filterRef = useRef(null);

  // Collection data mapping
  const collectionsMap = {
    "new-arrivals": {
      id: "new-arrivals",
      title: "New Arrivals",
      subtitle: "Discover our latest furniture pieces",
      description:
        "Explore our newest additions to elevate your home with the latest trends in furniture design. From contemporary sofas to minimalist dining sets, find the perfect piece to refresh your space.",
      image: "https://via.placeholder.com/1920x600?text=New+Arrivals",
      featured: true,
      categories: ["Living Room", "Bedroom", "Dining", "Office"],
      tags: ["new", "trending", "seasonal"],
      discount: 0,
      backgroundColor: "bg-gradient-to-r from-blue-600 to-indigo-700",
    },
    "summer-collection": {
      id: "summer-collection",
      title: "Summer Collection",
      subtitle: "Bright and airy designs for the season",
      description:
        "Transform your home with our summer-inspired furniture collection. Featuring light fabrics, natural materials, and vibrant colors that bring the refreshing essence of summer into your living space.",
      image: "https://via.placeholder.com/1920x600?text=Summer+Collection",
      featured: true,
      categories: ["Living Room", "Outdoor", "Bedroom"],
      tags: ["summer", "seasonal", "bright"],
      discount: 15,
      backgroundColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    "office-essentials": {
      id: "office-essentials",
      title: "Office Essentials",
      subtitle: "Professional furniture for productive spaces",
      description:
        "Create a productive and comfortable workspace with our office essentials collection. From ergonomic chairs to functional desks and storage solutions, we have everything you need for an efficient home office or corporate environment.",
      image: "https://via.placeholder.com/1920x600?text=Office+Essentials",
      featured: false,
      categories: ["Office"],
      tags: ["office", "professional", "ergonomic"],
      discount: 10,
      backgroundColor: "bg-gradient-to-r from-gray-700 to-gray-900",
    },
    "luxury-living": {
      id: "luxury-living",
      title: "Luxury Living",
      subtitle: "Elevate your home with premium designs",
      description:
        "Indulge in the finest furniture crafted with premium materials and exquisite attention to detail. Our luxury collection features statement pieces that transform your living space into a sophisticated sanctuary of comfort and style.",
      image: "https://via.placeholder.com/1920x600?text=Luxury+Living",
      featured: true,
      categories: ["Living Room", "Bedroom", "Dining"],
      tags: ["luxury", "premium", "exclusive"],
      discount: 0,
      backgroundColor: "bg-gradient-to-r from-purple-800 to-indigo-900",
    },
    "minimalist-designs": {
      id: "minimalist-designs",
      title: "Minimalist Designs",
      subtitle: "Simple elegance for modern spaces",
      description:
        "Embrace the 'less is more' philosophy with our minimalist furniture collection. Clean lines, functional designs, and a focus on essential elements create a calm and uncluttered aesthetic for your contemporary home.",
      image: "https://via.placeholder.com/1920x600?text=Minimalist+Designs",
      featured: false,
      categories: ["Living Room", "Bedroom", "Dining", "Office"],
      tags: ["minimalist", "modern", "simple"],
      discount: 5,
      backgroundColor: "bg-gradient-to-r from-gray-200 to-gray-400",
    },
  };

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        setLoading(true);

        // Get collection information
        const collectionData = collectionsMap[collectionSlug];
        if (!collectionData) {
          setError("Collection not found");
          setLoading(false);
          return;
        }

        setCollection(collectionData);

        // Fetch products
        const response = await axios.get("http://localhost:5000/api/products");

        // Filter products based on collection categories or tags
        let collectionProducts = response.data;

        // Apply collection-specific filtering
        if (collectionData.categories && collectionData.categories.length > 0) {
          collectionProducts = collectionProducts.filter((product) =>
            collectionData.categories.some(
              (category) =>
                product.category &&
                product.category.toLowerCase() === category.toLowerCase()
            )
          );
        }

        // Add a "featured" flag to some products randomly for demo purposes
        collectionProducts = collectionProducts.map((product) => ({
          ...product,
          featured: Math.random() > 0.7,
          isNew: collectionSlug === "new-arrivals" || Math.random() > 0.8,
          discount:
            collectionData.discount ||
            (Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : 0),
        }));

        setProducts(collectionProducts);
        setFilteredProducts(collectionProducts);

        // Find max price for range slider
        const highestPrice = Math.max(
          ...collectionProducts.map((product) => product.price)
        );
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);

        // Load wishlist from localStorage
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error("Error fetching collection data:", error);
        setError("Failed to load collection. Please try again.");
        toast.error("Failed to load collection. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();

    // Reset scroll position
    window.scrollTo(0, 0);
  }, [collectionSlug]);

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

    // Apply tab filter
    if (activeTab !== "all" && collection?.categories?.includes(activeTab)) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === activeTab
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
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    searchQuery,
    sortOption,
    products,
    priceRange,
    ratingFilter,
    activeTab,
    collection,
  ]);

  // Click outside handler for filters on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setActiveTab("all");
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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderProductCard = (product) => {
    const rating = product.rating || Math.floor(Math.random() * 5) + 1;
    const isWishlisted = wishlist.includes(product.id);
    const isHovered = hoveredProduct === product.id;

    return (
      <div
        key={product.id}
        className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex ${
          viewMode === "grid" ? "flex-col h-full" : "flex-row h-48 md:h-64"
        } group`}
        onClick={() => navigate(`/products/${product.id}`)}
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        {/* Product Image Container */}
        <div
          className={`relative ${
            viewMode === "grid" ? "w-full" : "w-48 md:w-64 h-full"
          }`}
        >
          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
              <FaPercent className="mr-1 text-xs" />
              {product.discount}% OFF
            </div>
          )}

          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              NEW
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => toggleWishlist(e, product.id)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10 transition-all duration-300 hover:bg-gray-100"
            style={{ opacity: product.isNew ? 0 : 1 }}
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </button>

          {/* Quick View Button - Appears on Hover */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/products/${product.id}`);
              }}
              className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <FaEye className="mr-2" />
              Quick View
            </button>
          </div>

          {/* Product Image */}
          <div
            className={`overflow-hidden bg-gray-100 ${
              viewMode === "grid" ? "w-full h-64" : "w-full h-full"
            }`}
          >
            <img
              src={product.images?.[0] || "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
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
              viewMode === "grid" ? "line-clamp-1" : ""
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
              {product.discount > 0 ? (
                <>
                  <p className="text-gray-500 line-through text-sm">
                    Ksh.{" "}
                    {Math.round(
                      product.price * (1 + product.discount / 100)
                    ).toLocaleString()}
                  </p>
                  <p className="text-gray-900 font-bold text-xl">
                    Ksh. {product.price.toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-gray-900 font-bold text-xl">
                  Ksh. {product.price.toLocaleString()}
                </p>
              )}
            </div>

            {viewMode === "list" && (
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="py-2 px-4 rounded-lg text-white font-medium transition-all flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
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
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
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
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Browse All Products
        </button>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Collection Not Found
        </h1>
        <p className="text-gray-700 mb-6">
          The collection you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Browse All Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {/* Collection Hero Banner */}
      <div className={`relative ${collection.backgroundColor} text-white`}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={collection.image || "/placeholder.svg"}
            alt={collection.title}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          {collection.discount > 0 && (
            <div className="bg-red-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-6 animate-pulse">
              {collection.discount}% OFF EVERYTHING IN THIS COLLECTION
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            {collection.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-6">
            {collection.subtitle}
          </p>
          <p className="max-w-3xl text-white/70 mb-8">
            {collection.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors">
              Shop Now
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <FaHome className="mr-1" />
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
            <FaAngleRight className="mx-2" />
            <Link to="/collections" className="hover:text-indigo-600">
              Collections
            </Link>
            <FaAngleRight className="mx-2" />
            <span className="font-medium text-gray-900">
              {collection.title}
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar py-2 gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Items
            </button>
            {collection.categories?.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-28 z-10 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search in ${collection.title}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <button
              onClick={toggleFilters}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg flex items-center hover:bg-gray-50 transition-colors relative"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>

            <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${
                  viewMode === "grid"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <FaThLarge className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${
                  viewMode === "list"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <FaList className="h-5 w-5" />
              </button>
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
            ref={filterRef}
            className={`md:w-64 ${
              showFilters
                ? "block fixed inset-0 z-50 bg-white md:static md:bg-transparent md:z-auto"
                : "hidden md:block"
            }`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-44 max-h-[calc(100vh-180px)] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-lg">Filters</h2>
                <div className="flex items-center">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
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
                            ? "bg-indigo-50 text-indigo-700 font-medium"
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

              {/* Collection Tags */}
              {collection.tags && collection.tags.length > 0 && (
                <div className="p-4">
                  <h3 className="font-medium mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {collection.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Collection Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {collection.title}
                  </h1>
                  <p className="text-gray-500 text-sm">{collection.subtitle}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {currentProducts.length > 0 ? (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {currentProducts.map((product) => renderProductCard(product))}
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
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md border ${
                      currentPage === 1
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FaChevronLeft className="h-4 w-4" />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page, and pages around current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`px-3 py-2 rounded-md ${
                            currentPage === pageNumber
                              ? "bg-indigo-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }

                    // Show ellipsis for skipped pages
                    if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={pageNumber} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }

                    return null;
                  })}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md border ${
                      currentPage === totalPages
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FaChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}

            {/* Featured Collections */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Other Collections You Might Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.values(collectionsMap)
                  .filter((c) => c.id !== collectionSlug && c.featured)
                  .slice(0, 3)
                  .map((collection) => (
                    <div
                      key={collection.id}
                      className="relative rounded-xl overflow-hidden h-48 group cursor-pointer"
                      onClick={() => navigate(`/collections/${collection.id}`)}
                    >
                      <div className="absolute inset-0">
                        <img
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 ${collection.backgroundColor} opacity-60`}
                        ></div>
                      </div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <h3 className="text-white text-xl font-bold mb-1">
                          {collection.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-3">
                          {collection.subtitle}
                        </p>
                        <div className="flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <span>Explore Collection</span>
                          <FaArrowRight className="ml-2" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;

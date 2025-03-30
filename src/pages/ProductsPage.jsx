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
  FaTags,
  FaCouch,
  FaBed,
  FaUtensils,
  FaLaptop,
  FaUmbrella,
  FaArchive,
  FaPalette,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the category structure for consistency
const categoryStructure = {
  "Living Room": [
    "Sofas",
    "Coffee Tables",
    "TV Stands",
    "Accent Chairs",
    "Console Tables",
  ],
  Bedroom: ["Beds", "Dressers", "Nightstands", "Wardrobes", "Mattresses"],
  "Dining Room": [
    "Dining Tables",
    "Dining Chairs",
    "Buffets",
    "Bar Carts",
    "China Cabinets",
  ],
  Office: [
    "Desks",
    "Office Chairs",
    "Bookshelves",
    "Filing Cabinets",
    "Desk Lamps",
  ],
  Outdoor: [
    "Patio Sets",
    "Outdoor Chairs",
    "Garden Benches",
    "Hammocks",
    "Outdoor Tables",
  ],
  Storage: [
    "Cabinets",
    "Shelving",
    "Storage Bins",
    "Closet Systems",
    "Media Storage",
  ],
  Decor: ["Mirrors", "Rugs", "Lighting", "Wall Art", "Throw Pillows"],
};

// Category icons mapping
const categoryIcons = {
  "Living Room": <FaCouch className="mr-2 text-gray-500" />,
  Bedroom: <FaBed className="mr-2 text-gray-500" />,
  "Dining Room": <FaUtensils className="mr-2 text-gray-500" />,
  Office: <FaLaptop className="mr-2 text-gray-500" />,
  Outdoor: <FaUmbrella className="mr-2 text-gray-500" />,
  Storage: <FaArchive className="mr-2 text-gray-500" />,
  Decor: <FaPalette className="mr-2 text-gray-500" />,
};

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
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
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

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const [expandedCategories, setExpandedCategories] = useState({
    livingRoom: false,
    bedroom: false,
    diningRoom: false,
    office: false,
    outdoor: false,
    storage: false,
    decor: false,
  });
  const [activeSubcategory, setActiveSubcategory] = useState("");

  // Mock data for testing when API is not available
  const mockProducts = [
    {
      id: 1,
      name: "Modern Leather Sofa",
      description: "Elegant 3-seater leather sofa with chrome legs",
      price: 89999,
      category: "Living Room",
      subcategory: "Sofas",
      stock: 5,
      rating: 4.5,
      featured: true,
      images: ["https://via.placeholder.com/600x400?text=Modern+Leather+Sofa"],
      date: "2023-05-15",
    },
    {
      id: 2,
      name: "Wooden Coffee Table",
      description: "Rustic wooden coffee table with storage",
      price: 24999,
      category: "Living Room",
      subcategory: "Coffee Tables",
      stock: 8,
      rating: 4.2,
      featured: false,
      images: ["https://via.placeholder.com/600x400?text=Wooden+Coffee+Table"],
      date: "2023-06-20",
    },
    {
      id: 3,
      name: "Queen Size Bed Frame",
      description: "Elegant queen size bed with upholstered headboard",
      price: 59999,
      category: "Bedroom",
      subcategory: "Beds",
      stock: 3,
      rating: 4.8,
      featured: true,
      images: ["https://via.placeholder.com/600x400?text=Queen+Size+Bed"],
      date: "2023-04-10",
    },
    {
      id: 4,
      name: "Wooden Dresser",
      description: "Six-drawer wooden dresser with mirror",
      price: 42999,
      category: "Bedroom",
      subcategory: "Dressers",
      stock: 4,
      rating: 4.0,
      featured: false,
      images: ["https://via.placeholder.com/600x400?text=Wooden+Dresser"],
      date: "2023-07-05",
    },
    {
      id: 5,
      name: "Glass Dining Table",
      description: "Modern glass dining table for 6 people",
      price: 35999,
      category: "Dining Room",
      subcategory: "Dining Tables",
      stock: 2,
      rating: 4.3,
      featured: true,
      images: ["https://via.placeholder.com/600x400?text=Glass+Dining+Table"],
      date: "2023-03-25",
    },
    {
      id: 6,
      name: "Office Desk",
      description: "Spacious office desk with drawers",
      price: 29999,
      category: "Office",
      subcategory: "Desks",
      stock: 6,
      rating: 4.1,
      featured: false,
      images: ["https://via.placeholder.com/600x400?text=Office+Desk"],
      date: "2023-08-12",
    },
    {
      id: 7,
      name: "Patio Set",
      description: "4-piece outdoor patio furniture set",
      price: 49999,
      category: "Outdoor",
      subcategory: "Patio Sets",
      stock: 3,
      rating: 4.6,
      featured: true,
      images: ["https://via.placeholder.com/600x400?text=Patio+Set"],
      date: "2023-05-30",
    },
    {
      id: 8,
      name: "Bookshelf",
      description: "5-tier wooden bookshelf",
      price: 19999,
      category: "Storage",
      subcategory: "Shelving",
      stock: 7,
      rating: 4.4,
      featured: false,
      images: ["https://via.placeholder.com/600x400?text=Bookshelf"],
      date: "2023-06-15",
    },
    {
      id: 9,
      name: "Wall Mirror",
      description: "Decorative round wall mirror with gold frame",
      price: 12999,
      category: "Decor",
      subcategory: "Mirrors",
      stock: 10,
      rating: 4.7,
      featured: true,
      images: ["https://via.placeholder.com/600x400?text=Wall+Mirror"],
      date: "2023-07-20",
    },
    {
      id: 10,
      name: "TV Stand",
      description: "Modern TV stand with storage compartments",
      price: 27999,
      category: "Living Room",
      subcategory: "TV Stands",
      stock: 4,
      rating: 4.2,
      featured: false,
      images: ["https://via.placeholder.com/600x400?text=TV+Stand"],
      date: "2023-08-05",
    },
    {
      id: 11,
      name: "Accent Chair",
      description: "Stylish accent chair with wooden legs",
      price: 18999,
      category: "Living Room",
      subcategory: "Accent Chairs",
      stock: 6,
      rating: 4.0,
      featured: false,
      images: ["https://via.placeholder.com/600x400?text=Accent+Chair"],
      date: "2023-09-10",
    },
    {
      id: 12,
      name: "Nightstand",
      description: "Compact nightstand with drawer",
      price: 14999,
      category: "Bedroom",
      subcategory: "Nightstands",
      stock: 8,
      rating: 4.3,
      featured: false,
      images: ["https://via.placeholder.com/600x400?text=Nightstand"],
      date: "2023-07-25",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try to fetch from API
        const response = await axios
          .get("https://bobbyfurnitureonline.onrender.com/api/products")
          .catch((error) => {
            // If API fetch fails, use mock data
            console.log("Using mock data instead of API");
            return { data: mockProducts };
          });

        const data = response.data;

        // Process the data to ensure subcategory field exists
        const processedData = data.map((product) => {
          // If product has a category but no subcategory, try to extract it from the category
          if (product.category && !product.subcategory) {
            const parts = product.category.split(" - ");
            if (parts.length > 1) {
              return {
                ...product,
                category: parts[0],
                subcategory: parts[1],
              };
            }
          }
          return product;
        });

        setProducts(processedData);
        setFilteredProducts(processedData);

        // Find max price for range slider
        const highestPrice = Math.max(
          ...processedData.map((product) => product.price)
        );
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);

        // Organize products by category
        const productsByCategory = processedData.reduce((acc, product) => {
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

        // Fallback to mock data if API fails
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);

        // Find max price for range slider
        const highestPrice = Math.max(
          ...mockProducts.map((product) => product.price)
        );
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);

        // Organize products by category
        const productsByCategory = mockProducts.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});
        setCategoryProducts(productsByCategory);
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

      // Apply subcategory filter if present
      if (subcategoryFilter) {
        updatedProducts = updatedProducts.filter(
          (product) =>
            // Check explicit subcategory field
            (product.subcategory &&
              product.subcategory.toLowerCase() ===
                subcategoryFilter.toLowerCase()) ||
            // Or check if subcategory is in name or description
            product.name
              .toLowerCase()
              .includes(subcategoryFilter.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(subcategoryFilter.toLowerCase())
        );
      }
    }

    // Apply search query
    if (searchQuery) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.subcategory &&
            product.subcategory
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
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

    // Reset to first page when filters change
    setCurrentPage(1);

    // Count active filters
    let count = 0;
    if (categoryFilter && categoryFilter !== "all") count++;
    if (subcategoryFilter) count++;
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
            product.category
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (product.subcategory &&
              product.subcategory
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
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
    subcategoryFilter,
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
    setSubcategoryFilter("");
    setSortOption("");
    setPriceRange([0, maxPrice]);
    setRatingFilter(0);
    setAvailabilityFilter("all");
    setFeaturedOnly(false);
    setActiveCategory("All");
    setActiveSubcategory("");
    setExpandedCategories({
      livingRoom: false,
      bedroom: false,
      diningRoom: false,
      office: false,
      outdoor: false,
      storage: false,
      decor: false,
    });
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveSubcategory("");
    setSubcategoryFilter("");

    if (category === "All") {
      setCategoryFilter("");
    } else {
      setCategoryFilter(category);
    }
  };

  const toggleCategoryExpansion = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  const handleSubcategoryClick = (category, subcategory) => {
    // Toggle subcategory if clicking the same one
    if (activeSubcategory === subcategory) {
      setActiveSubcategory("");
      setSubcategoryFilter("");
    } else {
      setActiveCategory(category);
      setActiveSubcategory(subcategory);
      setCategoryFilter(category);
      setSubcategoryFilter(subcategory);
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
        className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 flex ${
          viewMode === "grid" ? "flex-col h-full" : "flex-row h-auto md:h-48"
        }`}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {/* Discount Badge */}
        <div
          className={`relative ${
            viewMode === "grid" ? "w-full" : "w-1/3 max-w-[180px]"
          }`}
        >
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
            <FaPercent className="mr-1 text-xs" />
            10% OFF
          </div>

          {/* Product Image */}
          <div
            className={`overflow-hidden bg-gray-100 ${
              viewMode === "grid" ? "w-full h-48 sm:h-52" : "w-full h-full"
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
          className={`p-4 flex flex-col flex-grow ${
            viewMode === "list" ? "w-2/3" : ""
          }`}
        >
          {/* Category */}
          <div className="mb-2 flex flex-wrap gap-1">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
            {product.subcategory && (
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                {product.subcategory}
              </span>
            )}
            {product.featured && (
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className={`text-sm sm:text-base font-semibold text-gray-800 mb-1 ${
              viewMode === "grid" ? "line-clamp-2" : ""
            }`}
          >
            {product.name}
          </h2>

          {/* Description */}
          <p
            className={`text-xs sm:text-sm text-gray-500 mb-2 ${
              viewMode === "grid" ? "line-clamp-2" : "line-clamp-3"
            } flex-grow`}
          >
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="scale-90 origin-left">
              {renderStarRating(rating)}
            </div>
            <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 line-through text-xs">
                Ksh. {(product.price * 1.1).toLocaleString()}
              </p>
              <p className="text-gray-900 font-bold text-sm sm:text-base">
                Ksh. {product.price.toLocaleString()}
              </p>
            </div>

            {viewMode === "list" ? (
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="py-1.5 px-3 rounded-lg text-white font-medium transition-all flex items-center justify-center bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
              >
                <FaShoppingCart className="mr-1.5" />
                Add to Cart
              </button>
            ) : (
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                aria-label="Add to cart"
              >
                <FaShoppingCart className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination controls
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Get category key from name for expandedCategories state
  const getCategoryKey = (categoryName) => {
    const mapping = {
      "Living Room": "livingRoom",
      Bedroom: "bedroom",
      "Dining Room": "diningRoom",
      Office: "office",
      Outdoor: "outdoor",
      Storage: "storage",
      Decor: "decor",
    };
    return (
      mapping[categoryName] || categoryName.toLowerCase().replace(/\s+/g, "")
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <FaHome className="mr-1 text-xs" />
            <span>Home</span>
            <FaAngleRight className="mx-1 text-xs" />
            <span className="font-medium text-gray-700">Products</span>
            {categoryFilter && (
              <>
                <FaAngleRight className="mx-1 text-xs" />
                <span className="font-medium text-gray-700">
                  {categoryFilter}
                </span>
                {subcategoryFilter && (
                  <>
                    <FaAngleRight className="mx-1 text-xs" />
                    <span className="font-medium text-gray-700">
                      {subcategoryFilter}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar - Sticky at Top */}
      <div className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-20 py-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow" ref={searchRef}>
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 1);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 1)}
                className="py-2 pl-8 pr-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-1 z-30">
                  <ul>
                    {searchSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-sm"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                      >
                        <FaSearch className="text-gray-400 mr-2 text-xs" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={toggleFilters}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg flex items-center hover:bg-gray-50 transition-colors relative text-sm"
            >
              <FaFilter className="mr-1 text-sm" />
              <span className="hidden sm:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2 py-2 ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
                className={`px-2 py-2 ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filters Sidebar */}
          <div
            className={`md:w-56 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-16">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-base">Filters</h2>
                <div className="flex items-center">
                  <button
                    onClick={resetFilters}
                    className="text-xs text-blue-500 hover:text-blue-700"
                  >
                    Reset All
                  </button>
                  <button
                    className="md:hidden ml-3 text-gray-500"
                    onClick={toggleFilters}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-medium text-sm mb-2">Active Filters:</h3>
                  <div className="flex flex-wrap gap-1">
                    {categoryFilter && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {categoryFilter}
                        <button
                          className="ml-1 text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            setCategoryFilter("");
                            setSubcategoryFilter("");
                            setActiveCategory("All");
                            setActiveSubcategory("");
                          }}
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                    {subcategoryFilter && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                        {subcategoryFilter}
                        <button
                          className="ml-1 text-purple-500 hover:text-purple-700"
                          onClick={() => {
                            setSubcategoryFilter("");
                            setActiveSubcategory("");
                          }}
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Categories with Subcategories */}
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-medium text-sm mb-2">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`flex items-center w-full text-left px-2 py-1 rounded-md text-xs ${
                        activeCategory === "All"
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => handleCategoryClick("All")}
                    >
                      {activeCategory === "All" && (
                        <FaCheck className="mr-1 text-blue-600 text-xs" />
                      )}
                      <span className="flex items-center">
                        <FaTags className="mr-1 text-gray-500 text-xs" />
                        All Categories
                      </span>
                    </button>
                  </li>

                  {/* Render each main category with subcategories */}
                  {Object.keys(categoryStructure).map((category) => {
                    const categoryKey = getCategoryKey(category);
                    const isExpanded = expandedCategories[categoryKey];
                    const isActive = activeCategory === category;

                    return (
                      <li key={category} className="mt-1">
                        <div className="mb-0.5">
                          <button
                            className={`flex items-center justify-between w-full text-left px-2 py-1 rounded-md text-xs ${
                              isActive || isExpanded
                                ? "bg-blue-50 text-blue-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              if (!isActive) {
                                handleCategoryClick(category);
                              }
                              toggleCategoryExpansion(categoryKey);
                            }}
                          >
                            <span className="flex items-center">
                              {isActive && (
                                <FaCheck className="mr-1 text-blue-600 text-xs" />
                              )}
                              {categoryIcons[category] || (
                                <FaTag className="mr-1 text-gray-500 text-xs" />
                              )}
                              {category}
                            </span>
                            {isExpanded ? (
                              <FaChevronUp className="text-xs" />
                            ) : (
                              <FaChevronDown className="text-xs" />
                            )}
                          </button>
                        </div>

                        {isExpanded && (
                          <ul className="ml-4 space-y-0.5 border-l border-gray-100 pl-2">
                            {categoryStructure[category].map((subcat) => (
                              <li key={subcat}>
                                <button
                                  className={`flex items-center w-full text-left px-2 py-1 text-xs rounded-md ${
                                    activeSubcategory === subcat
                                      ? "bg-blue-50 text-blue-700 font-medium"
                                      : "text-gray-600 hover:bg-gray-50"
                                  }`}
                                  onClick={() =>
                                    handleSubcategoryClick(category, subcat)
                                  }
                                >
                                  {activeSubcategory === subcat && (
                                    <FaCheck className="mr-1 text-blue-600 text-xs" />
                                  )}
                                  {subcat}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Price Range */}
              <div className="p-3 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-medium text-sm mb-2"
                  onClick={() => toggleFilterSection("price")}
                >
                  <span>Price Range</span>
                  {expandedFilters.price ? (
                    <FaChevronUp className="text-xs" />
                  ) : (
                    <FaChevronDown className="text-xs" />
                  )}
                </button>

                {expandedFilters.price && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-1 text-xs">
                      <span>Ksh. {priceRange[0].toLocaleString()}</span>
                      <span>Ksh. {priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-1 rounded-full bg-blue-500"
                          style={{
                            left: `${(priceRange[0] / maxPrice) * 100}%`,
                            width: `${
                              ((priceRange[1] - priceRange[0]) / maxPrice) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
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
                      className="w-full mb-1 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
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
                      className="w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                    />
                    <div className="flex gap-2 mt-2">
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
                        className="w-full p-1 border border-gray-300 rounded-md text-xs"
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
                        className="w-full p-1 border border-gray-300 rounded-md text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div className="p-3 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-medium text-sm mb-2"
                  onClick={() => toggleFilterSection("rating")}
                >
                  <span>Rating</span>
                  {expandedFilters.rating ? (
                    <FaChevronUp className="text-xs" />
                  ) : (
                    <FaChevronDown className="text-xs" />
                  )}
                </button>

                {expandedFilters.rating && (
                  <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className={`flex items-center w-full text-left px-2 py-1 rounded-md text-xs ${
                          ratingFilter === rating
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() =>
                          setRatingFilter(ratingFilter === rating ? 0 : rating)
                        }
                      >
                        <div className="flex mr-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < rating ? (
                                <FaStar className="text-yellow-400 text-xs" />
                              ) : (
                                <FaRegStar className="text-gray-300 text-xs" />
                              )}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs">
                          {rating === 1 ? "& Up" : `& Up`}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="p-3 border-b border-gray-200">
                <button
                  className="flex items-center justify-between w-full font-medium text-sm mb-2"
                  onClick={() => toggleFilterSection("availability")}
                >
                  <span>Availability</span>
                  {expandedFilters.availability ? (
                    <FaChevronUp className="text-xs" />
                  ) : (
                    <FaChevronDown className="text-xs" />
                  )}
                </button>

                {expandedFilters.availability && (
                  <div className="space-y-1">
                    <label className="flex items-center text-xs">
                      <input
                        type="radio"
                        name="availability"
                        checked={availabilityFilter === "all"}
                        onChange={() => setAvailabilityFilter("all")}
                        className="mr-1 accent-blue-500"
                      />
                      <span>All</span>
                    </label>
                    <label className="flex items-center text-xs">
                      <input
                        type="radio"
                        name="availability"
                        checked={availabilityFilter === "inStock"}
                        onChange={() => setAvailabilityFilter("inStock")}
                        className="mr-1 accent-blue-500"
                      />
                      <span>In Stock</span>
                    </label>
                    <label className="flex items-center text-xs">
                      <input
                        type="radio"
                        name="availability"
                        checked={availabilityFilter === "outOfStock"}
                        onChange={() => setAvailabilityFilter("outOfStock")}
                        className="mr-1 accent-blue-500"
                      />
                      <span>Out of Stock</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Featured Products */}
              <div className="p-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={() => setFeaturedOnly(!featuredOnly)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                  <span className="ml-2 text-xs font-medium text-gray-700">
                    Featured Products Only
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {filteredProducts.length > 0
                    ? `${indexOfFirstProduct + 1}-${Math.min(
                        indexOfLastProduct,
                        filteredProducts.length
                      )}`
                    : 0}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {filteredProducts.length}
                </span>{" "}
                products
              </div>

              <div className="flex items-center">
                <span className="text-xs text-gray-700 mr-2 hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="p-1 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                <div key={category} className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center">
                      {categoryIcons[category] || (
                        <FaTag className="mr-1 text-blue-500" />
                      )}
                      {category}
                    </h2>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                    >
                      View All
                    </button>
                  </div>

                  <div
                    className={`grid ${
                      viewMode === "grid"
                        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-1"
                    } gap-3 sm:gap-4`}
                  >
                    {products
                      .slice(0, 4)
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
                        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-1"
                    } gap-3 sm:gap-4`}
                  >
                    {currentProducts.map((product) =>
                      renderProductCard(product)
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="flex flex-col items-center justify-center py-6">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-3"
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
                      <h3 className="text-base font-medium text-gray-700 mb-1">
                        No products found
                      </h3>
                      <p className="text-gray-500 text-sm max-w-md mb-4">
                        We couldn't find any products matching your search
                        criteria. Try adjusting your filters or search terms.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="mt-6">
                <div className="flex justify-center">
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        // If 5 or fewer pages, show all
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        // If near start, show first 5
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        // If near end, show last 5
                        pageNum = totalPages - 4 + i;
                      } else {
                        // Otherwise show current and 2 on each side
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginate(pageNum)}
                          className={`relative inline-flex items-center px-3 py-2 border text-sm font-medium
                            ${
                              currentPage === pageNum
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

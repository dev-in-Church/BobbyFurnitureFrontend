"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Loading } from "../components/LoadingReturnTop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaRegHeart,
  FaShoppingCart,
  FaTrashAlt,
  FaShare,
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaRegStar,
  FaStar,
  FaEye,
  FaCheck,
  FaHome,
  FaAngleRight,
  FaClipboard,
  FaPercent,
  FaInfoCircle,
  FaRegSadTear,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";

const Wishlist = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [compareItems, setCompareItems] = useState([]);

  // Fetch wishlist items from local storage or API
  // useEffect(() => {
  //   const fetchWishlistItems = async () => {
  //     try {
  //       setLoading(true);

  //       // In a real app, you might fetch from an API
  //       // For this example, we'll fetch all products and filter some as "wishlisted"
  //       const response = await axios.get("http://localhost:5000/api/products");

  //       // Simulate wishlist by taking a subset of products
  //       // In a real app, you would have a proper wishlist API or local storage management
  //       const savedWishlist = localStorage.getItem("wishlist");
  //       let wishlistIds = [];

  //       if (savedWishlist) {
  //         wishlistIds = JSON.parse(savedWishlist);
  //       } else {
  //         // For demo purposes, randomly select some products as wishlisted
  //         wishlistIds = response.data
  //           .slice(0, Math.min(5, response.data.length))
  //           .map((product) => product.id);
  //         localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  //       }

  //       const wishlisted = response.data.filter((product) =>
  //         wishlistIds.includes(product.id)
  //       );

  //       setWishlistItems(wishlisted);
  //       setFilteredItems(wishlisted);

  //       // Extract categories
  //       const allCategories = [
  //         ...new Set(wishlisted.map((item) => item.category)),
  //       ];
  //       setCategories(allCategories);

  //       // Find max price for range slider
  //       if (wishlisted.length > 0) {
  //         const highestPrice = Math.max(
  //           ...wishlisted.map((item) => item.price)
  //         );
  //         setMaxPrice(highestPrice);
  //         setPriceRange([0, highestPrice]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching wishlist items:", error);
  //       setError("Failed to load your wishlist. Please try again.");
  //       toast.error(
  //         <div className="flex items-center gap-2">
  //           <FaExclamationTriangle className="text-yellow-400" />
  //           Failed to load wishlist!
  //         </div>
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWishlistItems();
  // }, []);
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        setLoading(true);

        // Fetch all products
        const response = await axios.get("http://localhost:5000/api/products");

        // Ensure wishlist is an array
        const savedWishlist = localStorage.getItem("wishlist");
        let wishlistIds = [];

        if (savedWishlist) {
          try {
            const parsedWishlist = JSON.parse(savedWishlist);
            wishlistIds = Array.isArray(parsedWishlist) ? parsedWishlist : [];
          } catch (error) {
            console.error("Invalid wishlist data in localStorage:", error);
            wishlistIds = [];
          }
        } else {
          // Generate random wishlisted items if none exist
          wishlistIds = response.data
            .slice(0, Math.min(5, response.data.length))
            .map((product) => product.id);
          localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
        }

        // Ensure wishlistIds is always an array before using .includes()
        if (!Array.isArray(wishlistIds)) {
          console.error("wishlistIds is not an array:", wishlistIds);
          wishlistIds = [];
        }

        // Filter products based on wishlistIds
        const wishlisted = response.data.filter((product) =>
          wishlistIds.includes(product.id)
        );

        setWishlistItems(wishlisted);
        setFilteredItems(wishlisted);

        // Extract categories
        const allCategories = [
          ...new Set(wishlisted.map((item) => item.category)),
        ];
        setCategories(allCategories);

        // Find max price for range slider
        if (wishlisted.length > 0) {
          const highestPrice = Math.max(
            ...wishlisted.map((item) => item.price)
          );
          setMaxPrice(highestPrice);
          setPriceRange([0, highestPrice]);
        }
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setError("Failed to load your wishlist. Please try again.");
        toast.error(
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-400" />
            Failed to load wishlist!
          </div>
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let items = [...wishlistItems];

    // Apply search filter
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter) {
      items = items.filter((item) => item.category === categoryFilter);
    }

    // Apply price range filter
    items = items.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Apply sorting
    if (sortOption === "price_low") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_high") {
      items.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name_asc") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name_desc") {
      items.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "newest") {
      items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }

    setFilteredItems(items);
  }, [wishlistItems, searchQuery, categoryFilter, priceRange, sortOption]);

  // Handle removing item from wishlist
  const removeFromWishlist = (itemId) => {
    // Update state
    const updatedWishlist = wishlistItems.filter((item) => item.id !== itemId);
    setWishlistItems(updatedWishlist);

    // Update localStorage
    const wishlistIds = updatedWishlist.map((item) => item.id);
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));

    // Show toast
    toast.info(
      <div className="flex items-center gap-2">
        <FaRegHeart className="text-gray-500" />
        Item removed from wishlist
      </div>
    );

    // Update selected items if necessary
    setSelectedItems(selectedItems.filter((id) => id !== itemId));
  };

  // Handle adding item to cart
  const handleAddToCart = (item) => {
    addToCart(item);

    toast.success(
      <div className="flex items-center gap-2">
        <FaShoppingCart className="text-green-500" />
        Added to your cart!
      </div>
    );
  };

  // Handle adding to cart and removing from wishlist
  const moveToCart = (item) => {
    handleAddToCart(item);
    removeFromWishlist(item.id);

    toast.success(
      <div className="flex items-center gap-2">
        <FaCheck className="text-green-500" />
        Moved to your cart!
      </div>
    );
  };

  // Handle sharing wishlist
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  // Copy wishlist link to clipboard
  const copyToClipboard = () => {
    // In a real app, you might generate a shareable link
    const shareableLink = window.location.href;
    navigator.clipboard.writeText(shareableLink);

    toast.success(
      <div className="flex items-center gap-2">
        <FaClipboard className="text-blue-500" />
        Wishlist link copied to clipboard!
      </div>
    );

    setShowShareOptions(false);
  };

  // Toggle item selection
  const toggleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Toggle select all items
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Add all selected items to cart
  const addSelectedToCart = () => {
    if (selectedItems.length === 0) {
      toast.info("No items selected");
      return;
    }

    const itemsToAdd = wishlistItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    itemsToAdd.forEach((item) => addToCart(item));

    toast.success(
      <div className="flex items-center gap-2">
        <FaShoppingCart className="text-green-500" />
        {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"}{" "}
        added to cart!
      </div>
    );
  };

  // Remove all selected items from wishlist
  const removeSelectedItems = () => {
    if (selectedItems.length === 0) {
      toast.info("No items selected");
      return;
    }

    const updatedWishlist = wishlistItems.filter(
      (item) => !selectedItems.includes(item.id)
    );
    setWishlistItems(updatedWishlist);

    // Update localStorage
    const wishlistIds = updatedWishlist.map((item) => item.id);
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));

    toast.info(
      <div className="flex items-center gap-2">
        <FaTrashAlt className="text-gray-500" />
        {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"}{" "}
        removed from wishlist
      </div>
    );

    setSelectedItems([]);
    setSelectAll(false);
  };

  // Toggle compare mode
  const toggleCompareMode = () => {
    if (isComparing) {
      setIsComparing(false);
      setCompareItems([]);
    } else {
      setIsComparing(true);
      setCompareItems(selectedItems.slice(0, 3)); // Limit to 3 items for comparison

      if (selectedItems.length > 3) {
        toast.info("You can compare up to 3 items at a time");
      } else if (selectedItems.length < 2) {
        toast.info("Select at least 2 items to compare");
      }
    }
  };

  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 4);

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }

    return <div className="flex">{stars}</div>;
  };

  // Show loading state
  if (loading) return <Loading />;

  // Show error message
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render comparison view
  if (isComparing && compareItems.length >= 2) {
    const itemsToCompare = wishlistItems.filter((item) =>
      compareItems.includes(item.id)
    );

    return (
      <div className="bg-gray-50 min-h-screen pt-16 pb-12">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Compare Products
            </h1>
            <button
              onClick={toggleCompareMode}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Back to Wishlist
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4 font-medium text-gray-500 bg-gray-50">
                Product
              </div>
              {itemsToCompare.map((item) => (
                <div key={item.id} className="p-4 text-center">
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-32 h-32 object-contain mx-auto mb-2"
                  />
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4 font-medium text-gray-500 bg-gray-50">
                Price
              </div>
              {itemsToCompare.map((item) => (
                <div
                  key={`price-${item.id}`}
                  className="p-4 text-center font-bold text-gray-900"
                >
                  Ksh. {item.price.toLocaleString()}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4 font-medium text-gray-500 bg-gray-50">
                Category
              </div>
              {itemsToCompare.map((item) => (
                <div key={`category-${item.id}`} className="p-4 text-center">
                  {item.category}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4 font-medium text-gray-500 bg-gray-50">
                Rating
              </div>
              {itemsToCompare.map((item) => (
                <div
                  key={`rating-${item.id}`}
                  className="p-4 flex justify-center"
                >
                  {renderStarRating(item.rating || 4)}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4 font-medium text-gray-500 bg-gray-50">
                Description
              </div>
              {itemsToCompare.map((item) => (
                <div
                  key={`desc-${item.id}`}
                  className="p-4 text-center text-sm text-gray-600"
                >
                  {item.description.substring(0, 100)}...
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4">
              <div className="p-4 font-medium text-gray-500 bg-gray-50">
                Actions
              </div>
              {itemsToCompare.map((item) => (
                <div
                  key={`actions-${item.id}`}
                  className="p-4 flex justify-center space-x-2"
                >
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-12">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <button onClick={() => navigate("/")} className="hover:text-gray-700">
            <FaHome className="inline mr-1" />
            Home
          </button>
          <FaAngleRight className="mx-2" />
          <span className="text-gray-900 font-medium">My Wishlist</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              My Wishlist
            </h1>
            <p className="text-gray-500">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {selectedItems.length > 0 && (
              <>
                <button
                  onClick={addSelectedToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center text-sm font-medium transition-colors"
                >
                  <FaShoppingCart className="mr-2" />
                  Add Selected to Cart
                </button>

                <button
                  onClick={removeSelectedItems}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg flex items-center text-sm font-medium transition-colors"
                >
                  <FaTrashAlt className="mr-2" />
                  Remove Selected
                </button>

                {selectedItems.length >= 2 && selectedItems.length <= 3 && (
                  <button
                    onClick={toggleCompareMode}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg flex items-center text-sm font-medium transition-colors"
                  >
                    <FaInfoCircle className="mr-2" />
                    Compare
                  </button>
                )}
              </>
            )}

            <div className="relative">
              <button
                onClick={handleShare}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg flex items-center text-sm font-medium transition-colors"
              >
                <FaShare className="mr-2" />
                Share Wishlist
              </button>

              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                      >
                        <FaClipboard className="mr-2" />
                        Copy Link
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search in wishlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <FaFilter className="mr-2" />
                Filter
                {showFilters ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sort by</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={categoryFilter === ""}
                      onChange={() => setCategoryFilter("")}
                      className="mr-2"
                    />
                    <span>All Categories</span>
                  </label>

                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={categoryFilter === category}
                        onChange={() => setCategoryFilter(category)}
                        className="mr-2"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                <div>
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
                </div>
              </div>

              {/* Reset Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("");
                    setPriceRange([0, maxPrice]);
                    setSortOption("");
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wishlist Items */}
        {filteredItems.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
              <div className="col-span-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className="col-span-5 font-medium text-gray-700">
                Product
              </div>
              <div className="col-span-2 font-medium text-gray-700">Price</div>
              <div className="col-span-2 font-medium text-gray-700">
                Category
              </div>
              <div className="col-span-2 font-medium text-gray-700">
                Actions
              </div>
            </div>

            {/* Table Body */}
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center hover:bg-gray-50"
              >
                <div className="col-span-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="col-span-5 flex items-center">
                  <div className="relative flex-shrink-0 mr-4">
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    {item.discount && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center">
                        <FaPercent className="mr-0.5 text-xs" />
                        10%
                      </div>
                    )}
                  </div>

                  <div>
                    <h3
                      className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/products/${item.id}`)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="mt-1">{renderStarRating(item.rating)}</div>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="font-bold text-gray-900">
                    Ksh. {item.price.toLocaleString()}
                  </div>
                  {item.discount && (
                    <div className="text-sm text-gray-500 line-through">
                      Ksh. {(item.price * 1.1).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="col-span-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="col-span-2 flex space-x-2">
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
                    title="Move to Cart"
                  >
                    <FaShoppingCart />
                  </button>

                  <button
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-md transition-colors"
                    title="View Product"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-md transition-colors"
                    title="Remove from Wishlist"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty Wishlist State
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <FaRegSadTear className="text-gray-400 text-6xl mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 max-w-md mb-6">
                You haven't added any products to your wishlist yet. Browse our
                products and add your favorites!
              </p>
              <button
                onClick={() => navigate("/products")}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center transition-colors"
              >
                <FaArrowRight className="mr-2" />
                Browse Products
              </button>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {wishlistItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              You Might Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* This would typically be populated with recommended products based on wishlist items */}
              {/* For demo purposes, we'll just show the first 4 products from the wishlist */}
              {wishlistItems.slice(0, 4).map((item) => (
                <div
                  key={`rec-${item.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <div className="relative">
                    <img
                      src={
                        item.images?.[0] || "https://via.placeholder.com/300"
                      }
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      10% OFF
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900">
                        Ksh. {item.price.toLocaleString()}
                      </p>
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                      >
                        <FaPlus className="inline mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

"use client";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Loading } from "../components/LoadingReturnTop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Star,
  Percent,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  ChevronRight,
  Tag,
  Tags,
  Sofa,
  Bed,
  Utensils,
  Laptop,
  Umbrella,
  Archive,
  Palette,
  Baby,
  ShoppingCart,
  Grid,
  List,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
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
} from "../components/ui/sheet";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

// Define the category structure for consistency
const categoryStructure = {
  "Living Room": [
    "Sofas",
    "Coffee Tables",
    "TV Stands",
    "Accent Chairs",
    "Console Tables",
    "Sectional Sofas",
    "Livingroom Packages",
    "Tables",
    "Nest of Tables",
    "Semi Recliners",
    "Couches in set",
    "Buffet Tables",
    "Pouffes & Ottomans",
  ],
  Bedroom: [
    "Beds",
    "Dressers",
    "Nightstands",
    "Wardrobes",
    "Mattresses",
    "Ottomans",
    "Chest of Drawers",
    "Bedroom Packages",
    "Bed Benches",
  ],
  "Dining Room": [
    "Dining Tables",
    "Dining Chairs",
    "Buffets",
    "Bar Carts",
    "China Cabinets",
    "Four seater DIning Sets",
    "Six seater DIning Sets",
    "Eight seater DIning Sets",
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
  Decor: [
    "Mirrors",
    "Mirror Frames",
    "Rugs",
    "Lighting",
    "Wall Art",
    "Throw Pillows",
  ],
  "Kids Room": ["Beds", "Double Deckers", "Baby Cots"],
  Mattresses: [
    "Foam Mattresses",
    "Spring Mattresses",
    "Orthopedic Mattresses",
    "Memory Foam Mattresses",
  ],
};

// Category icons mapping
const categoryIcons = {
  "Living Room": <Sofa className="h-4 w-4" />,
  Bedroom: <Bed className="h-4 w-4" />,
  "Dining Room": <Utensils className="h-4 w-4" />,
  Office: <Laptop className="h-4 w-4" />,
  Outdoor: <Umbrella className="h-4 w-4" />,
  Storage: <Archive className="h-4 w-4" />,
  Decor: <Palette className="h-4 w-4" />,
  "Kids Room": <Baby className="h-4 w-4" />,
  Mattresses: <Bed className="h-4 w-4" />,
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

  const [expandedCategories, setExpandedCategories] = useState({});
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
            <RotateCcw className="mr-1 h-3 w-3" />
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
    setExpandedCategories({});
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
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            ) : (
              <Star className="h-3 w-3 text-gray-300" />
            )}
          </span>
        ))}
      </div>
    );
  };

  const renderProductCard = (product) => {
    const rating = getProductRating(product);

    return (
      <Card
        key={product.id}
        className={`group overflow-hidden transition-all duration-300 hover:shadow-md ${
          viewMode === "list" ? "flex flex-row h-auto" : ""
        }`}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {/* Product Image with Discount Badge */}
        <div
          className={`relative ${
            viewMode === "grid" ? "w-full" : "w-1/3 max-w-[180px]"
          }`}
        >
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 z-10 px-2 py-1 text-xs font-medium"
          >
            <Percent className="mr-1 h-3 w-3" />
            10% OFF
          </Badge>

          <div
            className={`overflow-hidden bg-gray-100 ${
              viewMode === "grid" ? "aspect-square w-full" : "w-full h-full"
            }`}
          >
            <img
              src={product.images?.[0] || "https://via.placeholder.com/200"}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Product Details */}
        <CardContent
          className={`flex flex-col p-4 ${viewMode === "list" ? "w-2/3" : ""}`}
        >
          {/* Category Tags */}
          <div className="mb-2 flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            {product.subcategory && (
              <Badge variant="outline" className="text-xs">
                {product.subcategory}
              </Badge>
            )}
            {product.featured && (
              <Badge variant="default" className="bg-amber-500 text-xs">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h2
            className={`font-medium text-gray-900 ${
              viewMode === "grid" ? "line-clamp-1" : "line-clamp-1 text-lg"
            }`}
          >
            {product.name}
          </h2>

          {/* Description */}
          <p
            className={`mt-1 text-sm text-gray-500 ${
              viewMode === "grid" ? "line-clamp-2" : "line-clamp-2"
            } flex-grow`}
          >
            {product.description}
          </p>

          {/* Rating */}
          <div className="mt-2 flex items-center">
            {renderStarRating(rating)}
            <span className="ml-1 text-xs text-gray-500">({rating})</span>
          </div>

          {/* Price and Add to Cart */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 line-through">
                Ksh. {(product.price * 1.1).toLocaleString()}
              </p>
              <p className="text-base font-bold text-gray-900">
                Ksh. {product.price.toLocaleString()}
              </p>
            </div>

            {viewMode === "list" ? (
              <Button
                size="sm"
                onClick={(e) => handleAddToCart(e, product)}
                className="gap-1"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            ) : (
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 rounded-full"
                onClick={(e) => handleAddToCart(e, product)}
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
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
      "Kids Room": "kidsRoom",
      Mattresses: "mattresses",
    };
    return (
      mapping[categoryName] || categoryName.toLowerCase().replace(/\s+/g, "")
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white py-2">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Home className="mr-1 h-3.5 w-3.5" />
            <span>Home</span>
            <ChevronRight className="mx-1 h-3.5 w-3.5" />
            <span className="font-medium text-gray-700">Products</span>
            {categoryFilter && (
              <>
                <ChevronRight className="mx-1 h-3.5 w-3.5" />
                <span className="font-medium text-gray-700">
                  {categoryFilter}
                </span>
                {subcategoryFilter && (
                  <>
                    <ChevronRight className="mx-1 h-3.5 w-3.5" />
                    <span className="font-medium text-gray-700">
                      {subcategoryFilter}
                    </span>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Search Bar - Sticky at Top */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white py-3 shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 1);
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 1)}
                  className="pl-9"
                />
              </div>

              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-lg border border-gray-200 bg-white shadow-md">
                  <ul>
                    {searchSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="flex cursor-pointer items-center px-3 py-2 text-sm hover:bg-gray-50"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                      >
                        <Search className="mr-2 h-3.5 w-3.5 text-gray-400" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative md:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -right-1 -top-1 h-4 w-4 p-0 text-xs"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] z-[999] overflow-y-scroll"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <span>Filters</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-8 text-xs"
                    >
                      <RotateCcw className="mr-1 h-3 w-3" />
                      Reset All
                    </Button>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  {/* Mobile Filters Content */}
                  <MobileFilters
                    categories={categories}
                    categoryStructure={categoryStructure}
                    categoryIcons={categoryIcons}
                    activeCategory={activeCategory}
                    activeSubcategory={activeSubcategory}
                    expandedCategories={expandedCategories}
                    handleCategoryClick={handleCategoryClick}
                    toggleCategoryExpansion={toggleCategoryExpansion}
                    handleSubcategoryClick={handleSubcategoryClick}
                    getCategoryKey={getCategoryKey}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    maxPrice={maxPrice}
                    ratingFilter={ratingFilter}
                    setRatingFilter={setRatingFilter}
                    availabilityFilter={availabilityFilter}
                    setAvailabilityFilter={setAvailabilityFilter}
                    featuredOnly={featuredOnly}
                    setFeaturedOnly={setFeaturedOnly}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filter Button */}
            <Button
              variant="outline"
              size="sm"
              className="relative hidden md:flex"
              onClick={toggleFilters}
            >
              <SlidersHorizontal className="mr-1.5 h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-4 w-4 p-0 text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* View Mode Toggle */}
            <div className="hidden overflow-hidden rounded-lg border border-gray-200 sm:flex">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-none",
                  viewMode === "grid" && "bg-primary text-primary-foreground"
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-none",
                  viewMode === "list" && "bg-primary text-primary-foreground"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Desktop Filters Sidebar */}
          <div
            className={`md:w-64 lg:w-72 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="sticky top-20 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="text-base font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8 text-xs"
                >
                  <RotateCcw className="mr-1 h-3 w-3" />
                  Reset
                </Button>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="border-b border-gray-200 p-4">
                  <h3 className="mb-2 text-sm font-medium">Active Filters:</h3>
                  <div className="flex flex-wrap gap-1">
                    {categoryFilter && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {categoryFilter}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => {
                            setCategoryFilter("");
                            setSubcategoryFilter("");
                            setActiveCategory("All");
                            setActiveSubcategory("");
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {subcategoryFilter && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {subcategoryFilter}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => {
                            setSubcategoryFilter("");
                            setActiveSubcategory("");
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Categories with Subcategories */}
              <Accordion type="multiple" className="px-2 py-2">
                <AccordionItem value="categories" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 pl-1">
                      <Button
                        variant={
                          activeCategory === "All" ? "secondary" : "ghost"
                        }
                        size="sm"
                        className="w-full justify-start text-xs font-normal"
                        onClick={() => handleCategoryClick("All")}
                      >
                        <Tags className="mr-2 h-3.5 w-3.5" />
                        All Categories
                      </Button>

                      {/* Render each main category with subcategories */}
                      {Object.keys(categoryStructure).map((category) => {
                        const categoryKey = getCategoryKey(category);
                        const isExpanded = expandedCategories[categoryKey];
                        const isActive = activeCategory === category;

                        return (
                          <div key={category} className="mt-1">
                            <Button
                              variant={isActive ? "secondary" : "ghost"}
                              size="sm"
                              className="w-full justify-between text-xs font-normal"
                              onClick={() => {
                                if (!isActive) {
                                  handleCategoryClick(category);
                                }
                                toggleCategoryExpansion(categoryKey);
                              }}
                            >
                              <span className="flex items-center">
                                {categoryIcons[category] || (
                                  <Tag className="mr-2 h-3.5 w-3.5" />
                                )}
                                {category}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                              )}
                            </Button>

                            {isExpanded && (
                              <div className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-2">
                                {categoryStructure[category].map((subcat) => (
                                  <Button
                                    key={subcat}
                                    variant={
                                      activeSubcategory === subcat
                                        ? "secondary"
                                        : "ghost"
                                    }
                                    size="sm"
                                    className="w-full justify-start text-xs font-normal"
                                    onClick={() =>
                                      handleSubcategoryClick(category, subcat)
                                    }
                                  >
                                    {subcat}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-1 py-2">
                      <div className="mb-4 flex justify-between text-xs">
                        <span>Ksh. {priceRange[0].toLocaleString()}</span>
                        <span>Ksh. {priceRange[1].toLocaleString()}</span>
                      </div>
                      <Slider
                        defaultValue={[0, maxPrice]}
                        value={priceRange}
                        max={maxPrice}
                        step={1000}
                        onValueChange={(value) => setPriceRange(value)}
                        className="mb-6"
                      />
                      <div className="flex gap-2">
                        <Input
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
                          className="h-8 text-xs"
                        />
                        <Input
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
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Rating Filter */}
                <AccordionItem value="rating" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">
                    Rating
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 px-1 py-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Button
                          key={rating}
                          variant={
                            ratingFilter === rating ? "secondary" : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start text-xs font-normal"
                          onClick={() =>
                            setRatingFilter(
                              ratingFilter === rating ? 0 : rating
                            )
                          }
                        >
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>
                                {i < rating ? (
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                ) : (
                                  <Star className="h-3 w-3 text-gray-300" />
                                )}
                              </span>
                            ))}
                          </div>
                          <span>{rating === 1 ? "& Up" : `& Up`}</span>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Availability */}
                <AccordionItem value="availability" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">
                    Availability
                  </AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup
                      value={availabilityFilter}
                      onValueChange={setAvailabilityFilter}
                      className="px-1 py-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="all"
                          id="all"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="all" className="text-xs">
                          All
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="inStock"
                          id="inStock"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="inStock" className="text-xs">
                          In Stock
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="outOfStock"
                          id="outOfStock"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="outOfStock" className="text-xs">
                          Out of Stock
                        </Label>
                      </div>
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Featured Products */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured-only"
                    checked={featuredOnly}
                    onCheckedChange={setFeaturedOnly}
                  />
                  <Label htmlFor="featured-only" className="text-sm">
                    Featured Products Only
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Options */}
            <Card className="mb-6">
              <CardContent className="flex items-center justify-between p-4">
                <div className="text-sm text-gray-500">
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
                  <span className="mr-2 hidden text-sm text-gray-700 sm:inline">
                    Sort by:
                  </span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="h-8 w-[180px] text-xs">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price_low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price_high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="newest">Newest Arrivals</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

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
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="flex items-center text-lg font-bold text-gray-800">
                      {categoryIcons[category] || (
                        <Tag className="mr-2 h-4 w-4 text-primary" />
                      )}
                      {category}
                    </h2>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleCategoryClick(category)}
                      className="font-medium"
                    >
                      View All
                    </Button>
                  </div>

                  <div
                    className={`grid gap-4 ${
                      viewMode === "grid"
                        ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    }`}
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
                    className={`grid gap-4 ${
                      viewMode === "grid"
                        ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    }`}
                  >
                    {currentProducts.map((product) =>
                      renderProductCard(product)
                    )}
                  </div>
                ) : (
                  <Card className="py-8">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 rounded-full bg-gray-100 p-3">
                        <Search className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="mb-1 text-lg font-medium text-gray-700">
                        No products found
                      </h3>
                      <p className="mb-4 max-w-md text-gray-500">
                        We couldn't find any products matching your search
                        criteria. Try adjusting your filters or search terms.
                      </p>
                      <Button onClick={resetFilters}>Clear all filters</Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>

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
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="icon"
                        onClick={() => paginate(pageNum)}
                        className="h-8 w-8"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Filters Component
const MobileFilters = ({
  categories,
  categoryStructure,
  categoryIcons,
  activeCategory,
  activeSubcategory,
  expandedCategories,
  handleCategoryClick,
  toggleCategoryExpansion,
  handleSubcategoryClick,
  getCategoryKey,
  priceRange,
  setPriceRange,
  maxPrice,
  ratingFilter,
  setRatingFilter,
  availabilityFilter,
  setAvailabilityFilter,
  featuredOnly,
  setFeaturedOnly,
}) => {
  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
              <Button
                variant={activeCategory === "All" ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs font-normal"
                onClick={() => handleCategoryClick("All")}
              >
                <Tags className="mr-2 h-3.5 w-3.5" />
                All Categories
              </Button>

              {Object.keys(categoryStructure).map((category) => {
                const categoryKey = getCategoryKey(category);
                const isExpanded = expandedCategories[categoryKey];
                const isActive = activeCategory === category;

                return (
                  <div key={category} className="mt-1">
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-between text-xs font-normal"
                      onClick={() => {
                        if (!isActive) {
                          handleCategoryClick(category);
                        }
                        toggleCategoryExpansion(categoryKey);
                      }}
                    >
                      <span className="flex items-center">
                        {categoryIcons[category] || (
                          <Tag className="mr-2 h-3.5 w-3.5" />
                        )}
                        {category}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </Button>

                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-2">
                        {categoryStructure[category].map((subcat) => (
                          <Button
                            key={subcat}
                            variant={
                              activeSubcategory === subcat
                                ? "secondary"
                                : "ghost"
                            }
                            size="sm"
                            className="w-full justify-start text-xs font-normal"
                            onClick={() =>
                              handleSubcategoryClick(category, subcat)
                            }
                          >
                            {subcat}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-1 py-2">
              <div className="mb-4 flex justify-between text-xs">
                <span>Ksh. {priceRange[0].toLocaleString()}</span>
                <span>Ksh. {priceRange[1].toLocaleString()}</span>
              </div>
              <Slider
                defaultValue={[0, maxPrice]}
                value={priceRange}
                max={maxPrice}
                step={1000}
                onValueChange={(value) => setPriceRange(value)}
                className="mb-6"
              />
              <div className="flex gap-2">
                <Input
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
                  className="h-8 text-xs"
                />
                <Input
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
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 px-1 py-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant={ratingFilter === rating ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-xs font-normal"
                  onClick={() =>
                    setRatingFilter(ratingFilter === rating ? 0 : rating)
                  }
                >
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < rating ? (
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ) : (
                          <Star className="h-3 w-3 text-gray-300" />
                        )}
                      </span>
                    ))}
                  </div>
                  <span>{rating === 1 ? "& Up" : `& Up`}</span>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={availabilityFilter}
              onValueChange={setAvailabilityFilter}
              className="px-1 py-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="all"
                  id="mobile-all"
                  className="h-4 w-4"
                />
                <Label htmlFor="mobile-all" className="text-xs">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="inStock"
                  id="mobile-inStock"
                  className="h-4 w-4"
                />
                <Label htmlFor="mobile-inStock" className="text-xs">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="outOfStock"
                  id="mobile-outOfStock"
                  className="h-4 w-4"
                />
                <Label htmlFor="mobile-outOfStock" className="text-xs">
                  Out of Stock
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Featured Products */}
      <div className="px-1 py-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="mobile-featured-only"
            checked={featuredOnly}
            onCheckedChange={setFeaturedOnly}
          />
          <Label htmlFor="mobile-featured-only" className="text-sm">
            Featured Products Only
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

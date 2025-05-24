"use client";

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
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

// Sample furniture products for demonstration
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Modern Sectional Sofa with Chaise Lounge",
    price: 1299.99,
    originalPrice: 1799.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "living-room",
    subcategory: "Sofas",
    material: "Fabric",
    color: "Gray",
    dimensions: '112"W x 65"D x 36"H',
    rating: 4.7,
    reviews: 128,
    inStock: true,
    freeDelivery: true,
    assemblyRequired: true,
    badge: "BESTSELLER",
    store: true,
    brand: "Ashley Furniture",
  },
  {
    id: 2,
    name: "Queen Platform Bed with Storage Drawers",
    price: 799.99,
    originalPrice: 999.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "bedroom",
    subcategory: "Beds",
    material: "Wood",
    color: "Walnut",
    dimensions: '63"W x 84"D x 45"H',
    rating: 4.5,
    reviews: 86,
    inStock: true,
    freeDelivery: true,
    assemblyRequired: true,
    express: true,
    brand: "Zinus",
  },
  {
    id: 3,
    name: "Extendable Dining Table with 6 Chairs",
    price: 1499.99,
    originalPrice: 1899.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "dining-room",
    subcategory: "Dining Tables",
    material: "Wood",
    color: "Oak",
    dimensions: '72-96"W x 42"D x 30"H',
    rating: 4.8,
    reviews: 64,
    inStock: true,
    freeDelivery: true,
    assemblyRequired: true,
    badge: "NEW",
    brand: "Pottery Barn",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 349.99,
    originalPrice: 499.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "office",
    subcategory: "Office Chairs",
    material: "Mesh",
    color: "Black",
    dimensions: '26"W x 26"D x 48"H',
    rating: 4.6,
    reviews: 215,
    inStock: true,
    freeDelivery: false,
    assemblyRequired: true,
    express: true,
    brand: "Herman Miller",
  },
  {
    id: 5,
    name: "Outdoor Wicker Patio Set with Cushions",
    price: 899.99,
    originalPrice: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "outdoor",
    subcategory: "Patio Sets",
    material: "Wicker",
    color: "Brown",
    dimensions: 'Table: 40"D x 29"H, Chairs: 24"W x 25"D x 35"H',
    rating: 4.4,
    reviews: 52,
    inStock: true,
    freeDelivery: true,
    assemblyRequired: false,
    badge: "SALE",
    brand: "Hampton Bay",
  },
  {
    id: 6,
    name: "Marble Top Coffee Table with Gold Base",
    price: 449.99,
    originalPrice: 599.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "living-room",
    subcategory: "Coffee Tables",
    material: "Marble/Metal",
    color: "White/Gold",
    dimensions: '48"W x 24"D x 18"H',
    rating: 4.9,
    reviews: 37,
    inStock: true,
    freeDelivery: false,
    assemblyRequired: true,
    store: true,
    brand: "West Elm",
  },
  {
    id: 7,
    name: "King Size Memory Foam Mattress",
    price: 899.99,
    originalPrice: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "bedroom",
    subcategory: "Mattresses",
    material: "Memory Foam",
    color: "White",
    dimensions: '76"W x 80"D x 12"H',
    rating: 4.7,
    reviews: 312,
    inStock: true,
    freeDelivery: true,
    assemblyRequired: false,
    express: true,
    brand: "Casper",
  },
  {
    id: 8,
    name: "Solid Wood Bookshelf with 5 Shelves",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "living-room",
    subcategory: "Bookshelves",
    material: "Wood",
    color: "Espresso",
    dimensions: '36"W x 12"D x 72"H',
    rating: 4.5,
    reviews: 89,
    inStock: true,
    freeDelivery: false,
    assemblyRequired: true,
    brand: "IKEA",
  },
  {
    id: 9,
    name: "Velvet Accent Chair with Gold Legs",
    price: 349.99,
    originalPrice: 499.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "living-room",
    subcategory: "Accent Chairs",
    material: "Velvet",
    color: "Emerald Green",
    dimensions: '28"W x 32"D x 33"H',
    rating: 4.8,
    reviews: 64,
    inStock: true,
    freeDelivery: false,
    assemblyRequired: false,
    badge: "TRENDING",
    brand: "Article",
  },
  {
    id: 10,
    name: "Modern TV Stand with LED Lights",
    price: 399.99,
    originalPrice: 549.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "living-room",
    subcategory: "TV Stands",
    material: "Wood/Glass",
    color: "White/Black",
    dimensions: '63"W x 16"D x 24"H',
    rating: 4.6,
    reviews: 78,
    inStock: true,
    freeDelivery: true,
    assemblyRequired: true,
    brand: "Wayfair",
  },
  {
    id: 11,
    name: "Rustic Farmhouse Dining Table",
    price: 699.99,
    originalPrice: 899.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "dining-room",
    subcategory: "Dining Tables",
    material: "Reclaimed Wood",
    color: "Natural",
    dimensions: '72"W x 38"D x 30"H',
    rating: 4.9,
    reviews: 42,
    inStock: false,
    freeDelivery: true,
    assemblyRequired: false,
    brand: "Restoration Hardware",
  },
  {
    id: 12,
    name: "Mid-Century Modern Dresser",
    price: 599.99,
    originalPrice: 799.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "bedroom",
    subcategory: "Dressers",
    material: "Wood",
    color: "Walnut",
    dimensions: '58"W x 18"D x 36"H',
    rating: 4.7,
    reviews: 53,
    inStock: true,
    freeDelivery: true,
    assemblyRequired: true,
    brand: "AllModern",
  },
];

// Filter options
const FILTER_OPTIONS = {
  categories: [
    { id: "living-room", label: "Living Room" },
    { id: "bedroom", label: "Bedroom" },
    { id: "dining-room", label: "Dining Room" },
    { id: "office", label: "Office" },
    { id: "outdoor", label: "Outdoor" },
  ],
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
  features: [
    { id: "free-delivery", label: "Free Delivery" },
    { id: "express-delivery", label: "Express Delivery" },
    { id: "assembly-not-required", label: "No Assembly Required" },
    { id: "in-stock", label: "In Stock" },
    { id: "on-sale", label: "On Sale" },
  ],
};

// Related searches
const RELATED_SEARCHES = [
  "modern furniture",
  "wooden dining tables",
  "sectional sofas",
  "office chairs",
  "bedroom sets",
  "patio furniture",
  "storage solutions",
  "accent chairs",
];

export default function SearchResultsPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortOption, setSortOption] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    materials: [],
    colors: [],
    brands: [],
    features: [],
  });

  // Parse search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);

    // Simulate API call to fetch search results
    setLoading(true);
    setTimeout(() => {
      // Filter products based on search query (case insensitive)
      const results = query
        ? SAMPLE_PRODUCTS.filter(
            (product) =>
              product.name.toLowerCase().includes(query.toLowerCase()) ||
              product.category.toLowerCase().includes(query.toLowerCase()) ||
              product.subcategory.toLowerCase().includes(query.toLowerCase()) ||
              product.material.toLowerCase().includes(query.toLowerCase()) ||
              product.brand.toLowerCase().includes(query.toLowerCase())
          )
        : SAMPLE_PRODUCTS;

      setSearchResults(results);
      setLoading(false);
    }, 800); // Simulate network delay
  }, [location.search]);

  // Apply filters to search results
  const filteredResults = searchResults.filter((product) => {
    // Filter by category
    if (
      activeFilters.categories.length > 0 &&
      !activeFilters.categories.includes(product.category)
    ) {
      return false;
    }

    // Filter by material
    if (
      activeFilters.materials.length > 0 &&
      !activeFilters.materials.some((material) =>
        product.material.toLowerCase().includes(material.toLowerCase())
      )
    ) {
      return false;
    }

    // Filter by color
    if (
      activeFilters.colors.length > 0 &&
      !activeFilters.colors.some((color) =>
        product.color.toLowerCase().includes(color.toLowerCase())
      )
    ) {
      return false;
    }

    // Filter by brand
    if (
      activeFilters.brands.length > 0 &&
      !activeFilters.brands.some((brand) =>
        product.brand.toLowerCase().includes(brand.toLowerCase())
      )
    ) {
      return false;
    }

    // Filter by features
    if (activeFilters.features.length > 0) {
      for (const feature of activeFilters.features) {
        if (feature === "free-delivery" && !product.freeDelivery) return false;
        if (feature === "express-delivery" && !product.express) return false;
        if (feature === "assembly-not-required" && product.assemblyRequired)
          return false;
        if (feature === "in-stock" && !product.inStock) return false;
        if (feature === "on-sale" && !product.originalPrice) return false;
      }
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.id - a.id; // Using ID as a proxy for newness
      case "rating":
        return b.rating - a.rating;
      case "relevance":
      default:
        // For relevance, prioritize exact matches in name
        const aNameMatch = a.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const bNameMatch = b.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        return 0;
    }
  });

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
  };

  // Count total active filters
  const totalActiveFilters =
    activeFilters.categories.length +
    activeFilters.materials.length +
    activeFilters.colors.length +
    activeFilters.brands.length +
    activeFilters.features.length +
    (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  // Render filter section (desktop)
  const renderFilterSection = () => (
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
              {FILTER_OPTIONS.categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    className="mr-2"
                    checked={activeFilters.categories.includes(category.id)}
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
          <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
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

        {/* Material Filter */}
        <AccordionItem value="material">
          <AccordionTrigger className="py-2">Material</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {FILTER_OPTIONS.materials.map((material) => (
                <div key={material.id} className="flex items-center">
                  <Checkbox
                    id={`material-${material.id}`}
                    className="mr-2"
                    checked={activeFilters.materials.includes(material.id)}
                    onCheckedChange={() =>
                      handleFilterChange("materials", material.id)
                    }
                  />
                  <label
                    htmlFor={`material-${material.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {material.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color">
          <AccordionTrigger className="py-2">Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {FILTER_OPTIONS.colors.map((color) => (
                <div key={color.id} className="flex items-center">
                  <Checkbox
                    id={`color-${color.id}`}
                    className="mr-2"
                    checked={activeFilters.colors.includes(color.id)}
                    onCheckedChange={() =>
                      handleFilterChange("colors", color.id)
                    }
                  />
                  <label
                    htmlFor={`color-${color.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {color.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand">
          <AccordionTrigger className="py-2">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {FILTER_OPTIONS.brands.map((brand) => (
                <div key={brand.id} className="flex items-center">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    className="mr-2"
                    checked={activeFilters.brands.includes(brand.id)}
                    onCheckedChange={() =>
                      handleFilterChange("brands", brand.id)
                    }
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {brand.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Features Filter */}
        <AccordionItem value="features">
          <AccordionTrigger className="py-2">Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {FILTER_OPTIONS.features.map((feature) => (
                <div key={feature.id} className="flex items-center">
                  <Checkbox
                    id={`feature-${feature.id}`}
                    className="mr-2"
                    checked={activeFilters.features.includes(feature.id)}
                    onCheckedChange={() =>
                      handleFilterChange("features", feature.id)
                    }
                  />
                  <label
                    htmlFor={`feature-${feature.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  // Render active filters
  const renderActiveFilters = () => {
    if (totalActiveFilters === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {activeFilters.categories.map((categoryId) => {
          const category = FILTER_OPTIONS.categories.find(
            (c) => c.id === categoryId
          );
          return (
            <Badge
              key={`cat-${categoryId}`}
              variant="secondary"
              className="px-2 py-1"
            >
              {category?.label}
              <button
                onClick={() => handleFilterChange("categories", categoryId)}
                className="ml-1 hover:text-red-500"
                aria-label={`Remove ${category?.label} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          );
        })}

        {activeFilters.materials.map((materialId) => {
          const material = FILTER_OPTIONS.materials.find(
            (m) => m.id === materialId
          );
          return (
            <Badge
              key={`mat-${materialId}`}
              variant="secondary"
              className="px-2 py-1"
            >
              {material?.label}
              <button
                onClick={() => handleFilterChange("materials", materialId)}
                className="ml-1 hover:text-red-500"
                aria-label={`Remove ${material?.label} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          );
        })}

        {activeFilters.colors.map((colorId) => {
          const color = FILTER_OPTIONS.colors.find((c) => c.id === colorId);
          return (
            <Badge
              key={`col-${colorId}`}
              variant="secondary"
              className="px-2 py-1"
            >
              {color?.label}
              <button
                onClick={() => handleFilterChange("colors", colorId)}
                className="ml-1 hover:text-red-500"
                aria-label={`Remove ${color?.label} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          );
        })}

        {activeFilters.brands.map((brandId) => {
          const brand = FILTER_OPTIONS.brands.find((b) => b.id === brandId);
          return (
            <Badge
              key={`brand-${brandId}`}
              variant="secondary"
              className="px-2 py-1"
            >
              {brand?.label}
              <button
                onClick={() => handleFilterChange("brands", brandId)}
                className="ml-1 hover:text-red-500"
                aria-label={`Remove ${brand?.label} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          );
        })}

        {activeFilters.features.map((featureId) => {
          const feature = FILTER_OPTIONS.features.find(
            (f) => f.id === featureId
          );
          return (
            <Badge
              key={`feat-${featureId}`}
              variant="secondary"
              className="px-2 py-1"
            >
              {feature?.label}
              <button
                onClick={() => handleFilterChange("features", featureId)}
                className="ml-1 hover:text-red-500"
                aria-label={`Remove ${feature?.label} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          );
        })}

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
    );
  };

  // Render product grid
  const renderProductGrid = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-56 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (sortedResults.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No results found
          </h3>
          <p className="text-gray-500 mb-4">
            We couldn't find any furniture matching "{searchQuery}"
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
                  {RELATED_SEARCHES.map((term, i) => (
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
      );
    }

    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedResults.map((product) => (
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
                      product.image || "/placeholder.svg?height=300&width=300"
                    }
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  />
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm">
                    <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
                  </button>

                  {product.store && (
                    <Badge className="absolute bottom-2 left-2 bg-teal-600">
                      Official Store
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Badge className="bg-gray-800 text-white px-3 py-1 text-sm">
                        Out of Stock
                      </Badge>
                    </div>
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
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.inStock ? "Add to cart" : "Out of stock"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // List view
      return (
        <div className="space-y-4">
          {sortedResults.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row"
            >
              {/* Product Image */}
              <Link to={`/product/${product.id}`} className="sm:w-1/3 lg:w-1/4">
                <div className="relative h-56 sm:h-full overflow-hidden bg-gray-100">
                  <img
                    src={
                      product.image || "/placeholder.svg?height=300&width=300"
                    }
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  />
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
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Badge className="bg-gray-800 text-white px-3 py-1 text-sm">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-lg font-medium mb-1 hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center mb-2">
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
                    </div>
                    <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
                      <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 my-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Ruler className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{product.dimensions}</span>
                    </div>
                    {product.material && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-1">Material:</span>
                        <span>{product.material}</span>
                      </div>
                    )}
                    {product.color && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-1">Color:</span>
                        <span>{product.color}</span>
                      </div>
                    )}
                    {product.brand && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-1">Brand:</span>
                        <span>{product.brand}</span>
                      </div>
                    )}
                  </div>

                  {/* Delivery and Assembly Info */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
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
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-600 border-blue-200 text-xs px-1"
                      >
                        EXPRESS DELIVERY
                      </Badge>
                    )}
                    {product.store && (
                      <Badge className="bg-teal-600 text-xs">
                        Official Store
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-xl">
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

                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white sm:w-auto w-full"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.inStock ? "Add to cart" : "Out of stock"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

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
            {loading ? (
              <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            ) : (
              <>
                Search results for "{searchQuery}"
                <span className="text-gray-500 font-normal text-lg ml-2">
                  ({filteredResults.length}{" "}
                  {filteredResults.length === 1 ? "result" : "results"})
                </span>
              </>
            )}
          </h1>

          {/* Related Searches */}
          {!loading && filteredResults.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-600">Related searches:</span>
              {RELATED_SEARCHES.slice(0, 5).map((term, i) => (
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
                          {FILTER_OPTIONS.categories.map((category) => (
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

                    {/* Material Filter */}
                    <AccordionItem value="material">
                      <AccordionTrigger className="py-2">
                        Material
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {FILTER_OPTIONS.materials.map((material) => (
                            <div
                              key={material.id}
                              className="flex items-center"
                            >
                              <Checkbox
                                id={`mobile-material-${material.id}`}
                                className="mr-2"
                                checked={activeFilters.materials.includes(
                                  material.id
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange("materials", material.id)
                                }
                              />
                              <label
                                htmlFor={`mobile-material-${material.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {material.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Color Filter */}
                    <AccordionItem value="color">
                      <AccordionTrigger className="py-2">
                        Color
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {FILTER_OPTIONS.colors.map((color) => (
                            <div key={color.id} className="flex items-center">
                              <Checkbox
                                id={`mobile-color-${color.id}`}
                                className="mr-2"
                                checked={activeFilters.colors.includes(
                                  color.id
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange("colors", color.id)
                                }
                              />
                              <label
                                htmlFor={`mobile-color-${color.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {color.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Brand Filter */}
                    <AccordionItem value="brand">
                      <AccordionTrigger className="py-2">
                        Brand
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {FILTER_OPTIONS.brands.map((brand) => (
                            <div key={brand.id} className="flex items-center">
                              <Checkbox
                                id={`mobile-brand-${brand.id}`}
                                className="mr-2"
                                checked={activeFilters.brands.includes(
                                  brand.id
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange("brands", brand.id)
                                }
                              />
                              <label
                                htmlFor={`mobile-brand-${brand.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {brand.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Features Filter */}
                    <AccordionItem value="features">
                      <AccordionTrigger className="py-2">
                        Features
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {FILTER_OPTIONS.features.map((feature) => (
                            <div key={feature.id} className="flex items-center">
                              <Checkbox
                                id={`mobile-feature-${feature.id}`}
                                className="mr-2"
                                checked={activeFilters.features.includes(
                                  feature.id
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange("features", feature.id)
                                }
                              />
                              <label
                                htmlFor={`mobile-feature-${feature.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {feature.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
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
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Select value={sortOption} onValueChange={setSortOption}>
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
            {renderFilterSection()}
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Desktop Sort and View Options */}
            <div className="hidden md:flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <Select value={sortOption} onValueChange={setSortOption}>
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
            {renderActiveFilters()}

            {/* Products */}
            {renderProductGrid()}

            {/* Pagination */}
            {!loading && filteredResults.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
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

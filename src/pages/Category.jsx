"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Filter,
  Star,
  StarHalf,
  Heart,
  ShoppingCart,
  Ruler,
  Truck,
  Check,
  X,
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

// Sample furniture categories and products data
const furnitureCategories = {
  "living-room": {
    name: "Living Room",
    description: "Stylish and comfortable furniture for your living space",
    banner: "/banners/banner-aux.jpg?height=400&width=1200",
    subcategories: [
      "Sofas",
      "Coffee Tables",
      "TV Stands",
      "Accent Chairs",
      "Bookshelves",
    ],
    materials: ["Wood", "Fabric", "Leather", "Metal", "Glass"],
    brands: ["Ashley", "La-Z-Boy", "Pottery Barn", "West Elm", "IKEA"],
    styles: ["Modern", "Traditional", "Contemporary", "Rustic", "Scandinavian"],
  },
  bedroom: {
    name: "Bedroom",
    description:
      "Create your perfect sleep sanctuary with our bedroom furniture",
    banner: "/banners/banner-aux.jpg?height=400&width=1200",
    subcategories: [
      "Beds",
      "Mattresses",
      "Dressers",
      "Nightstands",
      "Wardrobes",
    ],
    materials: ["Wood", "Metal", "Upholstered", "Laminate"],
    brands: ["Sealy", "Serta", "Casper", "Tempur-Pedic", "IKEA"],
    styles: ["Modern", "Traditional", "Contemporary", "Rustic", "Minimalist"],
  },
  "dining-room": {
    name: "Dining Room",
    description: "Elegant dining furniture for memorable meals",
    banner: "/banners/banner-aux.jpg?height=400&width=1200",
    subcategories: [
      "Dining Tables",
      "Dining Chairs",
      "Buffets",
      "China Cabinets",
      "Bar Stools",
    ],
    materials: ["Wood", "Glass", "Metal", "Marble"],
    brands: [
      "Restoration Hardware",
      "Crate & Barrel",
      "Williams-Sonoma",
      "IKEA",
      "Wayfair",
    ],
    styles: ["Modern", "Traditional", "Farmhouse", "Industrial", "Mid-Century"],
  },
  office: {
    name: "Home Office",
    description: "Productive and stylish workspace furniture",
    banner: "/banners/banner-aux.jpg?height=400&width=1200",
    subcategories: [
      "Desks",
      "Office Chairs",
      "Bookcases",
      "Filing Cabinets",
      "Desk Lamps",
    ],
    materials: ["Wood", "Metal", "Glass", "Laminate"],
    brands: ["Herman Miller", "Steelcase", "Autonomous", "IKEA", "Wayfair"],
    styles: ["Modern", "Traditional", "Industrial", "Minimalist", "Ergonomic"],
  },
  outdoor: {
    name: "Outdoor Furniture",
    description: "Weather-resistant furniture for your outdoor spaces",
    banner: "/banners/banner-aux.jpg?height=400&width=1200",
    subcategories: [
      "Patio Sets",
      "Outdoor Sofas",
      "Dining Sets",
      "Lounge Chairs",
      "Umbrellas",
    ],
    materials: ["Wicker", "Teak", "Aluminum", "Resin", "Steel"],
    brands: ["Frontgate", "Outer", "Polywood", "Hampton Bay", "Yardbird"],
    styles: ["Modern", "Coastal", "Rustic", "Traditional", "Bohemian"],
  },
};

// Sample furniture products
const furnitureProducts = [
  {
    id: 1,
    name: "Modern Sectional Sofa with Chaise Lounge",
    price: 1299.99,
    originalPrice: 1799.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
  {
    id: 2,
    name: "Queen Platform Bed with Storage Drawers",
    price: 799.99,
    originalPrice: 999.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
  {
    id: 3,
    name: "Extendable Dining Table with 6 Chairs",
    price: 1499.99,
    originalPrice: 1899.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
  {
    id: 4,
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 349.99,
    originalPrice: 499.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
  {
    id: 5,
    name: "Outdoor Wicker Patio Set with Cushions",
    price: 899.99,
    originalPrice: 1299.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
  {
    id: 6,
    name: "Marble Top Coffee Table with Gold Base",
    price: 449.99,
    originalPrice: 599.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
  {
    id: 7,
    name: "King Size Memory Foam Mattress",
    price: 899.99,
    originalPrice: 1299.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
  {
    id: 8,
    name: "Solid Wood Bookshelf with 5 Shelves",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
  {
    id: 9,
    name: "Velvet Accent Chair with Gold Legs",
    price: 349.99,
    originalPrice: 499.99,
    image: "/placeholder.png?height=300&width=300",
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
  },
];

function CategoryPage() {
  const { slug } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFilters, setSelectedFilters] = useState({
    subcategories: [],
    materials: [],
    brands: [],
    styles: [],
    ratings: [],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    // Get category data or default to living-room
    const categoryData =
      furnitureCategories[slug] || furnitureCategories["living-room"];
    setCategory(categoryData);

    // Filter products based on category
    const filteredProducts = furnitureProducts.filter((product) => {
      if (slug) {
        return product.category === slug;
      }
      return true; // Show all if no category selected
    });

    setCategoryProducts(filteredProducts);
  }, [slug]);

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

  const clearFilters = () => {
    setSelectedFilters({
      subcategories: [],
      materials: [],
      brands: [],
      styles: [],
      ratings: [],
    });
    setPriceRange([0, 2000]);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                <span className="text-gray-500">{category.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Category Banner */}
      <div className="container mx-auto px-4 mb-6">
        <div className="relative rounded-lg overflow-hidden h-40 md:h-60">
          <img
            src={
              category.banner || "/banners/banner-aux.jpg?height=400&width=1200"
            }
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
              {category.name}
            </h1>
            <p className="text-white/90 text-sm md:text-base max-w-2xl">
              {category.description}
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
                          {category.subcategories.map((subcat) => (
                            <div key={subcat} className="flex items-center">
                              <Checkbox
                                id={`mobile-subcat-${subcat}`}
                                className="mr-2"
                                checked={selectedFilters.subcategories.includes(
                                  subcat
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange("subcategories", subcat)
                                }
                              />
                              <label
                                htmlFor={`mobile-subcat-${subcat}`}
                                className="text-sm cursor-pointer"
                              >
                                {subcat}
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
                          {category.materials.map((material) => (
                            <div key={material} className="flex items-center">
                              <Checkbox
                                id={`mobile-material-${material}`}
                                className="mr-2"
                                checked={selectedFilters.materials.includes(
                                  material
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange("materials", material)
                                }
                              />
                              <label
                                htmlFor={`mobile-material-${material}`}
                                className="text-sm cursor-pointer"
                              >
                                {material}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Style Filter */}
                    <AccordionItem value="style">
                      <AccordionTrigger className="py-2">
                        Style
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {category.styles.map((style) => (
                            <div key={style} className="flex items-center">
                              <Checkbox
                                id={`mobile-style-${style}`}
                                className="mr-2"
                                checked={selectedFilters.styles.includes(style)}
                                onCheckedChange={() =>
                                  handleFilterChange("styles", style)
                                }
                              />
                              <label
                                htmlFor={`mobile-style-${style}`}
                                className="text-sm cursor-pointer"
                              >
                                {style}
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
                          {category.brands.map((brand) => (
                            <div key={brand} className="flex items-center">
                              <Checkbox
                                id={`mobile-brand-${brand}`}
                                className="mr-2"
                                checked={selectedFilters.brands.includes(brand)}
                                onCheckedChange={() =>
                                  handleFilterChange("brands", brand)
                                }
                              />
                              <label
                                htmlFor={`mobile-brand-${brand}`}
                                className="text-sm cursor-pointer"
                              >
                                {brand}
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

                    {/* Rating Filter */}
                    <AccordionItem value="rating">
                      <AccordionTrigger className="py-2">
                        Rating
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {[4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center">
                              <Checkbox
                                id={`mobile-rating-${rating}`}
                                className="mr-2"
                                checked={selectedFilters.ratings.includes(
                                  rating
                                )}
                                onCheckedChange={() =>
                                  handleFilterChange("ratings", rating)
                                }
                              />
                              <label
                                htmlFor={`mobile-rating-${rating}`}
                                className="text-sm cursor-pointer flex items-center"
                              >
                                <div className="flex mr-1">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                </div>
                                & Up
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Apply Filters Button - Fixed at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setShowMobileFilters(false)}
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
                      {category.subcategories.map((subcat) => (
                        <div key={subcat} className="flex items-center">
                          <Checkbox
                            id={`subcat-${subcat}`}
                            className="mr-2"
                            checked={selectedFilters.subcategories.includes(
                              subcat
                            )}
                            onCheckedChange={() =>
                              handleFilterChange("subcategories", subcat)
                            }
                          />
                          <label
                            htmlFor={`subcat-${subcat}`}
                            className="text-sm cursor-pointer"
                          >
                            {subcat}
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
                      {category.materials.map((material) => (
                        <div key={material} className="flex items-center">
                          <Checkbox
                            id={`material-${material}`}
                            className="mr-2"
                            checked={selectedFilters.materials.includes(
                              material
                            )}
                            onCheckedChange={() =>
                              handleFilterChange("materials", material)
                            }
                          />
                          <label
                            htmlFor={`material-${material}`}
                            className="text-sm cursor-pointer"
                          >
                            {material}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Style Filter */}
                <AccordionItem value="style">
                  <AccordionTrigger className="py-2">Style</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {category.styles.map((style) => (
                        <div key={style} className="flex items-center">
                          <Checkbox
                            id={`style-${style}`}
                            className="mr-2"
                            checked={selectedFilters.styles.includes(style)}
                            onCheckedChange={() =>
                              handleFilterChange("styles", style)
                            }
                          />
                          <label
                            htmlFor={`style-${style}`}
                            className="text-sm cursor-pointer"
                          >
                            {style}
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
                      {category.brands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <Checkbox
                            id={`brand-${brand}`}
                            className="mr-2"
                            checked={selectedFilters.brands.includes(brand)}
                            onCheckedChange={() =>
                              handleFilterChange("brands", brand)
                            }
                          />
                          <label
                            htmlFor={`brand-${brand}`}
                            className="text-sm cursor-pointer"
                          >
                            {brand}
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

                {/* Rating Filter */}
                <AccordionItem value="rating">
                  <AccordionTrigger className="py-2">Rating</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Checkbox
                            id={`rating-${rating}`}
                            className="mr-2"
                            checked={selectedFilters.ratings.includes(rating)}
                            onCheckedChange={() =>
                              handleFilterChange("ratings", rating)
                            }
                          />
                          <label
                            htmlFor={`rating-${rating}`}
                            className="text-sm cursor-pointer flex items-center"
                          >
                            <div className="flex mr-1">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                            </div>
                            & Up
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Apply Filters Button */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Product Count and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">
                <span className="font-medium">{categoryProducts.length}</span>{" "}
                furniture items found
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select defaultValue="popularity">
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
                          product.image ||
                          "/placeholder.png?height=300&width=300"
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
            {categoryProducts.length === 0 && (
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

            {/* Add Pagination */}
            {categoryProducts.length > 0 && (
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
      </main>
    </div>
  );
}

export default CategoryPage;

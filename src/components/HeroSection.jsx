"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  ShoppingCart,
  Tag,
  Clock,
  Star,
  ChevronRight,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [latestProduct, setLatestProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Properly formatted category data with images and names
  const categories = [
    {
      id: "living-room",
      name: "Living Room",
      image: "/images/living-room.png",
    },
    { id: "bedroom", name: "Bedroom", image: "/images/bedroom.png" },
    { id: "dining", name: "Dining Room", image: "/images/dining.png" },
    { id: "office", name: "Office", image: "/images/office.png" },
  ];

  // Fetch the latest product
  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        // Try to fetch from API
        const response = await axios
          .get("https://bobbyfurnitureonline.onrender.com/api/products")
          .catch(() => {
            // If API fetch fails, use mock data
            console.log("Using mock data instead of API");
            return {
              data: [
                {
                  id: 1,
                  name: "Premium Leather Sofa Set",
                  description:
                    "Elegant 3-seater leather sofa with chrome legs and premium comfort",
                  price: 54449,
                  originalPrice: 60499,
                  category: "Living Room",
                  subcategory: "Sofas",
                  stock: 5,
                  rating: 4.8,
                  featured: true,
                  images: [
                    "https://via.placeholder.com/600x400?text=Premium+Leather+Sofa",
                  ],
                  date: "2023-05-15",
                  reviews: 120,
                },
              ],
            };
          });

        // // Sort by date to get the latest product
        // const sortedProducts = response.data.sort(
        //   (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
        // );

        // // Get the first (latest) product
        // const latest = sortedProducts[1];

        // Sort by date to get the latest product first
        const sortedProducts = response.data.sort(
          (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
        );

        // Get the last product
        const latest = sortedProducts[sortedProducts.length - 1];

        // Set the latest product
        setLatestProduct(latest);
      } catch (error) {
        console.error("Error fetching latest product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProduct();
  }, []);

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (latestProduct) {
      addToCart(latestProduct);
    }
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Enhanced Discount Banner */}
      <div className="fixed inset-x-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-4 px-4 md:px-8 text-center font-bold text-lg md:text-xl shadow-xl overflow-hidden z-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white opacity-10 blur-xl"></div>
          <div className="absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-yellow-300 opacity-10 blur-xl"></div>
          <div className="absolute left-1/4 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-white opacity-10 blur-lg animate-pulse"></div>
          <div className="absolute right-1/4 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-yellow-300 opacity-10 blur-lg animate-pulse"></div>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <Tag className="h-5 w-5 md:h-6 md:w-6 text-yellow-300 animate-bounce" />
          <span className="font-semibold">Special Offer:</span>
          <span className="text-yellow-300 font-bold text-lg md:text-2xl animate-pulse">
            10% OFF
          </span>
          <span className="hidden sm:inline">
            Everything! Limited Time Only
          </span>
          <span className="sm:hidden">Limited Time!</span>
          <Clock className="hidden sm:inline h-5 w-5 md:h-6 md:w-6 text-yellow-300 animate-pulse" />
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8 md:py-16 lg:py-24 mt-20 sm:mt-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <Badge className="inline-flex mb-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                New Collection 2025
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Transform Your Home With{" "}
                <span className="text-primary">Elegant Furniture</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover our curated collection of premium furniture pieces
                designed to elevate your living space with style and comfort.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span>4.9/5 (2,000+ reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Free delivery over Ksh. 10,000</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>30-day money-back guarantee</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto inline-flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
              <Link to="/collection">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto inline-flex items-center gap-2 border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  Explore Collection
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Enhanced Discount Callout */}
            <div className="mt-4 bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20 relative shadow-sm">
              <motion.div
                className="absolute h-16 w-16 -top-6 -right-3"
                animate={{
                  scale: [1, 1.2, 1, 1.2, 1],
                  rotate: [0, 3, -3, 3, -3, 0],
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <img src="/disc.png" alt="" />
              </motion.div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern
                    id="pattern"
                    patternUnits="userSpaceOnUse"
                    width="10"
                    height="10"
                    patternTransform="rotate(45)"
                  >
                    <line
                      x1="0"
                      y="0"
                      x2="0"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
              </div>

              <div className="">
                <h3 className="text-xl font-bold text-primary">
                  Special Discount Event
                </h3>
                <p className="text-muted-foreground mt-2">
                  Enjoy 10% off on all furniture items when you order this week.
                  {/* Use code{" "}
                  <span className="font-bold text-primary">FURNITURE10</span> at
                  checkout. */}
                </p>
                <Link to="/products">
                  <Button className="mt-4 bg-primary hover:bg-primary/90 transition-colors">
                    Claim Discount
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative lg:order-last">
            {loading ? (
              // Loading state
              <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-xl shadow-xl bg-muted flex items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
              </div>
            ) : (
              // Latest product display
              <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px]  rounded-xl shadow-xl group">
                {/* Latest Product Image */}
                <img
                  src={latestProduct?.images?.[0] || "/images/hero1.png"}
                  alt={latestProduct?.name || "Latest furniture product"}
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 "
                />

                <div className="absolute rounded-full h-14 w-14 top-10 z-40 right-2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg">
                  <img
                    src={latestProduct?.images?.[0] || "/images/hero1.png"}
                    alt={latestProduct?.name || "Latest furniture product"}
                    className=" object-cover rounded-full transition-transform duration-700 "
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/30 to-transparent"></div>

                {/* New Product Badge */}
                <motion.div
                  className="absolute -top-8 -left-4"
                  animate={{
                    y: [0, -10, 0], // Bouncing
                    scale: [1, 1.1, 1], // Pulsing
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <img src="/na4.png" alt="" className="h-20 sm:h-28" />
                </motion.div>

                {/* Product Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-background/40 backdrop-blur-sm transition-transform duration-300 border-t border-primary/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {latestProduct?.name || "Premium Furniture"}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {latestProduct?.description ||
                          "Elegant design with premium materials for your home"}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-primary">
                          Ksh.{" "}
                          {latestProduct?.price?.toLocaleString() || "54,449"}
                        </span>
                        {latestProduct?.originalPrice && (
                          <span className="text-sm line-through text-muted-foreground">
                            Ksh.{" "}
                            {latestProduct?.originalPrice?.toLocaleString() ||
                              "60,499"}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(latestProduct?.rating || 5)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span>({latestProduct?.reviews || "120"} reviews)</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Link to={`/products/${latestProduct?.id || 1}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-primary text-primary hover:bg-primary/10"
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Category and Availability */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {latestProduct?.category && (
                      <Badge variant="secondary" className="text-xs">
                        {latestProduct.category}
                      </Badge>
                    )}
                    {latestProduct?.subcategory && (
                      <Badge variant="outline" className="text-xs">
                        {latestProduct.subcategory}
                      </Badge>
                    )}
                    {latestProduct?.stock > 0 ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 text-xs"
                      >
                        In Stock
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 text-xs"
                      >
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Featured Categories */}
        <div className="mt-16 md:mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop By Category</h2>
            <Link
              to="/categories"
              className="text-primary flex items-center hover:underline"
            >
              View All Categories
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-[180px] md:h-[220px] bg-muted relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={`${category.name} furniture`}
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent group-hover:from-primary/90 group-hover:via-primary/40 transition-colors duration-300"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="font-medium text-lg text-white group-hover:text-white transition-colors duration-300">
                    {category.name}
                  </h3>
                  <div className="flex items-center mt-2 text-white/80 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm">Browse Collection</span>
                    <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

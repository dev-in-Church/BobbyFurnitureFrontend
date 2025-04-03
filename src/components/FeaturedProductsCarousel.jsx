"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Eye,
  Heart,
  Check,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturedProductsCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});
  const [wishlist, setWishlist] = useState({});
  const { addToCart } = useCart();
  const carouselRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  // Number of products to show at once based on screen size
  const getVisibleCount = () => {
    if (window.innerWidth >= 1280) return 4; // xl - 4 products
    if (window.innerWidth >= 1024) return 3; // lg - 3 products
    if (window.innerWidth >= 640) return 2; // sm - 2 products
    return 1; // xs - 1 product
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const totalSlides = Math.max(0, products.length - visibleCount + 1);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleCount = getVisibleCount();
      setVisibleCount(newVisibleCount);

      // Adjust currentIndex if needed after resize
      if (currentIndex > products.length - newVisibleCount) {
        setCurrentIndex(Math.max(0, products.length - newVisibleCount));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, products.length]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios
          .get("https://bobbyfurnitureonline.onrender.com/api/products")
          .catch(() => {
            console.log("Using mock data instead of API");
            return {
              data: Array(12)
                .fill()
                .map((_, i) => ({
                  id: i + 1,
                  name: `${
                    i % 3 === 0 ? "Premium" : i % 3 === 1 ? "Luxury" : "Modern"
                  } ${
                    i % 4 === 0
                      ? "Sofa"
                      : i % 4 === 1
                      ? "Dining Table"
                      : i % 4 === 2
                      ? "Bed Frame"
                      : "Armchair"
                  }`,
                  description: "Premium quality furniture for your home",
                  price: 25000 + i * 5000,
                  originalPrice: i % 2 === 0 ? 30000 + i * 5000 : null,
                  category:
                    i % 3 === 0
                      ? "Living Room"
                      : i % 3 === 1
                      ? "Bedroom"
                      : "Dining",
                  subcategory:
                    i % 4 === 0
                      ? "Sofas"
                      : i % 4 === 1
                      ? "Tables"
                      : i % 4 === 2
                      ? "Beds"
                      : "Chairs",
                  stock: 5 + (i % 5),
                  rating: 3.5 + (i % 5) * 0.3,
                  featured: true,
                  images: [
                    `https://via.placeholder.com/600x600?text=Furniture+${
                      i + 1
                    }`,
                  ],
                  reviews: 10 + i * 3,
                })),
            };
          });

        // Filter for featured products
        const featuredProducts = response.data.filter(
          (product) => product.featured
        );
        setProducts(
          featuredProducts.length > 0
            ? featuredProducts
            : response.data.slice(0, 12)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && products.length > visibleCount) {
      autoplayTimerRef.current = setInterval(() => {
        if (!isTransitioning) {
          nextSlide();
        }
      }, 5000);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, products.length, visibleCount, isTransitioning]);

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, products.length - visibleCount);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, products.length - visibleCount);
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);

    // Show added confirmation
    setAddedToCart({ ...addedToCart, [product.id]: true });
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [product.id]: false });
    }, 2000);
  };

  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist({ ...wishlist, [productId]: !wishlist[productId] });
  };

  const handleQuickView = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement quick view functionality here
    console.log("Quick view", product);
  };

  if (loading) {
    return (
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading featured products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            No featured products available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-2">
              Discover our handpicked selection of premium furniture
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Pagination dots for mobile */}
            <div className="flex gap-1.5 md:hidden">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Link
              to="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All Products
            </Link>
          </div>
        </div>
        <div className="relative">
          {/* Side navigation buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={prevSlide}
              disabled={isTransitioning}
              className="h-10 w-10 rounded-full shadow-lg bg-white/90 hover:bg-white text-primary border-none transform -translate-x-1/2 transition-all duration-200 hover:scale-110 pointer-events-auto opacity-100 group-hover:opacity-100 focus:opacity-100 md:opacity-70 z-50"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={nextSlide}
              disabled={isTransitioning}
              className="h-10 w-10 rounded-full shadow-lg bg-white/90 hover:bg-white text-primary border-none transform translate-x-1/2 transition-all duration-200 hover:scale-110 pointer-events-auto opacity-100 group-hover:opacity-100 focus:opacity-100 md:opacity-70"
              aria-label="Next products"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div
            className="overflow-hidden group"
            ref={carouselRef}
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <div
              className="flex transition-all duration-500  ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCount)
                }%)`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <Card className="h-full group overflow-hidden transition-all duration-300 hover:shadow-lg border-gray-200">
                    <Link
                      to={`/products/${product.id}`}
                      className="block h-full"
                    >
                      {/* Product Image with Badges */}
                      <div className="relative">
                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <Badge
                              variant="destructive"
                              className="absolute top-3 left-3 z-10 px-2 py-1 text-xs font-medium"
                            >
                              {Math.round(
                                (1 - product.price / product.originalPrice) *
                                  100
                              )}
                              % OFF
                            </Badge>
                          )}

                        {product.stock <= 3 && (
                          <Badge className="absolute top-3 right-3 z-10 px-2 py-1 text-xs font-medium bg-amber-500">
                            Low Stock
                          </Badge>
                        )}

                        <div className="aspect-square w-full overflow-hidden bg-gray-100">
                          <img
                            src={
                              product.images?.[0] ||
                              "https://via.placeholder.com/600x600?text=Product" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>

                        {/* Wishlist button */}
                        <button
                          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 z-20"
                          onClick={(e) => toggleWishlist(e, product.id)}
                          aria-label={
                            wishlist[product.id]
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              wishlist[product.id]
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </button>

                        {/* Quick Action Buttons */}
                        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/20">
                          <AnimatePresence>
                            {addedToCart[product.id] ? (
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Added to Cart
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="flex gap-2"
                              >
                                <Button
                                  size="sm"
                                  className="bg-white text-primary hover:bg-primary hover:text-white transition-colors shadow-md"
                                  onClick={(e) => handleAddToCart(e, product)}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  Add to Cart
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-white border-primary text-primary hover:bg-primary hover:text-white transition-colors shadow-md"
                                  onClick={(e) => handleQuickView(e, product)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Quick View
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Product Details */}
                      <CardContent className="p-4">
                        {/* Category */}
                        <div className="mb-1">
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            {product.category}
                          </Badge>
                        </div>

                        {/* Title */}
                        <h3 className="font-medium text-gray-900 line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center mb-2">
                          <div className="flex mr-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3.5 w-3.5 ${
                                  star <= Math.floor(product.rating || 0)
                                    ? "fill-amber-400 text-amber-400"
                                    : star - 0.5 <= product.rating
                                    ? "fill-amber-400 text-amber-400 fill-[50%]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({product.reviews || 0})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-primary">
                            Ksh. {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                Ksh. {product.originalPrice.toLocaleString()}
                              </span>
                            )}
                        </div>

                        {/* Stock indicator */}
                        <div className="mt-2 flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full mr-1.5 ${
                              product.stock > 5
                                ? "bg-green-500"
                                : product.stock > 0
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-500">
                            {product.stock > 5
                              ? "In Stock"
                              : product.stock > 0
                              ? `Only ${product.stock} left`
                              : "Out of Stock"}
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop pagination dots */}
        <div className="hidden md:flex justify-center mt-8 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/products"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

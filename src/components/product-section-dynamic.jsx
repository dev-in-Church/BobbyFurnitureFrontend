"use client";

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Check,
} from "lucide-react";
import {
  fetchProductsByCategory,
  fetchNewArrivals,
  fetchFeaturedProducts,
} from "../lib/api-production";
import { useCart } from "../contexts/cart-context";
import { useWishlist } from "../contexts/wishlist-context";
import { useQuery } from "@tanstack/react-query";

export default function ProductSectionDynamic({
  title,
  viewMoreLink,
  color = "blue-500",
  text,
  category = null,
  type = "category",
  limit = 9,
}) {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const [addedToWishlist, setAddedToWishlist] = useState(null);

  // Cart and wishlist contexts
  const { addToCart, isInCart, isLoading: cartLoading } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // -------------------------------
  // ✅ React Query data fetching
  // -------------------------------
  const queryKey = ["products", type, category, limit];

  const queryFn = async () => {
    switch (type) {
      case "new-arrivals":
        return await fetchNewArrivals(limit);
      case "featured":
        return await fetchFeaturedProducts(limit);
      default:
        if (!category)
          throw new Error('Category is required when type is "category"');
        return await fetchProductsByCategory(category, { limit });
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 10, // ✅ Keep cached for 10 minutes
    cacheTime: 1000 * 60 * 30, // ✅ Cache kept for 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const products = Array.isArray(data) ? data : data?.products || [];

  // -------------------------------
  // Scroll arrows visibility
  // -------------------------------
  const checkScrollPosition = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => slider.removeEventListener("scroll", checkScrollPosition);
    }
  }, []); // Only run once on mount
  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= 200;
  };
  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += 200;
  };

  // -------------------------------
  // Cart & wishlist handling
  // -------------------------------
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    setAddedToWishlist(product.id);
    setTimeout(() => setAddedToWishlist(null), 2000);
  };

  // -------------------------------
  // UI Helpers
  // -------------------------------
  const bgColorClass = `bg-${color}`;
  const txtColor = `text-${text}`;

  // -------------------------------
  // Render
  // -------------------------------
  if (isError) {
    return (
      <div className="mb-4 bg-white rounded-sm shadow-md overflow-hidden">
        <div
          className={`flex justify-between px-4 py-1 items-center ${bgColorClass}`}
        >
          <h2
            className={`text-sm sm:text-md ${txtColor} md:text-lg font-medium tracking-wide`}
          >
            {title}
          </h2>
        </div>
        <div className="py-6 text-center text-red-500">
          Error loading products: {error.message}
          <button
            onClick={() => refetch()}
            className="ml-3 px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 bg-white rounded-sm shadow-md overflow-hidden">
      <div
        className={`flex justify-between px-4 py-1 items-center ${bgColorClass}`}
      >
        <h2
          className={`text-sm sm:text-md ${txtColor} md:text-lg font-medium tracking-wide`}
        >
          {title}
        </h2>
        <Link
          to={viewMoreLink}
          className={`flex ${txtColor} hover:text-gray-600 text-sm items-center transition-colors`}
        >
          <span>See All</span> <ChevronRight className="h-4 ml-1" />
        </Link>
      </div>

      <div className="relative px-1 py-1 bg-gray-50">
        {/* Slider navigation */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg p-2 border border-gray-200 hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg p-2 border border-gray-200 hidden md:flex"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="px-4 py-6">
            <div className="flex gap-2 overflow-hidden">
              {Array(limit)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-[160px] min-w-[160px] sm:min-w-[190px] md:min-w-[190px] bg-white border border-gray-100 animate-pulse rounded-lg"
                  >
                    <div className="relative h-40 w-full bg-gray-200"></div>
                    <div className="px-3 py-3 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Products */}
        {!isLoading && products.length > 0 && (
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-2 px-1 py-1 pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {products.map((product) => {
              const discount =
                product.original_price &&
                Math.round(
                  ((product.original_price - product.price) /
                    product.original_price) *
                    100
                );

              const productInWishlist = isInWishlist(product.id);
              const productInCart = isInCart(product.id);
              const showCartSuccess = addedToCart === product.id;
              const showWishlistSuccess = addedToWishlist === product.id;

              return (
                <div
                  key={product.id}
                  className="w-[160px] min-w-[160px] sm:min-w-[190px] md:min-w-[190px] rounded-[2px] overflow-hidden flex-shrink-0 hover:shadow-sm transition-all"
                  onMouseEnter={() => setIsHovering(product.id)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <Link to={`/product/${product.id}`} className="block h-full">
                    <div className="relative h-40 w-full overflow-hidden">
                      {discount > 0 && (
                        <div className="absolute top-1 right-1 bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded-sm z-10">
                          -{discount}%
                        </div>
                      )}
                      <img
                        src={
                          product.images?.[0] ||
                          "/placeholder.svg?height=200&width=200"
                        }
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            "/placeholder.svg?height=200&width=200";
                        }}
                      />
                      {/* Hover actions */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                          isHovering === product.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className={`p-1.5 rounded-full transition-all ${
                            showCartSuccess || productInCart
                              ? "bg-green-500 text-white"
                              : "bg-primary text-white hover:scale-110"
                          }`}
                        >
                          {showCartSuccess || productInCart ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <ShoppingCart className="h-4 w-4" />
                          )}
                        </button>

                        <button
                          onClick={(e) => handleToggleWishlist(e, product)}
                          className={`p-1.5 rounded-full transition-all ${
                            showWishlistSuccess || productInWishlist
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:scale-110"
                          }`}
                        >
                          {showWishlistSuccess ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Heart
                              className={`h-4 w-4 ${
                                productInWishlist ? "fill-current" : ""
                              }`}
                            />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="truncate text-sm font-medium text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <div className="flex flex-col items-start">
                        <p className="text-gray-600 font-bold">
                          KSh{" "}
                          {product.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        {product.original_price && (
                          <p className="text-xs text-gray-400 line-through">
                            KSh{" "}
                            {product.original_price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && products.length === 0 && (
          <div className="w-full py-8 text-center text-gray-500">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

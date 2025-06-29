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

export default function ProductSectionDynamic({
  title,
  viewMoreLink,
  color = "blue-500",
  text,
  category = null,
  type = "category", // category, new-arrivals, featured
  limit = 9,
}) {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const [addedToWishlist, setAddedToWishlist] = useState(null);

  // Use cart and wishlist contexts
  const { addToCart, isInCart, isLoading: cartLoading } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;

        switch (type) {
          case "new-arrivals":
            data = await fetchNewArrivals(limit);
            break;
          case "featured":
            data = await fetchFeaturedProducts(limit);
            break;
          case "category":
          default:
            if (!category) {
              throw new Error('Category is required when type is "category"');
            }
            data = await fetchProductsByCategory(category, { limit });
            break;
        }

        // Handle both array response and paginated response
        const productsData = data.products || data;
        setProducts(productsData || []);

        if (productsData && productsData.length > 0) {
          console.log(`✅ Loaded ${productsData.length} products for ${title}`);
        }
      } catch (err) {
        console.error(`Error fetching products for ${title}:`, err);
        setError(`Unable to load ${title.toLowerCase()}. ${err.message}`);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, type, limit, title]);

  // Check if scrolling is possible and update arrow visibility
  const checkScrollPosition = () => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  // Add scroll event listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollPosition);
      // Initial check
      checkScrollPosition();

      return () => {
        slider.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, [products]);

  // Handle scroll actions
  const scrollLeft = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: -containerWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: containerWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  // Handle add to cart
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
    setAddedToCart(product.id);

    // Reset the feedback after 2 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  // Handle add to wishlist
  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(product);
    setAddedToWishlist(product.id);

    // Reset the feedback after 2 seconds
    setTimeout(() => {
      setAddedToWishlist(null);
    }, 2000);
  };

  // Dynamic color classes
  const getColorClass = (baseColor) => {
    // return baseColor.includes("-") ? baseColor : `${baseColor}-500`;
    return baseColor;
  };

  const bgColorClass = `bg-${getColorClass(color)}`;
  const txtColor = `text-${getColorClass(text)}`;
  // console.log(txtColor);
  // console.log(bgColorClass);

  return (
    <div className="mb-6 bg-white rounded-sm shadow-md overflow-hidden">
      <div
        className={`flex justify-between px-6 py-2 items-center ${bgColorClass}`}
      >
        <h2
          className={`text-sm sm:text-md ${txtColor}  md:text-lg font-medium tracking-wide`}
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
        {/* Slider navigation buttons */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg p-2 transition-all duration-200 border border-gray-200 hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg p-2 transition-all duration-200 border border-gray-200 hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {/* Loading state with skeleton */}
        {loading && (
          <div className="px-4 py-6">
            <div className="flex gap-4 overflow-hidden">
              {Array(limit || 9)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-[160px] min-w-[160px] sm:min-w-[190px] md:min-w-[200px] bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 animate-pulse"
                  >
                    <div className="relative h-40 w-full bg-gray-200">
                      <div className="absolute top-2 right-2 h-6 w-12 bg-gray-300 rounded-md"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 bg-white/80 backdrop-blur-sm">
                        <div className="h-7 w-7 bg-gray-300 rounded-full"></div>
                        <div className="h-7 w-7 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <div className="px-3 py-3 space-y-2">
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col justify-center items-center py-12 px-4 text-center">
            <div className="text-red-500 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium text-red-600">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Product slider */}
        {!loading && !error && (
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-2 px-1 py-1 pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {products.length > 0 ? (
              products.map((product) => {
                // Calculate discount percentage if original_price exists
                const discountPercentage = product.original_price
                  ? Math.round(
                      ((product.original_price - product.price) /
                        product.original_price) *
                        100
                    )
                  : 0;

                const productInWishlist = isInWishlist(product.id);
                const productInCart = isInCart(product.id);
                const showCartSuccess = addedToCart === product.id;
                const showWishlistSuccess = addedToWishlist === product.id;

                return (
                  <div
                    key={product.id}
                    className="w-[160px] min-w-[160px] sm:min-w-[190px] md:min-w-[190px]  rounded-sm overflow-hidden flex-shrink-0 transition-all duration-300 hover:shadow-lg border border-primary"
                    onMouseEnter={() => setIsHovering(product.id)}
                    onMouseLeave={() => setIsHovering(null)}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="block h-full"
                    >
                      <div className="relative h-40 w-full overflow-hidden">
                        {/* Discount tag */}
                        {discountPercentage > 0 && (
                          <div
                            className={`absolute top-2 right-2 ${bgColorClass} text-white text-xs font-bold px-2 py-1 rounded-md z-10`}
                          >
                            -{discountPercentage}%
                          </div>
                        )}
                        <img
                          src={
                            product.images?.[0] ||
                            "/placeholder.svg?height=200&width=200" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src =
                              "/placeholder.svg?height=200&width=200";
                          }}
                        />

                        {/* Quick action buttons that appear on hover */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                            isHovering === product.id
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className={`p-1.5 rounded-full transition-all duration-200 ${
                              showCartSuccess
                                ? "bg-green-500 text-white"
                                : productInCart
                                ? "bg-green-500 text-white"
                                : "bg-primary text-white hover:scale-110"
                            }`}
                            aria-label={
                              productInCart ? "Added to cart" : "Add to cart"
                            }
                            disabled={cartLoading || showCartSuccess}
                          >
                            {showCartSuccess || productInCart ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <ShoppingCart className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={(e) => handleToggleWishlist(e, product)}
                            className={`p-1.5 rounded-full transition-all duration-200 ${
                              showWishlistSuccess
                                ? "bg-green-500 text-white"
                                : productInWishlist
                                ? "bg-red-500 text-white hover:scale-110"
                                : "bg-gray-200 text-gray-700 hover:scale-110"
                            }`}
                            aria-label={
                              productInWishlist
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            disabled={showWishlistSuccess}
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
                      <div className="px-3 py-3">
                        <h3 className="truncate text-sm line-clamp-2 h-10 font-medium text-gray-800 mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-baseline">
                          <p className={`text-gray-600 font-bold`}>
                            KSh{" "}
                            {product.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          {product.original_price && (
                            <p className="text-xs text-gray-400 line-through ml-2">
                              KSh{" "}
                              {product.original_price.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="w-full py-8 text-center text-gray-500">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

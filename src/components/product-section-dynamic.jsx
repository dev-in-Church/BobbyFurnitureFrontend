"use client";

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Loader2,
} from "lucide-react";
import {
  fetchProductsByCategory,
  fetchNewArrivals,
  fetchFeaturedProducts,
} from "../lib/api-final";

export default function ProductSectionDynamic({
  title,
  viewMoreLink,
  color = "blue-500",
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
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");

        // Fallback to empty array
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, type, limit]);

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

  // Dynamic color classes
  const getColorClass = (baseColor) => {
    // Ensure the color is properly formatted
    return baseColor.includes("-") ? baseColor : `${baseColor}-500`;
  };

  const bgColorClass = `bg-${getColorClass(color)}`;
  const hoverColorClass = `hover:bg-${getColorClass(color)}`;

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className={`flex justify-between px-6 py-3 items-center ${bgColorClass}`}
      >
        <h2 className="text-md text-white md:text-lg font-medium tracking-wide">
          {title}
        </h2>
        <Link
          to={viewMoreLink}
          className="flex text-white hover:text-gray-100 text-sm items-center transition-colors"
        >
          <span>See All</span> <ChevronRight className="h-4 ml-1" />
        </Link>
      </div>

      <div className="relative px-1 py-3 bg-gray-50">
        {/* Slider navigation buttons */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg p-2 transition-all duration-200 border border-gray-200 hidden md:flex items-center justify-center`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg p-2 transition-all duration-200 border border-gray-200 hidden md:flex items-center justify-center`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
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
              <p className="text-lg font-medium">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && process.env.NODE_ENV === "development" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mx-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Development Mode:</strong> Using mock data because API
                  endpoints are not available.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Product slider */}
        {!loading && !error && (
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 px-4 py-2 pb-4"
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

                return (
                  <div
                    key={product.id}
                    className="w-[160px] min-w-[160px] sm:min-w-[190px] md:min-w-[200px] bg-white rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 hover:shadow-lg border border-gray-100"
                    onMouseEnter={() => setIsHovering(product.id)}
                    onMouseLeave={() => setIsHovering(null)}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="block h-full"
                    >
                      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
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
                            "/placeholder.svg?height=200&width=200"
                          }
                          alt={product.name}
                          className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
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
                            className={`p-1.5 rounded-full ${bgColorClass} text-white hover:scale-110 transition-transform`}
                            aria-label="Add to cart"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-full bg-gray-200 text-gray-700 hover:scale-110 transition-transform"
                            aria-label="Add to wishlist"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="px-3 py-3">
                        <h3 className="text-sm line-clamp-2 h-10 font-medium text-gray-800 mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-baseline">
                          <p
                            className={`text-${getColorClass(color)} font-bold`}
                          >
                            Ksh{" "}
                            {product.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          {product.original_price && (
                            <p className="text-xs text-gray-500 line-through ml-2">
                              Ksh{" "}
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

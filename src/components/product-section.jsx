"use client";

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";

export default function ProductSection({
  title,
  products,
  viewMoreLink,
  color = "blue-500",
}) {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(null);

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
  }, []);

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

        {/* Product slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 px-4 py-2 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {products.map((product) => {
            // Calculate discount percentage if originalPrice exists
            const discountPercentage = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
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
                <Link to={`/product/${product.id}`} className="block h-full">
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
                        product.image || "/placeholder.svg?height=200&width=200"
                      }
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />

                    {/* Quick action buttons that appear on hover */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                        isHovering === product.id ? "opacity-100" : "opacity-0"
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
                      <p className={`text-${getColorClass(color)} font-bold`}>
                        Ksh{" "}
                        {product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      {product.originalPrice && (
                        <p className="text-xs text-gray-500 line-through ml-2">
                          Ksh{" "}
                          {product.originalPrice.toLocaleString(undefined, {
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
      </div>
    </div>
  );
}

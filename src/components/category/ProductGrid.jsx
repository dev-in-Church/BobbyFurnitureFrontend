"use client";

import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Check } from "lucide-react";
import { useCart } from "../../contexts/cart-context";
import { useWishlist } from "../../contexts/wishlist-context";
import { useState } from "react";
import { showToast } from "../ui/toast";

const ProductGrid = ({ products, loading }) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addingToCart, setAddingToCart] = useState({});

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-3">
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // No products found
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or search for something else.
        </p>
      </div>
    );
  }

  // Format price in Kenyan Shillings
  const formatPrice = (price) => {
    const numericPrice = Number.parseFloat(price || 0);
    return `KSh ${numericPrice.toLocaleString("en-KE")}`;
  };

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, currentPrice) => {
    const original = Number.parseFloat(originalPrice || 0);
    const current = Number.parseFloat(currentPrice || 0);

    if (!original || original <= current) return null;
    const discount = ((original - current) / original) * 100;
    return Math.round(discount);
  };

  // Handle add to cart
  const handleAddToCart = async (product, e) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();

    if (isInCart(product.id)) {
      showToast({
        type: "cart",
        title: "Already in cart",
        message: `${product.name} is already in your cart`,
      });
      return;
    }

    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));

    try {
      // Create cart item object
      const cartItem = {
        id: product.id,
        name: product.name,
        price: Number.parseFloat(product.price || 0),
        image: product.images?.[0] || "/placeholder.svg?height=200&width=200",
        category: product.category,
        quantity: 1,
      };

      await addToCart(cartItem);

      showToast({
        type: "cart",
        title: "Added to cart",
        message: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to add item to cart. Please try again.",
      });
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (product, e) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();

    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: Number.parseFloat(product.price || 0),
      originalPrice: product.original_price
        ? Number.parseFloat(product.original_price)
        : null,
      image: product.images?.[0] || "/placeholder.svg?height=200&width=200",
      category: product.category,
      featured: product.featured,
      onSale:
        product.original_price &&
        Number.parseFloat(product.original_price) >
          Number.parseFloat(product.price),
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast({
        type: "wishlist",
        title: "Removed from wishlist",
        message: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(wishlistItem);
      showToast({
        type: "wishlist",
        title: "Added to wishlist",
        message: `${product.name} has been added to your wishlist`,
      });
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map((product) => {
        const discountPercentage = calculateDiscount(
          product.original_price,
          product.price
        );
        const inWishlist = isInWishlist(product.id);
        const inCart = isInCart(product.id);
        const isAddingToCart = addingToCart[product.id];

        return (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-200 relative"
          >
            {/* Wishlist Button */}
            <button
              onClick={(e) => handleWishlistToggle(product, e)}
              className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition-all duration-200 hover:scale-110 ${
                inWishlist
                  ? "bg-red-500 text-white opacity-100"
                  : "bg-white text-gray-600 hover:bg-gray-50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              }`}
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={14} className={inWishlist ? "fill-current" : ""} />
            </button>

            <Link to={`/product/${product.id}`} className="block">
              {/* Product Image */}
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                <img
                  src={
                    product.images?.[0] ||
                    "/placeholder.svg?height=200&width=200"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy" // This helps defer image loading
                />

                {/* Discount Badge */}
                {discountPercentage && (
                  <div className="absolute top-2 left-2 bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded-sm z-10">
                    -{discountPercentage}%
                  </div>
                )}

                {/* Featured Badge */}
                {product.featured && !discountPercentage && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                    Featured
                  </div>
                )}

                {/* In Cart Indicator */}
                {inCart && (
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                    <Check size={12} />
                    In Cart
                  </div>
                )}
              </div>

              <div className="p-3 pb-2">
                {/* Product Category */}
                {/* <div className="text-xs text-gray-500 mb-1 capitalize">
                  {product.category?.replace(/-/g, " ")}
                </div> */}

                {/* Product Name */}
                <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                {/* Rating Stars */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-bold">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  {product.original_price && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.original_price)}
                      </span>
                      {discountPercentage && (
                        <span className="text-xs text-primary font-medium">
                          -{discountPercentage}%
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Stock Status */}
                {product.stock && product.stock < 10 && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600 font-medium">
                      Only {product.stock} left in stock
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Add to Cart Button - Shows on hover or if already in cart */}
            <div
              className={`p-3 pt-0 transition-opacity duration-200 ${
                inCart
                  ? "opacity-100"
                  : "opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              }`}
            >
              <button
                onClick={(e) => handleAddToCart(product, e)}
                disabled={isAddingToCart}
                className={`w-full text-sm font-medium py-2 rounded-md flex items-center justify-center gap-2 transition-colors ${
                  inCart
                    ? "bg-green-500 text-white cursor-default"
                    : isAddingToCart
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 hover:bg-primary text-white"
                }`}
                title={inCart ? "Already in cart" : "Add to cart"}
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Adding...</span>
                  </>
                ) : inCart ? (
                  <>
                    <Check size={14} />
                    <span>In Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={14} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;

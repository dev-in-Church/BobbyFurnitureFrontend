"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/cart-context";
import { useWishlist } from "../contexts/wishlist-context";
import {
  ShoppingCart,
  Heart,
  Eye,
  Star,
  Zap,
  Truck,
  Shield,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const ProductCardEnhanced = ({ product, className = "" }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const stockStatus = product.stock > 0 ? "in-stock" : "out-of-stock";
  const lowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (stockStatus === "out-of-stock") return;
    addToCart(product);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountPercentage =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  return (
    <Card
      className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative bg-gray-100 aspect-square overflow-hidden">
          {!imageError ? (
            <img
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.name}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-center text-gray-400">
                <Eye className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Image not available</p>
              </div>
            </div>
          )}

          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {product.featured && (
              <Badge className="bg-yellow-500 text-white text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 text-white text-xs">
                -{discountPercentage}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-green-500 text-white text-xs">New</Badge>
            )}
            {lowStock && (
              <Badge className="bg-orange-500 text-white text-xs">
                Low Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-3 right-3 bg-white/80 hover:bg-white transition-all ${
              inWishlist ? "text-red-600" : "text-gray-600 hover:text-red-600"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </Button>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(e);
                }}
                disabled={stockStatus === "out-of-stock"}
                className="bg-white hover:bg-gray-100"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                {stockStatus === "out-of-stock"
                  ? "Out of Stock"
                  : "Add to Cart"}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // This could open a quick view modal in the future
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stock Status */}
          {stockStatus === "out-of-stock" && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive" className="text-white">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <CardContent className="p-4 space-y-3">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category?.split(" - ")[0] || "Furniture"}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < (product.rating || 4)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount || Math.floor(Math.random() * 50) + 10})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-blue-600">
                KSh {product.price?.toLocaleString()}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    KSh {product.originalPrice.toLocaleString()}
                  </span>
                )}
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center">
              <Truck className="h-3 w-3 mr-1" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              <span>Warranty</span>
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Quick Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(e);
          }}
          disabled={stockStatus === "out-of-stock"}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {stockStatus === "out-of-stock" ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCardEnhanced;

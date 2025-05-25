"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/wishlist-context";
import { useCart } from "../contexts/cart-context";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Heart,
  ShoppingCart,
  Grid3X3,
  List,
  Search,
  Filter,
  Share2,
  Trash2,
  ArrowLeft,
  SortAsc,
} from "lucide-react";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, moveToCart } =
    useWishlist();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");

  // Get unique categories from wishlist items
  const categories = [...new Set(wishlistItems.map((item) => item.category))];

  // Filter and sort wishlist items
  const filteredAndSortedItems = wishlistItems
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.addedAt) - new Date(a.addedAt);
        case "oldest":
          return new Date(a.addedAt) - new Date(b.addedAt);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (item) => {
    addToCart(item, 1);
  };

  const handleMoveToCart = (item) => {
    moveToCart(item.id, addToCart);
  };

  const handleShareWishlist = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Wishlist link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Heart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist and shop them later.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}{" "}
              saved
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" onClick={handleShareWishlist}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search wishlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SortAsc className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-white rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {filteredAndSortedItems.length !== wishlistItems.length && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedItems.length} of {wishlistItems.length}{" "}
            items
          </p>
        </div>
      )}

      {/* Wishlist Items */}
      {filteredAndSortedItems.length === 0 ? (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No items found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredAndSortedItems.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === "list" ? "flex-row" : ""
              }`}
            >
              <CardContent
                className={`p-0 ${viewMode === "list" ? "flex" : ""}`}
              >
                {/* Product Image */}
                <div
                  className={`relative ${
                    viewMode === "list"
                      ? "w-32 h-32 flex-shrink-0"
                      : "aspect-square"
                  }`}
                >
                  <img
                    src={item.image || `/placeholder.svg?height=300&width=300`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <Badge className="absolute top-2 left-2 bg-red-600">
                      {Math.round(
                        ((item.originalPrice - item.price) /
                          item.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div
                  className={`p-4 ${
                    viewMode === "list"
                      ? "flex-1 flex flex-col justify-between"
                      : ""
                  }`}
                >
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.category}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        KSh {item.price.toLocaleString()}
                      </span>
                      {item.originalPrice &&
                        item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            KSh {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                    </div>
                    {item.addedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Added {new Date(item.addedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div
                    className={`space-y-2 ${
                      viewMode === "list"
                        ? "flex flex-col sm:flex-row sm:space-y-0 sm:space-x-2"
                        : ""
                    }`}
                  >
                    <Button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Move to Cart
                    </Button>
                    <Link to={`/product/${item.id}`} className="block">
                      <Button variant="outline" className="w-full" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Continue Shopping */}
      <div className="mt-12 text-center">
        <Link to="/">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;

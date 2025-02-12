import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import {
  FaShoppingCart,
  FaTag,
  FaBox,
  FaUndo,
  FaBoxOpen,
} from "react-icons/fa";

// Shimmer Loading Component
const ShimmerLoading = () => {
  return (
    <div className="latest-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {Array(4)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-lg bg-white animate-pulse"
          >
            <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
          </div>
        ))}
    </div>
  );
};

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, removeFromCart } = useCart();
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bobbyfurnitureonline.onrender.com/api/products"
        );
        setProducts(response.data.slice(-4)); // Fetch only the last 4 products
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add to Cart with Undo Option
  const handleAddToCart = (product) => {
    addToCart(product);
    setLastAddedProduct(product);

    // Clear any existing timeout
    if (undoTimeout) clearTimeout(undoTimeout);

    // Set a timeout for 5 seconds to remove the undo option
    const timeout = setTimeout(() => {
      setLastAddedProduct(null);
    }, 5000);
    setUndoTimeout(timeout);
  };

  // Undo the last added product
  const handleUndo = () => {
    if (lastAddedProduct) {
      removeFromCart(lastAddedProduct.id); // Remove from cart
      setLastAddedProduct(null); // Hide undo notification
      if (undoTimeout) clearTimeout(undoTimeout); // Clear timeout
    }
  };

  return (
    <div className="p-4 mt-14">
      {/* Section Title */}
      <h2 className="flex justify-center items-center space-x-4 text-blue-600 text-4xl font-bold  mb-6">
        <FaBoxOpen size={45} /> <h2>Latest Products</h2>
      </h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loading Effect */}
      {loading ? (
        <ShimmerLoading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
            >
              {/* Product Image */}
              <img
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />

              {/* Product Name */}
              <h2 className="text-lg font-semibold">{product.name}</h2>

              {/* Description */}
              <p className="text-gray-500 text-sm truncate">
                {product.description}
              </p>

              {/* Price */}
              <p className="text-blue-600 font-bold mt-2 flex items-center">
                <FaTag className="mr-2 text-yellow-500" /> Ksh.{" "}
                {product.price?.toLocaleString()}
              </p>

              {/* Stock Indicator */}
              <p className="text-sm font-semibold mt-1 flex items-center">
                <FaBox
                  className={`mr-2 ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                />
                Stock:{" "}
                <span
                  className={
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.stock !== undefined ? product.stock : "N/A"}
                </span>
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className={`mt-4 w-full py-2 px-4 rounded text-white transition flex items-center justify-center ${
                  product.stock > 0
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <FaShoppingCart className="mr-2" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Undo Toast Notification */}
      {lastAddedProduct && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center shadow-lg transition-opacity animate-fadeIn">
          <span className="mr-4">✔️ Added {lastAddedProduct.name} to cart</span>
          <button
            onClick={handleUndo}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center"
          >
            <FaUndo className="mr-1" />
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;

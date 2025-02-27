import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Loading } from "../components/LoadingReturnTop";
import {
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaSort,
  FaTag,
  FaBox,
  FaUndo,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart } = useCart(); // Include removeFromCart
  const navigate = useNavigate();

  // Search, filter, and sorting states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bobbyfurnitureonline.onrender.com/api/products"
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (categoryFilter) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "price_low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "stock") {
      updatedProducts.sort((a, b) => (b.stock || 0) - (a.stock || 0));
    }

    setFilteredProducts(updatedProducts);
  }, [searchQuery, categoryFilter, sortOption, products]);

  if (loading) return <Loading />;

  const categories = [...new Set(products.map((product) => product.category))];

  // ✅ Add to Cart with Undo Feature
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);

    let toastId;
    const undoTimeout = setTimeout(() => {
      toast.dismiss(toastId);
    }, 5000);

    toastId = toast.success(
      <div>
        <p>
          <b>"{product.name}"</b> added to cart!
        </p>
        <button
          className="text-slate-700 font-bold ml-2 focus:outline-none"
          onClick={() => {
            removeFromCart(product.id);
            toast.dismiss(toastId);
            clearTimeout(undoTimeout);
            toast.info(`"${product.name}" removed from cart.`);
          }}
        >
          {" "}
          <span className="flex items-center space-x-1">
            <FaUndo />
            <p>Undo</p>
          </span>
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );
  };

  return (
    <div className="p-4 mt-14">
      <ToastContainer />

      {/* Search and Filter Controls */}
      <div className="flex fixed bg-white left-0 right-0 shadow-lg md:flex-row p-3 justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-10 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="relative w-full md:w-1/4">
          <FaFilter className="absolute left-3 top-3 text-gray-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 pl-10 border rounded w-full"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full md:w-1/4">
          <FaSort className="absolute left-3 top-3 text-gray-500" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 pl-10 border rounded w-full"
          >
            <option value="">Sort By</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="stock">Stock: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 bg-white"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500 text-sm truncate">
                {product.description}
              </p>

              {/* Price */}
              <p className="text-blue-600 font-bold mt-2 flex items-center">
                <FaTag className="mr-2 text-yellow-500" /> Ksh.{" "}
                {product.price?.toLocaleString()}
              </p>

              {/* Stock Indicator */}
              {/* <p className="text-sm font-semibold mt-1 flex items-center">
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
              </p> */}

              {/* Add to Cart Button */}
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className={`mt-4 w-full py-2 px-4 rounded text-white transition flex items-center justify-center ${
                  product.stock > 0
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={product.stock === 0}
              >
                <FaShoppingCart className="mr-2" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;

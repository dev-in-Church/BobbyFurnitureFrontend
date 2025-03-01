import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Loading } from "../components/LoadingReturnTop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaExclamationTriangle, FaTag } from "react-icons/fa"; // Import icons

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://bobbyfurnitureonline.onrender.com/api/products/${id}`
        );
        setProduct(response.data);

        if (response.data.images?.length > 0) {
          setSelectedImage(response.data.images[0]); // Default to first image
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details. Please try again.");
        toast.error(
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-400" />
            Failed to load product details!
          </div>
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Show loading state
  if (loading) return <Loading />;

  // Show error message
  if (error)
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <p className="text-center text-red-500 mt-20">{error}</p>
      </>
    );

  // Show "Product not found" if API returned no product
  if (!product)
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <p className="text-center text-gray-500 mt-20">Product not found.</p>
      </>
    );

  // Handle add to cart and show toast notification
  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart(product);
    toast.success(
      <div className="flex items-center gap-2">
        <FaCheckCircle className="text-green-400" />
        {product.name} added to cart!
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-20">
      {/* Ensure ToastContainer is inside the page to guarantee visibility */}
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-6">
        {/* Product Image Section */}
        <div>
          <img
            src={selectedImage || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg transition-opacity duration-300"
          />
          {/* Image Thumbnails */}
          <div className="flex gap-2 mt-4">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition ${
                  selectedImage === img
                    ? "border-blue-500 scale-105"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
                onKeyDown={(e) =>
                  e.key === "Enter" || e.key === " "
                    ? setSelectedImage(img)
                    : null
                }
                tabIndex="0"
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-blue-600 font-bold text-lg mt-4 flex items-center">
              <FaTag className="mr-2 text-yellow-500" />
              <span className="text-gray-500 line-through mr-2">
                {" "}
                Ksh. {(product.price * 1.1).toLocaleString()}
              </span>
              <span> Ksh. {(product.price * 1).toLocaleString()}</span>
            </p>

            {/* Stock Indicator */}
            {/* <p className="text-sm font-semibold mt-2">
              Stock:{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock !== undefined ? product.stock : "N/A"}
              </span>
            </p> */}
          </div>

          {/* Add to Cart Button */}
          {/* <button
            onClick={handleAddToCart}
            className={`mt-4 w-full py-3 px-4 text-lg rounded text-white transition ${
              product.stock > 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={product.stock === 0}
            title={product.stock === 0 ? "This item is out of stock" : ""}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button> */}
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-3 px-4 text-lg rounded text-white transition bg-blue-500 hover:bg-blue-600
            "
          >
            {/* {product.stock > 0 ? "Add to Cart" : "Out of Stock"} */}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

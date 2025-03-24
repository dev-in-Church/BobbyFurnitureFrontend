"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Loading } from "../components/LoadingReturnTop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaMinus,
  FaInfoCircle,
  FaBox,
  FaRuler,
  FaWeightHanging,
  FaPercent,
} from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(false);
  const imageRef = useRef(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://bobbyfurnitureonline.onrender.com/api/products/${id}`
          // "http://localhost:5000/api/products/" + id
        );
        setProduct(response.data);

        if (response.data.images?.length > 0) {
          setSelectedImage(response.data.images[0]); // Default to first image
        }

        // Fetch related products (products in the same category)
        const allProductsResponse = await axios.get(
          "https://bobbyfurnitureonline.onrender.com/api/products"
          // "http://localhost:5000/api/products"
        );

        const related = allProductsResponse.data
          .filter(
            (p) =>
              p.category === response.data.category && p.id !== response.data.id
          )
          .slice(0, 4);

        setRelatedProducts(related);
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

    // Reset scroll position when navigating to a new product
    window.scrollTo(0, 0);
  }, [id]);

  // Handle image zoom
  const handleMouseMove = (e) => {
    if (!zoomedImage || !imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setImagePosition({ x, y });
  };

  // Show loading state
  if (loading) return <Loading />;

  // Show error message
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  // Show "Product not found" if API returned no product
  if (!product)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <FaInfoCircle className="text-blue-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );

  // Handle add to cart and show toast notification
  const handleAddToCart = () => {
    // Add the product with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    toast.success(
      <div className="flex items-center gap-2">
        <FaCheckCircle className="text-green-400" />
        {quantity} {quantity > 1 ? "items" : "item"} added to cart!
      </div>
    );
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);

    if (!isWishlisted) {
      toast.success(
        <div className="flex items-center gap-2">
          <FaHeart className="text-red-500" />
          Added to your wishlist!
        </div>
      );
    } else {
      toast.info(
        <div className="flex items-center gap-2">
          <FaRegHeart className="text-gray-500" />
          Removed from your wishlist
        </div>
      );
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
    setShowShareOptions(false);
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 4);
    const hasHalfStar = (rating || 4) - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }

    return (
      <div className="flex">
        {stars}
        <span className="ml-2 text-gray-600">({rating || 4.0})</span>
      </div>
    );
  };

  const navigateImage = (direction) => {
    if (!product.images || product.images.length <= 1) return;

    const currentIndex = product.images.indexOf(selectedImage);
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % product.images.length;
    } else {
      newIndex =
        (currentIndex - 1 + product.images.length) % product.images.length;
    }

    setSelectedImage(product.images[newIndex]);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-12">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <button onClick={() => navigate("/")} className="hover:text-gray-700">
            Home
          </button>
          <span className="mx-2">/</span>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-gray-700"
          >
            Products
          </button>
          <span className="mx-2">/</span>
          <button
            onClick={() => navigate(`/products?category=${product.category}`)}
            className="hover:text-gray-700"
          >
            {product.category}
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
            {/* Product Image Gallery - Left Side */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Main Image with Zoom */}
              <div
                className="relative rounded-lg overflow-hidden bg-gray-100 h-96 flex items-center justify-center mb-4"
                onMouseEnter={() => setZoomedImage(true)}
                onMouseLeave={() => setZoomedImage(false)}
                onMouseMove={handleMouseMove}
                ref={imageRef}
              >
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  <FaPercent className="mr-1 text-xs" />
                  10% OFF
                </div>

                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateImage("prev")}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={() => navigateImage("next")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}

                <img
                  src={selectedImage || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    zoomedImage ? "scale-150" : ""
                  }`}
                  style={
                    zoomedImage
                      ? {
                          transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`,
                        }
                      : {}
                  }
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images?.map((img, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition ${
                      selectedImage === img
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info - Middle */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="mb-4">{renderStarRating(product.rating)}</div>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <span className="text-gray-500 line-through text-lg mr-2">
                    Ksh. {(product.price * 1.1).toLocaleString()}
                  </span>
                  <span className="text-3xl font-bold text-gray-900">
                    Ksh. {product.price.toLocaleString()}
                  </span>
                </div>
                <span className="ml-3 text-green-600 text-sm font-medium">
                  Save 10% (Ksh. {(product.price * 0.1).toLocaleString()})
                </span>
              </div>

              <div className="prose prose-sm text-gray-500 mb-6">
                <p>{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 h-10 w-10 flex items-center justify-center rounded-l-lg"
                  >
                    <FaMinus size={12} />
                  </button>
                  <div className="h-10 w-14 flex items-center justify-center border-t border-b border-gray-300 text-gray-700">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 h-10 w-10 flex items-center justify-center rounded-r-lg"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>

                <button
                  onClick={toggleWishlist}
                  className="flex-1 sm:flex-none border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  {isWishlisted ? (
                    <>
                      <FaHeart className="mr-2 text-red-500" />
                      Wishlisted
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="mr-2" />
                      Add to Wishlist
                    </>
                  )}
                </button>

                <div className="relative sm:flex-none">
                  <button
                    onClick={handleShare}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors w-full"
                  >
                    <FaShare className="mr-2" />
                    Share
                  </button>

                  {showShareOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={copyToClipboard}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                            </svg>
                            Copy Link
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery & Returns - Right Side */}
            <div className="lg:col-span-1 bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">
                Delivery & Returns
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <FaTruck className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Free Delivery</p>
                    <p className="text-gray-600">within Nairobi</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaShieldAlt className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">1 Year Warranty</p>
                    <p className="text-gray-600">On all furniture items</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUndo className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">30-Day Returns</p>
                    <p className="text-gray-600">Return for any reason</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 mt-8">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "description"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "specifications"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "shipping"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("shipping")}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="p-6">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                  <p>
                    Our furniture is crafted with the highest quality materials
                    to ensure durability and comfort. Each piece is designed
                    with both aesthetics and functionality in mind, making it a
                    perfect addition to any home or office space.
                  </p>
                  <p>
                    The elegant design and premium finish of this product will
                    complement any interior décor style, from modern minimalist
                    to classic traditional. The attention to detail in the
                    craftsmanship is evident in every aspect of this piece.
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                      <FaBox className="mr-2 text-blue-600" />
                      Dimensions
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <FaRuler className="mr-2 text-gray-400" />
                        <span className="font-medium mr-2">Width:</span> 80 cm
                      </li>
                      <li className="flex items-center">
                        <FaRuler className="mr-2 text-gray-400" />
                        <span className="font-medium mr-2">Height:</span> 120 cm
                      </li>
                      <li className="flex items-center">
                        <FaRuler className="mr-2 text-gray-400" />
                        <span className="font-medium mr-2">Depth:</span> 60 cm
                      </li>
                      <li className="flex items-center">
                        <FaWeightHanging className="mr-2 text-gray-400" />
                        <span className="font-medium mr-2">Weight:</span> 25 kg
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Materials
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Frame: Solid Oak Wood</li>
                      <li>Upholstery: Premium Fabric</li>
                      <li>Finish: Natural Wood Stain</li>
                      <li>Hardware: Stainless Steel</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Delivery Information
                    </h3>
                    <p className="text-gray-600">
                      We offer standard delivery (3-5 business days) and express
                      delivery (1-2 business days) options. Delivery is free for
                      orders over Ksh. 5,000. For orders below this amount, a
                      delivery fee of Ksh. 500 will be applied.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Return Policy
                    </h3>
                    <p className="text-gray-600">
                      If you're not completely satisfied with your purchase, you
                      can return it within 30 days for a full refund or
                      exchange. The item must be in its original condition and
                      packaging. Please note that custom-made or personalized
                      items cannot be returned unless they are defective.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Warranty</h3>
                    <p className="text-gray-600">
                      All our furniture comes with a 1-year warranty against
                      manufacturing defects. This warranty covers structural
                      issues and material defects but does not cover normal wear
                      and tear or damage caused by improper use.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                  onClick={() => navigate(`/products/${relatedProduct.id}`)}
                >
                  <div className="relative">
                    <img
                      src={
                        relatedProduct.images?.[0] ||
                        "https://via.placeholder.com/300"
                      }
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      10% OFF
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900">
                        Ksh. {relatedProduct.price.toLocaleString()}
                      </p>
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(relatedProduct);
                          toast.success(
                            `${relatedProduct.name} added to cart!`
                          );
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

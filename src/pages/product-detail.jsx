"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  ArrowRight,
  Star,
  StarHalf,
  Check,
  AlertCircle,
  Loader,
  Home,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { fetchProductById } from "../lib/api-production"; // Removed fetchRelatedProducts import
import { useCart } from "../contexts/cart-context";
import { useWishlist } from "../contexts/wishlist-context";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  // Use cart and wishlist contexts
  const { addToCart, isInCart, isLoading: cartLoading } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch product details - your backend returns product with relatedProducts included
        const productData = await fetchProductById(id);
        setProduct(productData);
        // Set first image as selected
        setSelectedImage(0);
        // Directly use the relatedProducts from the API response
        setRelatedProducts(productData.relatedProducts || []); // Ensure it's an array even if empty
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
    // Reset scroll position when product ID changes
    window.scrollTo(0, 0);
  }, [id]); // Dependency array includes 'id' to refetch when product changes

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity);
      setAddedToCart(true);
      // Reset feedback after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlist(product);
      setAddedToWishlist(true);
      // Reset feedback after 3 seconds
      setTimeout(() => {
        setAddedToWishlist(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-primary">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            {error ||
              "The product you're looking for doesn't exist or has been removed."}
          </p>
          <Link to="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discount percentage if originalPrice exists
  const discountPercentage = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-500 flex items-center"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to={`/category/${product.category
                    ?.split(" - ")[0]
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                  className="text-gray-700 hover:text-blue-500"
                >
                  {product.category?.split(" - ")[0] || "Products"}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500 truncate max-w-[200px]">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Product Details */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden h-80 md:h-96">
                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-md">
                    -{discountPercentage}% OFF
                  </div>
                )}
                {/* Featured badge */}
                {product.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-md">
                    FEATURED
                  </div>
                )}
                <img
                  src={
                    product.images?.[selectedImage] ||
                    "/placeholder.svg?height=500&width=500"
                  }
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=500&width=500";
                  }}
                />
              </div>
              {/* Thumbnail images */}
              {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500 shadow-md"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image || "/placeholder.svg?height=100&width=100"}
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src =
                            "/placeholder.svg?height=100&width=100";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) =>
                        i < Math.floor(product.rating || 4) ? (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ) : i < Math.ceil(product.rating || 4) &&
                          (product.rating || 4) % 1 !== 0 ? (
                          <StarHalf
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ) : (
                          <Star key={i} className="h-5 w-5 text-gray-300" />
                        )
                      )}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating || 4} ({product.reviews || 0} reviews)
                  </span>
                </div>
                {/* Price */}
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    KSh {product.price.toLocaleString()}
                  </span>
                  {product.original_price && (
                    <span className="text-lg text-gray-500 line-through ml-3">
                      KSh {product.original_price.toLocaleString()}
                    </span>
                  )}
                </div>
                {/* Short description */}
                <p className="text-gray-600 mb-6">{product.description}</p>
                {/* Key features */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">
                      {product.material} construction for durability
                    </span>
                  </div>
                  {product.dimensions && (
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">
                        Dimensions: {product.dimensions}
                      </span>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">
                        Available in {product.color}
                      </span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">
                        Weight: {product.weight} kg
                      </span>
                    </div>
                  )}
                </div>
                {/* Quantity selector */}
                <div className="flex items-center mb-6">
                  <span className="text-gray-700 mr-4">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stock || 10)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500 ml-4">
                    {product.stock > 0
                      ? `${product.stock} available`
                      : "Out of stock"}
                  </span>
                </div>
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className={`flex-1 py-3 transition-all duration-200 ${
                      addedToCart || isInCart(product?.id)
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0 || cartLoading || addedToCart}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Added to Cart
                      </>
                    ) : isInCart(product?.id) ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        In Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 py-3 transition-all duration-200 ${
                      addedToWishlist
                        ? "border-green-500 text-green-600 bg-green-50"
                        : isInWishlist(product?.id)
                        ? "border-red-500 text-red-600 bg-red-50"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={handleToggleWishlist}
                    disabled={addedToWishlist}
                  >
                    {addedToWishlist ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Added!
                      </>
                    ) : isInWishlist(product?.id) ? (
                      <>
                        <Heart className="mr-2 h-5 w-5 fill-current" />
                        In Wishlist
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-5 w-5" />
                        Add to Wishlist
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="sm:flex-none py-3 bg-transparent"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              {/* Delivery info */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-600">
                      On orders over KSh 50,000 within Nairobi
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">2-Year Warranty</p>
                    <p className="text-sm text-gray-600">
                      Full warranty against manufacturing defects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product details tabs */}
          <div className="border-t border-gray-200 p-6">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="text-gray-700 space-y-4"
              >
                <p>{product.description}</p>
                <p>
                  This premium {product.category?.split(" - ")[0].toLowerCase()}{" "}
                  furniture piece is designed to enhance your living space with
                  both style and functionality. Crafted with attention to
                  detail, it combines aesthetic appeal with practical features.
                </p>
                <p>
                  The {product.material} construction ensures durability and
                  longevity, while the {product.color} finish complements a
                  variety of interior design styles.
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Product Specifications
                    </h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-600">
                            Dimensions
                          </td>
                          <td className="py-2">
                            {product.dimensions || "Not specified"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-600">
                            Material
                          </td>
                          <td className="py-2">
                            {product.material || "Not specified"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-600">
                            Color
                          </td>
                          <td className="py-2">
                            {product.color || "Not specified"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-600">
                            Weight
                          </td>
                          <td className="py-2">
                            {product.weight
                              ? `${product.weight} kg`
                              : "Not specified"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-600">
                            Brand
                          </td>
                          <td className="py-2">
                            {product.brand || "Bobby Furniture"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium text-gray-600">
                            Assembly Required
                          </td>
                          <td className="py-2">
                            {product.assemblyRequired ? "Yes" : "No"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Care Instructions
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Clean with a soft, dry cloth</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Avoid direct sunlight to prevent fading</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Keep away from heat sources</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>
                          Use coasters for drinks to prevent water marks
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>
                          For wooden furniture, polish every 3-6 months
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="text-gray-700">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Shipping Information
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>
                          Free delivery on orders over KSh 50,000 within Nairobi
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Standard delivery (3-7 business days)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>
                          Express delivery available (1-2 business days) for an
                          additional fee
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Nationwide delivery available</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Returns & Refunds
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>30-day return policy</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>
                          Items must be in original condition with packaging
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Return shipping fees may apply</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>Refunds processed within 7-14 business days</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          {/* FAQs */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How long will delivery take?
                </AccordionTrigger>
                <AccordionContent>
                  Standard delivery takes 3-7 business days within Nairobi and
                  surrounding areas. For other regions, delivery may take 7-14
                  business days depending on your location.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Do you offer assembly services?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we provide professional assembly services for all our
                  furniture. Our skilled technicians will set up your furniture
                  at your home or office at no extra cost for orders over KSh
                  50,000.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent>
                  We accept various payment methods including M-Pesa,
                  credit/debit cards, bank transfers, and PayPal. We also offer
                  flexible payment plans with 0% interest for qualified
                  customers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can I customize this product?
                </AccordionTrigger>
                <AccordionContent>
                  Some of our products can be customized in terms of color,
                  material, or dimensions. Please contact our customer service
                  team to discuss customization options for this specific
                  product.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      {/* Related Products */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            You May Also Like
          </h2>
          <Link
            to={`/category/${product.category
              ?.split(" - ")[0]
              .toLowerCase()
              .replace(/\s/g, "-")}`}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            View More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <Link to={`/product/${relatedProduct.id}`} className="block">
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={
                      relatedProduct.images?.[0] ||
                      "/placeholder.svg?height=200&width=200"
                    }
                    alt={relatedProduct.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=200&width=200";
                    }}
                  />
                  {relatedProduct.original_price && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      {Math.round(
                        ((relatedProduct.original_price -
                          relatedProduct.price) /
                          relatedProduct.original_price) *
                          100
                      )}
                      % OFF
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-blue-600 font-bold">
                      KSh {relatedProduct.price.toLocaleString()}
                    </span>
                    {relatedProduct.original_price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        KSh {relatedProduct.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaShoppingCart,
//   FaTrash,
//   FaUndo,
//   FaUser,
//   FaMapMarkerAlt,
//   FaPhone,
// } from "react-icons/fa";
// import api from "../api/axios"; // Adjust the import path accordingly

// const CheckoutPage = () => {
//   const [shippingInfo, setShippingInfo] = useState({
//     name: "",
//     address: "",
//     phone: "",
//   });
//   const [cart, setCart] = useState(
//     JSON.parse(localStorage.getItem("cart")) || []
//   );
//   const [cartBackup, setCartBackup] = useState(null); // Undo feature

//   const user = JSON.parse(localStorage.getItem("user"));
//   const user_id = user?.id || null;
//   const navigate = useNavigate();

//   // Calculate total price safely
//   const totalAmount = cart.reduce((total, product) => {
//     const price = parseFloat(product.price);
//     const quantity = parseInt(product.quantity, 10);
//     return !isNaN(price) && !isNaN(quantity) ? total + price * quantity : total;
//   }, 0);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   // Clear cart with undo option
//   const clearCart = () => {
//     setCartBackup(cart);
//     setCart([]);
//     localStorage.removeItem("cart");

//     setTimeout(() => setCartBackup(null), 5000); // Undo available for 5 seconds
//   };

//   const undoClearCart = () => {
//     if (cartBackup) {
//       setCart(cartBackup);
//       localStorage.setItem("cart", JSON.stringify(cartBackup));
//       setCartBackup(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user_id) {
//       confirm("You must be logged in to place an order.\nDo you want to login?")
//         ? navigate("/login")
//         : navigate("/checkout");
//       return;
//     }

//     if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
//       alert("Please fill all shipping details.");
//       return;
//     }

//     if (cart.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     const orderData = {
//       user_id,
//       customerName: shippingInfo.name,
//       address: shippingInfo.address,
//       phone: shippingInfo.phone,
//       totalAmount,
//       items: cart.map((product) => ({
//         productId: product.id,
//         quantity: product.quantity,
//       })),
//     };

//     try {
//       const response = await api.post("/api/orders/", orderData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 201) {
//         clearCart();
//         navigate(`/order-confirmation`);
//       } else {
//         alert("There was an error placing your order.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("There was an error placing your order.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
//         <FaShoppingCart /> Checkout
//       </h1>

//       {/* Order Summary */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>
//         <div className="space-y-4 mt-4">
//           {cart.length > 0 ? (
//             cart.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex justify-between bg-gray-100 p-3 rounded-md"
//               >
//                 <span className="font-medium">
//                   {product.name} x {product.quantity}
//                 </span>
//                 <span className="font-semibold text-gray-700">
//                   {(
//                     parseFloat(product.price) * parseInt(product.quantity, 10)
//                   ).toFixed(2)}{" "}
//                   Ksh
//                 </span>
//               </div>
//             ))
//           ) : (
//             <p className="text-red-500 text-center">Your cart is empty.</p>
//           )}
//         </div>

//         <p className="text-lg font-bold mt-4 text-gray-800">
//           Total: {totalAmount.toFixed(2)} Ksh
//         </p>

//         {/* Clear Cart and Undo Buttons */}
//         <div className="flex justify-between mt-4">
//           <button
//             onClick={clearCart}
//             className="px-4 py-2 flex items-center gap-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//           >
//             <FaTrash /> Clear Cart
//           </button>

//           {cartBackup && (
//             <button
//               onClick={undoClearCart}
//               className="px-4 py-2 flex items-center gap-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               <FaUndo /> Undo
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Shipping Info Form */}
//       <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold border-b pb-2">
//           Shipping Information
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex items-center border border-gray-300 rounded-md p-3">
//               <FaUser className="text-gray-600 mr-2" />
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={shippingInfo.name}
//                 onChange={handleInputChange}
//                 className="w-full outline-none bg-transparent"
//               />
//             </div>
//             <div className="flex items-center border border-gray-300 rounded-md p-3">
//               <FaPhone className="text-gray-600 mr-2" />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={shippingInfo.phone}
//                 onChange={handleInputChange}
//                 className="w-full outline-none bg-transparent"
//               />
//             </div>
//           </div>
//           <div className="flex items-center border border-gray-300 rounded-md p-3">
//             <FaMapMarkerAlt className="text-gray-600 mr-2" />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={shippingInfo.address}
//               onChange={handleInputChange}
//               className="w-full outline-none bg-transparent"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             <FaShoppingCart /> Place Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Trash2,
  User,
  MapPin,
  Phone,
  CreditCard,
  Shield,
  Truck,
  Clock,
  ChevronLeft,
  CheckCircle,
  Info,
  DollarSign,
  Package,
  Home,
  Mail,
  Lock,
} from "lucide-react";
import api from "../api/axios"; // Adjust the import path accordingly

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartBackup, setCartBackup] = useState(null); // Undo feature
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState("shipping"); // shipping, payment, review
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id || null;
  const navigate = useNavigate();

  // Pre-fill user information if available
  useEffect(() => {
    if (user) {
      setShippingInfo((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  // Calculate total price safely
  const subtotal = cart.reduce((total, product) => {
    const price = Number.parseFloat(product.price);
    const quantity = Number.parseInt(product.quantity, 10);
    return !isNaN(price) && !isNaN(quantity) ? total + price * quantity : total;
  }, 0);

  // Calculate shipping, tax, and total
  const shipping = cart.length > 0 ? (subtotal < 5000 ? 500 : 0) : 0;
  const tax = subtotal * 0.16; // 16% VAT
  const totalAmount = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Clear cart with undo option
  const clearCart = () => {
    setCartBackup(cart);
    setCart([]);
    localStorage.removeItem("cart");

    toast.info(
      <div className="flex items-center gap-2">
        <span>Cart cleared</span>
        <button
          onClick={undoClearCart}
          className="bg-blue-500 text-white text-xs px-2 py-1 rounded ml-2 hover:bg-blue-600"
        >
          UNDO
        </button>
      </div>,
      { autoClose: 5000 }
    );

    setTimeout(() => setCartBackup(null), 5000); // Undo available for 5 seconds
  };

  const undoClearCart = () => {
    if (cartBackup) {
      setCart(cartBackup);
      localStorage.setItem("cart", JSON.stringify(cartBackup));
      setCartBackup(null);
      toast.success("Cart restored");
    }
  };

  const validateShippingInfo = () => {
    const { name, address, phone } = shippingInfo;
    if (!name || !address || !phone) {
      toast.error("Please fill all required shipping details");
      return false;
    }

    // Basic phone validation
    const phoneRegex = /^\d{10,12}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const handleContinueToPayment = () => {
    if (validateShippingInfo()) {
      setActiveStep("payment");
      window.scrollTo(0, 0);
    }
  };

  const handleContinueToReview = () => {
    setActiveStep("review");
    window.scrollTo(0, 0);
  };

  const handleBackToShipping = () => {
    setActiveStep("shipping");
    window.scrollTo(0, 0);
  };

  const handleBackToPayment = () => {
    setActiveStep("payment");
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) {
      const shouldLogin = window.confirm(
        "You must be logged in to place an order.\nDo you want to login?"
      );
      if (shouldLogin) {
        navigate("/login");
      }
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      user_id,
      customerName: shippingInfo.name,
      address: shippingInfo.address,
      city: shippingInfo.city,
      zipCode: shippingInfo.zipCode,
      phone: shippingInfo.phone,
      email: shippingInfo.email,
      paymentMethod,
      totalAmount,
      items: cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    };

    try {
      const response = await api.post("/api/orders/", orderData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        clearCart();
        navigate(`/order-confirmation`);
        toast.success("Order placed successfully!");
      } else {
        toast.error("There was an error placing your order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        error.response?.data?.message || "There was an error placing your order"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Checkout
          </h1>
          <button
            onClick={() => navigate("/cart")}
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Cart
          </button>
        </div>

        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div
              className={`flex flex-col items-center ${
                activeStep === "shipping" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  activeStep === "shipping"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <Home className="w-5 h-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Shipping</span>
            </div>

            <div
              className={`w-16 sm:w-24 h-1 ${
                activeStep === "shipping" ? "bg-gray-300" : "bg-blue-600"
              }`}
            ></div>

            <div
              className={`flex flex-col items-center ${
                activeStep === "payment"
                  ? "text-blue-600"
                  : activeStep === "review"
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  activeStep === "payment"
                    ? "border-blue-600 bg-blue-50"
                    : activeStep === "review"
                    ? "border-gray-300"
                    : "border-gray-200"
                }`}
              >
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Payment</span>
            </div>

            <div
              className={`w-16 sm:w-24 h-1 ${
                activeStep === "review" ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>

            <div
              className={`flex flex-col items-center ${
                activeStep === "review" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  activeStep === "review"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Shipping Information */}
              {activeStep === "shipping" && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Shipping Information
                    </h2>
                  </div>

                  <div className="p-6">
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="John Doe"
                              value={shippingInfo.name}
                              onChange={handleInputChange}
                              className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="your@email.com"
                              value={shippingInfo.email}
                              onChange={handleInputChange}
                              className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="123 Main St, Apartment 4B"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Nairobi"
                            value={shippingInfo.city}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="zipCode"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Postal Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            placeholder="00100"
                            value={shippingInfo.zipCode}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+254 712 345 678"
                            value={shippingInfo.phone}
                            onChange={handleInputChange}
                            className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleContinueToPayment}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              {activeStep === "payment" && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                      Payment Method
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="mpesa"
                            checked={paymentMethod === "mpesa"}
                            onChange={() => setPaymentMethod("mpesa")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <div className="ml-3 flex items-center">
                            <img
                              src="https://via.placeholder.com/40x40?text=M"
                              alt="M-Pesa"
                              className="h-10 w-10 object-contain mr-3"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                M-Pesa
                              </p>
                              <p className="text-xs text-gray-500">
                                Pay via M-Pesa mobile money
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <div className="ml-3 flex items-center">
                            <CreditCard className="h-10 w-10 text-blue-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Credit/Debit Card
                              </p>
                              <p className="text-xs text-gray-500">
                                Pay with Visa, Mastercard, or other cards
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={() => setPaymentMethod("cash")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <div className="ml-3 flex items-center">
                            <DollarSign className="h-10 w-10 text-green-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Cash on Delivery
                              </p>
                              <p className="text-xs text-gray-500">
                                Pay when you receive your order
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                          type="button"
                          onClick={handleBackToShipping}
                          className="py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex-1 flex items-center justify-center"
                        >
                          <ChevronLeft className="w-5 h-5 mr-2" />
                          Back to Shipping
                        </button>

                        <button
                          type="button"
                          onClick={handleContinueToReview}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex-1 flex items-center justify-center"
                        >
                          Review Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Review */}
              {activeStep === "review" && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                      Review Your Order
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Shipping Information Summary */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium text-gray-900 flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                            Shipping Information
                          </h3>
                          <button
                            onClick={handleBackToShipping}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                        </div>

                        <div className="text-sm text-gray-600">
                          <p className="font-medium text-gray-900">
                            {shippingInfo.name}
                          </p>
                          <p>{shippingInfo.address}</p>
                          {shippingInfo.city && shippingInfo.zipCode && (
                            <p>
                              {shippingInfo.city}, {shippingInfo.zipCode}
                            </p>
                          )}
                          <p>{shippingInfo.phone}</p>
                          {shippingInfo.email && <p>{shippingInfo.email}</p>}
                        </div>
                      </div>

                      {/* Payment Method Summary */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium text-gray-900 flex items-center">
                            <CreditCard className="w-4 h-4 mr-1 text-blue-600" />
                            Payment Method
                          </h3>
                          <button
                            onClick={handleBackToPayment}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                        </div>

                        <div className="text-sm text-gray-600">
                          {paymentMethod === "mpesa" && (
                            <p className="flex items-center">
                              <img
                                src="https://via.placeholder.com/20x20?text=M"
                                alt="M-Pesa"
                                className="h-5 w-5 object-contain mr-2"
                              />
                              M-Pesa
                            </p>
                          )}
                          {paymentMethod === "card" && (
                            <p className="flex items-center">
                              <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                              Credit/Debit Card
                            </p>
                          )}
                          {paymentMethod === "cash" && (
                            <p className="flex items-center">
                              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                              Cash on Delivery
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <Package className="w-4 h-4 mr-1 text-blue-600" />
                          Order Items (
                          {cart.reduce((sum, item) => sum + item.quantity, 0)})
                        </h3>

                        <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                          {cart.map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center p-4 hover:bg-gray-50"
                            >
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={
                                    product.images?.[0] ||
                                    "https://via.placeholder.com/150"
                                  }
                                  alt={product.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex-1">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">
                                  Qty: {product.quantity}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                  Ksh.{" "}
                                  {(
                                    product.price * product.quantity
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                          type="button"
                          onClick={handleBackToPayment}
                          className="py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex-1 flex items-center justify-center"
                        >
                          <ChevronLeft className="w-5 h-5 mr-2" />
                          Back to Payment
                        </button>

                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex-1 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Lock className="w-5 h-5 mr-2" />
                              Place Order
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-20">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal (
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className="text-gray-900 font-medium">
                    Ksh. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `Ksh. ${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (16% VAT)</span>
                  <span className="text-gray-900 font-medium">
                    Ksh.{" "}
                    {tax.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      Ksh.{" "}
                      {totalAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>

                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="mt-4 w-full flex items-center justify-center text-sm text-red-600 hover:text-red-800 font-medium py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </button>
                )}

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Truck className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Free shipping on orders over Ksh. 5,000</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Delivery within 3-5 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Section */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">
                    Need help?
                  </h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Call us at +254 712 345 678 or email at
                    support@bobbyfurniture.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

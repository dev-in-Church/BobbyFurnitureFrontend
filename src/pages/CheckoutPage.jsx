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
  Gift,
  CreditCardIcon,
  AlertCircle,
  Smile,
  ArrowRight,
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
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartBackup, setCartBackup] = useState(null); // Undo feature
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState("shipping"); // shipping, payment, review
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [saveInfo, setSaveInfo] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Get user from localStorage only once during component initialization
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
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

      // If user has a saved phone number that looks like an M-Pesa number
      if (user.phone && user.phone.match(/^(?:\+254|0)7\d{8}$/)) {
        setMpesaNumber(user.phone);
      }
    }
  }, [user]);

  // Calculate total price safely
  const subtotal = cart.reduce((total, product) => {
    const price = Number.parseFloat(product.price);
    const quantity = Number.parseInt(product.quantity, 10);
    return !isNaN(price) && !isNaN(quantity) ? total + price * quantity : total;
  }, 0);

  // Calculate shipping, tax, and total
  const deliveryFees = {
    standard: cart.length > 0 ? (subtotal < 5000 ? 500 : 0) : 0,
    express: 1000,
    pickup: 0,
  };

  const shipping = deliveryFees[deliveryOption];
  const giftWrapFee = giftWrap ? 200 : 0;
  const tax = subtotal * 0.0005; // 0.5 VAT
  const totalBeforeDiscount = subtotal + shipping + tax + giftWrapFee;
  const totalAmount = totalBeforeDiscount - promoDiscount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[`card_${name}`]) {
      setFormErrors((prev) => ({ ...prev, [`card_${name}`]: null }));
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return value;
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

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsApplyingPromo(true);

    // Simulate API call to validate promo code
    setTimeout(() => {
      // Mock promo codes for demo
      const promoCodes = {
        WELCOME10: { discount: subtotal * 0.1, maxDiscount: 1000 },
        FURNITURE20: { discount: subtotal * 0.2, maxDiscount: 2000 },
        FREESHIP: { discount: shipping, maxDiscount: shipping },
      };

      const promo = promoCodes[promoCode.toUpperCase()];

      if (promo) {
        const discount = Math.min(promo.discount, promo.maxDiscount);
        setPromoDiscount(discount);
        toast.success(
          `Promo code applied! You saved Ksh. ${discount.toLocaleString()}`
        );
      } else {
        toast.error("Invalid promo code");
      }

      setIsApplyingPromo(false);
    }, 1000);
  };

  const validateShippingInfo = () => {
    const errors = {};
    const { name, address, phone, email } = shippingInfo;

    if (!name) errors.name = "Full name is required";
    if (!address) errors.address = "Address is required";
    if (!phone) errors.phone = "Phone number is required";

    // Basic phone validation
    if (phone && !phone.replace(/\D/g, "").match(/^\d{10,12}$/)) {
      errors.phone = "Please enter a valid phone number";
    }

    // Basic email validation if provided
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors in the form");
      return false;
    }

    return true;
  };

  const validatePaymentInfo = () => {
    const errors = {};

    if (paymentMethod === "card") {
      const { number, name, expiry, cvc } = cardDetails;

      if (!number) errors.card_number = "Card number is required";
      else if (number.replace(/\s/g, "").length < 16)
        errors.card_number = "Card number must be 16 digits";

      if (!name) errors.card_name = "Cardholder name is required";
      if (!expiry) errors.card_expiry = "Expiry date is required";
      else if (!expiry.match(/^\d{2}\/\d{2}$/))
        errors.card_expiry = "Invalid format (MM/YY)";

      if (!cvc) errors.card_cvc = "CVC is required";
      else if (cvc.length < 3) errors.card_cvc = "CVC must be 3 or 4 digits";
    }

    if (paymentMethod === "mpesa") {
      if (!mpesaNumber) errors.mpesa_number = "M-Pesa number is required";
      else if (!mpesaNumber.replace(/\D/g, "").match(/^\d{10,12}$/)) {
        errors.mpesa_number = "Please enter a valid M-Pesa number";
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors in the payment form");
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
    if (validatePaymentInfo()) {
      setActiveStep("review");
      window.scrollTo(0, 0);
    }
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
        navigate("/login", { state: { returnTo: "/checkout" } });
      }
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    // Save order details for confirmation page
    localStorage.setItem("orderItems", JSON.stringify(cart));
    localStorage.setItem("shippingName", shippingInfo.name);
    localStorage.setItem(
      "shippingAddress",
      `${shippingInfo.address}, ${shippingInfo.city || ""} ${
        shippingInfo.zipCode || ""
      }`
    );
    localStorage.setItem("paymentMethod", paymentMethod);
    localStorage.setItem("orderTotal", totalAmount.toLocaleString());

    const orderData = {
      user_id,
      customerName: shippingInfo.name,
      address: shippingInfo.address,
      city: shippingInfo.city,
      zipCode: shippingInfo.zipCode,
      phone: shippingInfo.phone,
      email: shippingInfo.email,
      paymentMethod,
      deliveryOption,
      giftWrap,
      giftMessage,
      promoCode: promoDiscount > 0 ? promoCode : null,
      promoDiscount,
      subtotal,
      shipping,
      tax,
      totalAmount,
      items: cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    };

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await api.post("/api/orders/", orderData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        // Clear cart and navigate to confirmation
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

  // Get estimated delivery date based on delivery option
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);

    switch (deliveryOption) {
      case "express":
        deliveryDate.setDate(today.getDate() + 2);
        break;
      case "pickup":
        deliveryDate.setDate(today.getDate() + 1);
        break;
      default: // standard
        deliveryDate.setDate(today.getDate() + 5);
    }

    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
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
                              className={`pl-10 block w-full rounded-md border ${
                                formErrors.name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                              required
                            />
                          </div>
                          {formErrors.name && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.name}
                            </p>
                          )}
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
                              className={`pl-10 block w-full rounded-md border ${
                                formErrors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                            />
                          </div>
                          {formErrors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.email}
                            </p>
                          )}
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
                            className={`pl-10 block w-full rounded-md border ${
                              formErrors.address
                                ? "border-red-500"
                                : "border-gray-300"
                            } py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                            required
                          />
                        </div>
                        {formErrors.address && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.address}
                          </p>
                        )}
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
                            className={`pl-10 block w-full rounded-md border ${
                              formErrors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            } py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                            required
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Delivery Options */}
                      <div className="mt-6">
                        <h3 className="text-base font-medium text-gray-900 mb-3">
                          Delivery Options
                        </h3>
                        <div className="space-y-3">
                          <label className="flex p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="deliveryOption"
                              value="standard"
                              checked={deliveryOption === "standard"}
                              onChange={() => setDeliveryOption("standard")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Standard Delivery
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Delivery within 3-5 business days
                                  </p>
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {subtotal < 5000
                                    ? `Ksh. ${deliveryFees.standard.toLocaleString()}`
                                    : "Free"}
                                </div>
                              </div>
                            </div>
                          </label>

                          <label className="flex p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="deliveryOption"
                              value="express"
                              checked={deliveryOption === "express"}
                              onChange={() => setDeliveryOption("express")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Express Delivery
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Delivery within 1-2 business days
                                  </p>
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  Ksh. {deliveryFees.express.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </label>

                          <label className="flex p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="deliveryOption"
                              value="pickup"
                              checked={deliveryOption === "pickup"}
                              onChange={() => setDeliveryOption("pickup")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Store Pickup
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Pickup from our store location
                                  </p>
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  Free
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Gift Options */}
                      <div className="mt-6">
                        <h3 className="text-base font-medium text-gray-900 mb-3">
                          Gift Options
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <label className="flex items-center mb-3">
                            <input
                              type="checkbox"
                              checked={giftWrap}
                              onChange={() => setGiftWrap(!giftWrap)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <div className="ml-3">
                              <span className="text-sm font-medium text-gray-900">
                                Add gift wrapping
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                (+Ksh. 200)
                              </span>
                            </div>
                          </label>

                          {giftWrap && (
                            <div>
                              <label
                                htmlFor="giftMessage"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Gift Message (optional)
                              </label>
                              <textarea
                                id="giftMessage"
                                name="giftMessage"
                                rows="3"
                                placeholder="Enter your gift message here..."
                                value={giftMessage}
                                onChange={(e) => setGiftMessage(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Save Information */}
                      <div className="mt-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={saveInfo}
                            onChange={() => setSaveInfo(!saveInfo)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            Save this information for next time
                          </span>
                        </label>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleContinueToPayment}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
                        >
                          Continue to Payment
                          <ArrowRight className="ml-2 w-5 h-5" />
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
                      {/* <div>
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
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

                        {paymentMethod === "mpesa" && (
                          <div className="mt-3 ml-7 pl-3 border-l-2 border-blue-200">
                            <div className="mb-3">
                              <label
                                htmlFor="mpesaNumber"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                M-Pesa Phone Number{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  type="tel"
                                  id="mpesaNumber"
                                  placeholder="+254 712 345 678"
                                  value={mpesaNumber}
                                  onChange={(e) => {
                                    setMpesaNumber(e.target.value);
                                    if (formErrors.mpesa_number) {
                                      setFormErrors((prev) => ({
                                        ...prev,
                                        mpesa_number: null,
                                      }));
                                    }
                                  }}
                                  className={`pl-10 block w-full rounded-md border ${
                                    formErrors.mpesa_number
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                />
                              </div>
                              {formErrors.mpesa_number && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  {formErrors.mpesa_number}
                                </p>
                              )}
                              <p className="mt-2 text-xs text-gray-500">
                                You will receive a prompt on your phone to
                                complete the payment when you place the order.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <div className="ml-3 flex items-center">
                            <CreditCardIcon className="h-10 w-10 text-blue-600 mr-3" />
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

                        {paymentMethod === "card" && (
                          <div className="mt-3 ml-7 pl-3 border-l-2 border-blue-200">
                            <div className="space-y-3">
                              <div>
                                <label
                                  htmlFor="cardNumber"
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Card Number{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CreditCardIcon className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <input
                                    type="text"
                                    id="cardNumber"
                                    name="number"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardDetails.number}
                                    onChange={(e) => {
                                      handleCardInputChange({
                                        target: {
                                          name: "number",
                                          value: formatCardNumber(
                                            e.target.value
                                          ),
                                        },
                                      });
                                    }}
                                    maxLength="19"
                                    className={`pl-10 block w-full rounded-md border ${
                                      formErrors.card_number
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    } py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                  />
                                </div>
                                {formErrors.card_number && (
                                  <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {formErrors.card_number}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label
                                  htmlFor="cardName"
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Cardholder Name{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <input
                                    type="text"
                                    id="cardName"
                                    name="name"
                                    placeholder="John Doe"
                                    value={cardDetails.name}
                                    onChange={handleCardInputChange}
                                    className={`pl-10 block w-full rounded-md border ${
                                      formErrors.card_name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    } py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                  />
                                </div>
                                {formErrors.card_name && (
                                  <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {formErrors.card_name}
                                  </p>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label
                                    htmlFor="cardExpiry"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                  >
                                    Expiry Date{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="cardExpiry"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={cardDetails.expiry}
                                    onChange={(e) => {
                                      handleCardInputChange({
                                        target: {
                                          name: "expiry",
                                          value: formatExpiryDate(
                                            e.target.value
                                          ),
                                        },
                                      });
                                    }}
                                    maxLength="5"
                                    className={`block w-full rounded-md border ${
                                      formErrors.card_expiry
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    } py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                  />
                                  {formErrors.card_expiry && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                      <AlertCircle className="h-4 w-4 mr-1" />
                                      {formErrors.card_expiry}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <label
                                    htmlFor="cardCvc"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                  >
                                    CVC <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="cardCvc"
                                    name="cvc"
                                    placeholder="123"
                                    value={cardDetails.cvc}
                                    onChange={handleCardInputChange}
                                    maxLength="4"
                                    className={`block w-full rounded-md border ${
                                      formErrors.card_cvc
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    } py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                                  />
                                  {formErrors.card_cvc && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                      <AlertCircle className="h-4 w-4 mr-1" />
                                      {formErrors.card_cvc}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center mt-2">
                                <Shield className="h-4 w-4 text-gray-400 mr-1" />
                                <p className="text-xs text-gray-500">
                                  Your payment information is secured with SSL
                                  encryption
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div> */}

                      <div className="w-full max-w-md mx-auto">
                        <div
                          role="alert"
                          className="p-5 border border-yellow-300 bg-yellow-50 rounded-lg text-yellow-900 shadow-md transition-all hover:shadow-lg"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="h-6 w-6 flex-shrink-0 text-yellow-600" />
                            <h3 className="text-lg font-semibold">
                              Payment Methods Unavailable
                            </h3>
                          </div>

                          <p className="text-sm mb-2">
                            We're currently working hard to integrate secure
                            online payment options including:
                          </p>

                          <ul className="list-disc ml-5 text-sm space-y-1">
                            <li>M-Pesa</li>
                            <li>Debit/Credit Cards</li>
                            <li>PayPal</li>
                          </ul>

                          <div className="flex items-center mt-4 text-green-700 bg-green-50 p-2 rounded-md">
                            <Smile className="h-5 w-5 flex-shrink-0 mr-2" />
                            <p className="text-sm">
                              For now, please proceed with{" "}
                              <span className="font-semibold">
                                Cash on Delivery
                              </span>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
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
                          <ArrowRight className="ml-2 w-5 h-5" />
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

                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center">
                              <Truck className="w-4 h-4 mr-1 text-gray-500" />
                              <span className="font-medium">
                                {deliveryOption === "standard" &&
                                  "Standard Delivery"}
                                {deliveryOption === "express" &&
                                  "Express Delivery"}
                                {deliveryOption === "pickup" && "Store Pickup"}
                              </span>
                            </div>
                            <p className="text-xs mt-1">
                              Estimated delivery: {getEstimatedDelivery()}
                            </p>
                          </div>

                          {giftWrap && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center">
                                <Gift className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="font-medium">
                                  Gift Wrapped
                                </span>
                              </div>
                              {giftMessage && (
                                <p className="text-xs mt-1 italic">
                                  "{giftMessage}"
                                </p>
                              )}
                            </div>
                          )}
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
                              M-Pesa ({mpesaNumber})
                            </p>
                          )}
                          {paymentMethod === "card" && (
                            <p className="flex items-center">
                              <CreditCardIcon className="h-5 w-5 text-blue-600 mr-2" />
                              {cardDetails.name} ••••{" "}
                              {cardDetails.number.slice(-4)}
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
                  <span className="text-gray-600">Tax (0.05% VAT)</span>
                  <span className="text-gray-900 font-medium">
                    Ksh.{" "}
                    {tax.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>

                {giftWrap && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gift Wrapping</span>
                    <span className="text-gray-900 font-medium">
                      Ksh. {giftWrapFee.toLocaleString()}
                    </span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({promoCode})</span>
                    <span>- Ksh. {promoDiscount.toLocaleString()}</span>
                  </div>
                )}

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

                {/* Promo Code */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center mb-2">
                    <label
                      htmlFor="promoCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Promo Code
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="promoCode"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="block flex-1 rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={isApplyingPromo}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      {isApplyingPromo ? (
                        <svg
                          className="animate-spin h-4 w-4 mr-1"
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
                      ) : (
                        "Apply"
                      )}
                    </button>
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
                    <span>
                      Delivery within{" "}
                      {deliveryOption === "express" ? "1-2" : "3-5"} business
                      days
                    </span>
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
                    bobbyfurnitures254@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Secure Shopping */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-center mb-3">
                <Lock className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">
                  Secure Shopping
                </h3>
              </div>
              <div className="flex justify-center space-x-4">
                <img
                  src="/visa.png"
                  alt="Visa"
                  className="h-6 object-contain"
                />
                <img
                  src="/master-card.png"
                  alt="Mastercard"
                  className="h-6 object-contain"
                />
                <img
                  src="/lipa-na-m-pesa.png"
                  alt="M-Pesa"
                  className="h-6 object-contain"
                />
                <img src="/ssl.jpg" alt="SSL" className="h-6 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

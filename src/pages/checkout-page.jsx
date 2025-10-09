"use client";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cart-context";
import { AuthContext } from "../contexts/auth-context";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  CreditCard,
  MapPin,
  Smartphone,
  Wallet,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
} from "lucide-react";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Payment Information
    paymentMethod: "card", // card, mpesa, paypal, cod (cash on delivery)

    // Credit Card fields
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // M-Pesa fields
    mpesaPhone: "",

    // PayPal fields
    paypalEmail: user?.email || "",

    // Cash on Delivery fields
    codPreferredTime: "",
    codSpecialInstructions: "",
  });

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to proceed with checkout");
      navigate("/login");
    }
  }, [user, navigate]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [mpesaStatus, setMpesaStatus] = useState(null); // null, 'pending', 'success', 'failed', 'timeout'
  const [transactionId, setTransactionId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePaymentMethodChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
    // Clear payment-related errors and status when switching methods
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.cardNumber;
      delete newErrors.expiryDate;
      delete newErrors.cvv;
      delete newErrors.cardName;
      delete newErrors.mpesaPhone;
      delete newErrors.paypalEmail;
      delete newErrors.codPreferredTime;
      return newErrors;
    });
    setMpesaStatus(null);
    setTransactionId(null);
  };

  const validateForm = () => {
    const newErrors = {};

    // Shipping validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "County is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Postal code is required";

    // Payment validation based on selected method
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = "Card number is required";
      if (!formData.expiryDate.trim())
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
      if (!formData.cardName.trim())
        newErrors.cardName = "Cardholder name is required";
    } else if (formData.paymentMethod === "mpesa") {
      if (!formData.mpesaPhone.trim()) {
        newErrors.mpesaPhone = "M-Pesa phone number is required";
      } else {
        // Clean phone number and validate
        const cleanPhone = formData.mpesaPhone.replace(/\s/g, "");
        if (!/^254[17]\d{8}$/.test(cleanPhone)) {
          newErrors.mpesaPhone =
            "Please enter a valid Kenyan phone number (254712345678)";
        }
      }
    } else if (formData.paymentMethod === "paypal") {
      if (!formData.paypalEmail.trim())
        newErrors.paypalEmail = "PayPal email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.paypalEmail)) {
        newErrors.paypalEmail = "Please enter a valid email address";
      }
    } else if (formData.paymentMethod === "cod") {
      // Cash on delivery validation (optional fields, but we can add basic validation)
      if (formData.codPreferredTime && !formData.codPreferredTime.trim()) {
        newErrors.codPreferredTime = "Please select a preferred delivery time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const initiateMpesaPayment = async (paymentData) => {
    try {
      setMpesaStatus("pending");
      toast.info("Initiating M-Pesa payment...");

      const response = await fetch(
        "https://bobbyfurnitureonline.onrender.com/api/mpesa/stkpush",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: paymentData.mpesaPhone.replace(/\s/g, ""),
            amount: Math.round(paymentData.amount),
            accountReference: `ORD-${Date.now()}`,
            transactionDesc: `Payment for Bobby Furniture Order`,
            callbackUrl: `${window.location.origin}/api/mpesa/callback`,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setTransactionId(result.checkoutRequestId);
        toast.success(
          "Payment request sent to your phone. Please check your M-Pesa menu."
        );

        // Start polling for payment status
        pollMpesaStatus(result.checkoutRequestId);

        return { success: true, checkoutRequestId: result.checkoutRequestId };
      } else {
        throw new Error(result.message || "Failed to initiate M-Pesa payment");
      }
    } catch (error) {
      setMpesaStatus("failed");
      throw error;
    }
  };

  const pollMpesaStatus = async (checkoutRequestId) => {
    const maxAttempts = 30; // Poll for 5 minutes (30 * 10 seconds)
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(
          `https://bobbyfurnitureonline.onrender.com/api/mpesa/status/${checkoutRequestId}`
        );
        const result = await response.json();

        if (result.status === "success") {
          setMpesaStatus("success");
          toast.success("Payment successful!");
          return { success: true, transactionId: result.mpesaReceiptNumber };
        } else if (result.status === "failed") {
          setMpesaStatus("failed");
          toast.error("Payment failed. Please try again.");
          throw new Error("Payment failed");
        } else if (result.status === "pending") {
          attempts++;
          if (attempts >= maxAttempts) {
            setMpesaStatus("timeout");
            toast.error("Payment timeout. Please try again.");
            throw new Error("Payment timeout");
          }
          // Continue polling
          setTimeout(poll, 10000); // Poll every 10 seconds
        }
      } catch (error) {
        setMpesaStatus("failed");
        throw error;
      }
    };

    poll();
  };

  const createOrder = async (orderData) => {
    try {
      // Prepare order data for API
      const apiOrderData = {
        user_id: user?.id,
        customerName: `${formData.firstName} ${formData.lastName}`,
        address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}`,
        phone: formData.phone,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        totalAmount: orderData.total,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === "cod" ? "Pending" : "Paid",
        deliveryInstructions: formData.codSpecialInstructions || null,
        preferredDeliveryTime: formData.codPreferredTime || null,
      };

      // Create order in database
      const response = await fetch(
        "https://bobbyfurnitureonline.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiOrderData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const result = await response.json();
      return result.order_id;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const processPayment = async (paymentData) => {
    switch (formData.paymentMethod) {
      case "card":
        // Mock credit card processing
        toast.info("Processing credit card payment...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return { success: true, transactionId: `CC_${Date.now()}` };

      case "mpesa":
        return await initiateMpesaPayment(paymentData);

      case "paypal":
        // Mock PayPal redirect
        toast.info("Redirecting to PayPal...");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return { success: true, transactionId: `PP_${Date.now()}` };

      case "cod":
        // Cash on delivery - no payment processing needed
        toast.success("Order placed successfully! You'll pay upon delivery.");
        return { success: true, transactionId: `COD_${Date.now()}` };

      default:
        throw new Error("Invalid payment method");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Check if user is logged in
    if (!user || !user.id) {
      toast.error("Please log in to place an order");
      return;
    }

    setLoading(true);
    try {
      const subtotal = getCartTotal();
      const shipping = subtotal > 50000 ? 0 : 500;
      const tax = subtotal * 0.16;
      const total = subtotal + shipping + tax;

      // Process payment
      const paymentResult = await processPayment({
        method: formData.paymentMethod,
        amount: total,
        mpesaPhone: formData.mpesaPhone,
        ...formData,
      });

      if (paymentResult.success) {
        // For M-Pesa, wait for payment confirmation
        if (formData.paymentMethod === "mpesa") {
          // Payment confirmation will be handled by polling
          return;
        }

        // For other payment methods (including COD), create order immediately
        try {
          const orderId = await createOrder({ total });
          clearCart();
          navigate(`/order-confirmation/${orderId}`, {
            state: {
              transactionId: paymentResult.transactionId,
              paymentMethod: formData.paymentMethod,
              total: total,
            },
          });
        } catch (orderError) {
          console.error("Order creation failed:", orderError);
          if (formData.paymentMethod === "cod") {
            toast.error("Failed to place order. Please try again.");
          } else {
            toast.error(
              "Payment successful but order creation failed. Please contact support."
            );
          }
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
      setMpesaStatus("failed");
    } finally {
      if (formData.paymentMethod !== "mpesa") {
        setLoading(false);
      }
    }
  };

  const handleMpesaSuccess = async () => {
    try {
      const subtotal = getCartTotal();
      const shipping = subtotal > 50000 ? 0 : 500;
      const tax = subtotal * 0.16;
      const total = subtotal + shipping + tax;

      const orderId = await createOrder({ total });
      clearCart();
      setLoading(false);
      navigate(`/order-confirmation/${orderId}`, {
        state: {
          transactionId: transactionId,
          paymentMethod: "mpesa",
          total: total,
        },
      });
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error(
        "Payment successful but order creation failed. Please contact support."
      );
      setLoading(false);
    }
  };

  // Handle M-Pesa payment retry
  const handleMpesaRetry = () => {
    setMpesaStatus(null);
    setTransactionId(null);
    setLoading(false);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before checking out.
          </p>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const renderMpesaStatus = () => {
    if (!mpesaStatus) return null;

    const statusConfig = {
      pending: {
        icon: <Clock className="h-6 w-6 text-yellow-500 animate-pulse" />,
        title: "Waiting for Payment",
        message:
          "Please check your phone for the M-Pesa payment request and enter your PIN to complete the payment.",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        textColor: "text-yellow-800",
      },
      success: {
        icon: <CheckCircle className="h-6 w-6 text-green-500" />,
        title: "Payment Successful",
        message:
          "Your M-Pesa payment has been confirmed. Redirecting to order confirmation...",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-800",
      },
      failed: {
        icon: <XCircle className="h-6 w-6 text-red-500" />,
        title: "Payment Failed",
        message:
          "Your M-Pesa payment could not be processed. Please try again.",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-800",
      },
      timeout: {
        icon: <XCircle className="h-6 w-6 text-red-500" />,
        title: "Payment Timeout",
        message: "The payment request has timed out. Please try again.",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-800",
      },
    };

    const config = statusConfig[mpesaStatus];

    return (
      <div
        className={`${config.bgColor} ${config.borderColor} border rounded-lg p-6 mb-6`}
      >
        <div className="flex items-center mb-4">
          {config.icon}
          <h3 className={`ml-3 text-lg font-medium ${config.textColor}`}>
            {config.title}
          </h3>
        </div>
        <p className={`${config.textColor} mb-4`}>{config.message}</p>

        {mpesaStatus === "success" && (
          <Button
            onClick={handleMpesaSuccess}
            className="bg-green-600 hover:bg-green-700"
          >
            Continue to Order Confirmation
          </Button>
        )}

        {(mpesaStatus === "failed" || mpesaStatus === "timeout") && (
          <Button onClick={handleMpesaRetry} variant="outline">
            Try Again
          </Button>
        )}

        {transactionId && (
          <p className="text-xs text-gray-500 mt-2">
            Transaction ID: {transactionId}
          </p>
        )}
      </div>
    );
  };

  const renderPaymentForm = () => {
    switch (formData.paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className={errors.cardName ? "border-red-500" : ""}
                placeholder="John Doe"
              />
              {errors.cardName && (
                <p className="text-sm text-red-600 mt-1">{errors.cardName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-600 mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && (
                  <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        );

      case "mpesa":
        return (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Smartphone className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-800">M-Pesa Payment</h4>
              </div>
              <p className="text-sm text-green-700">
                You will receive an STK push notification on your phone to
                complete the payment.
              </p>
            </div>

            <div>
              <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
              <Input
                id="mpesaPhone"
                name="mpesaPhone"
                placeholder="254712345678"
                value={formData.mpesaPhone}
                onChange={handleChange}
                className={errors.mpesaPhone ? "border-red-500" : ""}
                disabled={mpesaStatus === "pending"}
              />
              {errors.mpesaPhone && (
                <p className="text-sm text-red-600 mt-1">{errors.mpesaPhone}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter your phone number in format: 254712345678
              </p>
            </div>

            {renderMpesaStatus()}
          </div>
        );

      case "paypal":
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Wallet className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-800">PayPal Payment</h4>
              </div>
              <p className="text-sm text-blue-700">
                You will be redirected to PayPal to complete your payment
                securely.
              </p>
            </div>

            <div>
              <Label htmlFor="paypalEmail">PayPal Email</Label>
              <Input
                id="paypalEmail"
                name="paypalEmail"
                type="email"
                placeholder="your-email@example.com"
                value={formData.paypalEmail}
                onChange={handleChange}
                className={errors.paypalEmail ? "border-red-500" : ""}
              />
              {errors.paypalEmail && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.paypalEmail}
                </p>
              )}
            </div>
          </div>
        );

      case "cod":
        return (
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Truck className="h-5 w-5 text-orange-600 mr-2" />
                <h4 className="font-medium text-orange-800">
                  Cash on Delivery
                </h4>
              </div>
              <p className="text-sm text-orange-700">
                Pay with cash when your order is delivered to your doorstep. A
                small delivery fee may apply.
              </p>
            </div>

            <div>
              <Label htmlFor="codPreferredTime">
                Preferred Delivery Time (Optional)
              </Label>
              <select
                id="codPreferredTime"
                name="codPreferredTime"
                value={formData.codPreferredTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                <option value="afternoon">
                  Afternoon (12:00 PM - 5:00 PM)
                </option>
                <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                <option value="anytime">Anytime</option>
              </select>
              {errors.codPreferredTime && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.codPreferredTime}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="codSpecialInstructions">
                Special Delivery Instructions (Optional)
              </Label>
              <textarea
                id="codSpecialInstructions"
                name="codSpecialInstructions"
                value={formData.codSpecialInstructions}
                onChange={handleChange}
                placeholder="e.g., Call before delivery, Leave at gate, etc."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Please provide any special instructions for our delivery team.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Please ensure you have the exact amount
                ready as our delivery agents may not always carry change.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "border-red-500" : ""}
                      disabled={mpesaStatus === "pending"}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "border-red-500" : ""}
                      disabled={mpesaStatus === "pending"}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-red-500" : ""}
                      disabled={mpesaStatus === "pending"}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-red-500" : ""}
                      disabled={mpesaStatus === "pending"}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "border-red-500" : ""}
                    disabled={mpesaStatus === "pending"}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? "border-red-500" : ""}
                      disabled={mpesaStatus === "pending"}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state">County</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="e.g., Nairobi"
                      value={formData.state}
                      onChange={handleChange}
                      className={errors.state ? "border-red-500" : ""}
                      disabled={mpesaStatus === "pending"}
                    />
                    {errors.state && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Postal Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="00100"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={errors.zipCode ? "border-red-500" : ""}
                      disabled={mpesaStatus === "pending"}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                  disabled={mpesaStatus === "pending"}
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem
                        value="card"
                        id="card"
                        disabled={mpesaStatus === "pending"}
                      />
                      <Label
                        htmlFor="card"
                        className="flex items-center cursor-pointer flex-1"
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-500">
                            Visa, Mastercard, American Express
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem
                        value="mpesa"
                        id="mpesa"
                        disabled={mpesaStatus === "pending"}
                      />
                      <Label
                        htmlFor="mpesa"
                        className="flex items-center cursor-pointer flex-1"
                      >
                        <Smartphone className="h-5 w-5 mr-2 text-green-600" />
                        <div>
                          <div className="font-medium">M-Pesa</div>
                          <div className="text-sm text-gray-500">
                            Pay with your M-Pesa mobile money
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem
                        value="paypal"
                        id="paypal"
                        disabled={mpesaStatus === "pending"}
                      />
                      <Label
                        htmlFor="paypal"
                        className="flex items-center cursor-pointer flex-1"
                      >
                        <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                        <div>
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-gray-500">
                            Pay securely with your PayPal account
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem
                        value="cod"
                        id="cod"
                        disabled={mpesaStatus === "pending"}
                      />
                      <Label
                        htmlFor="cod"
                        className="flex items-center cursor-pointer flex-1"
                      >
                        <Truck className="h-5 w-5 mr-2 text-orange-600" />
                        <div>
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-gray-500">
                            Pay with cash when your order is delivered
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {formData.paymentMethod === "card" && (
                    <CreditCard className="h-5 w-5 mr-2" />
                  )}
                  {formData.paymentMethod === "mpesa" && (
                    <Smartphone className="h-5 w-5 mr-2 text-green-600" />
                  )}
                  {formData.paymentMethod === "paypal" && (
                    <Wallet className="h-5 w-5 mr-2 text-blue-600" />
                  )}
                  {formData.paymentMethod === "cod" && (
                    <Truck className="h-5 w-5 mr-2 text-orange-600" />
                  )}
                  {formData.paymentMethod === "cod"
                    ? "Delivery Information"
                    : "Payment Information"}
                </CardTitle>
              </CardHeader>
              <CardContent>{renderPaymentForm()}</CardContent>
            </Card>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? "Free"
                      : `KSh ${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (16%)</span>
                  <span>KSh {tax.toLocaleString()}</span>
                </div>
                {formData.paymentMethod === "cod" && (
                  <div className="flex justify-between text-orange-600">
                    <span>COD Fee</span>
                    <span>KSh 100</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    KSh{" "}
                    {(
                      total + (formData.paymentMethod === "cod" ? 100 : 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={loading || mpesaStatus === "pending"}
              >
                {loading || mpesaStatus === "pending" ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {mpesaStatus === "pending"
                      ? "Waiting for Payment..."
                      : "Processing..."}
                  </div>
                ) : (
                  `${
                    formData.paymentMethod === "cod"
                      ? "Place Order"
                      : "Place Order"
                  } - KSh ${(
                    total + (formData.paymentMethod === "cod" ? 100 : 0)
                  ).toLocaleString()}`
                )}
              </Button>

              {/* Payment method info */}
              <div className="text-xs text-gray-500 text-center">
                {formData.paymentMethod === "mpesa" &&
                  mpesaStatus !== "pending" &&
                  "You will receive an STK push on your phone"}
                {formData.paymentMethod === "mpesa" &&
                  mpesaStatus === "pending" &&
                  "Check your phone for the payment request"}
                {formData.paymentMethod === "paypal" &&
                  "You will be redirected to PayPal"}
                {formData.paymentMethod === "card" &&
                  "Your card will be charged securely"}
                {formData.paymentMethod === "cod" &&
                  "You will pay when your order is delivered"}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

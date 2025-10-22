"use client";

import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Tag,
} from "lucide-react";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Mock coupon data
  const availableCoupons = {
    // SAVE10: {
    //   discount: 0.1,
    //   type: "percentage",
    //   description: "10% off your order",
    // },
    // WELCOME20: {
    //   discount: 0.2,
    //   type: "percentage",
    //   description: "20% off for new customers",
    // },
    // FLAT500: {
    //   discount: 500,
    //   type: "fixed",
    //   description: "KSh 500 off your order",
    // },
    FREESHIP: { discount: 0, type: "shipping", description: "Free shipping" },
  };

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

  //delivery
  const deliveryZones = [
    { fare: 1000, areas: ["Kahawa Sukari", "Kahawa Wendani"] },
    { fare: 1500, areas: ["Githurai 45", "Baracks"] },
    {
      fare: 2000,
      areas: [
        "Bypass - Kamakis - corner - OJ",
        "Kwa Kairu - Kimbo",
        "Membley - Tatu City - Ruiru town",
        "Carwash - Roysambu - Mwikki",
        "Roasters - Zimmerman - Githurai 44 - Kahawa West",
        "Mwihoko",
      ],
    },
    {
      fare: 2500,
      areas: [
        "Witeithie - Juja - Kroad - Toll",
        "Pangani - Muthaiga - allsops",
        "Babadogo - Lucky summer - Njiru",
      ],
    },
    {
      fare: 3000,
      areas: [
        "Thika - Kiambu - Ruaka",
        "Muchatha - Parkland - Nairobi CBD",
        "Kariobangi - Umoja - Donholm - Buruburu",
        "Embakasi - Utawala - Ruai - Chokaa",
      ],
    },
    {
      fare: 3500,
      areas: [
        "Makongeni - Landless",
        "Westland - Kangemi - Uthiru - Kinoo - Muthiga",
        "Kileleshwa - Lavington - Kawangware - Ngong to Racecourse",
        "Kitsuru - Gachie - Wagige - Lower Kabete - Banana",
        "Langata - South B & C - Imara Daima",
      ],
    },
    {
      fare: 4000,
      areas: [
        "Kikuyu - Karen - Kenol",
        "Syokimau - Mlolongo - Athi River - Kamulu - Joska",
      ],
    },
    {
      fare: 4500,
      areas: ["Ngong Town", "Rongai Town", "Kitengela Town", "Malaa"],
    },
  ];

  const allAreas = deliveryZones.flatMap((zone) => zone.areas);

  // Example: selectedAddress comes from form or dropdown
  const selectedAddress = formData.address; // e.g., "Kahawa Sukari"

  const shipping =
    appliedCoupon?.type === "shipping"
      ? 0
      : deliveryZones.find((zone) =>
          zone.areas.some((area) => area === selectedAddress)
        )?.fare || 0;

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);

    setTimeout(() => {
      const coupon = availableCoupons[couponCode.toUpperCase()];
      if (coupon) {
        setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
        toast.success(`Coupon applied: ${coupon.description}`);
        setCouponCode("");
      } else {
        toast.error("Invalid coupon code");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  //monday promo
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const isMonday = today === 1;

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
  const [orderId, setOrderId] = useState(null);

  ///updated
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If address (area) changes, auto-detect city & county
    if (name === "address") {
      let detectedCity = "Nairobi"; // default
      let detectedCounty = "Nairobi";

      // Simple logic: decide based on known area groups
      const kiambuAreas = [
        "Thika - Kiambu - Ruaka",
        "Witeithie - Juja - Kroad - Toll",
        "Kwa Kairu - Kimbo",
        "Membley - Tatu City - Ruiru town",
        "Kikuyu - Karen - Kenol",
      ];

      if (
        kiambuAreas.some(
          (area) =>
            value.includes(area) ||
            value.includes("Ruiru") ||
            value.includes("Kiambu")
        )
      ) {
        detectedCity = "Kiambu";
        detectedCounty = "Kiambu";
      }

      setFormData((prev) => ({
        ...prev,
        address: value,
        city: detectedCity,
        state: detectedCounty,
      }));

      return; // prevent default below
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  ///new update 1
  const initiateMpesaPayment = async (paymentData) => {
    try {
      setMpesaStatus("pending");
      toast.info("📲 Initiating M-Pesa payment...");

      // 🔹 Send payment initiation request to your backend
      const response = await fetch(
        "https://bobbyfurnitureonline.onrender.com/api/mpesa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: paymentData.mpesaPhone.replace(/\s/g, ""), // Ensure format: 2547XXXXXXXX
            amount: Math.round(paymentData.amount),
            user_id: paymentData.user_id,
            customer_name: paymentData.customer_name || "Guest",
            address: paymentData.address || "N/A",
          }),
        }
      );

      const result = await response.json();

      if (result.success && result.data?.CheckoutRequestID) {
        const orderId = result.order_id;

        toast.success(
          "✅ STK push sent! Please complete the payment on your phone."
        );

        // Save transaction details
        setTransactionId(result.data.CheckoutRequestID);
        setOrderId(orderId);

        // 🔁 Start polling for payment status (checks /api/mpesa/status/:orderId)
        pollMpesaStatus(orderId);

        return { success: true, order_id: orderId };
      } else {
        throw new Error(result.message || "Failed to initiate M-Pesa payment.");
      }
    } catch (error) {
      console.error("❌ M-Pesa Payment Error:", error);
      setMpesaStatus("failed");
      toast.error("❌ M-Pesa payment initiation failed. Please try again.");
      return { success: false, error: error.message };
    }
  };

  //new update 2
  const pollMpesaStatus = async (orderId) => {
    const maxAttempts = 30; // ~5 minutes (poll every 10s)
    let attempts = 0;
    let stopPolling = false;

    const poll = async () => {
      if (stopPolling) return;

      try {
        const response = await fetch(
          `https://bobbyfurnitureonline.onrender.com/api/mpesa/status/${orderId}`
        );
        const result = await response.json();

        const paymentStatus = result?.status || "Pending";

        if (paymentStatus === "Completed") {
          stopPolling = true;
          setMpesaStatus("success");
          toast.success("✅ Payment successful!");

          // 🧩 Trigger order confirmation flow
          handleMpesaSuccess(orderId);
          return;
        }

        if (paymentStatus === "Failed") {
          stopPolling = true;
          setMpesaStatus("failed");
          toast.error("❌ Payment failed. Please try again.");
          return;
        }

        if (paymentStatus === "Pending") {
          attempts++;
          if (attempts >= maxAttempts) {
            stopPolling = true;
            setMpesaStatus("timeout");
            toast.error("⌛ Payment timeout. Please try again.");
            return;
          }

          // ⏱ Continue polling after 10s
          setTimeout(poll, 10000);
          return;
        }

        if (paymentStatus === "Completed") {
          setMpesaStatus("success");
          toast.success("✅ Payment successful!");
          handleMpesaSuccess(); // <-- redirect user automatically
          return { success: true };
        }

        // ⚠️ Unknown or unexpected response
        stopPolling = true;
        setMpesaStatus("failed");
        toast.error("⚠️ Unexpected payment response.");
      } catch (error) {
        console.error("M-Pesa polling error:", error);
        stopPolling = true;
        setMpesaStatus("failed");
        toast.error("❌ Error checking payment status.");
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

  //new update 4
  const processPayment = async (paymentData) => {
    if (paymentData.method === "mpesa") {
      try {
        const result = await initiateMpesaPayment(paymentData);

        if (result.success) {
          toast.info("📲 Waiting for M-Pesa confirmation...");
          // Poll until the payment completes
          pollMpesaStatus(result.order_id);
        }

        return result;
      } catch (error) {
        console.error("M-Pesa processing error:", error);
        return { success: false, error: error.message };
      }
    }

    // ✅ Other payment methods handled here (PayPal, card, COD)
    return { success: true };
  };

  //new update 5
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!user || !user.id) {
      toast.error("Please log in to place an order");
      return;
    }

    setLoading(true);

    try {
      const paymentResult = await processPayment({
        method: formData.paymentMethod,
        amount: total,
        mpesaPhone: formData.mpesaPhone,
        user_id: user.id,
        customer_name: `${user.first_name || ""} ${
          user.last_name || ""
        }`.trim(),
        address: formData.address,
      });

      // 🟩 M-Pesa handled via pollMpesaStatus — do not proceed here
      if (formData.paymentMethod === "mpesa") return;

      // 🟩 Other payment methods (e.g., COD)
      if (paymentResult.success) {
        const orderId = await createOrder({ total });
        clearCart();
        navigate(`/order-confirmation/${orderId}`, {
          state: {
            transactionId: paymentResult.transactionId || null,
            paymentMethod: formData.paymentMethod,
            total,
          },
        });
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
      setMpesaStatus("failed");
    } finally {
      // ⛔ Don’t stop loading for M-Pesa while polling
      if (formData.paymentMethod !== "mpesa") {
        setLoading(false);
      }
    }
  };

  //new update 3
  const handleMpesaSuccess = async (orderIdFromMpesa) => {
    try {
      const subtotal = getCartTotal();
      // const shipping = subtotal > 50000 ? 0 : 500;
      const total = subtotal + shipping;

      // ✅ Use existing order ID if provided from M-Pesa backend
      const orderId = orderIdFromMpesa || (await createOrder({ total }));

      clearCart();
      setLoading(false);

      // ✅ Navigate to order confirmation with correct transaction + order IDs
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
        "✅ Payment was successful but order creation failed. Please contact support."
      );
      setLoading(false);
    }
  };

  // 🔁 Handle M-Pesa payment retry
  const handleMpesaRetry = () => {
    setMpesaStatus(null);
    setTransactionId(null);
    setOrderId(null); // ✅ reset backend order reference too
    setLoading(false);
  };

  // const subtotal = getCartTotal();
  // const total = subtotal + shipping;

  const subtotal = getCartTotal();
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? subtotal * appliedCoupon.discount
      : appliedCoupon.discount
    : 0;
  // const shipping =
  //   subtotal > 500000 || appliedCoupon?.type === "shipping"
  //     ? 0
  //     : 0.003 * subtotal;
  // const tax = (subtotal - discount) * 0.16; // 16% VAT
  const total = subtotal - discount + shipping;

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
                {/* Name Fields */}
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

                {/* Email & Phone */}
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

                {/* Address Dropdown */}
                {/* Address Dropdown */}
                <div>
                  <Label htmlFor="address">Address (Select Area)</Label>
                  <select
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={mpesaStatus === "pending"}
                    className={`w-full p-2 border rounded-md ${
                      errors.address ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">-- Select Delivery Area --</option>
                    {allAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>

                  {errors.address && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City, County, Postal Code */}
                <div className="grid grid-cols-3 gap-4">
                  {/* City */}
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      readOnly
                      className="bg-gray-100 text-gray-600"
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* County */}
                  <div>
                    <Label htmlFor="state">County</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state || "Nairobi"}
                      readOnly
                      className="bg-gray-100 text-gray-600"
                    />
                    {errors.state && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  {/* Postal Code */}
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
        <div className="space-y-6">
          {/* Coupon Section */}
          {isMonday && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!appliedCoupon ? (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || isApplyingCoupon}
                      size="sm"
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">
                        {appliedCoupon.code}
                      </p>
                      <p className="text-sm text-green-600">
                        {appliedCoupon.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveCoupon}
                      className="text-green-700 hover:text-green-800"
                    >
                      Remove
                    </Button>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <p>Available Promo: FREESHIP</p>
                </div>
              </CardContent>
            </Card>
          )}

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
                  <span>Shipping Cost</span>
                  <span>
                    {shipping === 0
                      ? "Free"
                      : `KSh ${shipping.toLocaleString()}`}
                  </span>
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

              {/* new update 6 */}
              <Button
                onClick={
                  mpesaStatus === "failed" || mpesaStatus === "timeout"
                    ? handleMpesaRetry
                    : handleSubmit
                }
                className="w-full"
                disabled={loading || mpesaStatus === "pending"}
              >
                {mpesaStatus === "pending" ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Waiting for Payment...
                  </div>
                ) : mpesaStatus === "success" ? (
                  "Payment Successful"
                ) : mpesaStatus === "failed" ? (
                  "Retry Payment"
                ) : mpesaStatus === "timeout" ? (
                  "Try Again"
                ) : loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `${
                    formData.paymentMethod === "cod" ? "Place Order" : "Pay Now"
                  } - KSh ${(
                    total + (formData.paymentMethod === "cod" ? 100 : 0)
                  ).toLocaleString()}`
                )}
              </Button>

              {/* Payment Status Info */}
              <div className="text-xs text-gray-500 text-center mt-2">
                {formData.paymentMethod === "mpesa" && mpesaStatus === null && (
                  <span>
                    You will receive an STK push on your phone after placing
                    order.
                  </span>
                )}
                {formData.paymentMethod === "mpesa" &&
                  mpesaStatus === "pending" && (
                    <span>
                      📱 Check your phone and complete the M-Pesa payment
                      request.
                    </span>
                  )}
                {formData.paymentMethod === "mpesa" &&
                  mpesaStatus === "success" && (
                    <span className="text-green-600">
                      Payment confirmed successfully!
                    </span>
                  )}
                {formData.paymentMethod === "mpesa" &&
                  mpesaStatus === "failed" && (
                    <span className="text-red-500">
                      Payment failed. Please try again.
                    </span>
                  )}
                {formData.paymentMethod === "mpesa" &&
                  mpesaStatus === "timeout" && (
                    <span className="text-yellow-600">
                      Payment request timed out. Try again.
                    </span>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

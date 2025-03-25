// import { Link } from "react-router-dom";

// const OrderSuccess = () => {
//   return (
//     <div className="text-center p-8 h-screen flex flex-col items-center justify-center">
//       <h1 className="text-2xl font-bold text-green-600">
//         Order Placed Successfully!
//       </h1>
//       <p className="text-lg mt-4">Thank you for your purchase.</p>
//       <Link
//         to="/orders"
//         className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         View My Orders
//       </Link>
//     </div>
//   );
// };

// export default OrderSuccess;

"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Package,
  Truck,
  Calendar,
  CreditCard,
  ArrowLeft,
  Printer,
  Download,
} from "lucide-react";
import confetti from "canvas-confetti";

const OrderConfirmationPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching order details
  useEffect(() => {
    // In a real app, you would fetch the order details from your API
    // using an order ID from the URL or localStorage
    const simulateOrderFetch = () => {
      setIsLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        // Mock order data
        const mockOrder = {
          id: "ORD" + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toISOString(),
          status: "confirmed",
          items: JSON.parse(localStorage.getItem("orderItems") || "[]"),
          shipping: {
            name: localStorage.getItem("shippingName") || "John Doe",
            address:
              localStorage.getItem("shippingAddress") || "123 Main St, Nairobi",
            method: "Standard Delivery",
            estimatedDelivery: new Date(
              Date.now() + 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          payment: {
            method: localStorage.getItem("paymentMethod") || "mpesa",
            total: localStorage.getItem("orderTotal") || "15,000",
          },
        };

        setOrder(mockOrder);
        setIsLoading(false);

        // Trigger confetti effect when order loads
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 1000);
    };

    simulateOrderFetch();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">
          Processing your order...
        </h2>
        <p className="text-gray-500 mt-2">
          Please wait while we confirm your purchase
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Order #{order.id}
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                Confirmed
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Placed on {formatDate(order.date)}
            </p>
          </div>

          <div className="p-6 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600" />
              Order Summary
            </h3>

            <div className="divide-y divide-gray-200">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className="flex py-4 items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                      <img
                        src={
                          item.images?.[0] || "https://via.placeholder.com/150"
                        }
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        Ksh. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-4 text-gray-500 italic">
                  No items in this order
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                Shipping Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900">
                  {order.shipping.name}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {order.shipping.address}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{order.shipping.method}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      Estimated delivery:{" "}
                      {formatDate(order.shipping.estimatedDelivery)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Payment Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  {order.payment.method === "mpesa" && (
                    <>
                      <img
                        src="https://via.placeholder.com/40x40?text=M"
                        alt="M-Pesa"
                        className="h-8 w-8 object-contain mr-2"
                      />
                      <span className="font-medium text-gray-900">M-Pesa</span>
                    </>
                  )}
                  {order.payment.method === "card" && (
                    <>
                      <CreditCard className="h-8 w-8 text-blue-600 mr-2" />
                      <span className="font-medium text-gray-900">
                        Credit/Debit Card
                      </span>
                    </>
                  )}
                  {order.payment.method === "cash" && (
                    <>
                      <svg
                        className="h-8 w-8 text-green-600 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="font-medium text-gray-900">
                        Cash on Delivery
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      Ksh. {order.payment.total}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-medium mt-3 pt-3 border-t border-gray-200">
                    <span>Total:</span>
                    <span>Ksh. {order.payment.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </button>

          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <Printer className="mr-2 h-5 w-5" />
            Print Receipt
          </button>

          <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="mr-2 h-5 w-5" />
            Download Invoice
          </button>
        </div>

        {/* Order Tracking Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">
            You will receive an email confirmation shortly at{" "}
            <span className="font-medium">your@email.com</span>
          </p>
          <p className="text-gray-600">
            Track your order status in your{" "}
            <a
              href="/account/orders"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              account dashboard
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

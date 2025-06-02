"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CheckCircle, Package, Truck, Home, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get payment details from location state if available
  const paymentDetails = location.state || {};

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);

        // Fetch order details from the API
        const response = await fetch(
          `https://bobbyfurnitureonline.onrender.com/api/orders/${orderId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch order details: ${response.statusText}`
          );
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Unable to load order details. Please try again later.");
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-red-200">
            <CardContent className="pt-6 text-center">
              <div className="text-red-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Error Loading Order</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
                <Link to="/orders">
                  <Button variant="outline">View All Orders</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate estimated delivery date (7 days from order date)
  const getEstimatedDeliveryDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7);
    return formatDate(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>
              Order #{order?.public_id || orderId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Order Date</p>
                <p className="text-sm">
                  {order?.created_at
                    ? formatDate(order.created_at)
                    : new Date().toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Estimated Delivery
                </p>
                <p className="text-sm">
                  {order?.created_at
                    ? getEstimatedDeliveryDate(order.created_at)
                    : formatDate(
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      )}
                </p>
              </div>
            </div>

            {/* Payment Information */}
            {paymentDetails.paymentMethod && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Payment Information
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Payment Method
                    </p>
                    <p className="text-sm capitalize">
                      {paymentDetails.paymentMethod === "mpesa"
                        ? "M-Pesa"
                        : paymentDetails.paymentMethod === "card"
                        ? "Credit/Debit Card"
                        : paymentDetails.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Transaction ID
                    </p>
                    <p className="text-sm">
                      {paymentDetails.transactionId || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            {order?.items && order.items.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500 mb-2">Items</p>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">
                          {item.name || item.product_name}
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          × {item.quantity}
                        </span>
                      </div>
                      <span>
                        KSh {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-gray-100 font-medium">
                  <span>Total</span>
                  <span>
                    KSh{" "}
                    {(
                      order.total_amount ||
                      paymentDetails.total ||
                      0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Shipping Address */}
            {order?.address && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Shipping Address
                </p>
                <p className="text-sm">{order.customer_name}</p>
                <p className="text-sm">{order.address}</p>
                <p className="text-sm">{order.phone}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-gray-600">
                    We're preparing your items for shipment. You'll receive an
                    email confirmation shortly.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Shipping Updates</p>
                  <p className="text-sm text-gray-600">
                    We'll send you tracking information once your order ships.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Home className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-sm text-gray-600">
                    Your furniture will be delivered within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/orders">
            <Button variant="outline" className="w-full sm:w-auto">
              View Order History
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full sm:w-auto">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

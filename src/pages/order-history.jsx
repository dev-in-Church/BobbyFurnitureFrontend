"use client";

import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  AlertCircle,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { AuthContext } from "../contexts/auth-context";
import { toast } from "react-toastify";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchOrders = async () => {
    if (!user || !user.id) {
      setError("Please log in to view your orders");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://bobbyfurnitureonline.onrender.com/api/orders/user/${user.id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      const data = await response.json();

      // Sort orders by date (newest first)
      const sortedOrders = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load your orders. Please try again.");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Order History</h1>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2">Loading your orders...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Order History</h1>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {error}
              </h3>
              <Button onClick={fetchOrders} className="mt-4">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-6">
                When you place your first order, it will appear here.
              </p>
              <Link to="/">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.public_id || order.id}
                      </CardTitle>
                      <CardDescription>
                        Placed on {formatDate(order.created_at)}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${getStatusColor(order.order_status)} mb-2`}
                      >
                        <span className="flex items-center gap-1">
                          {getStatusIcon(order.order_status)}
                          {order.order_status
                            ? order.order_status.charAt(0).toUpperCase() +
                              order.order_status.slice(1).toLowerCase()
                            : "Pending"}
                        </span>
                      </Badge>
                      <p className="text-lg font-bold">
                        KSh {Number(order.total_amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items &&
                      order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-b last:border-b-0"
                        >
                          <div className="flex-1">
                            <p className="font-medium">
                              {item.product_name || item.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            KSh {Number(item.price).toLocaleString()}
                          </p>
                        </div>
                      ))}
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="flex space-x-2">
                      <Link to={`/order/${order.public_id || order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      {order.order_status?.toLowerCase() === "delivered" && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                    {order.order_status?.toLowerCase() === "shipped" && (
                      <Button size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    )}
                    {order.order_status?.toLowerCase() === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={async () => {
                          try {
                            const response = await fetch(
                              `https://bobbyfurnitureonline.onrender.com/api/orders/${order.id}/cancel`,
                              {
                                method: "PUT",
                              }
                            );

                            if (!response.ok) {
                              throw new Error("Failed to cancel order");
                            }

                            // Update the order status locally
                            setOrders(
                              orders.map((o) =>
                                o.id === order.id
                                  ? { ...o, order_status: "Cancelled" }
                                  : o
                              )
                            );

                            toast.success("Order cancelled successfully");
                          } catch (error) {
                            toast.error("Failed to cancel order");
                            console.error("Error cancelling order:", error);
                          }
                        }}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;

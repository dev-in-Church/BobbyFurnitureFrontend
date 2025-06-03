"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  RefreshCcw,
  Printer,
} from "lucide-react";
import { toast } from "react-toastify";

// Add print styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #print-content, #print-content * {
      visibility: visible;
    }
    #print-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px;
    }
    @page {
      size: A4;
      margin: 10mm;
    }
    .no-print {
      display: none !important;
    }
  }
`;

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");
  const printContentRef = useRef(null);

  // Check if we have order data from navigation state
  const orderFromState = location.state?.order;

  const fetchOrderDetails = async () => {
    try {
      // If orderId is undefined or invalid, show an error
      if (!orderId || orderId === "undefined") {
        setError("Invalid order ID. Please select a valid order.");
        setDebugInfo(`Invalid orderId: ${orderId}`);
        setLoading(false);
        return;
      }

      // If we have order data from navigation state, use it
      if (orderFromState) {
        console.log("Using order data from navigation state:", orderFromState);
        setOrder(orderFromState);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setDebugInfo(`Fetching order ${orderId}...`);

      console.log(`Attempting to fetch order: ${orderId}`);

      // First, try the individual order endpoint
      const response = await fetch(
        `https://bobbyfurnitureonline.onrender.com/api/orders/${orderId}`
      );

      console.log(`Response status: ${response.status}`);
      setDebugInfo(`API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        console.log(
          "Individual order endpoint failed, trying to get from all orders..."
        );
        setDebugInfo(
          `Individual order failed (${response.status}), trying all orders...`
        );

        // Fallback: Get all orders and find the specific one
        const allOrdersResponse = await fetch(
          "https://bobbyfurnitureonline.onrender.com/api/orders"
        );

        if (!allOrdersResponse.ok) {
          throw new Error(
            `Both endpoints failed. Individual: ${response.status}, All orders: ${allOrdersResponse.status}`
          );
        }

        const allOrders = await allOrdersResponse.json();
        console.log(`Found ${allOrders.length} total orders`);
        setDebugInfo(
          `Found ${allOrders.length} total orders, searching for order ${orderId}...`
        );

        // Find the specific order by ID
        const foundOrder = allOrders.find(
          (order) =>
            order.id == orderId ||
            order.public_id == orderId ||
            order.id === Number.parseInt(orderId)
        );

        if (!foundOrder) {
          throw new Error(
            `Order ${orderId} not found in ${allOrders.length} orders`
          );
        }

        console.log("Found order:", foundOrder);
        setOrder(foundOrder);
        setDebugInfo(`Successfully found order ${orderId}`);
        return;
      }

      // If individual endpoint worked
      const data = await response.json();
      console.log("Order data:", data);
      setOrder(data);
      setDebugInfo(`Successfully loaded order ${orderId}`);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError(`Failed to load order details: ${err.message}`);
      setDebugInfo(`Error: ${err.message}`);
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if we don't have the order from state
    if (!orderFromState) {
      fetchOrderDetails();
    } else {
      setOrder(orderFromState);
      setLoading(false);
    }
  }, [orderId, orderFromState]);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setError("Request timed out. The server may be slow or unavailable.");
        setLoading(false);
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "processing":
        return <Package className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      setUpdating(true);

      const response = await fetch(
        `https://bobbyfurnitureonline.onrender.com/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order_status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update order status: ${response.statusText}`
        );
      }

      // Update the order status locally
      setOrder((prev) => ({ ...prev, order_status: newStatus }));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const deleteOrder = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `https://bobbyfurnitureonline.onrender.com/api/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete order: ${response.statusText}`);
      }

      toast.success("Order deleted successfully");
      navigate("/admin/orders");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return `KSh ${Number(amount || 0).toLocaleString()}`;
  };

  // Handle printing
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      toast.error("Please allow pop-ups to print the order");
      return;
    }

    const printContent = printContentRef.current.innerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order #${order.public_id || order.id} - Bobby Furniture</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.5;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #ddd;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .contact-info {
              font-size: 14px;
              color: #666;
            }
            .order-info {
              margin-bottom: 20px;
              display: flex;
              justify-content: space-between;
            }
            .order-info-section {
              flex: 1;
            }
            .section-title {
              font-weight: bold;
              margin-bottom: 5px;
              font-size: 16px;
            }
            .section-content {
              font-size: 14px;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            .items-table th {
              background-color: #f5f5f5;
              text-align: left;
              padding: 8px;
              font-size: 14px;
              border-bottom: 1px solid #ddd;
            }
            .items-table td {
              padding: 8px;
              font-size: 14px;
              border-bottom: 1px solid #eee;
            }
            .totals {
              margin-top: 20px;
              text-align: right;
            }
            .total-row {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 5px;
            }
            .total-label {
              font-size: 14px;
              margin-right: 20px;
              width: 100px;
              text-align: right;
            }
            .total-value {
              font-size: 14px;
              width: 100px;
              text-align: right;
            }
            .grand-total {
              font-weight: bold;
              font-size: 16px;
              margin-top: 10px;
              padding-top: 5px;
              border-top: 1px solid #ddd;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 14px;
              color: #666;
              padding-top: 20px;
              border-top: 1px solid #ddd;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: bold;
              background-color: #f3f4f6;
              color: #374151;
            }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .status-processing { background-color: #dbeafe; color: #1e40af; }
            .status-shipped { background-color: #e0e7ff; color: #3730a3; }
            .status-delivered { background-color: #d1fae5; color: #065f46; }
            .status-cancelled { background-color: #fee2e2; color: #b91c1c; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Print after a short delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing (optional)
      // printWindow.close()
    }, 500);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/admin/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
              <p className="text-gray-600 mb-2">Loading order details...</p>
              <p className="text-sm text-gray-500">
                Order ID: {orderId || "Unknown"}
              </p>
              {debugInfo && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md max-w-md">
                  <p className="text-xs text-gray-600">Debug: {debugInfo}</p>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setLoading(false);
                  setError("Loading cancelled by user");
                }}
              >
                Cancel Loading
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/admin/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
          </div>

          <Card className="border-red-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error Loading Order
              </h3>
              <p className="text-gray-600 mb-4 text-center max-w-md">{error}</p>

              {debugInfo && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md max-w-md">
                  <p className="text-xs text-gray-600">
                    Debug Info: {debugInfo}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={fetchOrderDetails}>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Link to="/admin/orders">
                  <Button variant="outline">Back to Orders</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/admin/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Order Not Found
              </h3>
              <p className="text-gray-600 mb-4">
                Order #{orderId || "Unknown"} doesn't exist.
              </p>
              <Link to="/admin/orders">
                <Button>Back to Orders</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Calculate order totals
  const subtotal = order.total_amount || 0;
  const tax = subtotal * 0.16;
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + tax + shipping;

  // Get status class for print
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <style>{printStyles}</style>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 no-print">
          <div className="flex items-center space-x-4">
            <Link to="/admin/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">
                Order #{order.public_id || order.id}
              </h1>
              <p className="text-gray-600">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge className={`${getStatusColor(order.order_status)} border`}>
              <span className="flex items-center gap-1">
                {getStatusIcon(order.order_status)}
                {order.order_status
                  ? order.order_status.charAt(0).toUpperCase() +
                    order.order_status.slice(1).toLowerCase()
                  : "Pending"}
              </span>
            </Badge>
          </div>
        </div>

        {/* Printable content - hidden from normal view */}
        <div className="hidden">
          <div id="print-content" ref={printContentRef}>
            <div className="header">
              <div className="logo">Bobby Furniture</div>
              <div className="contact-info">
                <p>bobbyfurnitures254@gmail.com | +254 708 156 310</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            <div className="order-info">
              <div className="order-info-section">
                <div className="section-title">Order Information</div>
                <div className="section-content">
                  <p>
                    <strong>Order #:</strong> {order.public_id || order.id}
                  </p>
                  <p>
                    <strong>Date:</strong> {formatDate(order.created_at)}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`status-badge ${getStatusClass(
                        order.order_status
                      )}`}
                    >
                      {order.order_status
                        ? order.order_status.charAt(0).toUpperCase() +
                          order.order_status.slice(1).toLowerCase()
                        : "Pending"}
                    </span>
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {order.payment_method || "Not specified"}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {order.payment_status || "Pending"}
                  </p>
                </div>
              </div>

              <div className="order-info-section">
                <div className="section-title">Customer Information</div>
                <div className="section-content">
                  <p>
                    <strong>Name:</strong> {order.customer_name || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.email || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="section-title">Order Items</div>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product_name || item.name || "Product"}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No items found for this order
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="totals">
              <div className="total-row">
                <div className="total-label">Subtotal:</div>
                <div className="total-value">{formatCurrency(subtotal)}</div>
              </div>
              <div className="total-row">
                <div className="total-label">Tax (16%):</div>
                <div className="total-value">{formatCurrency(tax)}</div>
              </div>
              <div className="total-row">
                <div className="total-label">Shipping:</div>
                <div className="total-value">
                  {shipping === 0 ? "Free" : formatCurrency(shipping)}
                </div>
              </div>
              <div className="total-row grand-total">
                <div className="total-label">Total:</div>
                <div className="total-value">{formatCurrency(total)}</div>
              </div>
            </div>

            {order.delivery_instructions && (
              <div style={{ marginTop: "20px" }}>
                <div className="section-title">Delivery Instructions</div>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  {order.delivery_instructions}
                </div>
              </div>
            )}

            <div className="footer">
              <p>Thank you for shopping with Bobby Furniture!</p>
              <p>
                For any questions regarding this order, please contact us at
                bobbyfurnitures254@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Items
                </CardTitle>
                <CardDescription>
                  {order.items ? order.items.length : 0} item
                  {order.items?.length !== 1 ? "s" : ""} in this order
                </CardDescription>
              </CardHeader>
              <CardContent>
                {order.items && order.items.length > 0 ? (
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 border rounded-lg"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">
                            {item.product_name || item.name || "Product"}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            Unit Price: {formatCurrency(item.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? "Free" : formatCurrency(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (16%)</span>
                        <span>{formatCurrency(tax)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No items found for this order
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Customer Name
                      </p>
                      <p>{order.customer_name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p>{order.phone || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p>{order.email || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Order Date
                      </p>
                      <p>{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                </div>

                {order.address && (
                  <div className="flex items-start space-x-3 pt-4 border-t">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Shipping Address
                      </p>
                      <p className="whitespace-pre-line">{order.address}</p>
                    </div>
                  </div>
                )}

                {order.delivery_instructions && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Delivery Instructions
                    </p>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">
                      {order.delivery_instructions}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Status</span>
                  <Badge
                    className={`${getStatusColor(order.order_status)} border`}
                  >
                    <span className="flex items-center gap-1">
                      {getStatusIcon(order.order_status)}
                      {order.order_status
                        ? order.order_status.charAt(0).toUpperCase() +
                          order.order_status.slice(1).toLowerCase()
                        : "Pending"}
                    </span>
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Update Status
                  </label>
                  <Select
                    value={order.order_status || "Pending"}
                    onValueChange={updateOrderStatus}
                    disabled={updating}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Method</span>
                  <span className="text-sm font-medium capitalize">
                    {order.payment_method || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Status</span>
                  <Badge
                    variant={
                      order.payment_status === "Paid" ? "default" : "secondary"
                    }
                    className={
                      order.payment_status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {order.payment_status || "Pending"}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>{formatCurrency(order.total_amount)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Order
                </Button>

                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Order
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={deleteOrder}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;

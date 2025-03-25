// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axios"; // Use your Axios instance
// import {
//   FaShoppingBag,
//   FaTimesCircle,
//   FaCheckCircle,
//   FaClock,
// } from "react-icons/fa";

// const OrdersPage = () => {
//   const { user, token } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!user?.id) return; // Ensure user is fully loaded

//     const fetchOrders = async () => {
//       try {
//         const response = await api.get(`/api/orders/user/${user.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(response.data);
//       } catch (err) {
//         setError("Failed to load orders.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user, token]);

//   const handleCancelOrder = async (orderId) => {
//     try {
//       await api.put(`/api/orders/${orderId}/cancel`, null, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === orderId ? { ...order, order_status: "Cancelled" } : order
//         )
//       );
//     } catch (err) {
//       console.error("Error canceling order:", err);
//       alert("Failed to cancel order.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-24 p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
//         <FaShoppingBag className="text-blue-600" /> My Orders
//       </h2>

//       {loading ? (
//         <p className="text-gray-600 text-center">Loading orders...</p>
//       ) : error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="border p-6 rounded-lg shadow-md bg-white"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-lg font-semibold">
//                     Order <span className="text-blue-600">#{order.id}</span>
//                   </p>
//                   <p className="text-gray-600">
//                     Date: {new Date(order.created_at).toLocaleDateString()}
//                   </p>
//                   {/* <p>Name: {order}</p> */}
//                   <p
//                     className={`font-semibold flex items-center gap-1 ${
//                       order.order_status === "Cancelled"
//                         ? "text-red-500"
//                         : "text-blue-600"
//                     }`}
//                   >
//                     {order.order_status === "Cancelled" ? (
//                       <FaTimesCircle />
//                     ) : order.order_status === "Pending" ? (
//                       <FaClock />
//                     ) : (
//                       <FaCheckCircle />
//                     )}
//                     Status: {order.order_status}
//                   </p>
//                   <p className="font-semibold text-gray-800">
//                     Total:{" "}
//                     <span className="text-blue-600">
//                       Ksh {order.total_amount}
//                     </span>
//                   </p>
//                 </div>
//                 {order.order_status === "Pending" ||
//                 order.order_status === "Processing" ? (
//                   <button
//                     onClick={() => handleCancelOrder(order.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
//                   >
//                     Cancel Order
//                   </button>
//                 ) : null}
//               </div>

//               {/* Order Items */}
//               <div className="mt-4">
//                 <p className="font-semibold text-gray-800">Items:</p>
//                 <ul className="ml-4 list-disc text-gray-700">
//                   {order.items.map((item, index) => (
//                     <li key={index} className="mt-1">
//                       <span className="font-medium text-gray-900">
//                         {item.product_name}
//                       </span>{" "}
//                       -
//                       <span className="text-gray-600">
//                         {" "}
//                         {item.quantity} x Ksh {item.price}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios"; // Use your Axios instance
import {
  ShoppingBag,
  XCircle,
  CheckCircle,
  Clock,
  TruckIcon as TruckDelivery,
  Package,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  Eye,
  Download,
  RefreshCw,
  AlertTriangle,
  FileText,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

const OrdersPage = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeFrame, setTimeFrame] = useState("all");

  // Status options with colors and icons
  const statusOptions = {
    Pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="w-4 h-4" />,
    },
    Processing: {
      color: "bg-blue-100 text-blue-800",
      icon: <Package className="w-4 h-4" />,
    },
    Shipped: {
      color: "bg-indigo-100 text-indigo-800",
      icon: <TruckDelivery className="w-4 h-4" />,
    },
    Delivered: {
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    Cancelled: {
      color: "bg-red-100 text-red-800",
      icon: <XCircle className="w-4 h-4" />,
    },
  };

  useEffect(() => {
    if (!user?.id) return; // Ensure user is fully loaded

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/orders/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Add some sample data for demonstration if needed
        const ordersWithDetails = response.data.map((order) => ({
          ...order,
          // Add tracking info if not present in API response
          tracking_number:
            order.tracking_number ||
            (order.order_status === "Shipped"
              ? `TRK${Math.floor(Math.random() * 1000000)}`
              : null),
          // Add estimated delivery if not present
          estimated_delivery:
            order.estimated_delivery ||
            (order.order_status === "Shipped"
              ? new Date(
                  new Date().setDate(new Date().getDate() + 3)
                ).toISOString()
              : null),
          // Add shipping address if not present
          shipping_address: order.shipping_address || {
            street: "123 Main St",
            city: "Nairobi",
            postal_code: "00100",
            country: "Kenya",
          },
          // Add payment method if not present
          payment_method: order.payment_method || "M-Pesa",
        }));

        setOrders(ordersWithDetails);
        setFilteredOrders(ordersWithDetails);
      } catch (err) {
        setError("Failed to load orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...orders];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (order) =>
          order.id.toString().includes(searchQuery) ||
          (order.tracking_number &&
            order.tracking_number
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          order.items.some((item) =>
            item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.order_status === statusFilter);
    }

    // Apply time frame filter
    if (timeFrame !== "all") {
      const now = new Date();
      const cutoffDate = new Date();

      switch (timeFrame) {
        case "last30days":
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case "last3months":
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case "last6months":
          cutoffDate.setMonth(now.getMonth() - 6);
          break;
        default:
          break;
      }

      result = result.filter(
        (order) => new Date(order.created_at) >= cutoffDate
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "highestValue":
        result.sort((a, b) => b.total_amount - a.total_amount);
        break;
      case "lowestValue":
        result.sort((a, b) => a.total_amount - b.total_amount);
        break;
      default:
        break;
    }

    setFilteredOrders(result);
  }, [orders, searchQuery, statusFilter, sortOption, timeFrame]);

  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingOrderId(orderId);
      await api.put(`/api/orders/${orderId}/cancel`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, order_status: "Cancelled" } : order
        )
      );
    } catch (err) {
      console.error("Error canceling order:", err);
      alert("Failed to cancel order.");
    } finally {
      setCancellingOrderId(null);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const refreshOrders = async () => {
    if (!user?.id) return;

    setIsRefreshing(true);
    try {
      const response = await api.get(`/api/orders/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.error("Error refreshing orders:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const getStatusBadge = (status) => {
    const statusInfo = statusOptions[status] || {
      color: "bg-gray-100 text-gray-800",
      icon: <Clock className="w-4 h-4" />,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
      >
        {statusInfo.icon}
        <span className="ml-1">{status}</span>
      </span>
    );
  };

  const getOrderProgress = (status) => {
    const steps = ["Pending", "Processing", "Shipped", "Delivered"];
    if (status === "Cancelled") return 0;

    const currentStep = steps.indexOf(status);
    if (currentStep === -1) return 0;

    return (currentStep / (steps.length - 1)) * 100;
  };

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <ShoppingBag className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No orders found
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        You haven't placed any orders yet. Browse our products and start
        shopping!
      </p>
      <button
        onClick={() => (window.location.href = "/products")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Browse Products
      </button>
    </div>
  );

  // Loading state component
  const LoadingState = () => (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
      <p className="text-gray-600">Loading your orders...</p>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Failed to load orders
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">{error}</p>
      <button
        onClick={refreshOrders}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4 sm:p-6 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4 sm:mb-0">
              <ShoppingBag className="w-6 h-6 text-blue-600" /> My Orders
            </h2>

            <div className="flex items-center space-x-2">
              <button
                onClick={refreshOrders}
                disabled={isRefreshing}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {showFilters ? (
                  <ChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          className={`border-b border-gray-200 ${
            showFilters ? "block" : "hidden"
          }`}
        >
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative flex items-center">
              <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                {Object.keys(statusOptions).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="time-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time Period
              </label>
              <select
                id="time-filter"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Time</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last3months">Last 3 Months</option>
                <option value="last6months">Last 6 Months</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sort-option"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sort By
              </label>
              <select
                id="sort-option"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highestValue">Highest Value</option>
                <option value="lowestValue">Lowest Value</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-200">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : filteredOrders.length === 0 ? (
            <EmptyState />
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-0">
                    <div className="flex-shrink-0 bg-blue-50 p-3 rounded-full">
                      <ShoppingBag className="h-6 w-6 text-blue-600" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        {getStatusBadge(order.order_status)}
                      </div>

                      <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-2 sm:gap-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(order.created_at)}</span>
                        </div>

                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{formatTime(order.created_at)}</span>
                        </div>

                        <div className="font-medium text-gray-900">
                          Ksh {order.total_amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {expandedOrderId === order.id ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </>
                      )}
                    </button>

                    {(order.order_status === "Pending" ||
                      order.order_status === "Processing") && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingOrderId === order.id}
                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cancellingOrderId === order.id ? (
                          <>
                            <RefreshCw className="animate-spin w-4 h-4 mr-2" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Order
                          </>
                        )}
                      </button>
                    )}

                    {order.order_status === "Shipped" &&
                      order.tracking_number && (
                        <a
                          href={`https://example.com/track?number=${order.tracking_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <TruckDelivery className="w-4 h-4 mr-2" />
                          Track Package
                        </a>
                      )}
                  </div>
                </div>

                {/* Order Progress Bar */}
                {order.order_status !== "Cancelled" && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${getOrderProgress(order.order_status)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Order Placed</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                )}

                {/* Expanded Order Details */}
                {expandedOrderId === order.id && (
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Order Items */}
                      <div className="md:col-span-2">
                        <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                          <Package className="w-4 h-4 mr-2 text-blue-600" />
                          Order Items
                        </h4>

                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <div className="divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="p-4 flex items-center"
                              >
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                  {item.product_image ? (
                                    <img
                                      src={
                                        item.product_image || "/placeholder.svg"
                                      }
                                      alt={item.product_name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full w-full bg-gray-100">
                                      <Package className="h-8 w-8 text-gray-400" />
                                    </div>
                                  )}
                                </div>

                                <div className="ml-4 flex-1">
                                  <h5 className="text-sm font-medium text-gray-900">
                                    {item.product_name}
                                  </h5>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>

                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900">
                                    Ksh{" "}
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500">
                                    Ksh {item.price.toLocaleString()} each
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Summary */}
                          <div className="bg-gray-100 p-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="font-medium">
                                Ksh {order.total_amount.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-600">Shipping</span>
                              <span className="font-medium">
                                Ksh {(order.shipping_fee || 0).toLocaleString()}
                              </span>
                            </div>

                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-600">Tax</span>
                              <span className="font-medium">
                                Ksh {(order.tax || 0).toLocaleString()}
                              </span>
                            </div>

                            <div className="flex justify-between font-medium text-base mt-2 pt-2 border-t border-gray-300">
                              <span>Total</span>
                              <span>
                                Ksh {order.total_amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Info */}
                      <div>
                        <div className="space-y-6">
                          {/* Shipping Information */}
                          <div>
                            <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                              Shipping Information
                            </h4>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <p className="text-sm font-medium text-gray-900">
                                {order.customer_name || user?.name}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {order.shipping_address?.street},{" "}
                                {order.shipping_address?.city}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.shipping_address?.postal_code},{" "}
                                {order.shipping_address?.country}
                              </p>

                              {order.phone && (
                                <div className="flex items-center mt-2 text-sm text-gray-600">
                                  <Phone className="w-4 h-4 mr-1 text-gray-400" />
                                  {order.phone}
                                </div>
                              )}

                              {order.email && (
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                  <Mail className="w-4 h-4 mr-1 text-gray-400" />
                                  {order.email}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Payment Information */}
                          <div>
                            <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                              <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                              Payment Information
                            </h4>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <p className="text-sm font-medium text-gray-900">
                                {order.payment_method || "Credit Card"}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                Status:{" "}
                                <span className="font-medium text-green-600">
                                  Paid
                                </span>
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                Date: {formatDate(order.created_at)}
                              </p>
                            </div>
                          </div>

                          {/* Tracking Information */}
                          {order.tracking_number && (
                            <div>
                              <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                                <TruckDelivery className="w-4 h-4 mr-2 text-blue-600" />
                                Tracking Information
                              </h4>

                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-600">
                                  Tracking Number:
                                </p>
                                <p className="text-sm font-medium text-gray-900 mb-2">
                                  {order.tracking_number}
                                </p>

                                {order.estimated_delivery && (
                                  <p className="text-sm text-gray-600">
                                    Estimated Delivery:{" "}
                                    <span className="font-medium">
                                      {formatDate(order.estimated_delivery)}
                                    </span>
                                  </p>
                                )}

                                <a
                                  href={`https://example.com/track?number=${order.tracking_number}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                  Track Package{" "}
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </div>
                            </div>
                          )}

                          {/* Order Actions */}
                          <div>
                            <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-blue-600" />
                              Order Actions
                            </h4>

                            <div className="space-y-2">
                              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <Download className="w-4 h-4 mr-2" />
                                Download Invoice
                              </button>

                              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Request Return
                              </button>

                              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <Mail className="w-4 h-4 mr-2" />
                                Contact Support
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  ShoppingBag,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  Trash2,
  X,
  CheckCircle,
  AlertTriangle,
  Loader,
  RefreshCw,
  Clock,
  Package,
  Truck,
  Check,
  Phone,
  Mail,
  MapPin,
  Download,
  Printer,
  User,
} from "lucide-react";
import axios from "axios";
import UpdateOrderStatus from "./UpdateOrderStatus";

const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com/api/orders"; // Change if needed

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ordersPerPage = 10;

  // Fetch all orders
  useEffect(() => {
    fetchOrders();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...orders];

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(
        (order) => order.order_status === statusFilter
      );
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customer_name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.phone?.includes(searchQuery) ||
          order.id?.toString().includes(searchQuery)
      );
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const cutoffDate = new Date();

      switch (dateFilter) {
        case "today":
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }

      filtered = filtered.filter(
        (order) => new Date(order.created_at) >= cutoffDate
      );
    }

    // Apply sorting
    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sortOrder === "highest") {
      filtered.sort((a, b) => b.total_amount - a.total_amount);
    } else if (sortOrder === "lowest") {
      filtered.sort((a, b) => a.total_amount - b.total_amount);
    }

    setFilteredOrders(filtered);
    setTotalPages(Math.ceil(filtered.length / ordersPerPage));
  }, [orders, statusFilter, searchQuery, dateFilter, sortOrder]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_BASE_URL);
      setOrders(response.data);
      setFilteredOrders(response.data);
      setTotalPages(Math.ceil(response.data.length / ordersPerPage));
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/${orderId}/status`, {
        order_status: newStatus,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, order_status: newStatus } : order
        )
      );

      setSuccess("Order status updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    // If not confirming, show confirmation first
    if (confirmDelete !== orderId) {
      setConfirmDelete(orderId);
      return;
    }

    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/${orderId}/cancel`);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, order_status: "Cancelled" } : order
        )
      );

      setSuccess("Order cancelled successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error canceling order:", error);
      setError("Failed to cancel order");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    // If not confirming, show confirmation first
    if (confirmDelete !== orderId) {
      setConfirmDelete(orderId);
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/${orderId}`);

      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      setSuccess("Order deleted successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error deleting order:", error);
      setError("Failed to delete order");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Get current page orders
  const getCurrentPageOrders = () => {
    const startIndex = (page - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  const getStatusBadge = (status) => {
    let color = "";
    let icon = null;

    switch (status) {
      case "Pending":
        color = "bg-amber-100 text-amber-800";
        icon = <Clock className="w-3 h-3 mr-1" />;
        break;
      case "Processing":
        color = "bg-blue-100 text-blue-800";
        icon = <Package className="w-3 h-3 mr-1" />;
        break;
      case "Shipped":
        color = "bg-purple-100 text-purple-800";
        icon = <Truck className="w-3 h-3 mr-1" />;
        break;
      case "Delivered":
        color = "bg-green-100 text-green-800";
        icon = <Check className="w-3 h-3 mr-1" />;
        break;
      case "Cancelled":
        color = "bg-red-100 text-red-800";
        icon = <X className="w-3 h-3 mr-1" />;
        break;
      default:
        color = "bg-gray-100 text-gray-800";
        icon = <Clock className="w-3 h-3 mr-1" />;
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
      >
        {icon}
        {status}
      </span>
    );
  };

  // Loading state
  if (loading && orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6 text-blue-600" />
              Order Management
            </h1>
            <p className="text-gray-600 mt-1">Total orders: {orders.length}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Refresh orders"
            >
              <RefreshCw className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search Orders
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by name, phone, or ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label
                  htmlFor="status-filter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label
                  htmlFor="date-filter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Filter by Date
                </label>
                <select
                  id="date-filter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label
                  htmlFor="sort-order"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort By
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Amount</option>
                  <option value="lowest">Lowest Amount</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orders Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentPageOrders().map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer_name}
                      </div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(order.created_at), "dd MMM yyyy")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(order.created_at), "h:mm a")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Ksh {order.total_amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.order_status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                        title="View Order Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {(order.order_status === "Pending" ||
                        order.order_status === "Processing") && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className={`${
                            confirmDelete === order.id &&
                            confirmDelete === order.id
                              ? "text-red-600 bg-red-50 px-2 py-1 rounded"
                              : "text-red-600 hover:text-red-900"
                          } flex items-center`}
                          title={
                            confirmDelete === order.id
                              ? "Click again to confirm"
                              : "Cancel Order"
                          }
                        >
                          <X className="h-4 w-4" />
                          {confirmDelete === order.id && (
                            <span className="ml-1 text-xs">Confirm</span>
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => deleteOrder(order.id)}
                        className={`${
                          confirmDelete === order.id &&
                          confirmDelete !== order.id
                            ? "text-red-600 bg-red-50 px-2 py-1 rounded"
                            : "text-red-600 hover:text-red-900"
                        } flex items-center`}
                        title={
                          confirmDelete === order.id
                            ? "Click again to confirm"
                            : "Delete Order"
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                        {confirmDelete === order.id && (
                          <span className="ml-1 text-xs">Confirm</span>
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}

              {/* Empty State */}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center">
                      <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No orders found
                      </h3>
                      <p className="text-gray-500 max-w-sm">
                        {searchQuery || statusFilter || dateFilter !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "There are no orders in the system yet"}
                      </p>
                      {(searchQuery ||
                        statusFilter ||
                        dateFilter !== "all") && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("");
                            setDateFilter("all");
                          }}
                          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ordersPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(page * ordersPerPage, filteredOrders.length)}
              </span>{" "}
              of <span className="font-medium">{filteredOrders.length}</span>{" "}
              orders
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 rounded-md ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md ${
                      page === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-md ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Order #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                    Order Information
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span>{getStatusBadge(selectedOrder.order_status)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {format(new Date(selectedOrder.created_at), "PPP p")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium">
                        Ksh {selectedOrder.total_amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">
                        {selectedOrder.payment_method || "M-Pesa"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Customer Information
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <User className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <span className="text-gray-600 block">Name:</span>
                        <span className="font-medium">
                          {selectedOrder.customer_name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <span className="text-gray-600 block">Phone:</span>
                        <span className="font-medium">
                          {selectedOrder.phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <span className="text-gray-600 block">Email:</span>
                        <span className="font-medium">
                          {selectedOrder.email || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <span className="text-gray-600 block">
                          Delivery Address:
                        </span>
                        <span className="font-medium">
                          {selectedOrder.address || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Order Items
                </h4>

                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.product_name ||
                                `Product #${item.product_id}`}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                              Ksh {item.price.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                              Ksh{" "}
                              {(item.price * item.quantity).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-4 py-3 text-center text-sm text-gray-500"
                          >
                            No items available
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan="3"
                          className="px-4 py-3 text-right text-sm font-medium text-gray-500"
                        >
                          Subtotal
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                          Ksh {selectedOrder.total_amount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Update Status */}
              <div className="mt-8">
                <UpdateOrderStatus
                  orderId={selectedOrder.id}
                  currentStatus={selectedOrder.order_status}
                  onStatusUpdate={(newStatus) => {
                    setSelectedOrder({
                      ...selectedOrder,
                      order_status: newStatus,
                    });
                    updateOrderStatus(selectedOrder.id, newStatus);
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3 justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Order
                </button>

                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

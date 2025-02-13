import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com/api/orders"; // Change if needed

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_BASE_URL);
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders by status
  useEffect(() => {
    let filtered = orders;
    if (statusFilter) {
      filtered = orders.filter((order) => order.order_status === statusFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customer_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.phone.includes(searchQuery)
      );
    }
    setFilteredOrders(filtered);
  }, [statusFilter, searchQuery, orders]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/${orderId}/status`, {
        order_status: newStatus,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, order_status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`${API_BASE_URL}/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, order_status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Order Management</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by customer name or phone..."
          className="p-2 border rounded w-1/3"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Customer</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.customer_name}</td>
                  <td className="border p-2">{order.phone}</td>
                  <td className="border p-2">Ksh {order.total_amount}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.order_status === "Pending"
                          ? "bg-yellow-200"
                          : order.order_status === "Shipped"
                          ? "bg-blue-200"
                          : order.order_status === "Delivered"
                          ? "bg-green-200"
                          : order.order_status === "Cancelled"
                          ? "bg-red-200"
                          : "bg-gray-200"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                  <td className="border p-2">
                    {format(new Date(order.created_at), "dd MMM yyyy")}
                  </td>
                  <td className="border p-2 flex gap-2 justify-center">
                    {/* View Details */}
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                    {/* Update Status */}
                    <select
                      className="p-1 border rounded"
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      defaultValue={order.order_status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    {/* Cancel Order */}
                    {order.order_status === "Pending" ||
                    order.order_status === "Processing" ? (
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel
                      </button>
                    ) : null}
                    {/* Delete Order */}
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold">Order Details</h3>
            <p>Customer: {selectedOrder.customer_name}</p>
            <p>Phone: {selectedOrder.phone}</p>
            <p>Delivery Location: {selectedOrder.address}</p>
            <p>Total: Ksh {selectedOrder.total_amount}</p>

            {/* Order Items */}
            {/* <div className="mt-4">
              <p className="font-semibold text-gray-800">Items:</p>
              <ul className="ml-4 list-disc text-gray-700">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="mt-1">
                    <span className="font-medium text-gray-900">
                      {item.product_name}
                    </span>{" "}
                    -
                    <span className="text-gray-600">
                      {" "}
                      {item.quantity} x Ksh {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div> */}
            <button
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

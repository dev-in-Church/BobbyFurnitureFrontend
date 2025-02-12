import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios"; // Use your Axios instance
import {
  FaShoppingBag,
  FaTimesCircle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const OrdersPage = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return; // Ensure user is fully loaded

    const fetchOrders = async () => {
      try {
        const response = await api.get(`/api/orders/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token]);

  const handleCancelOrder = async (orderId) => {
    try {
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
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaShoppingBag className="text-blue-600" /> My Orders
      </h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-6 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Order <span className="text-blue-600">#{order.id}</span>
                  </p>
                  <p className="text-gray-600">
                    Date: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <p
                    className={`font-semibold flex items-center gap-1 ${
                      order.order_status === "Cancelled"
                        ? "text-red-500"
                        : "text-blue-600"
                    }`}
                  >
                    {order.order_status === "Cancelled" ? (
                      <FaTimesCircle />
                    ) : order.order_status === "Pending" ? (
                      <FaClock />
                    ) : (
                      <FaCheckCircle />
                    )}
                    Status: {order.order_status}
                  </p>
                  <p className="font-semibold text-gray-800">
                    Total:{" "}
                    <span className="text-blue-600">
                      Ksh {order.total_amount}
                    </span>
                  </p>
                </div>
                {order.order_status === "Pending" ||
                order.order_status === "Processing" ? (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                  >
                    Cancel Order
                  </button>
                ) : null}
              </div>

              {/* Order Items */}
              <div className="mt-4">
                <p className="font-semibold text-gray-800">Items:</p>
                <ul className="ml-4 list-disc text-gray-700">
                  {order.items.map((item, index) => (
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

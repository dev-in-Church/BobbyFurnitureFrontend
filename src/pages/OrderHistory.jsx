import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("User from AuthContext:", user); // Debugging log

  useEffect(() => {
    if (!user || !user.id) {
      console.error("User ID is missing or undefined", user);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://bobbyfurnitureonline.onrender.com/api/orders/user/${user.id}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Orders:", data);
        setOrders(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">
          No orders found. Start shopping now!
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Order History
      </h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md border-l-4 border-blue-500"
          >
            <p className="text-lg font-semibold text-gray-700">
              Order ID: <span className="text-blue-600">{order.id}</span>
            </p>
            <p className="text-gray-600">
              Total:{" "}
              <span className="font-semibold text-green-600">
                ${Number(order.total_amount || 0).toFixed(2)}
              </span>
            </p>
            <p className="text-gray-600">
              Status:{" "}
              <span
                className={`px-3 py-1 rounded-md font-semibold ${
                  order.order_status === "Completed"
                    ? "bg-green-500 text-white"
                    : order.order_status === "Pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {order.order_status}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;

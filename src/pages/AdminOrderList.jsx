// AdminOrderList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center border">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.user_id}</td>
              <td className="border p-2">${order.total_amount}</td>
              <td className="border p-2">{order.order_status}</td>
              <td className="border p-2">
                <Link
                  to={`/admin/orders/${order.id}`}
                  className="text-blue-500"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;

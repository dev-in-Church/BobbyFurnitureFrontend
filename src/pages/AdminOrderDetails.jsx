// AdminOrderDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UpdateOrderStatus from "./UpdateOrderStatus";
import DeleteOrderButton from "./DeleteOrderButton";

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/orders/${orderId}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>User ID:</strong> {order.user_id}
      </p>
      <p>
        <strong>Total Amount:</strong> ${order.total_amount}
      </p>
      <p>
        <strong>Status:</strong> {order.order_status}
      </p>
      <h3 className="text-xl font-semibold mt-4">Items:</h3>
      <ul>
        {order.items.map((item) => (
          <li key={item.id} className="border p-2 mt-2">
            {item.product_name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <UpdateOrderStatus
        orderId={order.id}
        currentStatus={order.order_status}
      />
      <DeleteOrderButton orderId={order.id} />
    </div>
  );
};

export default AdminOrderDetails;

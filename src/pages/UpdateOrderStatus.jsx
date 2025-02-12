// UpdateOrderStatus.jsx
import React, { useState } from "react";
import axios from "axios";

const UpdateOrderStatus = ({ orderId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleUpdate = () => {
    axios
      .put(`/api/orders/${orderId}`, { order_status: status })
      .then(() => {
        alert("Order status updated!");
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  return (
    <div className="mt-4">
      <label className="mr-2">Update Status:</label>
      <select
        className="border p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button
        onClick={handleUpdate}
        className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateOrderStatus;

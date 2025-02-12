// DeleteOrderButton.jsx
import React from "react";
import axios from "axios";

const DeleteOrderButton = ({ orderId }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`/api/orders/${orderId}`)
        .then(() => {
          alert("Order deleted successfully");
          window.location.href = "/admin/orders";
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
    >
      Delete Order
    </button>
  );
};

export default DeleteOrderButton;

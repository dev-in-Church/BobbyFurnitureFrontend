import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaTrash,
  FaUndo,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import api from "../api/axios"; // Adjust the import path accordingly

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartBackup, setCartBackup] = useState(null); // Undo feature

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id || null;
  const navigate = useNavigate();

  // Calculate total price safely
  const totalAmount = cart.reduce((total, product) => {
    const price = parseFloat(product.price);
    const quantity = parseInt(product.quantity, 10);
    return !isNaN(price) && !isNaN(quantity) ? total + price * quantity : total;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Clear cart with undo option
  const clearCart = () => {
    setCartBackup(cart);
    setCart([]);
    localStorage.removeItem("cart");

    setTimeout(() => setCartBackup(null), 5000); // Undo available for 5 seconds
  };

  const undoClearCart = () => {
    if (cartBackup) {
      setCart(cartBackup);
      localStorage.setItem("cart", JSON.stringify(cartBackup));
      setCartBackup(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) {
      confirm("You must be logged in to place an order.\nDo you want to login?")
        ? navigate("/login")
        : navigate("/checkout");
      return;
    }

    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      alert("Please fill all shipping details.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      user_id,
      customerName: shippingInfo.name,
      address: shippingInfo.address,
      phone: shippingInfo.phone,
      totalAmount,
      items: cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
    };

    try {
      const response = await api.post("/api/orders/", orderData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        clearCart();
        navigate(`/order-confirmation`);
      } else {
        alert("There was an error placing your order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaShoppingCart /> Checkout
      </h1>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>
        <div className="space-y-4 mt-4">
          {cart.length > 0 ? (
            cart.map((product) => (
              <div
                key={product.id}
                className="flex justify-between bg-gray-100 p-3 rounded-md"
              >
                <span className="font-medium">
                  {product.name} x {product.quantity}
                </span>
                <span className="font-semibold text-gray-700">
                  {(
                    parseFloat(product.price) * parseInt(product.quantity, 10)
                  ).toFixed(2)}{" "}
                  Ksh
                </span>
              </div>
            ))
          ) : (
            <p className="text-red-500 text-center">Your cart is empty.</p>
          )}
        </div>

        <p className="text-lg font-bold mt-4 text-gray-800">
          Total: {totalAmount.toFixed(2)} Ksh
        </p>

        {/* Clear Cart and Undo Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 flex items-center gap-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <FaTrash /> Clear Cart
          </button>

          {cartBackup && (
            <button
              onClick={undoClearCart}
              className="px-4 py-2 flex items-center gap-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              <FaUndo /> Undo
            </button>
          )}
        </div>
      </div>

      {/* Shipping Info Form */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold border-b pb-2">
          Shipping Information
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center border border-gray-300 rounded-md p-3">
              <FaUser className="text-gray-600 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3">
              <FaPhone className="text-gray-600 mr-2" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="flex items-center border border-gray-300 rounded-md p-3">
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              className="w-full outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FaShoppingCart /> Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

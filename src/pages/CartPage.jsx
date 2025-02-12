import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ArrowUturnLeftIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [lastRemoved, setLastRemoved] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const handleRemove = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    const updatedCart = cart.filter((item) => item.id !== id);

    setLastRemoved(itemToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleUndo = () => {
    if (lastRemoved) {
      const updatedCart = [...cart, lastRemoved];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
      setLastRemoved(null);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setLastRemoved(null);
      setCart([]);
      localStorage.removeItem("cart");
      setTotal(0);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto mt-20">
      <h1 className="text-2xl text-blue-600 sm:text-3xl font-bold mb-4 text-center dark:text-gray-300">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <ShoppingCartIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your cart is empty. Start shopping now!
          </p>
          <a
            href="/products"
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2"
          >
            <ShoppingCartIcon className="w-5 h-5 text-white" />
            <span>Shop Now</span>
          </a>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 last:border-none dark:border-gray-700"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium dark:text-gray-300">
                      {item.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                      <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
                      <span>Ksh.{item.price}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 p-2 rounded"
                  >
                    <MinusIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <span className="px-3 py-1 border rounded text-center dark:bg-gray-700 dark:text-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 p-2 rounded"
                  >
                    <PlusIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center space-x-1 mt-2 sm:mt-0"
                >
                  <TrashIcon className="w-5 h-5 text-white" />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-lg font-semibold dark:text-gray-300 flex items-center space-x-1">
              <CurrencyDollarIcon className="w-6 h-6 text-green-500" />
              <span>Subtotal: Ksh.{total.toFixed(2)}</span>
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
              {lastRemoved && (
                <button
                  onClick={handleUndo}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center space-x-2 w-full sm:w-auto"
                >
                  <ArrowUturnLeftIcon className="w-5 h-5 text-white" />
                  <span>Undo</span>
                </button>
              )}
              <button
                onClick={handleContinueShopping}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <ShoppingCartIcon className="w-5 h-5 text-white" />
                <span>Continue Shopping</span>
              </button>
              <button
                onClick={handleClearCart}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <TrashIcon className="w-5 h-5 text-white" />
                <span>Clear Cart</span>
              </button>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <span>Proceed to Checkout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

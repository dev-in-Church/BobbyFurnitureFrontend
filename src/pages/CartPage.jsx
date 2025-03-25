"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Trash2,
  Plus,
  Minus,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  ShoppingCart,
  ChevronLeft,
  AlertTriangle,
  Check,
  Truck,
  Shield,
  Clock,
  Tag,
} from "lucide-react";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [lastRemoved, setLastRemoved] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
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

    toast.info(
      <div className="flex items-center gap-2">
        <span>Item removed from cart</span>
        <button
          onClick={handleUndo}
          className="bg-blue-500 text-white text-xs px-2 py-1 rounded ml-2 hover:bg-blue-600"
        >
          UNDO
        </button>
      </div>,
      { autoClose: 5000 }
    );
  };

  const handleUndo = () => {
    if (lastRemoved) {
      const updatedCart = [...cart, lastRemoved];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
      setLastRemoved(null);

      toast.success("Item restored to cart");
    }
  };

  const handleClearCart = () => {
    setIsRemoving(true);
    setTimeout(() => {
      if (window.confirm("Are you sure you want to clear your cart?")) {
        setLastRemoved(null);
        setCart([]);
        localStorage.removeItem("cart");
        setTotal(0);
        toast.info("Your cart has been cleared");
      }
      setIsRemoving(false);
    }, 10);
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

  // Calculate cart summary
  const subtotal = total;
  const shipping = cart.length > 0 ? (subtotal < 5000 ? 500 : 0) : 0;
  const tax = subtotal * 0.16; // 16% VAT
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <button
            onClick={handleContinueShopping}
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-gray-100 p-6 rounded-full mb-6">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 max-w-md mb-8">
                Looks like you haven't added anything to your cart yet. Browse
                our products and find something you'll love!
              </p>
              <button
                onClick={handleContinueShopping}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center transition-colors"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Cart Items (
                      {cart.reduce((sum, item) => sum + item.quantity, 0)})
                    </h2>
                    <button
                      onClick={handleClearCart}
                      disabled={isRemoving}
                      className="text-sm text-red-600 hover:text-red-800 flex items-center font-medium"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row sm:items-center hover:bg-gray-50 transition-colors"
                    >
                      {/* Product Image and Info */}
                      <div className="flex items-start flex-1">
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={
                              item.images?.[0] ||
                              "https://via.placeholder.com/150"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex-1">
                          <h3
                            className="text-base font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                            onClick={() => navigate(`/products/${item.id}`)}
                          >
                            {item.name}
                          </h3>

                          <div className="mt-1 flex items-center">
                            <span className="text-sm text-gray-500">
                              {item.category}
                            </span>
                            {item.stock > 0 ? (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                <Check className="w-3 h-3 mr-1" />
                                In Stock
                              </span>
                            ) : (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Out of Stock
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Tag className="w-3 h-3 mr-1 text-blue-500" />
                            <span>
                              {item.discount ? (
                                <>
                                  <span className="line-through mr-1">
                                    Ksh. {(item.price * 1.1).toFixed(0)}
                                  </span>
                                  <span className="text-blue-600 font-medium">
                                    Ksh. {item.price.toLocaleString()}
                                  </span>
                                </>
                              ) : (
                                <span>Ksh. {item.price.toLocaleString()}</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 sm:mt-0 sm:ml-6 text-right">
                        <p className="text-base font-medium text-gray-900">
                          Ksh. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Removed Item */}
              {lastRemoved && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <RotateCcw className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm text-gray-700">
                      <span className="font-medium">{lastRemoved.name}</span>{" "}
                      was removed from your cart
                    </span>
                  </div>
                  <button
                    onClick={handleUndo}
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-20">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">
                      Ksh. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `Ksh. ${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (16% VAT)</span>
                    <span className="text-gray-900 font-medium">
                      Ksh.{" "}
                      {tax.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        Ksh.{" "}
                        {grandTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-6"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Truck className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Free shipping on orders over Ksh. 5,000</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Shield className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Delivery within 3-5 business days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cart-context";
import { useAuth } from "../contexts/auth-context";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Tag,
  Shield,
  Truck,
  CreditCard,
  Lock,
  Gift,
} from "lucide-react";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Mock coupon data
  const availableCoupons = {
    // SAVE10: {
    //   discount: 0.1,
    //   type: "percentage",
    //   description: "10% off your order",
    // },
    // WELCOME20: {
    //   discount: 0.2,
    //   type: "percentage",
    //   description: "20% off for new customers",
    // },
    // FLAT500: {
    //   discount: 500,
    //   type: "fixed",
    //   description: "KSh 500 off your order",
    // },
    FREESHIP: { discount: 0, type: "shipping", description: "Free shipping" },
  };

  const subtotal = getCartTotal();
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? subtotal * appliedCoupon.discount
      : appliedCoupon.discount
    : 0;
  const shipping =
    subtotal > 500000 || appliedCoupon?.type === "shipping"
      ? 0
      : 0.003 * subtotal;
  // const tax = (subtotal - discount) * 0.16; // 16% VAT
  const total = subtotal - discount + shipping;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);

    setTimeout(() => {
      const coupon = availableCoupons[couponCode.toUpperCase()];
      if (coupon) {
        setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
        toast.success(`Coupon applied: ${coupon.description}`);
        setCouponCode("");
      } else {
        toast.error("Invalid coupon code");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  //monday promo
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const isMonday = today === 1;

  const handleCheckout = () => {
    if (!user) {
      toast.info("Please login to proceed to checkout");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
          cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        item.image || `/placeholder.svg?height=120&width=120`
                      }
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        {item.color && (
                          <Badge variant="outline" className="mt-1">
                            {item.color}
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          KSh {item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Clear Cart Button */}
          <div className="flex justify-between items-center pt-4">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Coupon Section */}
          {isMonday && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!appliedCoupon ? (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || isApplyingCoupon}
                      size="sm"
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">
                        {appliedCoupon.code}
                      </p>
                      <p className="text-sm text-green-600">
                        {appliedCoupon.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveCoupon}
                      className="text-green-700 hover:text-green-800"
                    >
                      Remove
                    </Button>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <p>Available Promo: FREESHIP</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-KSh {discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center">
                    Shipping Cost
                    {shipping === 0 && (
                      <Badge variant="secondary" className="ml-2">
                        Free
                      </Badge>
                    )}
                  </span>
                  <span>KSh {shipping.toLocaleString()}</span>
                </div>

                {/* <div className="flex justify-between">
                  <span>Tax (16%)</span>
                  <span>KSh {tax.toLocaleString()}</span>
                </div> */}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>
              </div>

              {subtotal < 5000 && !appliedCoupon?.type === "shipping" && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-blue-800">
                    <Truck className="mr-2 h-4 w-4" />
                    <span className="text-sm">
                      Add KSh {(5000 - subtotal).toLocaleString()} more for free
                      shipping
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>

              {/* Security Badges */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Shield className="mr-1 h-3 w-3" />
                    SSL Secure
                  </div>
                  <div className="flex items-center">
                    <Lock className="mr-1 h-3 w-3" />
                    Safe Payment
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500">
                  Your payment information is processed securely
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Gift Message */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5" />
                Gift Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                placeholder="Add a gift message (optional)"
                className="w-full p-3 border rounded-lg resize-none"
                rows={3}
              />
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

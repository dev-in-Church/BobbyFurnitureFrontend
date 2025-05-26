"use client";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CheckCircle, Package, Truck, Home } from "lucide-react";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order #{orderId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Order Date</p>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Estimated Delivery
                </p>
                <p className="text-sm">
                  {new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-gray-600">
                    We're preparing your items for shipment. You'll receive an
                    email confirmation shortly.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Shipping Updates</p>
                  <p className="text-sm text-gray-600">
                    We'll send you tracking information once your order ships.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Home className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-sm text-gray-600">
                    Your furniture will be delivered within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/orders">
            <Button variant="outline" className="w-full sm:w-auto">
              View Order History
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full sm:w-auto">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

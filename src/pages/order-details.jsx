"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `https://bobbyfurnitureonline.onrender.com/api/orders/id/${orderId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Order not found</p>
        <Link to="/orders">
          <Button className="mt-4">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Order #{order.id}</CardTitle>
          <p className="text-sm text-gray-500">
            Status: <span className="font-medium">{order.order_status}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Items */}
          <div>
            <h3 className="font-semibold mb-2">Items</h3>
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm border-b py-2"
              >
                <span>
                  {item.product_name} × {item.quantity}
                </span>
                <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold pt-3">
              <span>Total</span>
              <span>KSh {Number(order.total_amount).toLocaleString()}</span>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h3 className="font-semibold mb-1">Shipping Address</h3>
            <p className="text-sm">{order.customer_name}</p>
            <p className="text-sm">{order.address}</p>
            <p className="text-sm">{order.phone}</p>
          </div>

          {/* Meta */}
          <div className="text-sm text-gray-500">
            Placed on{" "}
            {new Date(order.created_at).toLocaleDateString("en-KE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="pt-4">
            <Link to="/orders">
              <Button variant="outline">Back to Orders</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;

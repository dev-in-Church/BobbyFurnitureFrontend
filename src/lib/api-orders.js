// Orders API functions for Bobby Furniture backend
const API_BASE_URL =
  import.meta.env.NEXT_PUBLIC_API_URL ||
  "https://bobbyfurnitureonline.onrender.com";

/**
 * Enhanced fetch with proper error handling and token management
 */
async function ordersFetch(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("Request timeout - please check your connection");
    }

    throw error;
  }
}

/**
 * Create a new order
 */
export async function createOrder(orderData) {
  const { userId, customerName, address, phone, items, totalAmount } =
    orderData;

  // Transform cart items to match backend format
  const transformedItems = items.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));

  const response = await ordersFetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      customerName,
      address,
      phone,
      items: transformedItems,
      totalAmount,
    }),
  });

  return response;
}

/**
 * Get all orders (Admin only)
 */
export async function getAllOrders() {
  return await ordersFetch(`${API_BASE_URL}/orders`);
}

/**
 * Get orders for a specific user
 */
export async function getUserOrders(userId) {
  return await ordersFetch(`${API_BASE_URL}/orders/user/${userId}`);
}

/**
 * Get order details by public ID
 */
export async function getOrderById(orderPublicId) {
  return await ordersFetch(`${API_BASE_URL}/orders/${orderPublicId}`);
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId, status) {
  const validStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid order status");
  }

  return await ordersFetch(`${API_BASE_URL}/orders/${orderId}/status`, {
    method: "PUT",
    body: JSON.stringify({
      order_status: status,
    }),
  });
}

/**
 * Cancel an order
 */
export async function cancelOrder(orderId) {
  return await ordersFetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
    method: "PUT",
  });
}

/**
 * Delete an order (Admin only)
 */
export async function deleteOrder(orderId) {
  return await ordersFetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
  });
}

/**
 * Get order items for a specific order
 */
export async function getOrderItems(orderId) {
  return await ordersFetch(`${API_BASE_URL}/orders/${orderId}/items`);
}

/**
 * Get total sales (Admin only)
 */
export async function getTotalSales() {
  return await ordersFetch(`${API_BASE_URL}/orders/total-sales`);
}

/**
 * Transform backend order data to frontend format
 */
export function transformOrderData(backendOrder) {
  return {
    id: backendOrder.public_id || backendOrder.id,
    internalId: backendOrder.id,
    userId: backendOrder.user_id,
    customerName: backendOrder.customer_name,
    address: backendOrder.address,
    phone: backendOrder.phone,
    status: backendOrder.order_status || backendOrder.payment_status,
    total: Number.parseFloat(backendOrder.total_amount),
    items:
      backendOrder.items?.map((item) => ({
        id: item.product_id,
        name: item.product_name || item.name,
        quantity: item.quantity,
        price: Number.parseFloat(item.price),
      })) || [],
    createdAt: backendOrder.created_at,
    paymentStatus: backendOrder.payment_status,
    orderStatus: backendOrder.order_status,
  };
}

/**
 * Transform multiple orders
 */
export function transformOrdersData(backendOrders) {
  return backendOrders.map(transformOrderData);
}

export default {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
  getOrderItems,
  getTotalSales,
  transformOrderData,
  transformOrdersData,
};

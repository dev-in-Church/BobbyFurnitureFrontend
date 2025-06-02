"use client";

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  DollarSign,
  Users,
  Settings,
  ClipboardList,
  Upload,
  TrendingUp,
  ShoppingBag,
  AlertCircle,
  Loader,
  RefreshCw,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  fetchProducts,
  checkApiHealth,
  fetchCategories,
} from "../lib/api-final";
import ConnectionStatus from "../components/connection-status";

const AdminDashboard = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalUsers: null,
    totalProducts: null,
    totalOrders: null,
    totalRevenue: null,
    totalCategories: null,
    lowStockProducts: null,
    featuredProducts: null,
    recentOrders: [],
    topCategories: [],
    salesTrend: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");
  const [recentActivity, setRecentActivity] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError("");

      // Check API health first
      const healthCheck = await checkApiHealth();
      setApiStatus(healthCheck.status);

      if (healthCheck.status === "offline") {
        throw new Error("API is currently offline");
      }

      // Fetch products data
      const productsResponse = await fetchProducts({ limit: 1000 });
      const products = productsResponse.products || productsResponse.data || [];

      // Fetch categories
      const categoriesResponse = await fetchCategories().catch(() => ({
        data: [],
      }));
      const categories = categoriesResponse.data || categoriesResponse || [];

      // Calculate metrics from products data
      const totalProducts = products.length;
      const lowStockProducts = products.filter(
        (p) => p.stock <= 5 && p.stock > 0
      ).length;
      const featuredProducts = products.filter((p) => p.featured).length;
      const totalValue = products.reduce(
        (sum, p) => sum + p.price * p.stock,
        0
      );

      // Calculate category distribution
      const categoryStats = {};
      products.forEach((product) => {
        const category = product.category?.split(" - ")[0] || "Uncategorized";
        categoryStats[category] = (categoryStats[category] || 0) + 1;
      });

      const topCategories = Object.entries(categoryStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      // Mock data for orders and users (replace with real API calls when available)
      const mockOrdersData = await fetch(
        `${import.meta.env.NEXT_PUBLIC_API_URL}/api/orders/stats`
      )
        .then((res) => res.json())
        .catch(() => ({
          totalOrders: Math.floor(Math.random() * 100) + 50,
          totalRevenue: Math.floor(Math.random() * 500000) + 100000,
          recentOrders: generateMockRecentOrders(),
        }));

      const mockUsersData = await fetch(
        `${import.meta.env.NEXT_PUBLIC_API_URL}/api/users/stats`
      )
        .then((res) => res.json())
        .catch(() => ({
          totalUsers: Math.floor(Math.random() * 200) + 100,
        }));

      // Update dashboard data
      setDashboardData({
        totalProducts,
        totalCategories: categories.length,
        lowStockProducts,
        featuredProducts,
        totalOrders: mockOrdersData.totalOrders,
        totalRevenue: mockOrdersData.totalRevenue || totalValue,
        totalUsers: mockUsersData.totalUsers,
        recentOrders: mockOrdersData.recentOrders || [],
        topCategories,
        salesTrend: calculateSalesTrend(),
      });

      // Generate recent activity
      setRecentActivity(generateRecentActivity(products));
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.message || "Failed to load dashboard data");
      setApiStatus("offline");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Generate mock recent orders
  const generateMockRecentOrders = () => {
    const statuses = ["pending", "processing", "shipped", "delivered"];
    const customers = [
      "John Doe",
      "Jane Smith",
      "Mike Johnson",
      "Sarah Wilson",
      "David Brown",
    ];

    return Array.from({ length: 5 }, (_, i) => ({
      id: `ORD-${1000 + i}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      amount: Math.floor(Math.random() * 50000) + 10000,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));
  };

  // Generate recent activity
  const generateRecentActivity = (products) => {
    const activities = [];
    const now = new Date();

    // Recent product additions
    const recentProducts = products.slice(-3);
    recentProducts.forEach((product, index) => {
      activities.push({
        id: `product-${product.id}`,
        type: "product",
        message: `Product "${product.name}" was added`,
        time: new Date(now - (index + 1) * 60 * 60 * 1000).toISOString(),
        icon: Package,
        color: "blue",
      });
    });

    // Low stock alerts
    const lowStockItems = products
      .filter((p) => p.stock <= 5 && p.stock > 0)
      .slice(0, 2);
    lowStockItems.forEach((product, index) => {
      activities.push({
        id: `stock-${product.id}`,
        type: "alert",
        message: `Low stock alert: "${product.name}" (${product.stock} remaining)`,
        time: new Date(now - (index + 4) * 30 * 60 * 1000).toISOString(),
        icon: AlertTriangle,
        color: "yellow",
      });
    });

    // Mock order activities
    activities.push(
      {
        id: "order-1",
        type: "order",
        message: "New order #ORD-1234 received",
        time: new Date(now - 10 * 60 * 1000).toISOString(),
        icon: ShoppingBag,
        color: "green",
      },
      {
        id: "user-1",
        type: "user",
        message: "New user registration",
        time: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
        icon: Users,
        color: "purple",
      }
    );

    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 6);
  };

  // Calculate sales trend (mock)
  const calculateSalesTrend = () => {
    const trend = Math.random() > 0.5 ? "up" : "down";
    const percentage = Math.floor(Math.random() * 20) + 5;
    return { trend, percentage };
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <ConnectionStatus />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {lastUpdated &&
                  `Last updated: ${lastUpdated.toLocaleTimeString()}`}
              </div>
              <div className="flex items-center gap-1">
                {apiStatus === "online" ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                API {apiStatus}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex space-x-3 mt-4 md:mt-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button
              variant="outline"
              onClick={() => fetchDashboardData(true)}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Link to="/admin/settings">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
            <Link to="/admin/reports">
              <Button className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Reports
              </Button>
            </Link>
          </motion.div>
        </div>

        {error && (
          <motion.div
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div className="flex-1">
              <p className="text-red-800">{error}</p>
              <p className="text-red-600 text-sm mt-1">
                Some data may be unavailable. Try refreshing the page.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchDashboardData()}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Retry
            </Button>
          </motion.div>
        )}
      </div>

      {/* Dashboard Stats */}
      <motion.div
        className="max-w-7xl mx-auto w-full mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Products */}
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Products
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {dashboardData.totalProducts || 0}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {dashboardData.featuredProducts || 0} featured
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to="/admin/manage-products"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Manage products
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Revenue */}
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Revenue
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      KSh {(dashboardData.totalRevenue || 0).toLocaleString()}
                    </h3>
                    {dashboardData.salesTrend && (
                      <div className="flex items-center gap-1 mt-1">
                        {dashboardData.salesTrend.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={`text-xs ${
                            dashboardData.salesTrend.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {dashboardData.salesTrend.percentage}% this month
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to="/admin/sales"
                    className="text-sm font-medium text-green-600 hover:text-green-800 flex items-center gap-1"
                  >
                    View sales report
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Users */}
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Users
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {dashboardData.totalUsers || 0}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Registered customers
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to="/admin/manage-users"
                    className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    Manage users
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Orders */}
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Orders
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {dashboardData.totalOrders || 0}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {dashboardData.lowStockProducts || 0} low stock
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to="/admin/orders"
                    className="text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center gap-1"
                  >
                    Manage orders
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DashboardLink
                to="/admin/manage-products"
                icon={<Settings className="w-5 h-5" />}
                label="Manage Products"
                description="Add, edit or remove products"
                color="blue"
              />
              <DashboardLink
                to="/admin/manage-users"
                icon={<Users className="w-5 h-5" />}
                label="Manage Users"
                description="View and manage user accounts"
                color="purple"
              />
              <DashboardLink
                to="/admin/orders"
                icon={<ClipboardList className="w-5 h-5" />}
                label="Manage Orders"
                description="Process and track customer orders"
                color="amber"
              />
              <DashboardLink
                to="/upload-img"
                icon={<Upload className="w-5 h-5" />}
                label="Upload Images"
                description="Upload product images to gallery"
                color="pink"
              />
            </div>
          </div>

          {/* Top Categories */}
          {dashboardData.topCategories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Top Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.topCategories.map((category, index) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                      <Badge variant="secondary">
                        {category.count} products
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  const colorClasses = {
                    blue: "bg-blue-100 text-blue-600",
                    green: "bg-green-100 text-green-600",
                    yellow: "bg-yellow-100 text-yellow-600",
                    purple: "bg-purple-100 text-purple-600",
                    red: "bg-red-100 text-red-600",
                  };

                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full flex-shrink-0 ${
                          colorClasses[activity.color]
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(activity.time)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  to="/admin/activity"
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  View all activity
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          {dashboardData.recentOrders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.recentOrders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.id}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customer}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          KSh {order.amount.toLocaleString()}
                        </p>
                        <Badge
                          className={`text-xs ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to="/admin/orders"
                    className="text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center gap-1"
                  >
                    View all orders
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Reusable Component for Dashboard Links
const DashboardLink = ({ to, icon, label, description, color }) => {
  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    amber: "bg-amber-500 hover:bg-amber-600",
    pink: "bg-pink-500 hover:bg-pink-600",
    green: "bg-green-600 hover:bg-green-700",
  };

  return (
    <Link
      to={to}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all group"
    >
      <div className="p-6">
        <div className="flex items-center">
          <div
            className={`p-3 rounded-full ${colorClasses[color]} text-white mr-4 group-hover:scale-110 transition-transform`}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdminDashboard;

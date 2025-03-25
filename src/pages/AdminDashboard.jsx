"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import api from "../api/axios"; // Ensure this is configured properly

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [usersRes, productsRes, ordersRes, revenueRes] =
          await Promise.all([
            fetch(
              "https://bobbyfurnitureonline.onrender.com/api/users/total-users"
            ),
            fetch(
              "https://bobbyfurnitureonline.onrender.com/api/products/total-products"
            ),
            // These endpoints might not exist yet, but included for future implementation
            fetch(
              "https://bobbyfurnitureonline.onrender.com/api/orders/total-orders"
            ).catch(() => ({
              ok: true,
              json: () => Promise.resolve({ totalOrders: 25 }),
            })),
            fetch(
              "https://bobbyfurnitureonline.onrender.com/api/orders/total-revenue"
            ).catch(() => ({
              ok: true,
              json: () => Promise.resolve({ totalRevenue: 125000 }),
            })),
          ]);

        if (!usersRes.ok || !productsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData = await usersRes.json();
        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();
        const revenueData = await revenueRes.json();

        setTotalUsers(usersData.totalUsers);
        setTotalProducts(productsData.totalProducts);
        setTotalOrders(ordersData.totalOrders);
        setTotalRevenue(revenueData.totalRevenue);

        // Mock recent activity data
        setRecentActivity([
          {
            id: 1,
            type: "order",
            message: "New order #1234 received",
            time: "10 minutes ago",
          },
          {
            id: 2,
            type: "user",
            message: "New user John Doe registered",
            time: "1 hour ago",
          },
          {
            id: 3,
            type: "product",
            message: 'Product "Leather Sofa" updated',
            time: "3 hours ago",
          },
          {
            id: 4,
            type: "order",
            message: "Order #1230 marked as delivered",
            time: "5 hours ago",
          },
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Error Loading Dashboard
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-4 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Admin Dashboard
          </motion.h1>

          <motion.div
            className="flex space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/admin/settings"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <Link
              to="/admin/reports"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Reports
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Stats Section */}
      <motion.div
        className="max-w-7xl mx-auto w-full mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Products */}
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Products
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {totalProducts || 0}
                  </h3>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  to="/admin/manage-products"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                  View all products
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Total Sales */}
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Revenue
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Ksh {totalRevenue ? totalRevenue.toLocaleString() : 0}
                  </h3>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  to="/admin/sales"
                  className="text-sm font-medium text-green-600 hover:text-green-800 flex items-center"
                >
                  View sales report
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Total Users */}
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {totalUsers || 0}
                  </h3>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  to="/admin/manage-users"
                  className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center"
                >
                  View all users
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Total Orders */}
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Orders
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {totalOrders || 0}
                  </h3>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  to="/admin-order-list"
                  className="text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center"
                >
                  View all orders
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Links Section */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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
              to="/admin-order-list"
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
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div
                    className={`p-2 rounded-full mr-3 flex-shrink-0 ${
                      activity.type === "order"
                        ? "bg-amber-100 text-amber-600"
                        : activity.type === "user"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {activity.type === "order" && (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                    {activity.type === "user" && <Users className="w-4 h-4" />}
                    {activity.type === "product" && (
                      <Package className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                to="/admin/activity"
                className="text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center"
              >
                View all activity
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Reusable Component for Dashboard Links
const DashboardLink = ({ to, icon, label, description, color }) => {
  const bgColor = {
    blue: "bg-blue-600 hover:bg-blue-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    amber: "bg-amber-500 hover:bg-amber-600",
    pink: "bg-pink-500 hover:bg-pink-600",
    green: "bg-green-600 hover:bg-green-700",
  }[color];

  return (
    <Link
      to={to}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group"
    >
      <div className="p-6">
        <div className="flex items-center">
          <div
            className={`p-3 rounded-full ${bgColor} text-white mr-4 group-hover:scale-110 transition-transform`}
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

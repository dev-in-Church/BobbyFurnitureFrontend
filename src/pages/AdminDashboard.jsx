import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaMoneyBillWave,
  FaUsers,
  FaCogs,
  FaClipboardList,
  FaUpload,
} from "react-icons/fa";
import api from "../api/axios"; // Ensure this is configured properly

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          fetch(
            "https://bobbyfurnitureonline.onrender.com/api/users/total-users"
          ),
          fetch(
            "https://bobbyfurnitureonline.onrender.com/api/products/total-products"
          ),
        ]);

        if (!usersRes.ok || !productsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData = await usersRes.json();
        const productsData = await productsRes.json();

        setTotalUsers(usersData.totalUsers);
        setTotalProducts(productsData.totalProducts);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Dashboard Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Total Products */}
        <div className="flex items-center bg-blue-500 text-white p-5 rounded-lg shadow-md transform hover:scale-105 transition">
          <FaBox className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </div>
        </div>

        {/* Total Sales */}
        {/* <div className="flex items-center bg-green-500 text-white p-5 rounded-lg shadow-md transform hover:scale-105 transition">
          <FaMoneyBillWave className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold"></p>
          </div>
        </div> */}

        {/* Total Users */}
        <div className="flex items-center bg-orange-500 text-white p-5 rounded-lg shadow-md transform hover:scale-105 transition">
          <FaUsers className="text-4xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="mt-10 w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <DashboardLink
            to="/admin/manage-products"
            icon={FaCogs}
            label="Manage Products"
            color="blue"
          />
          <DashboardLink
            to="/admin/manage-users"
            icon={FaUsers}
            label="Manage Users"
            color="green"
          />
          <DashboardLink
            to="/admin-order-list"
            icon={FaClipboardList}
            label="Manage Orders"
            color="yellow"
          />
          <DashboardLink
            to="/upload-img"
            icon={FaUpload}
            label="Upload Images"
            color="pink"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Component for Dashboard Links
const DashboardLink = ({ to, icon: Icon, label, color }) => {
  const bgColor = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    pink: "bg-pink-500 hover:bg-pink-600",
  }[color];

  return (
    <Link
      to={to}
      className={`flex items-center justify-center ${bgColor} text-white p-4 rounded-lg shadow-lg transition transform hover:scale-105`}
    >
      <Icon className="mr-2 text-xl" /> {label}
    </Link>
  );
};

export default AdminDashboard;

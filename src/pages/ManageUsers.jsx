"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Trash2,
  Edit,
  Shield,
  User,
  CheckCircle,
  AlertTriangle,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Loader,
} from "lucide-react";
import axios from "../api/axios"; // Import the axios instance

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingRole, setUpdatingRole] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...users];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (user) =>
          user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter) {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Apply sorting
    if (sortOrder === "newest") {
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    } else if (sortOrder === "oldest") {
      result.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );
    } else if (sortOrder === "a-z") {
      result.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortOrder === "z-a") {
      result.sort((a, b) => b.username.localeCompare(a.username));
    }

    setFilteredUsers(result);
    setTotalPages(Math.ceil(result.length / usersPerPage));
  }, [users, searchQuery, roleFilter, sortOrder]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("api/users"); // Example API endpoint to get users
      setUsers(response.data); // Assuming the response contains user data
      setFilteredUsers(response.data);
      setTotalPages(Math.ceil(response.data.length / usersPerPage));
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    // If not confirming, show confirmation first
    if (confirmDelete !== userId) {
      setConfirmDelete(userId);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`api/users/${userId}`); // Example endpoint for deleting a user
      if (response.status === 200) {
        // Remove deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setSuccess("User deleted successfully");

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");

      // Clear error message after 3 seconds
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    setUpdatingUserId(userId);
    setUpdatingRole(true);
    setError(null);

    try {
      const response = await axios.patch(
        `/api/users/${userId}/role`,
        { role: newRole } // Send the new role to the backend
      );

      if (response.status === 200) {
        // Update the user role in the state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        setSuccess("User role updated successfully");

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      setError("Failed to update user role. Please try again.");

      // Clear error message after 3 seconds
      setTimeout(() => setError(null), 3000);
    } finally {
      setUpdatingRole(false);
      setUpdatingUserId(null);
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Get current page users
  const getCurrentPageUsers = () => {
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  // Loading state
  if (loading && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="mr-2 h-6 w-6 text-blue-600" />
              Manage Users
            </h1>
            <p className="text-gray-600 mt-1">Total users: {users.length}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Refresh users"
            >
              <RefreshCw className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search Users
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <label
                  htmlFor="role-filter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Filter by Role
                </label>
                <select
                  id="role-filter"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label
                  htmlFor="sort-order"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort By
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">Name (A-Z)</option>
                  <option value="z-a">Name (Z-A)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentPageUsers().map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {user.avatar ? (
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.username}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <User className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString() ||
                            "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "admin" ? (
                          <Shield className="mr-1 h-3 w-3" />
                        ) : (
                          <User className="mr-1 h-3 w-3" />
                        )}
                        {user.role}
                      </span>

                      {/* Role Change Dropdown */}
                      <div className="relative">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleChangeRole(user.id, e.target.value)
                          }
                          disabled={updatingRole && updatingUserId === user.id}
                          className={`text-sm border rounded-md py-1 pl-2 pr-8 ${
                            updatingRole && updatingUserId === user.id
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 cursor-pointer hover:border-blue-500"
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        {updatingRole && updatingUserId === user.id && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Loader className="animate-spin h-4 w-4 text-blue-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className={`${
                          confirmDelete === user.id
                            ? "text-red-600 bg-red-50 px-2 py-1 rounded"
                            : "text-red-600 hover:text-red-900"
                        } flex items-center`}
                        title={
                          confirmDelete === user.id
                            ? "Click again to confirm"
                            : "Delete User"
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                        {confirmDelete === user.id && (
                          <span className="ml-1 text-xs">Confirm</span>
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}

              {/* Empty State */}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No users found
                      </h3>
                      <p className="text-gray-500 max-w-sm">
                        {searchQuery || roleFilter
                          ? "Try adjusting your search or filter criteria"
                          : "There are no users in the system yet"}
                      </p>
                      {(searchQuery || roleFilter) && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setRoleFilter("");
                          }}
                          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * usersPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(page * usersPerPage, filteredUsers.length)}
              </span>{" "}
              of <span className="font-medium">{filteredUsers.length}</span>{" "}
              users
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 rounded-md ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md ${
                      page === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-md ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

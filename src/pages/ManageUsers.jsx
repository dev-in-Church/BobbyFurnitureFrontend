import React, { useState, useEffect } from "react";
import axios from "../api/axios"; // Import the axios instance

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingRole, setUpdatingRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    // Fetch users when component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("api/users"); // Example API endpoint to get users
        setUsers(response.data); // Assuming the response contains user data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) return; // Exit if user cancels the confirmation

    try {
      const response = await axios.delete(`api/users/${userId}`); // Example endpoint for deleting a user
      if (response.status === 200) {
        // Remove deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to change this user's role?"
    );
    if (!isConfirmed) return; // Exit if user cancels the confirmation

    setUpdatingRole(true);
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
      }
      setUpdatingRole(false);
    } catch (error) {
      console.error("Error updating user role:", error);
      setUpdatingRole(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading users...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-4xl font-semibold text-gray-900 mb-6">
        Manage Users
      </h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Username
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Email
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Role
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 transition-all duration-200"
              >
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                    {/* Admins can change user roles */}
                    <select
                      value={selectedRole || user.role}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="bg-gray-100 px-3 py-1 text-sm border rounded-md text-gray-700"
                      disabled={user.role === "admin" || updatingRole}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() =>
                        handleChangeRole(user.id, selectedRole || user.role)
                      }
                      className="bg-blue-600 text-white px-3 py-1 text-xs rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                      disabled={updatingRole}
                    >
                      {updatingRole ? "Updating..." : "Change Role"}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

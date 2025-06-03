"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  UserPlus,
  Trash2,
  Shield,
  User,
  Mail,
  AlertCircle,
  RefreshCw,
  Copy,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth-context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TokenManager from "../components/token-manager";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [debugInfo, setDebugInfo] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showTokenManager, setShowTokenManager] = useState(false);

  const { user: currentUser, logout } = useAuth();

  // API configuration
  const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com";

  // Parse JWT token to get claims
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return null;
    }
  };

  // Check if user has admin role using backend verification
  const checkAdminRole = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      // First, try to verify token with backend
      const response = await fetch(`${API_BASE_URL}/users/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("🔑 Backend token verification:", data);

        setTokenInfo(data.user);
        const hasAdminRole = data.user.isAdmin;
        setIsAdmin(hasAdminRole);

        return hasAdminRole;
      } else {
        // Fallback to local token parsing
        const decoded = parseJwt(token);
        setTokenInfo(decoded);

        const hasAdminRole = decoded && decoded.isAdmin === true;
        setIsAdmin(hasAdminRole);

        console.log("🔑 Local token claims:", {
          userId: decoded?.userId || decoded?.id,
          email: decoded?.email,
          isAdmin: decoded?.isAdmin,
          hasAdminRole,
        });

        return hasAdminRole;
      }
    } catch (error) {
      console.error("Failed to check admin role:", error);
      // Fallback to local parsing
      const decoded = parseJwt(token);
      if (decoded) {
        setTokenInfo(decoded);
        const hasAdminRole = decoded.isAdmin === true;
        setIsAdmin(hasAdminRole);
        return hasAdminRole;
      }
      return false;
    }
  };

  // Get token from localStorage
  const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("🔑 Token check:", {
      hasToken: !!token,
      tokenLength: token?.length,
      tokenStart: token?.substring(0, 20) + "...",
    });
    return token;
  };

  // API helper function with enhanced error handling
  const apiCall = async (endpoint, options = {}) => {
    const token = getToken();

    console.log("🚀 API Call:", {
      endpoint,
      method: options.method || "GET",
      hasToken: !!token,
      timestamp: new Date().toISOString(),
    });

    if (!token) {
      const error = "No authentication token found. Please log in.";
      setError(error);
      throw new Error(error);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log("📡 Making request to:", `${API_BASE_URL}${endpoint}`);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      console.log("📨 Response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
      });

      // Handle different response statuses
      if (response.status === 401) {
        const errorText = await response.text();
        console.error("🚫 401 Unauthorized:", errorText);

        let parsedError;
        try {
          parsedError = JSON.parse(errorText);
        } catch (e) {
          parsedError = { message: errorText };
        }

        const error = `Authentication failed: ${
          parsedError.message || "Unauthorized"
        }`;
        setError(error);
        setDebugInfo({
          status: 401,
          response: parsedError,
          endpoint,
          tokenPresent: !!token,
          tokenLength: token?.length,
          suggestion:
            "Your token may be expired or invalid. Try logging in again.",
        });

        throw new Error(error);
      }

      if (response.status === 403) {
        const errorText = await response.text();
        console.error("🚫 403 Forbidden:", errorText);

        let parsedError;
        try {
          parsedError = JSON.parse(errorText);
        } catch (e) {
          parsedError = { message: errorText };
        }

        const error = `Access denied: ${
          parsedError.message || "Insufficient privileges"
        }`;
        setError(error);
        setDebugInfo({
          status: 403,
          response: parsedError,
          endpoint,
          tokenInfo: tokenInfo,
          suggestion: "You need admin privileges for this action.",
        });

        throw new Error(error);
      }

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        console.error("❌ API Error:", errorData);
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("✅ API Success:", data);
      return data;
    } catch (error) {
      console.error("🔥 API Call Error:", error);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        const networkError = "Network error: Unable to connect to server";
        setError(networkError);
        throw new Error(networkError);
      }

      throw error;
    }
  };

  // Fetch all users - backend will validate admin access
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo(null);

      console.log("👥 Fetching users...");
      const users = await apiCall("/users");
      console.log("✅ Users fetched:", users);
      setUsers(users || []);
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
      setError(error.message);

      // Don't show toast for auth errors since we show alert
      if (
        !error.message.includes("Authentication failed") &&
        !error.message.includes("Access denied")
      ) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch total users count
  const fetchTotalUsers = async () => {
    try {
      console.log("📊 Fetching total users...");
      const response = await apiCall("/users/total-users");
      console.log("✅ Total users fetched:", response);
      setTotalUsers(response.totalUsers || 0);
    } catch (error) {
      console.error("❌ Failed to fetch total users:", error);
      // Don't set error state for this non-critical request
    }
  };

  // Create new user
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setActionLoading("add");

      const response = await apiCall("/users/signup", {
        method: "POST",
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          isAdmin: newUser.isAdmin,
        }),
      });

      // Add the new user to the list
      const userToAdd = {
        id: Date.now(), // Temporary ID, will be replaced when we refresh
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        role: newUser.isAdmin ? "admin" : "user",
      };

      setUsers([...users, userToAdd]);
      setTotalUsers(totalUsers + 1);

      setNewUser({
        name: "",
        email: "",
        password: "",
        isAdmin: false,
      });
      setIsAddUserOpen(false);
      toast.success("User created successfully");

      // Refresh the users list to get the actual user data
      setTimeout(() => fetchUsers(), 1000);
    } catch (error) {
      console.error("Failed to create user:", error);
      toast.error(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    try {
      setActionLoading(`role-${userId}`);

      await apiCall(`/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });

      // Update the user in the local state
      setUsers(
        users.map((user) =>
          user.id === userId
            ? { ...user, role: newRole, isAdmin: newRole === "admin" }
            : user
        )
      );

      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      setActionLoading(`delete-${userId}`);

      await apiCall(`/users/${userId}`, {
        method: "DELETE",
      });

      // Remove the user from the local state
      setUsers(users.filter((user) => user.id !== userId));
      setTotalUsers(totalUsers - 1);

      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "admin" ? user.isAdmin : !user.isAdmin);

    return matchesSearch && matchesRole;
  });

  // Load data on component mount
  useEffect(() => {
    const initializeComponent = async () => {
      // Check admin role first
      const hasAdminRole = await checkAdminRole();

      // Add a small delay to ensure auth context is ready
      setTimeout(() => {
        fetchTotalUsers(); // This endpoint requires valid token but not admin role

        if (hasAdminRole) {
          console.log("🔑 Admin privileges confirmed, fetching users");
          fetchUsers();
        } else {
          console.log("⚠️ No admin privileges detected");
          setLoading(false);
        }
      }, 100);
    };

    initializeComponent();
  }, []);

  const handleRetry = () => {
    setError(null);
    setDebugInfo(null);
    checkAdminRole(); // Re-check admin role
    fetchTotalUsers();
    fetchUsers();
  };

  const handleClearToken = () => {
    localStorage.removeItem("token");
    setError(null);
    setDebugInfo(null);
    setTokenInfo(null);
    toast.info("Token cleared. Please log in again.");
    // Redirect to login page
    window.location.href = "/login";
  };

  const copyDebugInfo = () => {
    const info = {
      error,
      debugInfo,
      tokenInfo,
      isAdmin,
      currentUser,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      tokenPresent: !!localStorage.getItem("token"),
    };
    navigator.clipboard.writeText(JSON.stringify(info, null, 2));
    toast.success("Debug info copied to clipboard");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If user is not admin, show access denied message
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <div className="font-medium">
                Access Denied: Admin privileges required
              </div>
              <p>
                Your account does not have administrator privileges required to
                access the user management page. Please contact an administrator
                if you believe this is an error.
              </p>

              {/* Token Information */}
              {tokenInfo && (
                <details className="text-xs">
                  <summary className="cursor-pointer font-medium">
                    Token Information
                  </summary>
                  <div className="mt-2 p-3 bg-gray-100 rounded text-black overflow-auto">
                    <p>
                      <strong>User ID:</strong>{" "}
                      {tokenInfo.userId || tokenInfo.id || "Not found"}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {tokenInfo.email || "Not specified"}
                    </p>
                    <p>
                      <strong>Is Admin:</strong>{" "}
                      {tokenInfo.isAdmin ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Expires:</strong>{" "}
                      {tokenInfo.exp
                        ? new Date(tokenInfo.exp * 1000).toLocaleString()
                        : "Not specified"}
                    </p>
                  </div>
                </details>
              )}

              {/* Token Manager */}
              {showTokenManager && (
                <div className="mt-4">
                  <TokenManager
                    onTokenUpdate={(user) => {
                      if (user) {
                        setTokenInfo(user);
                        setIsAdmin(user.isAdmin);
                        setError(null);
                        setDebugInfo(null);
                      }
                    }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTokenManager(!showTokenManager)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {showTokenManager ? "Hide" : "Show"} Token Manager
                </Button>
                <Button variant="outline" size="sm" onClick={copyDebugInfo}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Debug Info
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearToken}>
                  Clear Token & Login
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Admin access required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Shield className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Admin Access Required</h2>
              <p className="text-gray-600 mb-6 max-w-md">
                You need administrator privileges to access the user management
                page. Please log in with an admin account.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
                <Button onClick={handleClearToken}>
                  Log Out & Sign In Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <div className="font-medium">{error}</div>

              {/* Token Manager */}
              {showTokenManager && (
                <div className="mt-4">
                  <TokenManager
                    onTokenUpdate={(user) => {
                      if (user) {
                        setTokenInfo(user);
                        setIsAdmin(user.isAdmin);
                        setError(null);
                        setDebugInfo(null);
                      }
                    }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTokenManager(!showTokenManager)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {showTokenManager ? "Hide" : "Show"} Token Manager
                </Button>
                <Button variant="outline" size="sm" onClick={copyDebugInfo}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Debug Info
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearToken}>
                  Clear Token & Login
                </Button>
              </div>

              {/* Debug Information */}
              {debugInfo && (
                <details className="text-xs">
                  <summary className="cursor-pointer font-medium">
                    Debug Information
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-black overflow-auto max-h-40">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Admin Badge */}
      <div className="mb-4">
        <Badge className="bg-green-500 text-white">
          <Shield className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
          {currentUser && (
            <p className="text-sm text-gray-500">
              Logged in as: {currentUser.name || currentUser.email} (
              {currentUser.isAdmin ? "admin" : "user"})
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold">{totalUsers}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button disabled={!!error}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with the specified details.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.isAdmin ? "admin" : "user"}
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, isAdmin: value === "admin" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddUserOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={actionLoading === "add"}>
                    {actionLoading === "add" ? "Creating..." : "Create User"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled={!!error}
              />
            </div>
            <Select
              value={roleFilter}
              onValueChange={setRoleFilter}
              disabled={!!error}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isAdmin ? "default" : "secondary"}>
                        {user.isAdmin && <Shield className="h-3 w-3 mr-1" />}
                        {user.isAdmin ? "Admin" : "User"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={user.isAdmin ? "admin" : "user"}
                          onValueChange={(value) =>
                            updateUserRole(user.id, value)
                          }
                          disabled={
                            actionLoading === `role-${user.id}` || !!error
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={
                                actionLoading === `delete-${user.id}` || !!error
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete User</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete {user.name}?
                                This action cannot be undone and will remove all
                                associated data.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button variant="outline">Cancel</Button>
                              <Button
                                variant="destructive"
                                onClick={() => deleteUser(user.id)}
                                disabled={actionLoading === `delete-${user.id}`}
                              >
                                {actionLoading === `delete-${user.id}`
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && !error && (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManagement;

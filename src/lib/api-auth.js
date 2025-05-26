// Authentication API functions for Bobby Furniture backend
const API_BASE_URL =
  import.meta.env.NEXT_PUBLIC_API_URL ||
  "https://bobbyfurnitureonline.onrender.com";

/**
 * Enhanced fetch with proper error handling and token management
 */
async function authFetch(url, options = {}) {
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
 * User Registration
 */
export async function registerUser(userData) {
  const { name, email, password, role = "user" } = userData;

  const response = await authFetch(`${API_BASE_URL}/users/signup`, {
    method: "POST",
    body: JSON.stringify({
      username: name,
      email,
      password,
      role,
    }),
  });

  return response;
}

/**
 * User Login
 */
export async function loginUser(email, password) {
  const response = await authFetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  // Store token and user data
  if (response.token) {
    localStorage.setItem("authToken", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  }

  return response;
}

/**
 * Get Current User Profile
 */
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Decode token to get user info (basic validation)
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));

    // Check if token is expired
    if (tokenPayload.exp * 1000 < Date.now()) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      throw new Error("Token expired");
    }

    // Return stored user data (since backend doesn't have /me endpoint)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }

    throw new Error("No user data found");
  } catch (error) {
    // Clear invalid data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    throw error;
  }
}

/**
 * Update User Profile
 */
export async function updateUserProfile(profileData) {
  const response = await authFetch(`${API_BASE_URL}/users/update-profile`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });

  // Update stored user data
  if (response.user) {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = { ...currentUser, ...response.user };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  return response;
}

/**
 * Get All Users (Admin only)
 */
export async function getAllUsers() {
  return await authFetch(`${API_BASE_URL}/users`);
}

/**
 * Update User Role (Admin only)
 */
export async function updateUserRole(userId, role) {
  return await authFetch(`${API_BASE_URL}/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

/**
 * Delete User (Admin only)
 */
export async function deleteUser(userId) {
  return await authFetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });
}

/**
 * Get Total Users Count
 */
export async function getTotalUsers() {
  return await authFetch(`${API_BASE_URL}/users/total-users`);
}

/**
 * Logout User
 */
export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    return tokenPayload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
}

/**
 * Check if user is admin
 */
export function isAdmin() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.role === "admin";
  } catch (error) {
    return false;
  }
}

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getTotalUsers,
  logoutUser,
  isAuthenticated,
  isAdmin,
};

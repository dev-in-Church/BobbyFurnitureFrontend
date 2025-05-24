import apiCache from "./api-cache";

// Base API URL - replace with your actual backend URL
const API_BASE_URL =
  "https://bobbyfurnitureonline.onrender.com" || "https://api.example.com";
// "http://localhost:5000" || "https://api.example.com";

/**
 * Enhanced fetch wrapper with caching, retries, and better error handling
 */
async function enhancedFetch(url, options = {}) {
  const {
    cache = true,
    cacheTTL = 5 * 60 * 1000, // 5 minutes
    retries = 3,
    retryDelay = 1000,
    timeout = 30000, // 30 seconds
    ...fetchOptions
  } = options;

  // Generate cache key
  const cacheKey = apiCache.generateKey(
    url,
    fetchOptions.body ? JSON.parse(fetchOptions.body) : {}
  );

  // Check cache first (only for GET requests)
  if (cache && (!fetchOptions.method || fetchOptions.method === "GET")) {
    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Handle different HTTP error codes
        switch (response.status) {
          case 400:
            throw new Error("Bad request - please check your input");
          case 401:
            throw new Error("Unauthorized - please log in");
          case 403:
            throw new Error("Forbidden - you don't have permission");
          case 404:
            throw new Error("Not found - the requested resource doesn't exist");
          case 429:
            throw new Error("Too many requests - please try again later");
          case 500:
            throw new Error("Server error - please try again later");
          default:
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json();

      // Cache successful GET requests
      if (cache && (!fetchOptions.method || fetchOptions.method === "GET")) {
        apiCache.set(cacheKey, data, cacheTTL);
      }

      return data;
    } catch (error) {
      lastError = error;

      // Don't retry on certain errors
      if (error.name === "AbortError") {
        throw new Error("Request timeout - please try again");
      }

      if (
        error.message.includes("400") ||
        error.message.includes("401") ||
        error.message.includes("403") ||
        error.message.includes("404")
      ) {
        throw error;
      }

      // Wait before retrying
      if (attempt < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * Math.pow(2, attempt))
        );
      }
    }
  }

  clearTimeout(timeoutId);
  throw lastError || new Error("Request failed after multiple attempts");
}

/**
 * Enhanced API functions with better error handling and caching
 */

export async function fetchProducts(options = {}) {
  const {
    page = 1,
    limit = 12,
    category = "",
    search = "",
    sort = "newest",
    minPrice,
    maxPrice,
    featured,
    onSale,
    ...otherOptions
  } = options;

  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (category) params.append("category", category);
  if (search) params.append("search", search);
  if (sort) params.append("sort", sort);
  if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());
  if (featured !== undefined) params.append("featured", featured.toString());
  if (onSale !== undefined) params.append("onSale", onSale.toString());

  // Add other filter parameters
  Object.entries(otherOptions).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString());
    }
  });

  return enhancedFetch(`${API_BASE_URL}/products?${params.toString()}`);
}

export async function fetchProductById(id) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  return enhancedFetch(`${API_BASE_URL}/products/${id}`);
}

export async function fetchCategories() {
  return enhancedFetch(`${API_BASE_URL}/categories`, {
    cacheTTL: 15 * 60 * 1000, // Cache categories for 15 minutes
  });
}

export async function fetchFeaturedProducts(limit = 8) {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());

  return enhancedFetch(
    `${API_BASE_URL}/products/featured?${params.toString()}`
  );
}

export async function fetchNewArrivals(limit = 8) {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());

  return enhancedFetch(
    `${API_BASE_URL}/products/new-arrivals?${params.toString()}`
  );
}

export async function fetchProductsByCategory(category, options = {}) {
  if (!category) {
    throw new Error("Category is required");
  }

  const { page = 1, limit = 12, sort = "newest", ...otherOptions } = options;

  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  params.append("sort", sort);

  // Add other filter parameters
  Object.entries(otherOptions).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString());
    }
  });

  return enhancedFetch(
    `${API_BASE_URL}/products/category/${category}?${params.toString()}`
  );
}

export async function fetchRelatedProducts(productId, limit = 4) {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  const params = new URLSearchParams();
  params.append("limit", limit.toString());

  return enhancedFetch(
    `${API_BASE_URL}/products/${productId}/related?${params.toString()}`
  );
}

export async function searchProducts(query, options = {}) {
  if (!query || query.trim() === "") {
    throw new Error("Search query is required");
  }

  const { page = 1, limit = 12, sort = "relevance", ...otherOptions } = options;

  const params = new URLSearchParams();
  params.append("q", query.trim());
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  params.append("sort", sort);

  // Add other filter parameters
  Object.entries(otherOptions).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString());
    }
  });

  return enhancedFetch(`${API_BASE_URL}/products/search?${params.toString()}`);
}

// Utility functions for cache management
export function clearApiCache() {
  apiCache.clear();
}

export function invalidateProductCache(productId) {
  // Remove specific product from cache
  apiCache.delete(`${API_BASE_URL}/products/${productId}`);

  // You might also want to clear related caches
  // This is a simple approach - in a real app you might want more sophisticated cache invalidation
}

export function preloadProduct(productId) {
  // Preload a product to cache
  return fetchProductById(productId).catch(() => {
    // Ignore errors for preloading
  });
}

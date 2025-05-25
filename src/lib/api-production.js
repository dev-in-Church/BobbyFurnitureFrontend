// Production API configuration for Bobby Furniture Online
const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com";

/**
 * Enhanced fetch with proper error handling and CORS support
 */
async function enhancedFetch(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for production

  try {
    console.log(`🌐 API Request: ${url}`);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Add any additional headers your backend might need
        ...options.headers,
      },
      // Ensure credentials are included if needed
      credentials: "omit", // Change to 'include' if you need cookies/auth
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      // Try to get error details from response
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
      }

      console.error(`❌ API Error: ${errorMessage} for ${url}`);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(`✅ API Success: ${url}`);
    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      console.error(`⏰ API Timeout: ${url}`);
      throw new Error("Request timeout - please check your connection");
    }

    console.error(`🚫 API Failed: ${url}`, error.message);
    throw error;
  }
}

/**
 * Build URL with query parameters
 */
function buildURL(endpoint, params = {}) {
  const url = new URL(endpoint, API_BASE_URL);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value.toString());
    }
  });

  return url.toString();
}

/**
 * Fetch products with advanced filtering and pagination
 */
export async function fetchProducts(options = {}) {
  const {
    page = 1,
    limit = 12,
    category,
    search,
    sort = "newest",
    minPrice,
    maxPrice,
    featured,
    onSale,
  } = options;

  const params = {
    page,
    limit,
    sort,
    ...(category && { category }),
    ...(search && { search }),
    ...(minPrice !== undefined && { minPrice }),
    ...(maxPrice !== undefined && { maxPrice }),
    ...(featured !== undefined && { featured }),
    ...(onSale !== undefined && { onSale }),
  };

  const url = buildURL("/products", params);
  return await enhancedFetch(url);
}

/**
 * Fetch a single product by ID - Updated to match your backend response
 */
export async function fetchProductById(id) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const url = buildURL(`/products/${id}`);
  const data = await enhancedFetch(url);

  // Your backend returns the product with relatedProducts included
  // So we don't need a separate API call for related products
  return data;
}

/**
 * Fetch related products for a given product ID
 * This uses the same category to find related products
 */
export async function fetchRelatedProducts(productId, limit = 4) {
  try {
    // First get the product to know its category
    const product = await fetchProductById(productId);

    // Then fetch products from the same category, excluding the current product
    const relatedData = await fetchProductsByCategory(product.category, {
      limit: limit + 1,
    });

    // Filter out the current product and limit results
    const relatedProducts = relatedData.products
      .filter((p) => p.id !== Number.parseInt(productId))
      .slice(0, limit);

    return relatedProducts;
  } catch (error) {
    console.warn("Could not fetch related products, returning empty array");
    return [];
  }
}

/**
 * Fetch featured products
 */
export async function fetchFeaturedProducts(limit = 8) {
  const url = buildURL("/products/featured", { limit });
  return await enhancedFetch(url);
}

/**
 * Fetch new arrivals
 */
export async function fetchNewArrivals(limit = 8) {
  const url = buildURL("/products/new-arrivals", { limit });
  return await enhancedFetch(url);
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category, options = {}) {
  if (!category) {
    throw new Error("Category is required");
  }

  const { page = 1, limit = 12, sort = "newest", minPrice, maxPrice } = options;

  const params = {
    page,
    limit,
    sort,
    ...(minPrice !== undefined && { minPrice }),
    ...(maxPrice !== undefined && { maxPrice }),
  };

  const url = buildURL(
    `/products/category/${encodeURIComponent(category)}`,
    params
  );
  return await enhancedFetch(url);
}

/**
 * Search products
 */
export async function searchProducts(query, options = {}) {
  if (!query || query.trim() === "") {
    throw new Error("Search query is required");
  }

  const {
    page = 1,
    limit = 12,
    sort = "relevance",
    category,
    minPrice,
    maxPrice,
  } = options;

  const params = {
    q: query.trim(),
    page,
    limit,
    sort,
    ...(category && { category }),
    ...(minPrice !== undefined && { minPrice }),
    ...(maxPrice !== undefined && { maxPrice }),
  };

  const url = buildURL("/products/search", params);
  return await enhancedFetch(url);
}

/**
 * Fetch all categories (you might need to add this endpoint to your backend)
 */
export async function fetchCategories() {
  try {
    const url = buildURL("/categories");
    return await enhancedFetch(url);
  } catch (error) {
    // Fallback to extracting categories from products if categories endpoint doesn't exist
    console.warn("Categories endpoint not available, using fallback");
    return [
      { id: 1, name: "Living Room", slug: "living-room" },
      { id: 2, name: "Bedroom", slug: "bedroom" },
      { id: 3, name: "Dining Room", slug: "dining-room" },
      { id: 4, name: "Office", slug: "office" },
      { id: 5, name: "Outdoor", slug: "outdoor" },
    ];
  }
}

/**
 * Get total products count
 */
export async function fetchTotalProducts() {
  const url = buildURL("/products/total-products");
  return await enhancedFetch(url);
}

/**
 * Check API health
 */
export async function checkApiHealth() {
  try {
    // Try to fetch a small number of products to test connectivity
    const data = await fetchProducts({ limit: 1 });
    return {
      status: "online",
      message: "API is responding",
      timestamp: new Date().toISOString(),
      productsCount: data.pagination?.total || 0,
    };
  } catch (error) {
    return {
      status: "offline",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Admin functions for product management
 */
export async function createProduct(productData) {
  const url = buildURL("/products");
  return await enhancedFetch(url, {
    method: "POST",
    body: JSON.stringify(productData),
  });
}

export async function updateProduct(id, productData) {
  const url = buildURL(`/products/${id}`);
  return await enhancedFetch(url, {
    method: "PUT",
    body: JSON.stringify(productData),
  });
}

export async function deleteProduct(id) {
  const url = buildURL(`/products/${id}`);
  return await enhancedFetch(url, {
    method: "DELETE",
  });
}

// Export all functions as default
export default {
  fetchProducts,
  fetchProductById,
  fetchRelatedProducts,
  fetchFeaturedProducts,
  fetchNewArrivals,
  fetchProductsByCategory,
  searchProducts,
  fetchCategories,
  fetchTotalProducts,
  checkApiHealth,
  createProduct,
  updateProduct,
  deleteProduct,
};

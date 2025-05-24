import { apiConfig, API_ENDPOINTS, getHeaders } from "./api-config";

/**
 * Enhanced fetch with retry logic, timeout, and better error handling
 */
async function enhancedFetch(url, options = {}) {
  const { retries = apiConfig.retries, timeout = apiConfig.timeout } = options;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      console.log(`🌐 API Request (Attempt ${attempt}/${retries}): ${url}`);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...getHeaders(),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      const data = await response.json();
      console.log(`✅ API Success: ${url}`);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        console.error(`⏰ API Timeout (Attempt ${attempt}/${retries}): ${url}`);
        if (attempt === retries) {
          throw new Error("Request timeout - please check your connection");
        }
      } else if (error.status >= 500 && attempt < retries) {
        console.warn(
          `🔄 Retrying API call (Attempt ${attempt}/${retries}): ${url}`
        );
        // Wait before retry (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      } else {
        console.error(`🚫 API Failed: ${url}`, error.message);
        throw error;
      }
    }
  }
}

/**
 * Build URL with query parameters
 */
function buildURL(endpoint, params = {}) {
  const url = new URL(endpoint, apiConfig.baseURL);

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
    tags,
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
    ...(tags && { tags: Array.isArray(tags) ? tags.join(",") : tags }),
  };

  const url = buildURL(API_ENDPOINTS.PRODUCTS, params);
  return await enhancedFetch(url);
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id) {
  const url = buildURL(API_ENDPOINTS.PRODUCT_BY_ID(id));
  return await enhancedFetch(url);
}

/**
 * Fetch featured products
 */
export async function fetchFeaturedProducts(limit = 8) {
  const url = buildURL(API_ENDPOINTS.PRODUCTS_FEATURED, { limit });
  return await enhancedFetch(url);
}

/**
 * Fetch new arrivals
 */
export async function fetchNewArrivals(limit = 8) {
  const url = buildURL(API_ENDPOINTS.PRODUCTS_NEW_ARRIVALS, { limit });
  return await enhancedFetch(url);
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category, options = {}) {
  const { page = 1, limit = 12, sort = "newest" } = options;

  const params = { page, limit, sort };
  const url = buildURL(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category), params);
  return await enhancedFetch(url);
}

/**
 * Search products
 */
export async function searchProducts(query, options = {}) {
  const { page = 1, limit = 12, sort = "relevance" } = options;

  const params = { q: query, page, limit, sort };
  const url = buildURL(API_ENDPOINTS.PRODUCTS_SEARCH, params);
  return await enhancedFetch(url);
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
  const url = buildURL(API_ENDPOINTS.CATEGORIES);
  return await enhancedFetch(url);
}

/**
 * Fetch category by slug
 */
export async function fetchCategoryBySlug(slug) {
  const url = buildURL(API_ENDPOINTS.CATEGORY_BY_SLUG(slug));
  return await enhancedFetch(url);
}

/**
 * Check API health
 */
export async function checkApiHealth() {
  try {
    const url = buildURL(API_ENDPOINTS.HEALTH);
    const data = await enhancedFetch(url, { retries: 1, timeout: 5000 });
    return { status: "online", ...data };
  } catch (error) {
    return {
      status: "offline",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Admin functions (if needed)
 */
export async function createProduct(productData) {
  const url = buildURL(API_ENDPOINTS.PRODUCTS);
  return await enhancedFetch(url, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(productData),
  });
}

export async function updateProduct(id, productData) {
  const url = buildURL(API_ENDPOINTS.PRODUCT_BY_ID(id));
  return await enhancedFetch(url, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(productData),
  });
}

export async function deleteProduct(id) {
  const url = buildURL(API_ENDPOINTS.PRODUCT_BY_ID(id));
  return await enhancedFetch(url, {
    method: "DELETE",
    headers: getHeaders(true),
  });
}

// Export all functions as default
export default {
  fetchProducts,
  fetchProductById,
  fetchFeaturedProducts,
  fetchNewArrivals,
  fetchProductsByCategory,
  searchProducts,
  fetchCategories,
  fetchCategoryBySlug,
  checkApiHealth,
  createProduct,
  updateProduct,
  deleteProduct,
};

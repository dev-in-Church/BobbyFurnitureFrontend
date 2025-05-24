import {
  mockProducts,
  mockCategories,
  getMockProductsByCategory,
  getMockFeaturedProducts,
  getMockNewArrivals,
  getMockProductById,
  searchMockProducts,
} from "./mock-data";

// Base API URL - replace with your actual backend URL
const API_BASE_URL =
  import.meta.env.NEXT_PUBLIC_API_URL ||
  "https://bobbyfurnitureonline.onrender.com";
// "http://localhost:5000" || "https://api.example.com";
// Development mode flag - set to true to always use mock data
const USE_MOCK_DATA = process.env.NODE_ENV === "development" || false;

/**
 * Enhanced fetch with better error handling and fallback
 */
async function enhancedFetch(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    console.log(`🌐 API Request: ${url}`);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorMessage = `${response.status} ${response.statusText}`;
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
      throw new Error("Request timeout - please try again");
    }

    console.error(`🚫 API Failed: ${url}`, error.message);
    throw error;
  }
}

/**
 * Fetch products with fallback to mock data
 */
export async function fetchProducts(options = {}) {
  if (USE_MOCK_DATA) {
    console.log("🔧 Using mock data (development mode)");
    return {
      products: mockProducts.slice(0, options.limit || 12),
      total: mockProducts.length,
      page: 1,
      totalPages: Math.ceil(mockProducts.length / (options.limit || 12)),
    };
  }

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
  } = options;

  try {
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

    const data = await enhancedFetch(
      `${API_BASE_URL}/products?${params.toString()}`
    );
    return data;
  } catch (error) {
    console.warn("⚠️ API unavailable, using mock data as fallback");
    return {
      products: mockProducts.slice(0, limit),
      total: mockProducts.length,
      page: 1,
      totalPages: Math.ceil(mockProducts.length / limit),
    };
  }
}

/**
 * Fetch a single product by ID with fallback
 */
export async function fetchProductById(id) {
  if (USE_MOCK_DATA) {
    return getMockProductById(id);
  }

  try {
    const data = await enhancedFetch(`${API_BASE_URL}/products/${id}`);
    return data;
  } catch (error) {
    console.warn("⚠️ API unavailable, using mock data as fallback");
    return getMockProductById(id);
  }
}

/**
 * Fetch product categories with fallback
 */
export async function fetchCategories() {
  if (USE_MOCK_DATA) {
    return mockCategories;
  }

  try {
    const data = await enhancedFetch(`${API_BASE_URL}/categories`);
    return data;
  } catch (error) {
    console.warn("⚠️ API unavailable, using mock data as fallback");
    return mockCategories;
  }
}

/**
 * Fetch featured products with fallback
 */
export async function fetchFeaturedProducts(limit = 8) {
  if (USE_MOCK_DATA) {
    return getMockFeaturedProducts(limit);
  }

  try {
    const data = await enhancedFetch(
      `${API_BASE_URL}/products/featured?limit=${limit}`
    );
    return data;
  } catch (error) {
    console.warn("⚠️ API unavailable, using mock data as fallback");
    return getMockFeaturedProducts(limit);
  }
}

/**
 * Fetch new arrivals with fallback
 */
export async function fetchNewArrivals(limit = 8) {
  if (USE_MOCK_DATA) {
    return getMockNewArrivals(limit);
  }

  try {
    const data = await enhancedFetch(
      `${API_BASE_URL}/products/new-arrivals?limit=${limit}`
    );
    return data;
  } catch (error) {
    console.warn("⚠️ API unavailable, using mock data as fallback");
    return getMockNewArrivals(limit);
  }
}

/**
 * Fetch products by category with fallback
 */
export async function fetchProductsByCategory(category, options = {}) {
  if (USE_MOCK_DATA) {
    return getMockProductsByCategory(category, options.limit);
  }

  const { page = 1, limit = 12, sort = "newest" } = options;

  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("sort", sort);

    const data = await enhancedFetch(
      `${API_BASE_URL}/products/category/${category}?${params.toString()}`
    );
    return data;
  } catch (error) {
    console.warn("⚠️ API unavailable, using mock data as fallback");
    return getMockProductsByCategory(category, limit);
  }
}

/**
 * Search products with fallback
 */
export async function searchProducts(query, options = {}) {
  if (USE_MOCK_DATA) {
    return searchMockProducts(query, options.limit);
  }

  const { page = 1, limit = 12, sort = "relevance" } = options;

  try {
    const params = new URLSearchParams();
    params.append("q", query);
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("sort", sort);

    const data = await enhancedFetch(
      `${API_BASE_URL}/products/search?${params.toString()}`
    );
    return data;
  } catch (error) {
    console.warn("⚠️ API unavailable, using mock data as fallback");
    return searchMockProducts(query, limit);
  }
}

/**
 * Check API health
 */
export async function checkApiHealth() {
  try {
    const data = await enhancedFetch(`${API_BASE_URL}/health`);
    return { status: "online", ...data };
  } catch (error) {
    return { status: "offline", error: error.message };
  }
}

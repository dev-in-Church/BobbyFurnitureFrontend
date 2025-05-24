// API Configuration with environment-based URLs
const API_CONFIGS = {
  development: {
    baseURL: "https://bobbyfurnitureonline.onrender.com",
    // "http://localhost:5000",
    timeout: 10000,
    retries: 2,
  },
  production: {
    baseURL: "https://bobbyfurnitureonline.onrender.com",
    // import.meta.env.NEXT_PUBLIC_API_URL ||
    // "https://bobbyfurnitureonline.onrender.com",
    timeout: 15000,
    retries: 3,
  },
  staging: {
    baseURL:
      import.meta.env.NEXT_PUBLIC_API_URL || "https://staging-api.example.com",
    timeout: 12000,
    retries: 2,
  },
};

const environment = import.meta.env.NODE_ENV || "development";
export const apiConfig = API_CONFIGS[environment];

// API endpoints mapping
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_FEATURED: "/products/featured",
  PRODUCTS_NEW_ARRIVALS: "/products/new-arrivals",
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  PRODUCTS_SEARCH: "/products/search",

  // Categories
  CATEGORIES: "/categories",
  CATEGORY_BY_SLUG: (slug) => `/categories/${slug}`,

  // Health
  HEALTH: "/health",

  // Admin (if needed)
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_CATEGORIES: "/admin/categories",
};

// Request headers
export const getHeaders = (includeAuth = false) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

export default apiConfig;

import axios from "axios";

const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com";

// Category mapping to convert URL slugs to database category names
const categoryMapping = {
  "living-room": "Living Room",
  bedroom: "Bedroom",
  "dining-room": "Dining Room",
  office: "Office",
  outdoor: "Outdoor",
  storage: "Storage",
  decor: "Decor",
  "kids-room": "Kids Room",
  mattresses: "Mattresses",
};

// Fetch all products with filters
export const fetchAllProducts = async (
  page = 1,
  limit = 20,
  sort = "newest",
  filters = {}
) => {
  try {
    const { search, category, minPrice, maxPrice, featured, onSale } = filters;
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);
    params.append("sort", sort);

    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (featured !== null) params.append("featured", featured);
    if (onSale !== null) params.append("onSale", onSale);

    const response = await axios.get(
      `${API_BASE_URL}/products?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetch products by category with filters - FIXED VERSION
export const fetchProductsByCategory = async (
  categorySlug,
  page = 1,
  limit = 12,
  sort = "newest",
  filters = {}
) => {
  try {
    const { minPrice, maxPrice, featured, onSale } = filters;

    // Convert URL slug to database category name
    const categoryName = categoryMapping[categorySlug] || categorySlug;

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    params.append("sort", sort);

    // Use categoryContains parameter for partial matching
    // This will match "Living Room - Sectional Sofas" when searching for "Living Room"
    params.append("categoryContains", categoryName);

    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (featured !== null) params.append("featured", featured);
    if (onSale !== null) params.append("onSale", onSale);

    // Use the general products endpoint with categoryContains filter
    const response = await axios.get(
      `${API_BASE_URL}/products?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Alternative approach if your backend doesn't support categoryContains
// You can modify this to use a different endpoint or parameter name
export const fetchProductsByCategoryAlternative = async (
  categorySlug,
  page = 1,
  limit = 12,
  sort = "newest",
  filters = {}
) => {
  try {
    const { minPrice, maxPrice, featured, onSale } = filters;

    // Convert URL slug to database category name
    const categoryName = categoryMapping[categorySlug] || categorySlug;

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    params.append("sort", sort);

    // Use search parameter to find categories containing the category name
    params.append("search", categoryName);

    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (featured !== null) params.append("featured", featured);
    if (onSale !== null) params.append("onSale", onSale);

    const response = await axios.get(
      `${API_BASE_URL}/products?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    // Return default categories if the endpoint doesn't exist
    return [
      { slug: "living-room", name: "Living Room" },
      { slug: "bedroom", name: "Bedroom" },
      { slug: "dining-room", name: "Dining Room" },
      { slug: "office", name: "Office" },
      { slug: "outdoor", name: "Outdoor" },
      { slug: "storage", name: "Storage" },
      { slug: "lighting", name: "Lighting" },
      { slug: "decor", name: "Decor" },
      { slug: "kids-room", name: "Kids Room" },
      { slug: "mattresses", name: "Mattresses" },
    ];
  }
};

// Get price range for products
export const fetchPriceRange = async (category = null) => {
  try {
    const url = category
      ? `${API_BASE_URL}/products/price-range?category=${category}`
      : `${API_BASE_URL}/products/price-range`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Fallback to default range if endpoint doesn't exist
    return { min: 0, max: 500000 };
  }
};

// Search products
export const searchProducts = async (
  query,
  page = 1,
  limit = 20,
  sort = "relevance",
  filters = {}
) => {
  try {
    const { category, minPrice, maxPrice, featured, onSale } = filters;
    const params = new URLSearchParams();

    params.append("q", query);
    params.append("page", page);
    params.append("limit", limit);
    params.append("sort", sort);

    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (featured !== null) params.append("featured", featured);
    if (onSale !== null) params.append("onSale", onSale);

    const response = await axios.get(
      `${API_BASE_URL}/products/search?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

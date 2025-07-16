import axios from "axios";

const API_BASE_URL = "https://bobbyfurnitureonline.onrender.com";

// Category mapping to convert URL slugs to a more readable format if needed for display.
// For API calls, the backend's normalization handles the slug directly.
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
  lighting: "Lighting", // Added based on your fetchCategories fallback
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
    // The backend's /products endpoint now handles 'category' with ILIKE for partial matching
    // It will normalize the category string (e.g., 'living-room' -> 'living room')
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    // Ensure boolean values are correctly appended as 'true' or 'false' strings
    if (featured !== undefined && featured !== null)
      params.append("featured", featured.toString());
    if (onSale !== undefined && onSale !== null)
      params.append("onSale", onSale.toString());

    const response = await axios.get(
      `${API_BASE_URL}/products?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error in fetchAllProducts:", error);
    throw error;
  }
};

// Fetch products by category with filters - UPDATED VERSION
// This function now uses the general /products endpoint with the 'category' parameter
// for partial matching, aligning with the backend changes.
export const fetchProductsByCategory = async (
  categorySlug,
  page = 1,
  limit = 12,
  sort = "newest",
  filters = {}
) => {
  try {
    const { minPrice, maxPrice, featured, onSale } = filters;
    // Use the categorySlug directly. The backend will normalize it for ILIKE matching.
    // The categoryMapping can still be used for display purposes on the frontend if needed.
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);
    params.append("sort", sort);
    params.append("category", categorySlug); // Use 'category' parameter for partial matching

    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (featured !== undefined && featured !== null)
      params.append("featured", featured.toString());
    if (onSale !== undefined && onSale !== null)
      params.append("onSale", onSale.toString());

    const response = await axios.get(
      `${API_BASE_URL}/products?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error in fetchProductsByCategory:", error);
    throw error;
  }
};

// Removed fetchProductsByCategoryAlternative as it's no longer needed.

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error in fetchProductById:", error);
    throw error;
  }
};

// Fetch all categories - UPDATED ENDPOINT
export const fetchCategories = async () => {
  try {
    // Call the dedicated /categories endpoint from routes/categories.js
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("API Error in fetchCategories:", error);
    // Return default categories if the endpoint doesn't exist or fails
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
    // If you want price range to also respect partial category matching,
    // you might need a backend endpoint that supports it.
    // For now, this assumes the backend's price-range endpoint handles 'category'
    // in a way that aligns with your needs (exact or partial).
    const url = category
      ? `${API_BASE_URL}/products/price-range?category=${category}`
      : `${API_BASE_URL}/products/price-range`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("API Error in fetchPriceRange:", error);
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

    // The backend's /products/search endpoint also uses 'category' for partial matching
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (featured !== undefined && featured !== null)
      params.append("featured", featured.toString());
    if (onSale !== undefined && onSale !== null)
      params.append("onSale", onSale.toString());

    const response = await axios.get(
      `${API_BASE_URL}/products/search?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error in searchProducts:", error);
    throw error;
  }
};

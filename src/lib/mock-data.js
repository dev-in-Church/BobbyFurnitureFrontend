// Mock data to use as fallback when API is unavailable
export const mockProducts = [
  {
    id: 1,
    name: "Modern Sofa Set",
    price: 45000,
    originalPrice: 55000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "living-room",
    featured: true,
    newArrival: true,
    description: "Comfortable 3-seater sofa with premium fabric",
  },
  {
    id: 2,
    name: "Dining Table Set",
    price: 35000,
    originalPrice: 42000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "dining-room",
    featured: true,
    newArrival: false,
    description: "6-seater wooden dining table with chairs",
  },
  {
    id: 3,
    name: "Queen Size Bed",
    price: 28000,
    originalPrice: 35000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "bedroom",
    featured: false,
    newArrival: true,
    description: "Comfortable queen size bed with storage",
  },
  {
    id: 4,
    name: "Coffee Table",
    price: 12000,
    originalPrice: 15000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "living-room",
    featured: true,
    newArrival: false,
    description: "Modern glass coffee table",
  },
  {
    id: 5,
    name: "Wardrobe",
    price: 32000,
    originalPrice: 40000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "bedroom",
    featured: false,
    newArrival: true,
    description: "3-door wardrobe with mirror",
  },
  {
    id: 6,
    name: "Bar Stools Set",
    price: 18000,
    originalPrice: 22000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "dining-room",
    featured: true,
    newArrival: false,
    description: "Set of 4 adjustable bar stools",
  },
  {
    id: 7,
    name: "Recliner Chair",
    price: 25000,
    originalPrice: 30000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "living-room",
    featured: false,
    newArrival: true,
    description: "Comfortable leather recliner chair",
  },
  {
    id: 8,
    name: "Bedside Table",
    price: 8000,
    originalPrice: 10000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "bedroom",
    featured: true,
    newArrival: false,
    description: "Wooden bedside table with drawer",
  },
  {
    id: 9,
    name: "Bookshelf",
    price: 15000,
    originalPrice: 18000,
    images: ["/placeholder.svg?height=200&width=200"],
    category: "living-room",
    featured: false,
    newArrival: true,
    description: "5-tier wooden bookshelf",
  },
];

export const mockCategories = [
  { id: 1, name: "Living Room", slug: "living-room" },
  { id: 2, name: "Bedroom", slug: "bedroom" },
  { id: 3, name: "Dining Room", slug: "dining-room" },
  { id: 4, name: "Office", slug: "office" },
  { id: 5, name: "Outdoor", slug: "outdoor" },
];

// Helper functions to filter mock data
export const getMockProductsByCategory = (category, limit = 12) => {
  const filtered = mockProducts.filter(
    (product) => product.category === category
  );
  return {
    products: filtered.slice(0, limit),
    total: filtered.length,
    page: 1,
    totalPages: Math.ceil(filtered.length / limit),
  };
};

export const getMockFeaturedProducts = (limit = 8) => {
  const featured = mockProducts.filter((product) => product.featured);
  return {
    products: featured.slice(0, limit),
    total: featured.length,
  };
};

export const getMockNewArrivals = (limit = 8) => {
  const newArrivals = mockProducts.filter((product) => product.newArrival);
  return {
    products: newArrivals.slice(0, limit),
    total: newArrivals.length,
  };
};

export const getMockProductById = (id) => {
  return mockProducts.find((product) => product.id === Number.parseInt(id));
};

export const searchMockProducts = (query, limit = 12) => {
  const filtered = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );
  return {
    products: filtered.slice(0, limit),
    total: filtered.length,
    page: 1,
    totalPages: Math.ceil(filtered.length / limit),
  };
};

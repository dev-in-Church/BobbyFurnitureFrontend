"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaImage,
  FaBox,
  FaTag,
  FaDollarSign,
  FaLayerGroup,
  FaCouch,
  FaBed,
  FaUtensils,
  FaLaptop,
  FaUmbrella,
  FaArchive,
  FaPalette,
  FaChevronDown,
  FaChevronUp,
  FaBaby,
  FaDollyFlatbed,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaEye,
  FaCopy,
  FaChartBar,
  FaExclamationTriangle,
  FaSpinner,
  FaWifi,
  FaSync,
  FaFileExport,
} from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  fetchProducts as apiFetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  checkApiHealth,
} from "../lib/api-final";

// Enhanced furniture categories with more detailed organization
const furnitureCategories = [
  {
    id: "living-room",
    name: "Living Room",
    icon: <FaCouch className="text-blue-500" />,
    color: "bg-blue-50 border-blue-200",
    subcategories: [
      "Sofas",
      "Coffee Tables",
      "TV Stands",
      "Accent Chairs",
      "Console Tables",
      "Sectional Sofas",
      "Living Room Packages",
      "Side Tables",
      "Nest of Tables",
      "Semi Recliners",
      "Couches in Set",
      "Buffet Tables",
      "Pouffes & Ottomans",
      "Entertainment Centers",
      "Bookcases",
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    icon: <FaBed className="text-purple-500" />,
    color: "bg-purple-50 border-purple-200",
    subcategories: [
      "Beds",
      "Dressers",
      "Nightstands",
      "Wardrobes",
      "Mattresses",
      "Ottomans",
      "Chest of Drawers",
      "Bedroom Packages",
      "Bed Benches",
      "Vanity Tables",
      "Armoires",
      "Headboards",
    ],
  },
  {
    id: "dining-room",
    name: "Dining Room",
    icon: <FaUtensils className="text-green-500" />,
    color: "bg-green-50 border-green-200",
    subcategories: [
      "Dining Tables",
      "Dining Chairs",
      "Buffets",
      "Bar Carts",
      "China Cabinets",
      "Four Seater Dining Sets",
      "Six Seater Dining Sets",
      "Eight Seater Dining Sets",
      "Bar Stools",
      "Kitchen Islands",
    ],
  },
  {
    id: "office",
    name: "Office",
    icon: <FaLaptop className="text-indigo-500" />,
    color: "bg-indigo-50 border-indigo-200",
    subcategories: [
      "Desks",
      "Office Chairs",
      "Bookshelves",
      "Filing Cabinets",
      "Desk Lamps",
      "Conference Tables",
      "Reception Furniture",
      "Storage Solutions",
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor",
    icon: <FaUmbrella className="text-teal-500" />,
    color: "bg-teal-50 border-teal-200",
    subcategories: [
      "Patio Sets",
      "Outdoor Chairs",
      "Garden Benches",
      "Hammocks",
      "Outdoor Tables",
      "Umbrellas",
      "Fire Pits",
      "Gazebos",
    ],
  },
  {
    id: "storage",
    name: "Storage",
    icon: <FaArchive className="text-orange-500" />,
    color: "bg-orange-50 border-orange-200",
    subcategories: [
      "Cabinets",
      "Shelving",
      "Storage Bins",
      "Closet Systems",
      "Media Storage",
      "Shoe Racks",
      "Pantry Storage",
      "Garage Storage",
    ],
  },
  {
    id: "decor",
    name: "Decor",
    icon: <FaPalette className="text-pink-500" />,
    color: "bg-pink-50 border-pink-200",
    subcategories: [
      "Mirrors",
      "Mirror Frames",
      "Rugs",
      "Lighting",
      "Wall Art",
      "Throw Pillows",
      "Curtains",
      "Decorative Objects",
    ],
  },
  {
    id: "kids-room",
    name: "Kids Room",
    icon: <FaBaby className="text-yellow-500" />,
    color: "bg-yellow-50 border-yellow-200",
    subcategories: [
      "Kids Beds",
      "Double Deckers",
      "Baby Cots",
      "Study Desks",
      "Toy Storage",
      "Cribs",
    ],
  },
  {
    id: "mattresses",
    name: "Mattresses",
    icon: <FaDollyFlatbed className="text-red-500" />,
    color: "bg-red-50 border-red-200",
    subcategories: [
      "Foam Mattresses",
      "Spring Mattresses",
      "Orthopedic Mattresses",
      "Memory Foam Mattresses",
    ],
  },
];

const EnhancedManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState("grid");
  const [apiStatus, setApiStatus] = useState("checking");
  const [lastSync, setLastSync] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    stock: "",
    images: [],
    featured: false,
    onSale: false,
    tags: "",
    dimensions: "",
    material: "",
    color: "",
    weight: "",
    brand: "",
  });

  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [stats, setStats] = useState({
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0,
    categories: {},
  });

  // Check API health on component mount
  useEffect(() => {
    checkHealth();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  useEffect(() => {
    calculateStats();
  }, [products]);

  const checkHealth = async () => {
    try {
      const health = await checkApiHealth();
      setApiStatus(health.status);
    } catch (error) {
      setApiStatus("offline");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiFetchProducts({
        page: 1,
        limit: 1000, // Get all products for admin
        sort: "newest",
      });

      // Handle different response structures
      const productsData = response.products || response.data || response || [];
      const total =
        response.total || response.pagination?.total || productsData.length;

      setProducts(productsData);
      setTotalProducts(total);
      setLastSync(new Date());
      setApiStatus("online");
    } catch (error) {
      console.error("Error fetching products:", error);
      setApiStatus("offline");
      toast.error("Failed to load products. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = useCallback(() => {
    const totalValue = products.reduce(
      (sum, product) => sum + (product.price || 0) * (product.stock || 0),
      0
    );
    const lowStock = products.filter(
      (product) => (product.stock || 0) <= 5 && (product.stock || 0) > 0
    ).length;
    const outOfStock = products.filter(
      (product) => (product.stock || 0) === 0
    ).length;

    const categories = {};
    products.forEach((product) => {
      const category = product.category?.split(" - ")[0] || "Uncategorized";
      categories[category] = (categories[category] || 0) + 1;
    });

    setStats({ totalValue, lowStock, outOfStock, categories });
  }, [products]);

  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) =>
        product.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "price") {
        aValue = Number.parseFloat(aValue) || 0;
        bValue = Number.parseFloat(bValue) || 0;
      } else if (sortBy === "stock") {
        aValue = Number.parseInt(aValue) || 0;
        bValue = Number.parseInt(bValue) || 0;
      } else {
        aValue = String(aValue || "").toLowerCase();
        bValue = String(bValue || "").toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "images") {
      const imageUrls = value
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url);
      setFormData({ ...formData, images: imageUrls });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category, subcategory: "" });
    setExpandedCategory(category);
  };

  const handleSubcategoryChange = (subcategory) => {
    setFormData({ ...formData, subcategory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.price ||
        !formData.category ||
        !formData.stock
      ) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      // Combine category and subcategory for storage
      const categoryString = formData.subcategory
        ? `${formData.category} - ${formData.subcategory}`
        : formData.category;

      // Process images
      let processedImages = formData.images;
      if (typeof formData.images === "string") {
        processedImages = formData.images
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url);
      } else if (!Array.isArray(formData.images)) {
        processedImages = [formData.images].filter(Boolean);
      }

      // Process tags
      const tags = formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      const payload = {
        ...formData,
        category: categoryString,
        images: processedImages,
        tags,
        price: Number.parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? Number.parseFloat(formData.originalPrice)
          : null,
        stock: Number.parseInt(formData.stock),
      };

      if (editProduct) {
        await updateProduct(editProduct.id, payload);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(payload);
        toast.success("Product added successfully!");
      }

      fetchProducts();
      resetForm();
      if (!editProduct) setIsFormVisible(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    }

    setLoading(false);
  };

  const handleEdit = (product) => {
    // Parse the category string to separate main category and subcategory
    let mainCategory = product.category;
    let subcategory = "";

    if (product.category && product.category.includes(" - ")) {
      const parts = product.category.split(" - ");
      mainCategory = parts[0];
      subcategory = parts[1];
    }

    // Ensure images are properly formatted
    let processedImages = [];
    if (product.images) {
      if (typeof product.images === "string") {
        processedImages = [product.images];
      } else if (Array.isArray(product.images)) {
        processedImages = product.images;
      } else {
        processedImages = [product.images];
      }
    }

    setEditProduct(product);
    setFormData({
      ...product,
      category: mainCategory,
      subcategory: subcategory,
      images: processedImages,
      tags: product.tags
        ? Array.isArray(product.tags)
          ? product.tags.join(", ")
          : product.tags
        : "",
      originalPrice: product.originalPrice || "",
    });
    setExpandedCategory(mainCategory);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedProducts.length} products?`
      )
    ) {
      try {
        await Promise.all(selectedProducts.map((id) => deleteProduct(id)));
        toast.success(
          `${selectedProducts.length} products deleted successfully!`
        );
        setSelectedProducts([]);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting products:", error);
        toast.error("Failed to delete products.");
      }
    }
  };

  const handleDuplicate = async (product) => {
    const duplicatedProduct = {
      ...product,
      name: `${product.name} (Copy)`,
      id: undefined,
    };

    try {
      await createProduct(duplicatedProduct);
      toast.success("Product duplicated successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error duplicating product:", error);
      toast.error("Failed to duplicate product.");
    }
  };

  const handleExport = () => {
    const csvContent = [
      ["Name", "Category", "Price", "Stock", "Description"],
      ...filteredProducts.map((product) => [
        product.name,
        product.category,
        product.price,
        product.stock,
        product.description,
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      subcategory: "",
      stock: "",
      images: [],
      featured: false,
      onSale: false,
      tags: "",
      dimensions: "",
      material: "",
      color: "",
      weight: "",
      brand: "",
    });
    setEditProduct(null);
    setExpandedCategory(null);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (editProduct) resetForm();
  };

  const getCategoryDisplayName = (product) => {
    return product.category || "Uncategorized";
  };

  const getStockStatus = (stock) => {
    if (stock === 0)
      return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock <= 5)
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { status: "In Stock", color: "bg-green-100 text-green-800" };
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* API Status Banner */}
        {apiStatus !== "online" && (
          <div
            className={`mb-4 p-3 rounded-lg flex items-center justify-between ${
              apiStatus === "offline"
                ? "bg-red-50 border border-red-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <div className="flex items-center">
              {apiStatus === "offline" ? (
                <MdWifiOff className="text-red-500 mr-2" />
              ) : (
                <FaWifi className="text-yellow-500 mr-2" />
              )}
              <span
                className={`text-sm font-medium ${
                  apiStatus === "offline" ? "text-red-700" : "text-yellow-700"
                }`}
              >
                {apiStatus === "offline"
                  ? "API Offline - Using cached data"
                  : "Checking connection..."}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                checkHealth();
                fetchProducts();
              }}
            >
              <FaSync className="mr-1" />
              Retry
            </Button>
          </div>
        )}

        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Product Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your furniture inventory with advanced tools
              </p>
              {lastSync && (
                <p className="text-xs text-gray-500 mt-1">
                  Last synced: {lastSync.toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button
                onClick={toggleForm}
                className={`${
                  isFormVisible
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isFormVisible ? (
                  <FaTimes className="mr-2" />
                ) : (
                  <FaPlus className="mr-2" />
                )}
                {isFormVisible ? "Hide Form" : "Add Product"}
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <FaFileExport className="mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={fetchProducts}>
                <FaSync className="mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalProducts}
                    </p>
                  </div>
                  <FaBox className="text-blue-500 text-2xl" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      KSh {stats.totalValue.toLocaleString()}
                    </p>
                  </div>
                  <FaChartBar className="text-green-500 text-2xl" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {stats.lowStock}
                    </p>
                  </div>
                  <FaExclamationTriangle className="text-yellow-500 text-2xl" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600">
                      {stats.outOfStock}
                    </p>
                  </div>
                  <FaExclamationTriangle className="text-red-500 text-2xl" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Form - keeping the existing form structure */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isFormVisible
              ? "max-h-[3000px] opacity-100 mb-8"
              : "max-h-0 opacity-0"
          }`}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {editProduct ? (
                  <>
                    <FaEdit className="mr-2 text-blue-600" /> Edit Product:{" "}
                    {editProduct.name}
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2 text-green-600" /> Add New Product
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="media">Media & SEO</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Product Name *
                        </label>
                        <div className="relative">
                          <FaTag className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            name="name"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Brand
                        </label>
                        <Input
                          name="brand"
                          placeholder="Enter brand name"
                          value={formData.brand}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Price (KSh) *
                        </label>
                        <div className="relative">
                          <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Original Price
                        </label>
                        <div className="relative">
                          <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            type="number"
                            name="originalPrice"
                            placeholder="Enter original price"
                            value={formData.originalPrice}
                            onChange={handleChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Stock *
                        </label>
                        <div className="relative">
                          <FaBox className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            type="number"
                            name="stock"
                            placeholder="Enter stock quantity"
                            value={formData.stock}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      {/* Category Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Category *
                        </label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <div className="max-h-48 overflow-y-auto p-1">
                            {furnitureCategories.map((category) => (
                              <div key={category.id} className="mb-1">
                                <button
                                  type="button"
                                  className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md transition-colors ${
                                    formData.category === category.name
                                      ? "bg-blue-50 text-blue-700 font-medium"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                  onClick={() =>
                                    handleCategoryChange(category.name)
                                  }
                                >
                                  <span className="flex items-center">
                                    <span className="mr-2">
                                      {category.icon}
                                    </span>
                                    {category.name}
                                  </span>
                                  {expandedCategory === category.name ? (
                                    <FaChevronUp className="text-xs" />
                                  ) : (
                                    <FaChevronDown className="text-xs" />
                                  )}
                                </button>

                                {expandedCategory === category.name && (
                                  <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
                                    {category.subcategories.map((subcat) => (
                                      <button
                                        key={subcat}
                                        type="button"
                                        className={`flex items-center w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                                          formData.subcategory === subcat
                                            ? "bg-blue-50 text-blue-700 font-medium"
                                            : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                        onClick={() =>
                                          handleSubcategoryChange(subcat)
                                        }
                                      >
                                        {subcat}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        {formData.category && (
                          <p className="text-sm text-gray-500 mt-1">
                            Selected: {formData.category}
                            {formData.subcategory &&
                              ` - ${formData.subcategory}`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Dimensions
                        </label>
                        <Input
                          name="dimensions"
                          placeholder="e.g., 120cm x 80cm x 75cm"
                          value={formData.dimensions}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Material
                        </label>
                        <Input
                          name="material"
                          placeholder="e.g., Solid Wood, Fabric, Metal"
                          value={formData.material}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Color
                        </label>
                        <Input
                          name="color"
                          placeholder="e.g., Brown, White, Black"
                          value={formData.color}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Weight (kg)
                        </label>
                        <Input
                          name="weight"
                          placeholder="Enter weight in kg"
                          value={formData.weight}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Featured Product
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="onSale"
                          checked={formData.onSale}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          On Sale
                        </span>
                      </label>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Image URLs{" "}
                        <span className="text-gray-500 text-xs">
                          (comma-separated)
                        </span>
                      </label>
                      <div className="relative">
                        <FaImage className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          name="images"
                          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                          value={
                            Array.isArray(formData.images)
                              ? formData.images.join(", ")
                              : formData.images
                          }
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Image Preview */}
                    {formData.images.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Image Preview
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {formData.images.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-300"
                                onError={(e) =>
                                  (e.target.src =
                                    "/placeholder.svg?height=100&width=100")
                                }
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">
                                  Image {index + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Tags{" "}
                        <span className="text-gray-500 text-xs">
                          (comma-separated)
                        </span>
                      </label>
                      <Input
                        name="tags"
                        placeholder="modern, comfortable, bestseller"
                        value={formData.tags}
                        onChange={handleChange}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    type="submit"
                    disabled={loading || !formData.category}
                    className={`flex-1 ${
                      editProduct
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loading ? (
                      <FaSpinner className="mr-2 animate-spin" />
                    ) : editProduct ? (
                      <FaEdit className="mr-2" />
                    ) : (
                      <FaPlus className="mr-2" />
                    )}
                    {loading
                      ? "Processing..."
                      : editProduct
                      ? "Update Product"
                      : "Add Product"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      resetForm();
                      if (!editProduct) setIsFormVisible(false);
                    }}
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {furnitureCategories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc" ? (
                    <FaSortAmountUp />
                  ) : (
                    <FaSortAmountDown />
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                >
                  {viewMode === "grid" ? <FaLayerGroup /> : <FaBox />}
                </Button>
              </div>
            </div>

            {selectedProducts.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  {selectedProducts.length} products selected
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <FaTrash className="mr-2" />
                  Delete Selected
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Products Grid/List */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <FaSpinner className="text-4xl text-gray-400 animate-spin" />
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <div
                  className={`${
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "space-y-4"
                  }`}
                >
                  {currentProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock || 0);

                    return (
                      <div
                        key={product.id}
                        className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md ${
                          viewMode === "list" ? "flex" : ""
                        }`}
                      >
                        {/* Product Image */}
                        <div
                          className={`relative bg-gray-100 ${
                            viewMode === "list" ? "w-32 h-32" : "h-48"
                          }`}
                        >
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) =>
                                (e.target.src =
                                  "/placeholder.svg?height=200&width=200")
                              }
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaImage className="text-gray-400 text-4xl" />
                            </div>
                          )}

                          {/* Badges */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {product.featured && (
                              <Badge className="bg-yellow-500 text-white text-xs">
                                Featured
                              </Badge>
                            )}
                            {product.onSale && (
                              <Badge className="bg-red-500 text-white text-xs">
                                Sale
                              </Badge>
                            )}
                          </div>

                          <div className="absolute top-2 right-2">
                            <Badge className={`text-xs ${stockStatus.color}`}>
                              {stockStatus.status}
                            </Badge>
                          </div>

                          {/* Selection checkbox */}
                          <div className="absolute bottom-2 left-2">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedProducts([
                                    ...selectedProducts,
                                    product.id,
                                  ]);
                                } else {
                                  setSelectedProducts(
                                    selectedProducts.filter(
                                      (id) => id !== product.id
                                    )
                                  );
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900 line-clamp-2 flex-1">
                              {product.name}
                            </h3>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <FaEye />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{product.name}</DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <img
                                      src={
                                        product.images?.[0] ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg"
                                      }
                                      alt={product.name}
                                      className="w-full h-64 object-cover rounded-lg"
                                    />
                                  </div>
                                  <div className="space-y-3">
                                    <div>
                                      <h4 className="font-medium text-gray-700">
                                        Price
                                      </h4>
                                      <p className="text-lg font-bold text-blue-600">
                                        KSh {product.price?.toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-700">
                                        Category
                                      </h4>
                                      <p className="text-gray-600">
                                        {getCategoryDisplayName(product)}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-700">
                                        Stock
                                      </h4>
                                      <p className="text-gray-600">
                                        {product.stock} units
                                      </p>
                                    </div>
                                    {product.description && (
                                      <div>
                                        <h4 className="font-medium text-gray-700">
                                          Description
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                          {product.description}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-lg font-bold text-blue-600">
                                KSh {product.price?.toLocaleString()}
                              </p>
                              {product.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  KSh {product.originalPrice.toLocaleString()}
                                </p>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              Stock: {product.stock}
                            </p>
                          </div>

                          <p className="text-xs text-gray-500 mb-3 bg-gray-100 inline-block px-2 py-1 rounded-full">
                            {getCategoryDisplayName(product)}
                          </p>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(product)}
                              className="flex-1"
                            >
                              <FaEdit className="mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDuplicate(product)}
                            >
                              <FaCopy />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(product.id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <FaBox className="mx-auto text-gray-300 text-5xl mb-4" />
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedCategory !== "all"
                    ? "No products match your search criteria."
                    : "No products available."}
                </p>
                <Button onClick={() => setIsFormVisible(true)}>
                  <FaPlus className="mr-2" />
                  Add Your First Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedManageProducts;

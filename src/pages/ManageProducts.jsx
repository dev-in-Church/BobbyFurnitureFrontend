"use client";

import { useEffect, useState } from "react";
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
} from "react-icons/fa";
import api from "../api/axios";

// Furniture categories organized by room/type with subcategories
const furnitureCategories = [
  {
    id: "livingRoom",
    name: "Living Room",
    icon: <FaCouch className="text-gray-500" />,
    subcategories: [
      "Sofas",
      "Coffee Tables",
      "TV Stands",
      "Accent Chairs",
      "Console Tables",
      "Sectional Sofas",
      "Livingroom Packages",
      "Tables",
      "Nest of Tables",
      "Semi Recliners",
      "Couches in set",
      "Buffet Tables",
      "Pouffes & Ottomans",
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    icon: <FaBed className="text-gray-500" />,
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
    ],
  },
  {
    id: "diningRoom",
    name: "Dining Room",
    icon: <FaUtensils className="text-gray-500" />,
    subcategories: [
      "Dining Tables",
      "Dining Chairs",
      "Buffets",
      "Bar Carts",
      "China Cabinets",
      "Four seater DIning Sets",
      "Six seater DIning Sets",
      "Eight seater DIning Sets",
    ],
  },
  {
    id: "office",
    name: "Office",
    icon: <FaLaptop className="text-gray-500" />,
    subcategories: [
      "Desks",
      "Office Chairs",
      "Bookshelves",
      "Filing Cabinets",
      "Desk Lamps",
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor",
    icon: <FaUmbrella className="text-gray-500" />,
    subcategories: [
      "Patio Sets",
      "Outdoor Chairs",
      "Garden Benches",
      "Hammocks",
      "Outdoor Tables",
    ],
  },
  {
    id: "storage",
    name: "Storage",
    icon: <FaArchive className="text-gray-500" />,
    subcategories: [
      "Cabinets",
      "Shelving",
      "Storage Bins",
      "Closet Systems",
      "Media Storage",
      "Shoe Racks",
    ],
  },
  {
    id: "decor",
    name: "Decor",
    icon: <FaPalette className="text-gray-500" />,
    subcategories: [
      "Mirrors",
      "Mirror Frames",
      "Rugs",
      "Lighting",
      "Wall Art",
      "Throw Pillows",
    ],
  },
  {
    id: "kids-room",
    name: "Kids Room",
    icon: <FaBaby className="text-gray-500" />,
    subcategories: ["Beds", "Double Deckers", "Baby Cots"],
  },
  {
    id: "matresses",
    name: "Matresses",
    icon: <FaDollyFlatbed className="text-gray-500" />,
    subcategories: [
      "Foam Matresses",
      "Spring Matresses",
      "Orthopedic Matresses",
      "Memory Foam Matresses",
    ],
  },
];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    images: [],
  });
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchTotalProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products.");
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const res = await api.get("/api/products/total-products");
      setTotalProducts(res.data.totalProducts);
    } catch (error) {
      toast.error("Failed to load total products count.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      const imageUrls = value.split(",").map((url) => url.trim());
      setFormData({ ...formData, images: imageUrls });
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
      // Combine category and subcategory for storage
      const categoryString = formData.subcategory
        ? `${formData.category} - ${formData.subcategory}`
        : formData.category;

      // Ensure images are properly formatted as an array
      let processedImages = formData.images;
      if (typeof formData.images === "string") {
        processedImages = formData.images
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url);
      } else if (!Array.isArray(formData.images)) {
        processedImages = [formData.images].filter(Boolean);
      }

      const payload = {
        ...formData,
        category: categoryString,
        images: processedImages,
      };

      if (editProduct) {
        await api.put(`/api/products/${editProduct.id}`, payload);
        toast.success("Product updated successfully!");
      } else {
        await api.post("/api/products", payload);
        toast.success("Product added successfully!");
      }

      fetchProducts();
      fetchTotalProducts();
      resetForm();
      if (!editProduct) setIsFormVisible(false);
    } catch (error) {
      toast.error("Failed to save product.");
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
    });
    setExpandedCategory(mainCategory);
    setIsFormVisible(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/api/products/${id}`);
        toast.success("Product deleted successfully!");
        fetchProducts();
        fetchTotalProducts();
      } catch (error) {
        toast.error("Failed to delete product.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      subcategory: "",
      stock: "",
      images: [],
    });
    setEditProduct(null);
    setExpandedCategory(null);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (editProduct) resetForm();
  };

  // Get category display name for product cards
  const getCategoryDisplayName = (product) => {
    return product.category || "Uncategorized";
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Management
            </h1>
            <p className="text-gray-600 mt-1">
              Total Products:{" "}
              <span className="font-semibold">{totalProducts}</span>
            </p>
          </div>
          <button
            onClick={toggleForm}
            className={`mt-4 sm:mt-0 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-all ${
              isFormVisible
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isFormVisible ? <FaTimes /> : <FaPlus />}
            {isFormVisible ? "Hide Form" : "Add New Product"}
          </button>
        </div>

        {/* Product Form */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isFormVisible ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 flex items-center">
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
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTag className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 p-3 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Price (Ksh)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleChange}
                      className="pl-10 p-3 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBox className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="stock"
                      placeholder="Enter stock quantity"
                      value={formData.stock}
                      onChange={handleChange}
                      className="pl-10 p-3 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="relative">
                    {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLayerGroup className="text-gray-400" />
                    </div> */}
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      {/* Main Categories */}
                      <div className="max-h-48 overflow-y-auto p-1">
                        {furnitureCategories.map((category) => (
                          <div key={category.id} className="mb-1">
                            <button
                              type="button"
                              className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md ${
                                formData.category === category.name
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() =>
                                handleCategoryChange(category.name)
                              }
                            >
                              <span className="flex items-center">
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                              </span>
                              {expandedCategory === category.name ? (
                                <FaChevronUp className="text-xs" />
                              ) : (
                                <FaChevronDown className="text-xs" />
                              )}
                            </button>

                            {/* Subcategories */}
                            {expandedCategory === category.name && (
                              <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
                                {category.subcategories.map((subcat) => (
                                  <button
                                    key={subcat}
                                    type="button"
                                    className={`flex items-center w-full text-left px-2 py-1.5 text-sm rounded-md ${
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
                  </div>
                  {formData.category && (
                    <p className="text-sm text-gray-500 mt-1 pl-2">
                      Selected: {formData.category}
                      {formData.subcategory && ` - ${formData.subcategory}`}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="p-3 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Image URLs{" "}
                  <span className="text-gray-500 text-xs">
                    (comma-separated)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaImage className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="images"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    value={formData.images.join(", ")}
                    onChange={handleChange}
                    className="pl-10 p-3 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Image Preview
                  </label>
                  <div className="flex gap-3 overflow-x-auto py-2 px-1">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md border border-gray-300 shadow-sm"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/100?text=Error")
                          }
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-md flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">
                            Image {index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className={`flex-1 py-3 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : editProduct
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                  disabled={loading || !formData.category}
                >
                  {loading ? (
                    "Processing..."
                  ) : editProduct ? (
                    <>
                      <FaEdit /> Update Product
                    </>
                  ) : (
                    <>
                      <FaPlus /> Add Product
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-300 flex items-center justify-center gap-2 transition-colors"
                  onClick={() => {
                    resetForm();
                    if (!editProduct) setIsFormVisible(false);
                  }}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
            Product Inventory ({products.length})
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="relative h-40 bg-gray-100">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/300x200?text=No+Image")
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <FaImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
                      Stock: {product.stock}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mt-1">
                      Ksh.{product.price}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 bg-gray-100 inline-block px-2 py-1 rounded-full">
                      {getCategoryDisplayName(product)}
                    </p>

                    <div className="flex justify-between gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 flex items-center justify-center gap-1 bg-amber-100 text-amber-700 py-1.5 px-2 rounded-md hover:bg-amber-200 transition-colors text-sm"
                      >
                        <FaEdit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 py-1.5 px-2 rounded-md hover:bg-red-200 transition-colors text-sm"
                      >
                        <FaTrash size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBox className="mx-auto text-gray-300 text-5xl mb-4" />
              <p className="text-gray-500">No products available.</p>
              <button
                onClick={() => setIsFormVisible(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
              >
                <FaPlus /> Add Your First Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;

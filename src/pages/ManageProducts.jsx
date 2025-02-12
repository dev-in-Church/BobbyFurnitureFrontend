// import { useEffect, useState } from "react";
// import api from "../api/axios";

// const ProductsManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     stock: "",
//     images: "",
//   });
//   const [editProduct, setEditProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch Products
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/api/products");
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError("Failed to load products.");
//     }
//   };

//   // Fetch Total Product Count
//   const fetchTotalProducts = async () => {
//     try {
//       const res = await api.get("/api/products/total-products");
//       setTotalProducts(res.data.totalProducts);
//     } catch (error) {
//       console.error("Error fetching total products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchTotalProducts();
//   }, []);

//   // Handle Input Changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Product Submission (Add or Update)
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setMessage(null);
//   //   setError(null);

//   //   try {
//   //     if (editProduct) {
//   //       await api.put(`/api/products/${editProduct.id}`, formData);
//   //       setMessage("Product updated successfully!");
//   //     } else {
//   //       await api.post("/api/products", formData);
//   //       setMessage("Product added successfully!");
//   //     }
//   //     fetchProducts();
//   //     fetchTotalProducts();
//   //     resetForm();
//   //   } catch (error) {
//   //     console.error("Error saving product:", error);
//   //     setError("Failed to save product.");
//   //   }
//   //   setLoading(false);
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);
//     setError(null);

//     try {
//       const payload = {
//         ...formData,
//         images: Array.isArray(formData.images)
//           ? formData.images
//           : [formData.images], // Ensure it's an array
//       };

//       if (editProduct) {
//         await api.put(`/api/products/${editProduct.id}`, payload);
//         setMessage("Product updated successfully!");
//       } else {
//         await api.post("/api/products", payload);
//         setMessage("Product added successfully!");
//       }

//       fetchProducts();
//       fetchTotalProducts();
//       resetForm();
//     } catch (error) {
//       console.error("Error saving product:", error);
//       setError("Failed to save product.");
//     }

//     setLoading(false);
//   };

//   // Handle Edit
//   const handleEdit = (product) => {
//     setEditProduct(product);
//     setFormData(product);
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await api.delete(`/api/products/${id}`);
//         setMessage("Product deleted successfully!");
//         fetchProducts();
//         fetchTotalProducts();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         setError("Failed to delete product.");
//       }
//     }
//   };

//   // Reset Form
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       price: "",
//       category: "",
//       stock: "",
//       images: "",
//     });
//     setEditProduct(null);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen mt-16">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
//           Product Management
//         </h1>

//         {message && (
//           <p className="bg-green-100 text-green-800 p-2 rounded mb-3">
//             {message}
//           </p>
//         )}
//         {error && (
//           <p className="bg-red-100 text-red-800 p-2 rounded mb-3">{error}</p>
//         )}

//         <p className="mb-4 text-lg font-semibold text-gray-700">
//           Total Products: {totalProducts}
//         </p>

//         {/* Product Form */}
//         <div className="bg-white p-5 shadow-lg rounded-lg mb-6">
//           <h2 className="text-2xl font-semibold mb-3">
//             {editProduct ? "Edit Product" : "Add New Product"}
//           </h2>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Product Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="border p-3 rounded w-full"
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleChange}
//               className="border p-3 rounded w-full"
//             />
//             <input
//               type="number"
//               name="price"
//               placeholder="Price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               className="border p-3 rounded w-full"
//             />
//             <input
//               type="text"
//               name="category"
//               placeholder="Category"
//               value={formData.category}
//               onChange={handleChange}
//               className="border p-3 rounded w-full"
//             />
//             <input
//               type="number"
//               name="stock"
//               placeholder="Stock"
//               value={formData.stock}
//               onChange={handleChange}
//               required
//               className="border p-3 rounded w-full"
//             />
//             <input
//               type="text"
//               name="images"
//               placeholder="Image URL"
//               value={formData.images}
//               onChange={handleChange}
//               className="border p-3 rounded w-full"
//             />

//             {/* Image Preview */}
//             {formData.images && (
//               <img
//                 src={formData.images}
//                 alt="Preview"
//                 className="w-32 h-32 object-cover rounded border mx-auto"
//               />
//             )}

//             <div className="flex gap-2">
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 flex-1"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Saving..."
//                   : editProduct
//                   ? "Update Product"
//                   : "Add Product"}
//               </button>
//               {editProduct && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="bg-gray-400 text-white p-3 rounded hover:bg-gray-500 flex-1"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white p-5 shadow-lg rounded-lg text-center"
//               >
//                 <img
//                   src={product.images || "https://via.placeholder.com/150"}
//                   alt={product.name}
//                   className="w-full h-48 object-cover rounded-md mb-4"
//                 />
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-gray-600">${product.price}</p>
//                 <p className="text-sm text-gray-500">{product.category}</p>
//                 <p className="text-gray-500">Stock: {product.stock}</p>
//                 <div className="mt-4 flex justify-center gap-2">
//                   <button
//                     onClick={() => handleEdit(product)}
//                     className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 col-span-3 text-center">
//               No products available.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsManagement;
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import api from "../api/axios";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products.");
    }
  };

  // Fetch Total Product Count
  const fetchTotalProducts = async () => {
    try {
      const res = await api.get("/api/products/total-products");
      setTotalProducts(res.data.totalProducts);
    } catch (error) {
      toast.error("Failed to load total products count.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchTotalProducts();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Product Submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        images: Array.isArray(formData.images)
          ? formData.images
          : [formData.images],
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
    } catch (error) {
      toast.error("Failed to save product.");
    }

    setLoading(false);
  };

  // Handle Edit
  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
  };

  // Handle Delete
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

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      images: "",
    });
    setEditProduct(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Product Management
        </h1>

        <p className="mb-4 text-lg font-semibold text-gray-700">
          Total Products: {totalProducts}
        </p>

        {/* Product Form */}
        <div className="bg-white p-5 shadow-lg rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            {editProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-3 rounded w-full"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border p-3 rounded w-full"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="border p-3 rounded w-full"
            />
            <input
              type="text"
              name="images"
              placeholder="Image URL"
              value={formData.images}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />

            {/* Image Preview */}
            {formData.images && (
              <img
                src={formData.images || "https://via.placeholder.com/150"}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border mx-auto"
              />
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 flex-1 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editProduct
                  ? "Update Product"
                  : "Add Product"}
                <FaPlus />
              </button>
              {editProduct && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white p-3 rounded hover:bg-gray-500 flex-1 flex items-center justify-center gap-2"
                >
                  Cancel <FaTimes />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-5 shadow-lg rounded-lg text-center"
              >
                <img
                  src={product.images || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 flex items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 flex items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;

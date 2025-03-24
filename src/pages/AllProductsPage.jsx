// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Slider } from "../components/ui/slider";
// import { Checkbox } from "../components/ui/checkbox";
// import { Button } from "../components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";
// import ProductCard from "../components/product-card";
// import { SlidersHorizontal, X } from "lucide-react";
// import { productsData } from "../data/products";

// export default function AllProductsPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     priceRange: [0, 5000],
//     categories: [],
//     ratings: [],
//   });
//   const [sortOption, setSortOption] = useState("featured");

//   // Get category from URL if present
//   const categoryParam = searchParams.get("category");

//   useEffect(() => {
//     // In a real app, you would fetch products from an API
//     setProducts(productsData);
//   }, []);

//   useEffect(() => {
//     let result = [...products];

//     // Filter by category from URL if present
//     if (categoryParam) {
//       result = result.filter(
//         (product) =>
//           product.category.toLowerCase() === categoryParam.toLowerCase()
//       );
//     }

//     // Apply price filter
//     result = result.filter(
//       (product) =>
//         product.price >= filters.priceRange[0] &&
//         product.price <= filters.priceRange[1]
//     );

//     // Apply category filters if any are selected
//     if (filters.categories.length > 0) {
//       result = result.filter((product) =>
//         filters.categories.includes(product.category)
//       );
//     }

//     // Apply rating filters if any are selected
//     if (filters.ratings.length > 0) {
//       result = result.filter((product) =>
//         filters.ratings.includes(Math.floor(product.rating))
//       );
//     }

//     // Apply sorting
//     switch (sortOption) {
//       case "price-low-high":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high-low":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "newest":
//         result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
//         break;
//       case "rating":
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       default: // featured
//         // Keep original order
//         break;
//     }

//     setFilteredProducts(result);
//   }, [products, filters, sortOption, categoryParam]);

//   const handlePriceChange = (value) => {
//     setFilters({
//       ...filters,
//       priceRange: value,
//     });
//   };

//   const handleCategoryChange = (category) => {
//     const updatedCategories = filters.categories.includes(category)
//       ? filters.categories.filter((c) => c !== category)
//       : [...filters.categories, category];

//     setFilters({
//       ...filters,
//       categories: updatedCategories,
//     });
//   };

//   const handleRatingChange = (rating) => {
//     const updatedRatings = filters.ratings.includes(rating)
//       ? filters.ratings.filter((r) => r !== rating)
//       : [...filters.ratings, rating];

//     setFilters({
//       ...filters,
//       ratings: updatedRatings,
//     });
//   };

//   const clearFilters = () => {
//     setFilters({
//       priceRange: [0, 5000],
//       categories: [],
//       ratings: [],
//     });
//     setSortOption("featured");
//   };

//   const toggleFilters = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   return (
//     <div className="container px-4 md:px-6 py-8 md:py-12">
//       <div className="flex flex-col space-y-4 md:space-y-8">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
//             {categoryParam
//               ? `${
//                   categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
//                 } Furniture`
//               : "All Products"}
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             {filteredProducts.length} products available
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Mobile Filter Toggle */}
//           <div className="lg:hidden flex justify-between items-center">
//             <Button
//               variant="outline"
//               onClick={toggleFilters}
//               className="flex items-center gap-2"
//             >
//               <SlidersHorizontal className="h-4 w-4" />
//               Filters
//             </Button>

//             <Select value={sortOption} onValueChange={setSortOption}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="featured">Featured</SelectItem>
//                 <SelectItem value="price-low-high">
//                   Price: Low to High
//                 </SelectItem>
//                 <SelectItem value="price-high-low">
//                   Price: High to Low
//                 </SelectItem>
//                 <SelectItem value="newest">Newest</SelectItem>
//                 <SelectItem value="rating">Highest Rated</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Filters Sidebar */}
//           <div
//             className={`lg:w-1/4 space-y-6 ${
//               isFilterOpen ? "block" : "hidden"
//             } lg:block`}
//           >
//             <div className="flex items-center justify-between lg:hidden">
//               <h3 className="font-medium">Filters</h3>
//               <Button variant="ghost" size="sm" onClick={toggleFilters}>
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-medium">Price Range</h3>
//                   <span className="text-sm text-muted-foreground">
//                     ${filters.priceRange[0]} - ${filters.priceRange[1]}
//                   </span>
//                 </div>
//                 <Slider
//                   defaultValue={[0, 5000]}
//                   max={5000}
//                   step={50}
//                   value={filters.priceRange}
//                   onValueChange={handlePriceChange}
//                   className="mt-4"
//                 />
//               </div>

//               <div>
//                 <h3 className="font-medium mb-2">Categories</h3>
//                 <div className="space-y-2">
//                   {[
//                     "Living Room",
//                     "Bedroom",
//                     "Dining",
//                     "Office",
//                     "Outdoor",
//                   ].map((category) => (
//                     <div key={category} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={`category-${category}`}
//                         checked={filters.categories.includes(category)}
//                         onCheckedChange={() => handleCategoryChange(category)}
//                       />
//                       <label
//                         htmlFor={`category-${category}`}
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         {category}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-medium mb-2">Rating</h3>
//                 <div className="space-y-2">
//                   {[4, 3, 2, 1].map((rating) => (
//                     <div key={rating} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={`rating-${rating}`}
//                         checked={filters.ratings.includes(rating)}
//                         onCheckedChange={() => handleRatingChange(rating)}
//                       />
//                       <label
//                         htmlFor={`rating-${rating}`}
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         {rating}+ Stars
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <Button
//                 variant="outline"
//                 onClick={clearFilters}
//                 className="w-full"
//               >
//                 Clear Filters
//               </Button>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="lg:w-3/4">
//             {/* Desktop Sort */}
//             <div className="hidden lg:flex justify-end mb-6">
//               <Select value={sortOption} onValueChange={setSortOption}>
//                 <SelectTrigger className="w-[200px]">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="featured">Featured</SelectItem>
//                   <SelectItem value="price-low-high">
//                     Price: Low to High
//                   </SelectItem>
//                   <SelectItem value="price-high-low">
//                     Price: High to Low
//                   </SelectItem>
//                   <SelectItem value="newest">Newest</SelectItem>
//                   <SelectItem value="rating">Highest Rated</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {filteredProducts.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//                 {filteredProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-12 text-center">
//                 <h3 className="text-lg font-medium">No products found</h3>
//                 <p className="text-muted-foreground mt-1">
//                   Try adjusting your filters
//                 </p>
//                 <Button
//                   variant="outline"
//                   onClick={clearFilters}
//                   className="mt-4"
//                 >
//                   Clear Filters
//                 </Button>
//               </div>
//             )}

//             {/* Pagination - Simple version */}
//             {filteredProducts.length > 0 && (
//               <div className="flex justify-center mt-8">
//                 <div className="flex items-center space-x-2">
//                   <Button variant="outline" size="sm" disabled>
//                     Previous
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="bg-primary text-primary-foreground"
//                   >
//                     1
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     2
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     3
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     Next
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ProductCard from "../components/product-card";
import { SlidersHorizontal, X } from "lucide-react";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Product Filters */}
      <div className="flex gap-4 mb-6">
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Checkbox id="in-stock" />
          <label htmlFor="in-stock" className="text-sm">
            In Stock Only
          </label>
        </div>

        <Slider className="w-40" min={0} max={1000} step={10} />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;

"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/category/ProductGrid";
import SortDropdown from "../components/category/SortDropdown";
import Pagination from "../components/category/Pagination";
import {
  fetchProductsByCategory,
  fetchFeaturedProducts,
  fetchNewArrivals,
} from "../services/api";

const GenericProductPage = ({ type }) => {
  const { category } = useParams(); // for /category/:category
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");

  // Determine title dynamically
  useEffect(() => {
    if (type === "category") {
      const formatted =
        category &&
        category
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      setTitle(`${formatted} Furniture`);
    } else if (type === "featured") {
      setTitle("Featured Products");
    } else if (type === "new-arrivals") {
      setTitle("New Arrivals");
    }
  }, [category, type]);

  // Fetch products dynamically based on "type"
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (type === "category") {
          response = await fetchProductsByCategory(
            category,
            pagination.page,
            pagination.limit,
            sort
          );
        } else if (type === "featured") {
          response = await fetchFeaturedProducts(
            pagination.page,
            pagination.limit,
            sort
          );
        } else if (type === "new-arrivals") {
          response = await fetchNewArrivals(
            pagination.page,
            pagination.limit,
            sort
          );
        }
        setProducts(response.products);
        setPagination(response.pagination);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, category, pagination.page, pagination.limit, sort]);

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div
        className={`py-6 text-center ${
          type === "featured"
            ? "bg-yellow-500 text-white"
            : type === "new-arrivals"
            ? "bg-primary text-white"
            : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold">{title}</h1>
        {pagination.total > 0 && (
          <p className="mt-1">{pagination.total} products found</p>
        )}
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {products.length} of {pagination.total}
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <ProductGrid products={products} loading={loading} />

        {!loading && pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericProductPage;

"use client";

import { useState, useEffect } from "react";
import ProductGrid from "../components/category/ProductGrid";
import SortDropdown from "../components/category/SortDropdown";
import Pagination from "../components/category/Pagination";
import { fetchNewArrivals } from "../services/api"; // you'll add this

const NewArrivalsPage = () => {
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

  useEffect(() => {
    const loadNewArrivals = async () => {
      setLoading(true);
      try {
        const res = await fetchNewArrivals(
          pagination.page,
          pagination.limit,
          sort
        );
        setProducts(res.products);
        setPagination(res.pagination);
      } catch (err) {
        console.error(err);
        setError("Failed to load new arrivals.");
      } finally {
        setLoading(false);
      }
    };

    loadNewArrivals();
  }, [pagination.page, pagination.limit, sort]);

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-6 text-center">
        <h1 className="text-3xl font-bold">New Arrivals</h1>
        <p className="mt-1">{pagination.total} products just arrived</p>
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

export default NewArrivalsPage;

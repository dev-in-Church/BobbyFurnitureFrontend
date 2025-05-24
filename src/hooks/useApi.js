"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for API calls with loading, error, and data states
 */
export function useApi(apiFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { immediate = true, onSuccess, onError, defaultData = null } = options;

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction(...args);
      setData(result);

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "An error occurred");

      if (onError) {
        onError(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  const refetch = () => execute();

  return {
    data,
    loading,
    error,
    execute,
    refetch,
  };
}

/**
 * Hook for paginated API calls
 */
export function usePaginatedApi(apiFunction, initialParams = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async (pageNum = 1, params = {}, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction({
        ...initialParams,
        ...params,
        page: pageNum,
      });

      const newData = result.products || result.data || [];

      if (append && pageNum > 1) {
        setData((prev) => [...prev, ...newData]);
      } else {
        setData(newData);
      }

      setPage(pageNum);
      setTotalPages(result.totalPages || 1);
      setTotalItems(result.totalProducts || result.total || newData.length);
      setHasMore(pageNum < (result.totalPages || 1));

      return result;
    } catch (err) {
      console.error("Paginated API Error:", err);
      setError(err.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      return fetchData(page + 1, {}, true);
    }
  };

  const refresh = (params = {}) => {
    return fetchData(1, params, false);
  };

  const goToPage = (pageNum, params = {}) => {
    return fetchData(pageNum, params, false);
  };

  return {
    data,
    loading,
    error,
    hasMore,
    page,
    totalPages,
    totalItems,
    loadMore,
    refresh,
    goToPage,
    fetchData,
  };
}

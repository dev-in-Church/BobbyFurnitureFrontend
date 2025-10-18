import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry twice on failure
      refetchOnWindowFocus: false, // Don’t refetch when switching browser tabs
      staleTime: 1000 * 60 * 10, // 10 minutes cache
      cacheTime: 1000 * 60 * 30, // Keep cache in memory for 30 minutes
    },
  },
});

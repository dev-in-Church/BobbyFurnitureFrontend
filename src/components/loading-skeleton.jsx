"use client";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-4 w-4 bg-gray-200 rounded"></div>
              ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-12 ml-2"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 9 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
    </div>
  );
}

export function ProductSectionSkeleton() {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="flex justify-between px-6 py-3 items-center bg-gray-200">
        <div className="h-6 bg-gray-300 rounded w-48"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="px-4 py-6">
        <div className="flex gap-4 overflow-hidden">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-[200px] min-w-[200px] bg-gray-100 rounded-lg"
              >
                <div className="h-40 bg-gray-200 rounded-t-lg"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Skeleton */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-1"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Banner Skeleton */}
      <div className="container mx-auto px-4 mb-6">
        <div className="h-60 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="hidden md:block w-72 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="mb-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="space-y-2">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="flex items-center">
                            <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-40"></div>
              </div>
            </div>
            <ProductGridSkeleton count={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header Skeleton */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="h-12 bg-blue-500 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-6">
        <div className="mb-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="hidden md:block w-72 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="mb-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="space-y-2">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="flex items-center">
                            <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Results Skeleton */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-40"></div>
              </div>
            </div>
            <ProductGridSkeleton count={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

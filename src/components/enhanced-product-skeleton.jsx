"use client";

export function ProductCardSkeleton({ className = "" }) {
  return (
    <div
      className={`w-[160px] min-w-[160px] sm:min-w-[190px] md:min-w-[200px] bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 ${className}`}
    >
      {/* Image skeleton with shimmer effect */}
      <div className="relative h-40 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer">
        {/* Discount badge skeleton */}
        <div className="absolute top-2 right-2 h-6 w-12 bg-gray-300 rounded-md animate-pulse"></div>

        {/* Image placeholder icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Quick action buttons skeleton */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 bg-white/80 backdrop-blur-sm">
          <div className="h-7 w-7 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-7 w-7 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="px-3 py-3 space-y-2">
        {/* Product name skeleton - 2 lines */}
        <div className="space-y-1">
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4"></div>
        </div>

        {/* Price skeleton */}
        <div className="flex items-baseline space-x-2 pt-1">
          <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer rounded w-16"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}

export function ProductSectionSkeleton({
  title = "Loading Products...",
  color = "blue-500",
  count = 9,
}) {
  const bgColorClass = `bg-${color}`;

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header skeleton */}
      <div
        className={`flex justify-between px-6 py-3 items-center ${bgColorClass}`}
      >
        <div className="h-5 bg-white/20 rounded w-32 animate-pulse"></div>
        <div className="h-4 bg-white/20 rounded w-16 animate-pulse"></div>
      </div>

      {/* Products skeleton grid */}
      <div className="relative px-1 py-3 bg-gray-50">
        <div className="flex gap-4 overflow-hidden px-4 py-2 pb-4">
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <ProductCardSkeleton
                key={index}
                className="animate-pulse"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12, columns = 4 }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${columns} gap-4`}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse border border-gray-200"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* Image skeleton */}
            <div className="h-56 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer relative">
              <div className="absolute top-2 right-2 h-6 w-16 bg-gray-300 rounded-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4"></div>
              </div>

              <div className="flex items-center space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                <div className="h-3 bg-gray-200 rounded w-12 ml-2 animate-pulse"></div>
              </div>

              <div className="flex items-baseline space-x-2">
                <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>

              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        ))}
    </div>
  );
}

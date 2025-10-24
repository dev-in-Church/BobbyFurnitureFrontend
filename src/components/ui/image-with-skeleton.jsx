"use client";

import { useState } from "react";

export function ImageWithSkeleton({
  src,
  alt,
  className = "",
  containerClassName = "",
  width,
  height,
  priority = false,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(!priority);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse ${className}`}
        />
      )}

      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}

export default ImageWithSkeleton;

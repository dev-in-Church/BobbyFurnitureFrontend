"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error loading wishlist:", error);
        localStorage.removeItem("wishlist");
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setIsLoading(true);

    setTimeout(() => {
      setWishlistItems((prevItems) => {
        const isAlreadyInWishlist = prevItems.some(
          (item) => item.id === product.id
        );

        if (isAlreadyInWishlist) {
          toast.info(`${product.name} is already in your wishlist`);
          return prevItems;
        } else {
          toast.success(`Added ${product.name} to wishlist`);
          return [
            ...prevItems,
            { ...product, addedAt: new Date().toISOString() },
          ];
        }
      });
      setIsLoading(false);
    }, 200);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      if (item) {
        toast.info(`Removed ${item.name} from wishlist`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.info("Wishlist cleared");
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  const moveToCart = (productId, addToCartFunction) => {
    const item = wishlistItems.find((item) => item.id === productId);
    if (item && addToCartFunction) {
      addToCartFunction(item, 1);
      removeFromWishlist(productId);
      toast.success(`Moved ${item.name} to cart`);
    }
  };

  const value = {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    moveToCart,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export { WishlistContext };

"use client";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SpecialOffers() {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  // Featured product state
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured product
  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        setLoading(true);
        const response = await axios
          .get("https://bobbyfurnitureonline.onrender.com/api/products")
          .catch(() => {
            console.log("Using mock data instead of API");
            // Mock data in case API fails
            return {
              data: [
                {
                  id: 1,
                  name: "Luxury Sofa Collection",
                  description: "Premium quality sofa for your living room",
                  price: 89999,
                  category: "Living Room",
                  subcategory: "Sofas",
                  stock: 5,
                  rating: 4.8,
                  featured: true,
                  onSale: true,
                  salePercentage: 40,
                  images: [
                    "https://via.placeholder.com/600x400?text=Luxury+Sofa",
                  ],
                  reviews: 24,
                },
                {
                  id: 2,
                  name: "Modern Dining Set",
                  description: "Elegant dining set for your home",
                  price: 65999,
                  category: "Dining",
                  subcategory: "Dining Sets",
                  stock: 3,
                  rating: 4.5,
                  featured: true,
                  onSale: true,
                  salePercentage: 30,
                  images: [
                    "https://via.placeholder.com/600x400?text=Dining+Set",
                  ],
                  reviews: 18,
                },
              ],
            };
          });

        // Process products to ensure they have originalPrice
        const processedProducts = response.data.map((product) => {
          // Create a copy of the product to avoid mutating the original
          const processedProduct = { ...product };

          // If product has originalPrice, use it
          if (product.originalPrice && product.originalPrice > product.price) {
            return processedProduct;
          }

          // If product has salePercentage, calculate originalPrice
          if (product.salePercentage && product.salePercentage > 0) {
            processedProduct.originalPrice = Math.round(
              product.price / (1 - product.salePercentage / 100)
            );
            return processedProduct;
          }

          // If product is marked as onSale but doesn't have originalPrice or salePercentage
          if (product.onSale || product.featured) {
            // Assume a reasonable discount (25-40%) for featured/sale items
            const discountPercentage = product.featured ? 40 : 25;
            processedProduct.originalPrice = Math.round(
              product.price / (1 - discountPercentage / 100)
            );
            processedProduct.salePercentage = discountPercentage;
            return processedProduct;
          }

          return processedProduct;
        });

        // Find products that are on sale (either explicitly or we calculated an originalPrice)
        const saleProducts = processedProducts.filter(
          (product) =>
            product.originalPrice && product.originalPrice > product.price
        );

        if (saleProducts.length > 0) {
          // Sort by discount percentage (highest first)
          saleProducts.sort((a, b) => {
            const discountA = (a.originalPrice - a.price) / a.originalPrice;
            const discountB = (b.originalPrice - b.price) / b.originalPrice;
            return discountB - discountA;
          });

          setFeaturedProduct(saleProducts[0]);
        } else if (processedProducts.length > 0) {
          // If no sale products, just use the first product and add a discount
          const firstProduct = { ...processedProducts[0] };
          firstProduct.originalPrice = Math.round(firstProduct.price * 1.4); // 40% markup
          firstProduct.salePercentage = 30;
          setFeaturedProduct(firstProduct);
        }
      } catch (err) {
        console.error("Error fetching featured product:", err);
        setError("Failed to load featured product");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProduct();
  }, []);

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Reset timer when it reaches zero
                days = 3;
                hours = 8;
                minutes = 45;
                seconds = 30;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time with leading zeros
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  // Calculate discount percentage
  const calculateDiscount = (original, current) => {
    if (!original || !current || original <= current) return 0;
    return Math.round((1 - current / original) * 100);
  };

  // Get discount percentage from product
  const getDiscountPercentage = (product) => {
    if (!product) return 40; // Default discount

    if (product.salePercentage) {
      return product.salePercentage;
    }

    if (product.originalPrice && product.price) {
      return calculateDiscount(product.originalPrice, product.price);
    }

    return 40; // Default discount
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 py-16">
      <div className="container px-4">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Left Column - Offer Details */}
          <div className="space-y-6">
            <Badge className="bg-primary text-white px-3 py-1.5">
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              End of Season Sale
            </h2>
            <p className="text-lg text-muted-foreground">
              Get up to{" "}
              {featuredProduct ? getDiscountPercentage(featuredProduct) : 40}%
              off on this furniture item. Hurry, offer ends soon!
            </p>

            {/* Countdown Timer */}
            <div className="flex gap-4 my-8">
              <div className="flex flex-col items-center">
                <div className="bg-background w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md">
                  {formatTime(timeLeft.days)}
                </div>
                <span className="text-sm mt-1 text-muted-foreground">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-background w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md">
                  {formatTime(timeLeft.hours)}
                </div>
                <span className="text-sm mt-1 text-muted-foreground">
                  Hours
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-background w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md">
                  {formatTime(timeLeft.minutes)}
                </div>
                <span className="text-sm mt-1 text-muted-foreground">
                  Minutes
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-background w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md">
                  {formatTime(timeLeft.seconds)}
                </div>
                <span className="text-sm mt-1 text-muted-foreground">
                  Seconds
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sale">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop the Sale
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  View All Products
                </Button>
              </Link>
            </div>

            {/* Offer Details */}
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                Offer valid until stocks last. Terms and conditions apply.
              </span>
            </div>
          </div>

          {/* Right Column - Featured Sale Item */}
          <div className="relative">
            {loading ? (
              <div className="bg-background rounded-lg shadow-xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">
                  Loading featured product...
                </p>
              </div>
            ) : error ? (
              <div className="bg-background rounded-lg shadow-xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-red-500 mb-4">{error}</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : featuredProduct ? (
              <div className="relative rounded-lg  shadow-xl">
                <img
                  src={
                    featuredProduct.images?.[0] || "/images/sale-furniture.png"
                  }
                  alt={`Special offer on ${featuredProduct.name}`}
                  className="w-full h-auto object-cover aspect-[4/3]"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Special+Offer";
                  }}
                />

                {/* Overlay with product details */}
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {featuredProduct.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className="text-2xl font-bold text-primary">
                      Ksh. {featuredProduct.price.toLocaleString()}
                    </span>
                    {featuredProduct.originalPrice && (
                      <>
                        <span className="ml-2 text-lg line-through text-muted-foreground">
                          Ksh. {featuredProduct.originalPrice.toLocaleString()}
                        </span>
                        <Badge className="ml-2 text-[12px] bg-red-500 text-white">
                          {getDiscountPercentage(featuredProduct)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                  <Link
                    to={`/products/${featuredProduct.id}`}
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                {/* Sale Badge */}
                <div className="absolute -top-1 left-2 md:-left-32 hidden md:flex items-center justify-center md:transform md:rotate-[23deg] h-20 w-20 md:h-48 md:w-48">
                  <img src="/sdisc.png" alt="" />
                </div>
              </div>
            ) : (
              <div className="bg-background rounded-lg shadow-xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">
                  No featured products available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

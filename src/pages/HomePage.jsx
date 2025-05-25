"use client";

import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/product-section";
import {
  FurnitureBanner,
  FurnitureGrid,
} from "../components/auxiliary-sections";
import InfoSection from "../components/info-section";

export default function HomeEnhanced() {
  // Sample furniture data for different categories
  const livingRoom = [
    {
      id: 1,
      name: "Modern Sectional Sofa",
      price: 899.99,
      originalPrice: 1299.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 2,
      name: "Coffee Table with Storage",
      price: 249.99,
      originalPrice: 349.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 3,
      name: "Floor Lamp with Adjustable Light",
      price: 89.99,
      originalPrice: 129.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 4,
      name: "TV Stand with Media Storage",
      price: 199.99,
      originalPrice: 279.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 5,
      name: "Accent Chair",
      price: 249.99,
      originalPrice: 349.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 6,
      name: "Side Table with Drawer",
      price: 129.99,
      originalPrice: 179.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 7,
      name: "Wall Shelving Unit",
      price: 159.99,
      originalPrice: 219.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 8,
      name: "Area Rug 5x8",
      price: 199.99,
      originalPrice: 299.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 9,
      name: "Recliner Chair",
      price: 399.99,
      originalPrice: 599.99,
      image: "/placeholder.png?height=200&width=200",
    },
  ];

  const bedroom = [
    {
      id: 1,
      name: "Queen Platform Bed Frame",
      price: 349.99,
      originalPrice: 499.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 2,
      name: "Memory Foam Mattress (Queen)",
      price: 599.99,
      originalPrice: 899.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 3,
      name: "6-Drawer Dresser",
      price: 279.99,
      originalPrice: 399.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 4,
      name: "Nightstand with USB Charging",
      price: 129.99,
      originalPrice: 179.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 5,
      name: "Wardrobe Cabinet",
      price: 399.99,
      originalPrice: 599.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 6,
      name: "Bedside Lamp Set",
      price: 79.99,
      originalPrice: 119.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 7,
      name: "Full-Length Mirror",
      price: 89.99,
      originalPrice: 129.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 8,
      name: "Bedroom Bench",
      price: 149.99,
      originalPrice: 199.99,
      image: "/placeholder.png?height=200&width=200",
    },
  ];

  const diningRoom = [
    {
      id: 1,
      name: "Dining Table Set (6 Chairs)",
      price: 799.99,
      originalPrice: 1199.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 2,
      name: "Kitchen Island with Stools",
      price: 449.99,
      originalPrice: 649.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 3,
      name: "China Cabinet",
      price: 599.99,
      originalPrice: 799.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 4,
      name: "Bar Cart",
      price: 159.99,
      originalPrice: 229.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 5,
      name: "Buffet Server",
      price: 349.99,
      originalPrice: 499.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 6,
      name: "Pendant Lighting Fixture",
      price: 129.99,
      originalPrice: 179.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 7,
      name: "Set of 4 Dining Chairs",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 8,
      name: "Extendable Dining Table",
      price: 499.99,
      originalPrice: 699.99,
      image: "/placeholder.png?height=200&width=200",
    },
  ];

  const office = [
    {
      id: 1,
      name: "Executive Desk",
      price: 349.99,
      originalPrice: 499.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      price: 249.99,
      originalPrice: 349.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 3,
      name: "Bookshelf with 5 Shelves",
      price: 179.99,
      originalPrice: 249.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 4,
      name: "Filing Cabinet",
      price: 129.99,
      originalPrice: 179.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 5,
      name: "Desk Lamp with Wireless Charging",
      price: 69.99,
      originalPrice: 99.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 6,
      name: "Computer Desk with Hutch",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 7,
      name: "Standing Desk Converter",
      price: 159.99,
      originalPrice: 229.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 8,
      name: "Office Storage Cabinet",
      price: 219.99,
      originalPrice: 299.99,
      image: "/placeholder.png?height=200&width=200",
    },
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Modular Sectional Sofa",
      price: 1299.99,
      originalPrice: 1799.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 2,
      name: "Adjustable King Bed Frame",
      price: 899.99,
      originalPrice: 1299.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 3,
      name: "Glass Top Dining Table",
      price: 449.99,
      originalPrice: 649.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 4,
      name: "Velvet Accent Chair",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 5,
      name: "Smart Home Office Desk",
      price: 499.99,
      originalPrice: 699.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 6,
      name: "Marble Coffee Table",
      price: 349.99,
      originalPrice: 499.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 7,
      name: "Rattan Outdoor Furniture Set",
      price: 899.99,
      originalPrice: 1299.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 8,
      name: "Luxury Mattress (King)",
      price: 1199.99,
      originalPrice: 1699.99,
      image: "/placeholder.png?height=200&width=200",
    },
    {
      id: 9,
      name: "Floating Wall Shelves Set",
      price: 129.99,
      originalPrice: 179.99,
      image: "/placeholder.png?height=200&width=200",
    },
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <main className="container mx-auto min-h-screen px-1 md:px-7 lg:px-8 py-4 bg-[url('/textures/blue-snow.png')] bg-repeat">
        <div className="mx-[1.9rem] max-w-7xl  overflow-hidden">
          <HeroSection />
          <div className="pt-4 md:p-4">
            <ProductSection
              title="New Arrivals"
              products={newArrivals}
              viewMoreLink="/category/new-arrivals"
              color="green-600"
            />
          </div>
        </div>

        {/* Furniture Banner */}
        <FurnitureBanner />

        <div className="mx-auto md:mx-[1.9rem] max-w-7xl rounded-xl overflow-hidden mt-6">
          <div className="p-2 md:p-4">
            <ProductSection
              title="Living Room Furniture"
              products={livingRoom}
              viewMoreLink="/category/living-room"
              color="orange-500"
            />
          </div>
        </div>

        {/* Furniture Grid */}
        <FurnitureGrid />

        <div className="mx-auto md:mx-[1.9rem] max-w-7xl rounded-xl overflow-hidden mt-6">
          <div className="p-2 md:p-4">
            <ProductSection
              title="Bedroom Furniture"
              products={bedroom}
              viewMoreLink="/category/bedroom"
              color="blue-500"
            />
            <ProductSection
              title="Dining Room"
              products={diningRoom}
              viewMoreLink="/category/dining-room"
              color="red-500"
            />
            <ProductSection
              title="Home Office"
              products={office}
              viewMoreLink="/category/office"
              color="purple-600"
            />
          </div>
        </div>
      </main>

      {/* Info Section - Before Footer */}
      <InfoSection />
    </div>
  );
}

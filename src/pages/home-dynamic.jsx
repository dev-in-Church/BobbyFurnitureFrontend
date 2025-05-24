"use client";

import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductSectionDynamic from "../components/product-section-dynamic";
import {
  FurnitureBanner,
  FurnitureGrid,
} from "../components/auxiliary-sections";
import InfoSection from "../components/info-section";

export default function HomeDynamic() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <main className="container mx-auto min-h-screen px-2 md:px-6 lg:px-8 py-4 bg-[url('/textures/blue-snow.png')] bg-repeat">
        <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-md overflow-hidden">
          <HeroSection />
          <div className="p-2 md:p-4">
            <ProductSectionDynamic
              title="New Arrivals"
              viewMoreLink="/category/new-arrivals"
              color="green-600"
              type="new-arrivals"
              limit={9}
            />
          </div>
        </div>

        {/* Furniture Banner */}
        <FurnitureBanner />

        <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-md overflow-hidden mt-6">
          <div className="p-2 md:p-4">
            <ProductSectionDynamic
              title="Living Room Furniture"
              viewMoreLink="/category/living-room"
              color="orange-500"
              category="living-room"
              type="category"
              limit={9}
            />
          </div>
        </div>

        {/* Furniture Grid */}
        <FurnitureGrid />

        <div className="mx-auto max-w-7xl bg-white rounded-xl shadow-md overflow-hidden mt-6">
          <div className="p-2 md:p-4">
            <ProductSectionDynamic
              title="Bedroom Furniture"
              viewMoreLink="/category/bedroom"
              color="blue-500"
              category="bedroom"
              type="category"
              limit={9}
            />
            <ProductSectionDynamic
              title="Dining Room"
              viewMoreLink="/category/dining-room"
              color="red-500"
              category="dining-room"
              type="category"
              limit={9}
            />
            <ProductSectionDynamic
              title="Featured Products"
              viewMoreLink="/featured"
              color="purple-600"
              type="featured"
              limit={9}
            />
          </div>
        </div>
      </main>

      {/* Info Section - Before Footer */}
      <InfoSection />
    </div>
  );
}

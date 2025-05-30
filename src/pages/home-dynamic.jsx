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
    <div className="bg-[url('/textures/blue-snow.png')] bg-repeat">
      <main className="container mx-auto max-w-[85rem]  overflow-hidden min-h-screen px-1 md:px-7 lg:px-8 py-4 ">
        <HeroSection />
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="New Arrivals"
            viewMoreLink="/category/new-arrivals"
            color="green-600"
            type="new-arrivals"
            limit={9}
          />
        </div>

        {/* Furniture Banner */}
        <FurnitureBanner />

        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Living Room | Sectional Sofas"
            viewMoreLink="/category/living-room"
            color="orange-500"
            category="Living Room - Sectional Sofas"
            type="category"
            limit={9}
          />
          <ProductSectionDynamic
            title="Living Room | Coffe Tables"
            viewMoreLink="/category/living-room"
            color="orange-500"
            category="Living Room - Coffee Tables"
            type="category"
            limit={9}
          />
          <ProductSectionDynamic
            title="Living Room | TV Stands"
            viewMoreLink="/category/living-room"
            color="orange-500"
            category="Living Room - TV Stands"
            type="category"
            limit={9}
          />
          <ProductSectionDynamic
            title="Living Room | Accent Chairs"
            viewMoreLink="/category/living-room"
            color="orange-500"
            category="Living Room - Accent Chairs"
            type="category"
            limit={9}
          />
        </div>

        {/* Furniture Grid */}
        <FurnitureGrid />

        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Bedroom | Beds"
            viewMoreLink="/category/bedroom"
            color="blue-500"
            category="Bedroom - Beds"
            type="category"
            limit={9}
          />
          <ProductSectionDynamic
            title="Dining Room | Six Seater Dining Sets"
            viewMoreLink="/category/dining-room"
            color="red-500"
            category="Dining Room - Six seater DIning Sets"
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
      </main>

      {/* Info Section - Before Footer */}
      <InfoSection />
    </div>
  );
}

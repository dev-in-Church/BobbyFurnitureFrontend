"use client";

import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductSectionDynamic from "../components/product-section-dynamic";
import {
  FurnitureBanner,
  FurnitureGrid,
  // TwoColumnBanners, // Uncomment if needed
  // ThreeColumnGrid, // Uncomment if needed
  // FourColumnGrid, // Uncomment if needed
  // MixedLayoutGrid, // Uncomment if needed
  // HorizontalScrollGrid, // Uncomment if needed
  SingleRowGrid,
} from "../components/auxiliary-sections";
import InfoSection from "../components/info-section";
import bannerImage from "../assets/bg-banner.jpg";

export default function HomeDynamic() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen md:px-[3rem] bg-[url('/textures/wintery-sunburst.png')] bg-repeat"
      // style={{
      //   backgroundImage:
      //     window.innerWidth >= 1200 ? `url(${bannerImage})` : "none",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center top",
      // }}
    >
      <main className="container max-w-[85rem] overflow-hidden min-h-screen px-1 lg:px-8 md:px-12 py-1 sm:py-2 md:py-4 ">
        <HeroSection />
        {/* Sponsored */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Sponsored"
            viewMoreLink="/featured"
            color="blue-500"
            text="white"
            type="featured"
            limit={9}
          />
        </div>
        {/* new arrivals */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="New Arrivals"
            viewMoreLink="/category/new-arrivals"
            color="white"
            text="gray-500"
            type="new-arrivals"
            limit={9}
          />
        </div>
        {/* Furniture Banner */}
        <FurnitureBanner />
        {/* play & sleep */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Play & Sleep | Kids' Favourites"
            viewMoreLink="/category/kids-room"
            color="white"
            text="gray-500"
            category="kids-room" // This is a broader category, assuming it exists
            type="category"
            limit={9}
          />
        </div>
        {/* little comforts */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Little Comforts | Bright Picks"
            viewMoreLink="/category/kids-room-double-deckers"
            color="white"
            text="gray-500"
            category="kids-room-double-deckers" // Reverted to detailed slug
            type="category"
            limit={9}
          />
        </div>
        {/* weekly drops */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Weekly Drops | Limited Deals"
            viewMoreLink="/category/living-room-sectional-sofas"
            color="white"
            text="gray-500"
            category="living-room-sectional-sofas" // Reverted to detailed slug
            type="category"
            limit={9}
          />
        </div>
        {/* some 12-item gride here */}
        <SingleRowGrid />
        {/* sit & style */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Sit & Style | Living Room Picks"
            viewMoreLink="/category/living-room"
            color="white"
            text="gray-500"
            category="living-room" // This is a broader category, assuming it exists
            type="category"
            limit={9}
          />
        </div>
        {/* Furniture Grid */}
        <FurnitureGrid />
        {/* dine & divine */}

        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Dine divine | Table Sets"
            viewMoreLink="/category/dining-room-eight-seater-dining-sets"
            color="blue-500"
            text="white"
            category="dining-room-eight-seater-dining-sets" // Reverted to detailed slug
            type="category"
            limit={9}
          />
        </div>
      </main>
      {/* Info Section - Before Footer */}
      <InfoSection />
    </div>
  );
}

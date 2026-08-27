"use client";

import { useEffect, lazy, Suspense } from "react";
import HeroSection from "../components/HeroSection";
import ProductSectionDynamic from "../components/product-section-dynamic";
import InfoSection from "../components/info-section";
import SkeletonLoader from "../components/ui/SkeletonLoader";

// ⚡ Keep these imported normally — they're small, static, and were flickering
import DealsCategoryGrid from "../components/home/DealsCategoryGrid";
import CircularGrid from "../components/home/CircularGrid";

// 💤 Keep heavier ones lazy
const FurnitureGrid = lazy(() => import("../components/home/FurnitureGrid"));
const QuickLinks = lazy(() => import("../components/home/QuickLinks"));

export default function HomeDynamic() {
  useEffect(() => {
    window.scrollTo(0, 0);

    //  Preload the lazy ones so they never remount while scrolling
    import("../components/home/FurnitureGrid");
    import("../components/home/QuickLinks");
  }, []);

  return (
    <div className="min-h-screen bg-[#111827] lg:px-[2rem]">
      <main className="container max-w-[85rem] min-h-screen px-1 md:px-4 lg:px-12 py-1 sm:py-2 md:py-4">
        {/* 🪄 Hero Section */}
        <HeroSection />

        {/* 🛒 Sponsored */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Sponsored"
            viewMoreLink="/featured"
            color="red-600"
            text="white"
            type="featured"
            limit={9}
          />
        </div>

        {/* 🌱 New Arrivals */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="New Arrivals"
            viewMoreLink="/category/new-arrivals"
            color="green-600"
            text="white"
            type="new-arrivals"
            limit={9}
          />
        </div>

        {/* 🧩 Deals Category Grid (now stable) */}
        <DealsCategoryGrid />

        {/* 🧸 Kids' Sections */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Play & Sleep | Kids' Favourites"
            viewMoreLink="/category/kids-room"
            color="white"
            text="gray-500"
            category="kids-room"
            type="category"
            limit={9}
          />
        </div>

        <div className="mt-2">
          <ProductSectionDynamic
            title="Little Comforts | Bright Picks"
            viewMoreLink="/category/kids-room-double-deckers"
            color="white"
            text="gray-500"
            category="kids-room-double-deckers"
            type="category"
            limit={9}
          />
        </div>

        {/* 🔵 Circular Grid (now stable) */}
        <CircularGrid />

        {/* 🕓 Weekly Drops */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Weekly Drops | Limited Deals"
            viewMoreLink="/category/living-room-sectional-sofas"
            color="white"
            text="gray-500"
            category="living-room-sectional-sofas"
            type="category"
            limit={9}
          />
        </div>

        {/* 🛋️ Sit & Style */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Sit & Style | Living Room Picks"
            viewMoreLink="/category/living-room"
            color="white"
            text="gray-500"
            category="living-room"
            type="category"
            limit={9}
          />
        </div>

        {/* 🪑 Furniture Grid (still lazy but preloaded) */}
        <Suspense fallback={<SkeletonLoader rows={9} />}>
          <FurnitureGrid />
        </Suspense>

        {/* 🍽️ Dine Divine */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Dine Divine | Table Sets"
            viewMoreLink="/category/dining-room"
            color="blue-500"
            text="white"
            category="dining-room"
            type="category"
            limit={9}
          />
        </div>

        {/* 🧭 Quick Links (still lazy but preloaded) */}
        <Suspense fallback={<SkeletonLoader rows={5} />}>
          <QuickLinks />
        </Suspense>
      </main>

      {/* ℹ️ Info Section */}
      <InfoSection />
    </div>
  );
}

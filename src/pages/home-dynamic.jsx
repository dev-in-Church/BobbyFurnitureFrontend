"use client";

import { useEffect, lazy, Suspense } from "react";
import HeroSection from "../components/HeroSection";
import ProductSectionDynamic from "../components/product-section-dynamic";
import QuickLinks from "../components/home/QuickLinks";
import InfoSection from "../components/info-section";

export default function HomeDynamic() {
  return (
    <div className="bg-[#111827] bg-[url('/banners/bg_img.jpg')] bg-no-repeat bg-top">
      <main className="min-h-screen mx-auto max-w-[1170px] py-1 sm:py-2 md:py-4">
        {/* 🪄 Hero Section */}
        <HeroSection />

        {/* 🛒 Sponsored */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Sponsored"
            viewMoreLink="/featured"
            color="yellow-500"
            text="white"
            type="featured"
            limit={9}
          />
        </div>

        {/* 🌱 New Arrivals */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="New Arrivals"
            viewMoreLink="/new-arrivals"
            color="primary"
            text="white"
            type="new-arrivals"
            limit={9}
          />
        </div>

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

        <QuickLinks />
        {/* ℹ️ Info Section */}
        <InfoSection />
      </main>
    </div>
  );
}

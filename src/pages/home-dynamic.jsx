"use client";

import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductSectionDynamic from "../components/product-section-dynamic";
import {
  FurnitureBanner,
  FurnitureGrid,
  TwoColumnBanners,
  ThreeColumnGrid,
  FourColumnGrid,
  MixedLayoutGrid,
  HorizontalScrollGrid,
  SingleRowGrid,
} from "../components/auxiliary-sections";
import InfoSection from "../components/info-section";

export default function HomeDynamic() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[url('/textures/blue-snow.png')] bg-repeat md:px-[3rem]">
      <main className="container max-w-[85rem]  overflow-hidden min-h-screen px-1 lg:px-8 md:px-12 py-1 sm:py-2 md:py-4 ">
        <HeroSection />
        {/* bobby picks */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Bobby Picks"
            viewMoreLink="/category/new-arrivals"
            color="blue-600"
            text="white"
            type="new-arrivals"
            limit={9}
          />
        </div> */}

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
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div>

        {/* Furniture Banner */}
        <FurnitureBanner />

        {/* play & sleep */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Play & SLeep | Kids' Favourites"
            viewMoreLink="/category/living-room"
            color="white"
            text="gray-500"
            category="Living Room - Sectional Sofas"
            type="category"
            limit={9}
          />
        </div>

        {/* little comforts */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Little Comforts | Bright Picks"
            viewMoreLink="/category/kids-room"
            color="white"
            text="gray-500"
            category="Kids Room - Double Deckers"
            type="category"
            limit={9}
          />
        </div>

        {/* weekly drops */}
        <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Weekly Drops | Limited Deals"
            viewMoreLink="/category/living-room"
            color="white"
            text="gray-500"
            category="Living Room - Sectional Sofas"
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
            category="Living Room - Sectional Sofas"
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
            viewMoreLink="/category/bedroom"
            color="blue-500"
            text="white"
            category="Bedroom - Beds"
            type="category"
            limit={9}
          />
        </div>

        {/* mealtime magic */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Mealtime Magic | Dining Essentials"
            viewMoreLink="/category/bedroom"
            color="blue-500"
            text="white"
            category="Bedroom - Beds"
            type="category"
            limit={9}
          />
        </div> */}

        {/* family feasts */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Family Feasts | Dining Deals"
            viewMoreLink="/category/bedroom"
            color="blue-500"
            text="white"
            category="Bedroom - Beds"
            type="category"
            limit={9}
          />
        </div> */}

        {/* silder here 1 display */}

        {/* <ThreeColumnGrid /> */}

        {/* lounge luxe */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Lounge Luxe | Best Sellers"
            viewMoreLink="/category/dining-room"
            color="red-500"
            text="white"
            category="Dining Room - Six seater DIning Sets"
            type="category"
            limit={9}
          />
        </div> */}

        {/* relax in style */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Relax in Style | Sofa Deals"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* mini space */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Mini Space | Big Joy"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* furniture fiesta */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Furniture FIesta | Mega Offres"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* <TwoColumnBanners /> */}

        {/* best for less */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Best For Less | Storage Solutions"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* bobby deals 1 */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Bobby Deals | Kids' Furniture"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div>

        <FourColumnGrid /> */}

        {/* dream zone */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Dream Zone | Top Picks"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* style upgrade */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Style Upgrade | Home Picks"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* hot picks */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Hot Picks | Office Essentials"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}
        {/* mixed layout grid */}
        {/* <MixedLayoutGrid /> */}

        {/* cozy nights */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Cozy nights | Bedroom Must-Haves"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* bobby deals 2 */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Bobby Deals | Decor"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* bobby deals 2 */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Bobby Deals | Sofas & Sets"
            viewMoreLink="/featured"
            color="white"
            text="gray-500"
            type="featured"
            limit={9}
          />
        </div> */}

        {/* <HorizontalScrollGrid /> */}

        {/* sleep in comfort */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Sleep in Comfort | Bed Offers"
            viewMoreLink="/category/Bedroom - Nightstands"
            color="white"
            text="gray-500"
            category="Bedroom - Nightstands"
            type="category"
            limit={9}
          />
        </div> */}

        {/* smart buys */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Smart Buys | Space Savers"
            viewMoreLink="/category/Bedroom - Nightstands"
            color="white"
            text="gray-500"
            category="Bedroom - Nightstands"
            type="category"
            limit={9}
          />
        </div> */}

        {/* luxury looks */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Luxury Look | Budget Friendly"
            viewMoreLink="/category/Bedroom - Nightstands"
            color="white"
            text="gray-500"
            category="Bedroom - Nightstands"
            type="category"
            limit={9}
          />
        </div> */}

        {/* holiday picks */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Holiday Picks | Shoe Racks"
            viewMoreLink="/category/Bedroom - Nightstands"
            color="white"
            text="gray-500"
            category="Bedroom - Nightstands"
            type="category"
            limit={9}
          />
        </div> */}

        {/* bobby deals 4 */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Bobby Deals | Nightstands"
            viewMoreLink="/category/Bedroom - Nightstands"
            color="white"
            text="gray-500"
            category="Bedroom - Nightstands"
            type="category"
            limit={9}
          />
        </div> */}

        {/* bobby deals 5 */}
        {/* <div className="mt-2 md:mt-4">
          <ProductSectionDynamic
            title="Top Rated | Customer Favourites"
            viewMoreLink="/category/Bedroom - Nightstands"
            color="white"
            text="gray-500"
            category="Bedroom - Nightstands"
            type="category"
            limit={9}
          />
        </div> */}
      </main>

      {/* Info Section - Before Footer */}
      <InfoSection />
    </div>
  );
}

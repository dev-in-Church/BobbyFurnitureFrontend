"use client";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  Zap,
  Sofa,
  Bed,
  Utensils,
  Laptop,
  Umbrella,
  Archive,
  Palette,
  Baby,
  Bath,
} from "lucide-react";
import clsx from "clsx";
// import Link from "next/link";
import { Link } from "react-router-dom";
import CategoryPanel from "./categoryPanel";

const HeroSection = () => {
  const banners = [
    {
      id: 1,
      image: "/banners/n1.jpg?height=400&width=800&text=Banner+1",
      alt: "Banner 1",
      link: "/all-products",
    },
    {
      id: 2,
      image: "/banners/n2.gif?height=400&width=800&text=Banner+2",
      alt: "Banner 2",
      link: "/all-products",
    },
    {
      id: 3,
      image: "/banners/n3.jpg?height=400&width=800&text=Banner+3",
      alt: "Banner 3",
      link: "/all-products",
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const left = () => {
    return (
      <div>
        <categoryPanel />
      </div>
    );
  };

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 w-full h-auto lg:grid-cols-[1fr_3fr_0.95fr] gap-4">
      {/* Categories sidebar - fixed width */}
      <CategoryPanel />

      {/* Banner slider - flexible width */}
      <div className="relative bg-[url('/banners/slider.jpg')] overflow-hidden h-full rounded-sm shadow-md">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="h-full w-full flex-shrink-0">
              <Link to={banner.link}>
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="h-full w-full"
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                currentBanner === index ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => setCurrentBanner(index)}
            >
              <span className="sr-only">Banner {index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right sidebar - fixed width with two sections */}
      <div className="hidden lg:grid grid-rows-[1fr_1fr] gap-5 h-full overflow-hidden">
        {/* Top section - white box with info items */}
        <div className="flex flex-col justify-between bg-white p-3 py-5 rounded-sm shadow-md gap-4">
          {/* Help Center */}
          <Link to="/help" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <HelpCircle size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm">HELP CENTER</h3>
              <p className="text-xs text-gray-500">Guide To Customer Care</p>
            </div>
          </Link>

          {/* Top Deals */}
          <Link className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Zap size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm">TOP DEALS</h3>
              <p className="text-xs text-gray-500">LIVE NOW</p>
            </div>
          </Link>

          {/* Sell at bobby */}
          <Link className="flex items-center cursor-not-allowed">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-primary font-bold">$</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">SELL AT BOBBY</h3>
              <p className="text-xs text-gray-500">Thousands Of Visitors</p>
            </div>
          </Link>
        </div>

        {/* Bottom section - Call/WhatsApp gif */}
        <div className="flex justify-center items-center bg-white rounded-sm shadow-md">
          {/* <div className="bg-gray-300"> */}
          <img
            src="/banners/side3.gif"
            alt=""
            className="h-full w-full object-cover"
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

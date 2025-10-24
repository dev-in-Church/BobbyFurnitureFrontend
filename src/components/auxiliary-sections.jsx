"use client";

import { Link } from "react-router-dom";
import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { ImageWithSkeleton } from "./ui/image-with-skeleton";

// Single Landscape Banner Component
export function FurnitureBanner() {
  return (
    <section className="hidden w-full sm:flex justify-center overflow-hidden bg-blue-300 shadow-md">
      <ImageWithSkeleton
        src="/banners/category.gif"
        alt="Just Got Paid - Shop Now"
        className="h-full object-cover object-center w-full"
        containerClassName="w-full h-full"
        priority={true}
      />
    </section>
  );
}

// Four Column Grid
export function FourColumnGrid() {
  const items = [
    {
      image: "/sections/tv-stand.jpg",
      alt: "Sofas",
      link: "/category/sofas",
    },
    {
      image: "/sections/office-chair.jpg",
      alt: "Dining",
      link: "/category/dining",
    },
    {
      image: "/sections/sofa.jpg",
      alt: "Office",
      link: "/category/office",
    },
    {
      image: "/sections/living.jpg",
      alt: "Outdoor",
      link: "/category/outdoor",
    },
  ];

  return (
    <section className="py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((item, index) => (
            <Link key={index} to={item.link} className="group">
              <div className="rounded-lg bg-gray-100 overflow-hidden h-28 md:h-40">
                <ImageWithSkeleton
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  containerClassName="w-full h-full"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Single Row Grid (5 columns)
export function SingleRowGrid() {
  const items = [
    {
      image: "/banners/kids2.png?height=150&width=240",
      alt: "Item 1",
      link: "/category/kids-room",
    },
    {
      image: "/banners/tv-stand.jpeg?height=150&width=240",
      alt: "Item 2",
      link: "/category/tv-stand",
    },
    {
      image: "/banners/shoe-rack.jpeg?height=150&width=240",
      alt: "Item 3",
      link: "/category/shoe-rack",
    },
    {
      image: "/banners/dining2.jpeg?height=150&width=240",
      alt: "Item 4",
      link: "/category/dining-room",
    },
  ];

  return (
    <section className="py-2 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((item, index) => (
            <Link key={index} to={item.link} className="group">
              <div className="rounded-lg bg-gray-100 overflow-hidden h-24 md:h-48">
                <ImageWithSkeleton
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  containerClassName="w-full h-full"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Service Features Section
export function ServiceFeatures() {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Free Delivery",
      description: "Free delivery on orders over KSh 10,000",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Secure Payment",
      description: "100% secure payment methods",
      bgColor: "bg-green-50",
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-orange-600" />,
      title: "Easy Returns",
      description: "30-day return policy",
      bgColor: "bg-orange-50",
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-8 bg-white rounded-lg mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div
                className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

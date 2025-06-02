"use client";
import { Link } from "react-router-dom";

// Single Landscape Banner Component
export function FurnitureBanner() {
  return (
    <section className="mt-2 md:mt-4">
      <div className="">
        <div className="rounded-lg overflow-hidden h-40 md:h-60">
          <img
            src="/banners/banner.jpg?height=400&width=1200"
            alt="banner"
            className="w-full h-full object-fill"
          />
        </div>
      </div>
    </section>
  );
}

// Grid Layout Component
export function FurnitureGrid() {
  const categories = [
    {
      name: "Flash Sales",
      image: "/flash-sale.gif?height=150&width=150",
      link: "/flash-sales",
      bgColor: "bg-red-500",
    },
    {
      name: "Living Room",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/living-room",
      bgColor: "bg-blue-500",
    },
    {
      name: "Bedroom Sets",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/bedroom",
      bgColor: "bg-purple-500",
    },
    {
      name: "Dining Room",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/dining-room",
      bgColor: "bg-green-500",
    },
    {
      name: "New Arrivals",
      image: "/new-arrivals.png?height=150&width=150",
      link: "/new-arrivals",
      bgColor: "bg-orange-500",
    },
    {
      name: "Home Office",
      image: "/banners/bottom.jpg?height=150&width=150",
      link: "/category/office",
      bgColor: "bg-indigo-500",
    },
    {
      name: "Outdoor Furniture",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/outdoor",
      bgColor: "bg-teal-500",
    },
    {
      name: "Storage Solutions",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/storage",
      bgColor: "bg-cyan-500",
    },
    {
      name: "Kids Furniture",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/kids",
      bgColor: "bg-pink-500",
    },
    {
      name: "Mattresses",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/mattresses",
      bgColor: "bg-emerald-500",
    },
    {
      name: "Home Decor",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/decor",
      bgColor: "bg-yellow-500",
    },
    {
      name: "Clearance Sale",
      image: "/placeholder.png?height=150&width=150",
      link: "/clearance",
      bgColor: "bg-rose-500",
    },
  ];

  return (
    <section className="py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="group overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div
                className={`bg-gray-100 h-[10rem] sm:h-[11rem] md:h-48 rounded-lg flex items-center justify-center relative overflow-hidden`}
              >
                <img
                  src={category.image || "/placeholder.png"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-2 text-center">
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

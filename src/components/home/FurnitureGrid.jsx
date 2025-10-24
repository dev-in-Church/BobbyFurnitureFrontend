import React from "react";
import { Link } from "react-router-dom";
import { ImageWithSkeleton } from "../ui/image-with-skeleton";

const categories = [
  {
    name: "Flash Sales",
    image: "/flash-sale.jpg?height=150&width=150",
    link: "/flash-sales",
    bgColor: "bg-red-500",
  },
  {
    name: "Living Room",
    image: "/banners/living-room.jpeg?height=150&width=150",
    link: "/category/living-room",
    bgColor: "bg-blue-500",
  },
  {
    name: "Bedroom Sets",
    image: "/banners/bedroom.jpeg?height=150&width=150",
    link: "/category/bedroom",
    bgColor: "bg-purple-500",
  },
  {
    name: "Dining Room",
    image: "/banners/dining.jpeg?height=150&width=150",
    link: "/category/dining-room",
    bgColor: "bg-green-500",
  },
  {
    name: "New Arrivals",
    image: "/new.jpg?height=150&width=150",
    link: "/category/new-arrivals",
    bgColor: "bg-orange-500",
  },
  {
    name: "Kids Room",
    image: "/banners/kids.jpeg?height=150&width=150",
    link: "/category/kids-room",
    bgColor: "bg-indigo-500",
  },
];

function FurnitureGrid() {
  return (
    <section className="py-4 sm:py-6 bg-white rounded-sm">
      <div className="px-2 sm:px-4">
        <div
          className="
            grid 
            grid-cols-2
            xs:grid-cols-3
            sm:grid-cols-4
            md:grid-cols-5
            lg:grid-cols-6
            gap-2 sm:gap-3 md:gap-4
          "
        >
          {categories.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.link}
                className="
                  group 
                  flex flex-col items-center text-center 
                  transition-transform duration-200
                  hover:scale-105
                  active:scale-95
                "
              >
                <div
                  className="
                    relative 
                    w-full 
                    aspect-square
                    rounded-lg
                    overflow-hidden
                    bg-white
                    shadow-sm hover:shadow-md
                    transition-shadow duration-200
                    flex items-center justify-center
                  "
                >
                  <ImageWithSkeleton
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                    width={150}
                    height={150}
                  />
                </div>

                <h3 className="mt-2 text-xs sm:text-sm font-medium text-gray-600 line-clamp-2 px-1 leading-tight">
                  {item.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default React.memo(FurnitureGrid);

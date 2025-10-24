import React from "react";
import { Link } from "react-router-dom";
import { ImageWithSkeleton } from "../ui/image-with-skeleton";

const categories = [
  {
    name: "Best seller",
    image: "/best-seller.jpg",
    link: "/best-seller",
  },
  {
    name: "Decor",
    image: "/banners/decor.jpg",
    link: "/category/decor",
  },
  {
    name: "Matresses",
    image: "/banners/matress.jpeg",
    link: "/category/matresses",
  },
  {
    name: "Office Deals",
    image: "/sections/office-chair.jpg",
    link: "/category/fashion",
  },
  {
    name: "Storage Solutions",
    image: "/banners/storage.jpeg",
    link: "/category/storage",
  },
  {
    name: "Outdoor",
    image: "/banners/outdoor.jpeg",
    link: "/category/outdoor",
  },
];

function CircularGrid() {
  return (
    <section className="py-4 sm:py-6">
      <div className="px-2 sm:px-4">
        <div
          className="
        flex overflow-x-auto gap-3 sm:gap-4
        sm:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6
        snap-x snap-mandatory
        scroll-smooth
        scrollbar-hide
        p-2
        will-change-transform
      "
        >
          {categories.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="
            group 
            flex-shrink-0
            w-28 xs:w-32 sm:w-auto
            flex flex-col items-center text-center
            transition-transform duration-200
            hover:scale-105
            active:scale-95
            snap-start
          "
            >
              <div
                className="
              relative 
              w-full 
              aspect-square
              rounded-full
              overflow-hidden
              bg-gray-100
              shadow-sm hover:shadow-md
              transition-shadow duration-200
              flex items-center justify-center
            "
              >
                <ImageWithSkeleton
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full"
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

export default React.memo(CircularGrid);

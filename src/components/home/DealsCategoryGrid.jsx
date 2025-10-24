import React from "react";
import { Link } from "react-router-dom";
import { ImageWithSkeleton } from "../ui/image-with-skeleton";

const categories = [
  {
    name: "TV-stand deals",
    image: "/sections/tv-stand.jpg",
    link: "/category/tv-stands",
  },
  {
    name: "Dining Sets",
    image: "/sections/dining.jpg",
    link: "/category/dining",
  },
  {
    name: "Sofa Deals",
    image: "/sections/sofa.jpg",
    link: "/category/sofa",
  },
  {
    name: "Office Chairs",
    image: "/sections/office-chair.jpg",
    link: "/category/office-chair",
  },
  {
    name: "3-Seater",
    image: "/sections/living.jpg",
    link: "/category/3-seater",
  },
  {
    name: "Shoe Racks",
    image: "/sections/shoe-rack.jpg",
    link: "/category/shoe-racks",
  },
  {
    name: "kid Beds",
    image: "/sections/kids-bed.jpg",
    link: "/category/kid-beds",
  },
  {
    name: "Office Desks",
    image: "/sections/office-desk.jpg",
    link: "/category/office-desks",
  },
  {
    name: "Queen beds",
    image: "/sections/queen-bed.jpg",
    link: "/category/queen-beds",
  },
  {
    name: "Double Beds",
    image: "/sections/double-bed.jpg",
    link: "/category/double-decker",
  },
  {
    name: "Recliners Deals",
    image: "/sections/recliner.jpg",
    link: "/category/recliners",
  },
  {
    name: "Conference Tables",
    image: "/sections/conference-table.jpg",
    link: "/category/conference-tables",
  },
];

function DealsCategoryGrid() {
  return (
    <section className="py-4 sm:py-6">
      <div className="px-2 sm:px-4">
        <div
          className="
        flex overflow-x-auto gap-3 sm:gap-4
        sm:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6
        snap-x snap-mandatory
        scrollbar-hide
        scroll-smooth
        pb-2
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
            w-32 xs:w-36 sm:w-auto
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
              rounded-lg
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
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>

              <h3 className="mt-2 text-xs sm:text-sm font-medium text-gray-600 line-clamp-2 px-1 leading-tight">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(DealsCategoryGrid);

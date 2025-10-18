import React from "react";
import { Link } from "react-router-dom";

const linkCategories = [
  {
    title: "Shop by Room",
    links: [
      { name: "Living Room", url: "/category/living-room" },
      { name: "Bedroom", url: "/category/bedroom" },
      { name: "Dining Room", url: "/category/dining-room" },
      { name: "Home Office", url: "/category/office" },
      { name: "Kids Room", url: "/category/kids" },
    ],
  },
  {
    title: "Popular Categories",
    links: [
      { name: "Sofas & Couches", url: "/category/sofas" },
      { name: "Beds & Mattresses", url: "/category/beds" },
      { name: "Dining Tables", url: "/category/dining-tables" },
      { name: "Office Chairs", url: "/category/office-chairs" },
      { name: "Storage Solutions", url: "/category/storage" },
    ],
  },
  {
    title: "Special Offers",
    links: [
      { name: "Flash Sales", url: "/flash-sales" },
      { name: "Clearance", url: "/clearance" },
      { name: "New Arrivals", url: "/new-arrivals" },
      { name: "Best Sellers", url: "/best-sellers" },
      { name: "Weekly Deals", url: "/weekly-deals" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { name: "Help Center", url: "/help" },
      { name: "Track Order", url: "/track-order" },
      { name: "Returns", url: "/returns" },
      { name: "Contact Us", url: "/contact" },
      { name: "Size Guide", url: "/size-guide" },
    ],
  },
];

function QuickLinks() {
  return (
    <section className="py-8 bg-gray-50 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {linkCategories.map((category, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-800 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(QuickLinks);

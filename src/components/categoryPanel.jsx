"use client";

import { useState } from "react";
import {
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
import { Link } from "react-router-dom";

// 🧩 Move category data outside to make it exportable/reusable
import { categories } from "../lib/categoryData";

const CategoryItem = ({ category, isActive, setActiveCategory }) => (
  <li
    className={clsx("relative h-full", {
      "text-primary": isActive,
    })}
    onMouseEnter={() => setActiveCategory(category.id)}
    onMouseLeave={() => setActiveCategory(null)}
  >
    <Link
      to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="flex items-center px-4"
    >
      <span className="mr-3 w-6 text-center">{category.icon}</span>
      <span className="text-sm">{category.name}</span>
    </Link>
  </li>
);

const SubcategoriesPanel = ({ category, setActiveCategory }) => {
  if (!category || category.subcategories.length === 0) return null;

  return (
    <div
      className="absolute bg-white overflow-y-auto grid grid-cols-3 gap-6 top-0 left-[218px] border border-gray-200 z-50 w-[720px] h-full p-4 rounded-r-sm shadow-md"
      onMouseEnter={() => setActiveCategory(category.id)}
      onMouseLeave={() => setActiveCategory(null)}
    >
      {category.subcategories.map((subcategory, index) => (
        <div key={index} className="space-y-1">
          <h3 className="font-bold text-sm text-gray-700 underline">
            {subcategory.title}
          </h3>
          <ul>
            {subcategory.items.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const CategoryPanel = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const activeCategoryData = categories.find(
    (cat) => cat.id === activeCategory
  );

  return (
    <div className="relative hidden lg:block bg-white rounded-sm h-full shadow-md">
      <ul className="flex flex-col h-full py-3 justify-between">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            setActiveCategory={setActiveCategory}
          />
        ))}
      </ul>

      {activeCategory && (
        <SubcategoriesPanel
          category={activeCategoryData}
          setActiveCategory={setActiveCategory}
        />
      )}
    </div>
  );
};

export default CategoryPanel;

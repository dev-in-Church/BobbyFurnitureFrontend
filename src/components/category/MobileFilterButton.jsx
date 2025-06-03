"use client";
import { SlidersHorizontal, X } from "lucide-react";

const MobileFilterButton = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-white border rounded-md px-4 py-2 shadow-sm"
    >
      {isOpen ? (
        <>
          <X size={18} />
          <span>Close Filters</span>
        </>
      ) : (
        <>
          <SlidersHorizontal size={18} />
          <span>Filter & Sort</span>
        </>
      )}
    </button>
  );
};

export default MobileFilterButton;

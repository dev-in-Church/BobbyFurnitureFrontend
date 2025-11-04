// components/Banner.jsx
import React from "react";

const Banner = () => {
  return (
    <div className="w-full flex justify-center overflow-hidden bg-[#111827]">
      <a href="/all-products" className="block">
        <img
          src="/banners/b_friday.gif"
          alt="Just Got Paid - Shop Now"
          className="h-full object-cover object-center"
        />
      </a>
    </div>
  );
};

export default Banner;

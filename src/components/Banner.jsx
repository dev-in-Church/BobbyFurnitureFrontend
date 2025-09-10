// components/Banner.jsx
import React from "react";

const Banner = () => {
  return (
    <div className="w-full flex justify-center overflow-hidden bg-blue-400">
      <a href="/all-products" className="block">
        <img
          src="/banners/promo.gif"
          alt="Just Got Paid - Shop Now"
          className="h-full object-cover object-center"
        />
      </a>
    </div>
  );
};

export default Banner;

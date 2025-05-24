// components/Banner.jsx
import React from "react";

const Banner = () => {
  return (
    <div className="w-full  overflow-hidden">
      <a href="/products" className="block">
        <img
          src="/bobby_may.gif"
          alt="Just Got Paid - Shop Now"
          className="w-full h-auto"
        />
      </a>
    </div>
  );
};

export default Banner;

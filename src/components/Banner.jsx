// components/Banner.jsx
import React from "react";

const Banner = () => {
  return (
    <div className="w-full overflow-hidden">
      <a href="/all-products" className="block">
        <img
          src="/banners/promo3.gif"
          alt="Just Got Paid - Shop Now"
          className="h-full w-full object-cover object-center"
        />
      </a>
    </div>
  );
};

export default Banner;

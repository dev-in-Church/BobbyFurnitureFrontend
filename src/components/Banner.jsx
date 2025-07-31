// components/Banner.jsx
import React from "react";

const Banner = () => {
  return (
    <div className="w-full flex justify-center overflow-hidden bg-[url('/textures/wintery-sunburst.png')] bg-repeat">
      <a href="/all-products" className="block">
        <img
          src="/banners/host_in_style.gif"
          alt="Just Got Paid - Shop Now"
          className="h-full object-cover object-center"
        />
      </a>
    </div>
  );
};

export default Banner;

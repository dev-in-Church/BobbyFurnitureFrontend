import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import discountAnimation from "../assets/discount.json"; // Ensure you have the JSON file in your assets folder
import { FaShoppingCart, FaCouch, FaStar } from "react-icons/fa";

const DiscountBanner = () => {
  return (
    <div className="relative flex items-center mt-20  justify-center mx-3 p-2 bg-red-500 text-white rounded-2xl shadow-lg animate-fadeIn z-40">
      {/* Animated Icon */}
      <div className="absolute left-2 bottom-3 w-[170px] h-[45px] mr-4">
        <Player autoplay loop src={discountAnimation} className="w-[] h-md" />
      </div>

      {/* Discount Message */}
      <div className="text-center flex flex-col justify-center items-center py-2">
        <h1 className="text-3xl flex font-bold">
          <FaStar className="text-orange-400 m-2" /> 25% OFF on All Products!{" "}
          <FaStar className="text-orange-400 m-2" />
        </h1>
        <p className="text-lg pt-2">
          Limited time offer. Shop now and save big!
        </p>
        <a
          href="/products"
          className="mt-4 flex bg-white w-[150px] text-red-500 px-6 py-2 rounded-lg font-semibold transition hover:bg-red-100"
        >
          <FaShoppingCart className="mr-2" />
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default DiscountBanner;

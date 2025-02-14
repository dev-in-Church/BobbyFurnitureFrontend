import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "animate.css"; // Importing Animate.css
import HeroSection from "../components/HeroSection";
import ProductShowcase from "../components/ProductsShowcase";
import AboutSection from "../components/AboutSection";
// import DiscountBanner from "../components/DiscountBanner";
// import TestimonialsSection from "../components/TestimonialsSection";

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      {/* <DiscountBanner /> */}
      <HeroSection />
      <AboutSection />
      {/* <ProductShowcase /> */}
      {/* <TestimonialsSection /> */}
    </main>
  );
};

export default Home;

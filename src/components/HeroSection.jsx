import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaInfoCircle,
  FaCouch,
  FaTruck,
  FaStar,
  FaBox,
  FaBoxOpen,
} from "react-icons/fa"; // Importing icons
import ProductShowcase from "./ProductsShowcase";

const images = [
  "/images/hero1.png",
  "/images/hero2.png",
  "/images/hero3.png",
  "/images/hero4.png",
  "/images/hero5.png",
  "/images/hero6.png",
  "/images/hero7.png",
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Image Animation */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence>
            <motion.img
              key={images[index]} // Ensures correct animation when changing images
              src={images[index]}
              alt="Furniture Showcase"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }} // Smoother fade & zoom transition
            />
          </AnimatePresence>
        </div>

        {/* Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-20 py-20 flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              Elevate Your Home <br />
              <span className="text-blue-500">With Stunning Furniture</span>
            </h1>
            <p className="mt-4 text-lg text-white drop-shadow-lg">
              Discover premium furniture designs tailored to match your style
              and comfort. Create the perfect ambiance for your living space.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Link
                to="/products"
                className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-md"
              >
                <FaShoppingCart className="mr-2" /> Shop Now
              </Link>
              <Link
                // onClick={(onscroll) => window.scrollTo({ down: 0 }, 1000)}
                onClick={scrollToSection}
                to=""
                className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300 transform hover:scale-105 shadow-md"
              >
                <FaBoxOpen className="mr-2" /> Latest Products
              </Link>

              <Link
                to="/about-us"
                className="flex items-center justify-center bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-400 transition duration-300 transform hover:scale-105 shadow-md"
              >
                <FaInfoCircle className="mr-2" /> Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <FaCouch className="text-blue-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Premium Quality
              </h3>
              <p className="text-gray-600 mt-2">
                Crafted with high-quality materials ensuring durability &
                elegance.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <FaTruck className="text-blue-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Fast & Free Delivery
              </h3>
              <p className="text-gray-600 mt-2">
                Enjoy quick and free delivery for all our premium furniture
                pieces.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <FaStar className="text-blue-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Highly Rated
              </h3>
              <p className="text-gray-600 mt-2">
                Thousands of happy customers have rated us 5 stars for our
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-gray-600 italic">
                "Absolutely love the furniture! The quality is outstanding and
                delivery was seamless!"
              </p>
              <h4 className="text-gray-800 font-semibold mt-4">— Jane Doe</h4>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-gray-600 italic">
                "Stylish and comfortable. My living room has never looked
                better!"
              </p>
              <h4 className="text-gray-800 font-semibold mt-4">— John Smith</h4>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-gray-600 italic">
                "Excellent customer service and fast shipping. Highly
                recommend!"
              </p>
              <h4 className="text-gray-800 font-semibold mt-4">
                — Emma Johnson
              </h4>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action (CTA) */}
      <section
        // ref={sectionRef}
        className="bg-blue-500 py-16 text-center text-white"
      >
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg mt-4">
            Browse our collection today and find the perfect piece for your
            home.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-white text-blue-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-md"
          >
            Explore Now
          </Link>
        </div>
      </section>
      <section ref={sectionRef}>
        <ProductShowcase />
      </section>
    </>
  );
};

export default HeroSection;

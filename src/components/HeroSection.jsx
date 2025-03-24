// import { Link } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaShoppingCart,
//   FaInfoCircle,
//   FaCouch,
//   FaTruck,
//   FaStar,
//   FaBox,
//   FaBoxOpen,
// } from "react-icons/fa"; // Importing icons
// import ProductShowcase from "./ProductsShowcase";
// import DiscountBanner from "./DiscountBanner";

// const images = [
//   "/images/hero1.png",
//   "/images/hero2.png",
//   "/images/hero3.png",
//   "/images/hero4.png",
//   "/images/hero5.png",
//   "/images/hero6.png",
//   "/images/hero7.png",
// ];

// const HeroSection = () => {
//   const [index, setIndex] = useState(0);
//   const sectionRef = useRef(null);

//   const scrollToSection = () => {
//     sectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       {/* <section className="relative py-12 mt-[60px]  w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
//         <DiscountBanner />
//         {/* Background Image Animation
//         <div className="absolute inset-0 w-full h-full">
//           <AnimatePresence>
//             <motion.img
//               key={images[index]} // Ensures correct animation when changing images
//               src={images[index]}
//               alt="Furniture Showcase"
//               className="absolute inset-0 w-full h-full object-cover"
//               initial={{ opacity: 0, scale: 1.1 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 1.1 }}
//               transition={{ duration: 1.5, ease: "easeInOut" }} // Smoother fade & zoom transition
//             />
//           </AnimatePresence>
//         </div>

//         {/* Overlay for Better Readability
//         <div className="absolute inset-0 bg-black/40"></div>

//         {/* Hero Content
//         <div className="relative z-10 container mx-auto px-6 lg:px-20 py-20 flex flex-col lg:flex-row items-center">
//           {/* Text Content
//           <div className="mb-10 lg:mb-0 text-center ">
//             <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
//               Elevate Your Home <br />
//               <span className="text-blue-500">With Stunning Furniture</span>
//             </h1>
//             <p className="mt-4 text-sm sm:text-lg text-white drop-shadow-lg">
//               Discover premium furniture designs tailored to match your style
//               and comfort. Create the perfect ambiance for your living space.
//             </p>
//             <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//               <Link
//                 to="/products"
//                 className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-md"
//               >
//                 <FaShoppingCart className="mr-2" /> Shop Now
//               </Link>
//               <Link
//                 // onClick={(onscroll) => window.scrollTo({ down: 0 }, 1000)}
//                 onClick={scrollToSection}
//                 to=""
//                 className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300 transform hover:scale-105 shadow-md"
//               >
//                 <FaBoxOpen className="mr-2" /> Latest Products
//               </Link>

//               <Link
//                 to="/about-us"
//                 className="flex items-center justify-center bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-400 transition duration-300 transform hover:scale-105 shadow-md"
//               >
//                 <FaInfoCircle className="mr-2" /> Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section> */}

//       {/* Features Section */}
//       <section className="bg-gray-100 py-16">
//         <div className="container mx-auto px-6 lg:px-20">
//           <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
//             Why Choose Us?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <div className="p-6 bg-white shadow-lg rounded-lg">
//               <FaCouch className="text-blue-500 text-6xl mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Premium Quality
//               </h3>
//               <p className="text-gray-600 mt-2">
//                 Crafted with high-quality materials ensuring durability &
//                 elegance.
//               </p>
//             </div>
//             <div className="p-6 bg-white shadow-lg rounded-lg">
//               <FaTruck className="text-blue-500 text-6xl mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Fast & Free Delivery
//               </h3>
//               <p className="text-gray-600 mt-2">
//                 Enjoy quick and free delivery for all our premium furniture
//                 pieces.
//               </p>
//             </div>
//             <div className="p-6 bg-white shadow-lg rounded-lg">
//               <FaStar className="text-blue-500 text-6xl mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Highly Rated
//               </h3>
//               <p className="text-gray-600 mt-2">
//                 Thousands of happy customers have rated us 5 stars for our
//                 service.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action (CTA) */}
//       <section
//         // ref={sectionRef}
//         className="bg-blue-500 py-16 text-center text-white"
//       >
//         <div className="container mx-auto px-6 lg:px-20">
//           <h2 className="text-3xl lg:text-4xl font-bold">
//             Ready to Transform Your Space?
//           </h2>
//           <p className="text-lg mt-4">
//             Browse our collection today and find the perfect piece for your
//             home.
//           </p>
//           <Link
//             to="/products"
//             className="mt-6 inline-block bg-white text-blue-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-md"
//           >
//             Explore Now
//           </Link>
//         </div>
//       </section>
//       <section ref={sectionRef}>
//         <ProductShowcase />
//       </section>
//     </>
//   );
// };

// export default HeroSection;

// src/components/hero.jsx
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, ShoppingCart, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Discount Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center font-medium">
        <span className="flex items-center justify-center gap-2">
          <Tag className="h-4 w-4" /> Special Offer: 25% OFF Everything! Limited
          Time Only
        </span>
      </div>

      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex mb-2">New Collection</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Transform Your Home With Elegant Furniture
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover our curated collection of premium furniture pieces
                designed to elevate your living space.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="inline-flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shop Now
              </Button>
              <Link to="/collection">
                <Button
                  variant="outline"
                  size="lg"
                  className="inline-flex items-center gap-2"
                >
                  Explore Collection
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Discount Callout */}
            <div className="mt-8 bg-muted p-6 rounded-lg border border-border relative">
              <div className="absolute -top-5 -right-4 bg-destructive text-destructive-foreground text-lg font-bold rounded-full h-16 w-16 flex items-center justify-center transform rotate-12">
                25% OFF
              </div>
              <h3 className="text-xl font-bold">Special Discount Event</h3>
              <p className="text-muted-foreground mt-2">
                Enjoy 25% off on all furniture items. Use code{" "}
                <span className="font-bold">FURNISH25</span> at checkout.
              </p>
              <Button variant="secondary" className="mt-4">
                Claim Discount
              </Button>
            </div>
          </div>

          <div className="relative lg:order-last">
            <div className="relative h-[400px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-xl">
              <img
                src="/images/hero1.png"
                alt="Modern living room furniture set"
                className="absolute inset-0 object-cover w-full h-full"
              />

              {/* Floating Price Tag */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                <p className="text-sm font-medium text-muted-foreground">
                  Premium Sofa Set
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">$1,499</span>
                  <span className="text-sm line-through text-muted-foreground">
                    $1,999
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl font-bold mb-6">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["living-room", "bedroom", "dining", "office"].map((category) => (
              <div
                key={category}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="h-[180px] bg-muted relative">
                  <img
                    src={`/images/${category}.png`}
                    alt={`${category} furniture`}
                    className="object-cover h-full w-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{category}</h3>
                    <Link
                      to={`/category/${category
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="text-sm text-primary inline-flex items-center gap-1 mt-1"
                    >
                      Browse
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

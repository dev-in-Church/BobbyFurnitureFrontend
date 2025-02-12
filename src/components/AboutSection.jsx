import { motion } from "framer-motion";
import { FaCheckCircle, FaCouch, FaLeaf, FaUsers } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            About <span className="text-blue-500">Us</span>
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Creating timeless furniture pieces for a modern lifestyle.
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-800 leading-snug">
              Our <span className="text-blue-500">Mission</span>
            </h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              We are dedicated to providing high-quality, handcrafted furniture
              that transforms spaces into elegant, comfortable homes. Our
              mission is to combine timeless designs with sustainable
              craftsmanship to deliver unmatched quality.
            </p>

            {/* Core Values */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <FaCheckCircle className="text-blue-500 text-xl" />
                <p className="text-gray-700 text-lg">
                  Exceptional Craftsmanship
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaLeaf className="text-blue-500 text-xl" />
                <p className="text-gray-700 text-lg">
                  Eco-Friendly & Sustainable Materials
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaCouch className="text-blue-500 text-xl" />
                <p className="text-gray-700 text-lg">
                  Modern & Classic Designs
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaUsers className="text-blue-500 text-xl" />
                <p className="text-gray-700 text-lg">
                  Customer-Centric Approach
                </p>
              </div>
            </div>
          </div>

          {/* Right: Animated Image Section */}
          <motion.div
            className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              src="/images/about-furniture.png"
              alt="Furniture Craftsmanship"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-700 text-lg">
            Want to explore more about our journey and collections?
          </p>
          <a
            href="/about-us"
            className="inline-block mt-4 bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

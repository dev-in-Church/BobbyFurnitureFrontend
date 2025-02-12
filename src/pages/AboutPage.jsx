import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaCouch,
  FaLeaf,
  FaUsers,
  FaTools,
  FaShoppingCart,
  FaTruck,
  FaStar,
  FaBoxOpen,
  FaSmile,
  FaHandshake,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <main className="bg-gray-100 overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero4.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          className="relative z-10 text-white px-6 lg:px-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold">
            About <span className="text-blue-500">Us</span>
          </h1>
          <p className="mt-4 text-lg lg:text-xl max-w-2xl mx-auto">
            Crafting timeless furniture with passion, sustainability, and
            excellence.
          </p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold text-gray-800">
              Our <span className="text-blue-500">Story</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Founded with a vision to redefine comfort and style, we are
              passionate about designing furniture that blends aesthetics,
              functionality, and durability. With a commitment to sustainability
              and craftsmanship, we take pride in every piece we create.
            </p>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/hero3.png"
              alt="Furniture Craftsmanship"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Our <span className="text-blue-500">Core Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCouch />,
                title: "Quality Craftsmanship",
                desc: "Every piece is made with precision and passion.",
              },
              {
                icon: <FaLeaf />,
                title: "Sustainability",
                desc: "We use eco-friendly materials and responsible sourcing.",
              },
              {
                icon: <FaUsers />,
                title: "Customer Satisfaction",
                desc: "We prioritize customer needs and comfort.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <div className="text-blue-500 text-4xl mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4">{value.title}</h3>
                <p className="text-gray-600 mt-2">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/hero5.png"
              alt="Why Choose Us"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold text-gray-800">
              Why <span className="text-blue-500">Choose Us?</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              With years of experience and a dedicated team of experts, we
              ensure that our furniture meets the highest standards of quality,
              design, and durability.
            </p>

            <div className="mt-6 space-y-4">
              {[
                {
                  icon: <FaBoxOpen />,
                  text: "Wide Range of Elegant Furniture",
                },
                { icon: <FaSmile />, text: "Top-Notch Customer Service" },
                {
                  icon: <FaHandshake />,
                  text: "Trusted by Thousands of Customers",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="text-blue-500 text-2xl">{feature.icon}</div>
                  <p className="text-gray-700 text-lg">{feature.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Our <span className="text-blue-500">Process</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaTools />,
              title: "Design & Craft",
              desc: "Our experts sketch and craft high-quality furniture pieces.",
            },
            {
              icon: <FaShoppingCart />,
              title: "Customization & Orders",
              desc: "Choose from our collection or customize your design.",
            },
            {
              icon: <FaTruck />,
              title: "Fast & Safe Delivery",
              desc: "We ensure timely and secure delivery of every order.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div className="text-blue-500 text-4xl mx-auto">{step.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Meet <span className="text-blue-500">Our Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Bobby",
                role: "CEO & Founder",
                img: "/profile.jpg",
              },
              {
                name: "Staff 2",
                role: "Head Designer",
                img: "/profile.jpg",
              },
              {
                name: "Staff 3",
                role: "Marketing Director",
                img: "/profile.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          What Our <span className="text-blue-500">Customers Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Client 1",
              review: "Absolutely love my new sofa! Amazing quality.",
              rating: 5,
            },
            {
              name: "Client 2",
              review: "Great craftsmanship and super comfortable.",
              rating: 4,
            },
            {
              name: "Client 3",
              review: "Excellent service and fast delivery!",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <p className="text-gray-600 italic">"{testimonial.review}"</p>
              <div className="mt-3 flex justify-center space-x-1 text-yellow-400">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
              <h3 className="text-lg font-semibold mt-3">{testimonial.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Showroom Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Visit Our <span className="text-gray-200">Showroom</span>
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Experience our stunning furniture collections in person. Our
            showroom is designed to inspire your home styling ideas.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-white text-blue-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
          >
            Get Directions
          </a>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;

"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sofa,
  Leaf,
  Users,
  PenToolIcon as Tool,
  ShoppingCart,
  Truck,
  Star,
  Package,
  Smile,
  HandshakeIcon as HandShake,
  Award,
  Clock,
  Heart,
  Zap,
  Compass,
  ArrowRight,
  MapPin,
} from "lucide-react";

const AboutPage = () => {
  // Initialize animations
  useEffect(() => {
    // Any additional initialization if needed
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <main className="bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative w-full h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero4.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <motion.div
          className="relative z-10 text-white px-6 lg:px-20 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-blue-400">Bobby Furniture</span>
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
            Crafting exceptional furniture with passion, precision, and a
            commitment to quality since 2015.
          </p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
            >
              Explore Our Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center text-sm font-semibold text-blue-600 mb-4">
              <div className="w-12 h-0.5 bg-blue-600 mr-2"></div>
              <span></span>
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="10" fill="#1e90ff" />
                <text
                  x="50"
                  y="68"
                  font-family="Arial"
                  font-size="60"
                  font-weight="bold"
                  fill="white"
                  text-anchor="middle"
                >
                  B
                </text>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our <span className="text-blue-600">Story</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2015, Bobby Furniture began with a simple vision: to
              create furniture that combines exceptional craftsmanship with
              contemporary design. What started as a small workshop has grown
              into a respected brand known for quality and innovation.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our journey has been defined by a relentless pursuit of
              excellence, sustainable practices, and a deep understanding of our
              customers' needs. Every piece we create tells a story of
              dedication, skill, and passion.
            </p>
            <div className="flex items-center space-x-6 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">8+</p>
                <p className="text-gray-600 text-sm mt-1">
                  Years of Experience
                </p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">1,200+</p>
                <p className="text-gray-600 text-sm mt-1">Happy Customers</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">5,000+</p>
                <p className="text-gray-600 text-sm mt-1">Furniture Pieces</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/hero3.png"
                alt="Furniture Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-100 rounded-lg -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center text-sm font-semibold text-blue-600 mb-4">
              <div className="w-12 h-0.5 bg-blue-600 mr-2"></div>
              WHAT DRIVES US
              <div className="w-12 h-0.5 bg-blue-600 ml-2"></div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our <span className="text-blue-600">Core Values</span>
            </h2>
            <p className="text-gray-600">
              At Bobby Furniture, our values guide everything we do. From design
              to delivery, these principles ensure we consistently deliver
              exceptional quality and service.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Sofa className="w-8 h-8" />,
                title: "Quality Craftsmanship",
                desc: "We meticulously craft each piece with attention to detail and premium materials for lasting beauty and durability.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Sustainability",
                desc: "We're committed to eco-friendly practices, using responsibly sourced materials and minimizing our environmental footprint.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Customer Satisfaction",
                desc: "Your happiness is our priority. We strive to exceed expectations with personalized service and exceptional products.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/hero5.png"
                alt="Why Choose Us"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-blue-100 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-100 rounded-lg -z-10"></div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center text-sm font-semibold text-blue-600 mb-4">
              <div className="w-12 h-0.5 bg-blue-600 mr-2"></div>
              OUR DIFFERENCE
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Why <span className="text-blue-600">Choose Us?</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              With years of experience and a dedicated team of experts, we
              ensure that our furniture meets the highest standards of quality,
              design, and durability. We're not just selling furniture; we're
              helping you create spaces that reflect your personality and
              enhance your lifestyle.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <Package className="w-6 h-6" />,
                  title: "Wide Range of Elegant Furniture",
                  desc: "From classic to contemporary, our diverse collection caters to every taste and need.",
                },
                {
                  icon: <Smile className="w-6 h-6" />,
                  title: "Top-Notch Customer Service",
                  desc: "Our dedicated team provides personalized assistance from selection to delivery.",
                },
                {
                  icon: <HandShake className="w-6 h-6" />,
                  title: "Trusted by Thousands of Customers",
                  desc: "Our reputation for quality and reliability has earned us loyal customers nationwide.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center text-sm font-semibold text-blue-600 mb-4">
              <div className="w-12 h-0.5 bg-blue-600 mr-2"></div>
              HOW WE WORK
              <div className="w-12 h-0.5 bg-blue-600 ml-2"></div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our <span className="text-blue-600">Process</span>
            </h2>
            <p className="text-gray-600">
              From concept to creation to delivery, our streamlined process
              ensures a seamless experience and exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Tool className="w-8 h-8" />,
                title: "Design & Craft",
                desc: "Our expert craftsmen transform premium materials into beautiful, functional furniture pieces with meticulous attention to detail.",
                step: "01",
              },
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Customization & Orders",
                desc: "Choose from our collection or work with our designers to create custom pieces that perfectly match your vision and space.",
                step: "02",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Fast & Safe Delivery",
                desc: "Our professional delivery team ensures your furniture arrives on time and in perfect condition, with installation service available.",
                step: "03",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xl font-bold w-12 h-12 flex items-center justify-center">
                  {step.step}
                </div>
                <div className="p-8 pt-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-24 container mx-auto px-6 lg:px-20">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center text-sm font-semibold text-blue-600 mb-4">
            <div className="w-12 h-0.5 bg-blue-600 mr-2"></div>
            THE PEOPLE BEHIND OUR SUCCESS
            <div className="w-12 h-0.5 bg-blue-600 ml-2"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Meet <span className="text-blue-600">Our Team</span>
          </h2>
          <p className="text-gray-600">
            Our talented team combines creativity, expertise, and passion to
            bring your furniture dreams to life.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {[
            {
              name: "Bobby",
              role: "CEO & Founder",
              img: "/profile.jpg",
              desc: "With over 15 years of experience in furniture design and craftsmanship, Bobby leads our team with vision and passion.",
            },
            {
              name: "Sarah Johnson",
              role: "Head Designer",
              img: "/profile.jpg",
              desc: "Sarah brings contemporary design sensibilities and innovative approaches to every piece in our collection.",
            },
            {
              name: "Michael Odhiambo",
              role: "Master Craftsman",
              img: "/profile.jpg",
              desc: "Michael's exceptional woodworking skills and attention to detail ensure the highest quality in every piece we create.",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden group"
              variants={fadeIn}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.img || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <p className="text-sm">{member.desc}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center text-sm font-semibold text-blue-600 mb-4">
              <div className="w-12 h-0.5 bg-blue-600 mr-2"></div>
              TESTIMONIALS
              <div className="w-12 h-0.5 bg-blue-600 ml-2"></div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              What Our <span className="text-blue-600">Customers Say</span>
            </h2>
            <p className="text-gray-600">
              Don't just take our word for it. Here's what our satisfied
              customers have to say about their experience with Bobby Furniture.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Jane Muthoni",
                location: "Nairobi",
                review:
                  "The quality of my new dining set exceeded my expectations. The craftsmanship is exceptional, and the customer service was outstanding from start to finish.",
                rating: 5,
              },
              {
                name: "David Kimani",
                location: "Mombasa",
                review:
                  "I ordered a custom sofa, and it fits perfectly in my living room. The attention to detail and the comfort level are impressive. Highly recommended!",
                rating: 5,
              },
              {
                name: "Sarah Omondi",
                location: "Kisumu",
                review:
                  "The bedroom furniture I purchased is not only beautiful but also incredibly durable. The delivery was prompt, and the installation team was professional.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-xl p-8 relative"
                variants={fadeIn}
              >
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                  <div className="bg-blue-600 text-white p-3 rounded-full">
                    <Star className="w-6 h-6" />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center mb-1">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    {Array(5 - testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gray-300" />
                      ))}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Achievements Section */}
      <section className="py-24 container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Award className="w-8 h-8" />,
              number: "15+",
              title: "Design Awards",
            },
            {
              icon: <Clock className="w-8 h-8" />,
              number: "8+",
              title: "Years of Experience",
            },
            {
              icon: <Heart className="w-8 h-8" />,
              number: "1,200+",
              title: "Happy Customers",
            },
            {
              icon: <Zap className="w-8 h-8" />,
              number: "5,000+",
              title: "Furniture Pieces",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Showroom Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Visit Our <span className="text-gray-100">Showroom</span>
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Experience our stunning furniture collections in person. Our
                showroom is designed to inspire your home styling ideas.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="opacity-90">
                      123 Furniture Avenue, Kahawa Sukari, Nairobi, Kenya
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="opacity-90">
                      Monday - Friday: 8:00 AM - 5:00 PM
                    </p>
                    <p className="opacity-90">Saturday: 9:00 AM - 3:00 PM</p>
                    <p className="opacity-90">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
              >
                <Compass className="mr-2 h-5 w-5" />
                Get Directions
              </a>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/images/showroom.jpg"
                alt="Our Showroom"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = "/images/hero4.png"; // Fallback image
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 container mx-auto px-6 lg:px-20 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your <span className="text-blue-600">Space</span>
            ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Browse our collection or contact us to discuss your custom furniture
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Explore Products
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;

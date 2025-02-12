import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log(formData);
  };

  // Initialize AOS animations
  React.useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero2.png')" }}
        data-aos="fade-in"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white py-32">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg md:text-xl">We'd love to hear from you!</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-semibold">Get in Touch</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          If you have any questions, comments, or need more information, feel
          free to reach out to us via the contact form below.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="input-group mt-6">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="input-group mt-6">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
          >
            <FaPaperPlane className="text-lg" />
            Send Message
          </button>
        </form>
      </section>

      {/* Location Section with Map */}
      <section className="py-16 bg-gray-100" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center">Our Location</h2>
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            Come visit us at our workshop, store or office located at:
          </p>
          <p className="text-xl font-semibold mt-2">
            Kahawa Sukari, Nairobi, Kenya
          </p>
        </div>
        <div className="mt-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.342492784928!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183f4b78d25a6f9b%3A0xb26b083d7ea04f23!2sFurniture%20Shop%20XYZ!5e0!3m2!1sen!2ske!4v1673590472524"
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            title="Store Location"
          ></iframe>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-16 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-semibold">Follow Us</h2>
        <div className="mt-8 flex justify-center space-x-8">
          <a
            href="https://www.facebook.com/profile.php?id=61558829731076"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f text-3xl text-blue-600 hover:text-blue-400"></i>
          </a>
          <a
            href="https://www.instagram.com/furniture_by_bobby/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram text-3xl text-pink-600 hover:text-pink-400"></i>
          </a>
          <a
            href="https://www.youtube.com/@Furniture_by_Bobb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube text-3xl text-red-600 hover:text-red-400"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

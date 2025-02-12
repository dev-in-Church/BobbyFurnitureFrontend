import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Business Info */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo-white.png" alt="Logo" className="mb-4 w-32" />
          <p className="text-gray-400 mb-4">Bobby Furnitures</p>
          <p className="text-gray-400">Kahawa Sukari, Nairobi, Kenya</p>
          <p className="text-gray-400">Phone: +254 708 156310</p>
          <p className="text-gray-400">Email: bobbyfurnitures254@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-green-400">
                Home
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-green-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-green-400">
                Shop
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-green-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=61558829731076"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.youtube.com/@Furniture_by_Bobby"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-600"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://www.instagram.com/furniture_by_bobby/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@furniture_by_bobby"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-700"
            >
              <FaTiktok size={24} />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="px-4 py-2 w-full md:w-64 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 pt-8 mx-8 border-t-[1px] border-gray-500 text-center text-gray-400">
        <p>&copy; 2025 Bobby Furniture. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

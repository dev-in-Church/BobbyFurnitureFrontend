"use client";

import { useState } from "react";
import {
  Facebook,
  Youtube,
  Instagram,
  InstagramIcon as TiktokIcon,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // null, 'success', 'error'

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Reset states
    setEmailError("");
    setSubscriptionStatus(null);

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    // Submit form
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubscriptionStatus("success");
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setSubscriptionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img
                src="/logo4.png"
                alt="Bobby Furniture Logo"
                className="h-12 mb-4"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Crafting exceptional furniture with passion, precision, and a
                commitment to quality since 2015.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-gray-300">Kahawa Sukari, Nairobi, Kenya</p>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-gray-300">+254 708 156310</p>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-gray-300">bobbyfurnitures254@gmail.com</p>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-300">Sat: 9:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>

            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Shop", path: "/products" },
                { name: "Contact", path: "/contact" },
                { name: "Blog", path: "/blog" },
                { name: "FAQs", path: "/faqs" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>

            <ul className="space-y-3">
              {[
                {
                  name: "Custom Furniture",
                  path: "/services/custom-furniture",
                },
                { name: "Interior Design", path: "/services/interior-design" },
                {
                  name: "Furniture Restoration",
                  path: "/services/restoration",
                },
                {
                  name: "Office Furniture",
                  path: "/services/office-furniture",
                },
                { name: "Delivery & Assembly", path: "/services/delivery" },
                {
                  name: "Furniture Maintenance",
                  path: "/services/maintenance",
                },
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href={service.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Stay Connected
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>

            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to our newsletter for the latest updates, promotions,
              and design inspiration.
            </p>

            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full px-4 py-3 bg-gray-800 border ${
                    emailError ? "border-red-500" : "border-gray-700"
                  } rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400 disabled:text-gray-500 disabled:cursor-not-allowed p-1"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>

              {emailError && (
                <p className="mt-1 text-red-500 text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {emailError}
                </p>
              )}

              {subscriptionStatus === "success" && (
                <p className="mt-2 text-green-500 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Thank you for subscribing!
                </p>
              )}

              {subscriptionStatus === "error" && (
                <p className="mt-2 text-red-500 text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Failed to subscribe. Please try again.
                </p>
              )}
            </form>

            <h4 className="font-medium text-gray-200 mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61558829731076"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@Furniture_by_Bobby"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/furniture_by_bobby/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-gray-800 hover:bg-pink-600 text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@furniture_by_bobby"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="bg-gray-800 hover:bg-black text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-300"
              >
                <TiktokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Bobby Furniture. All Rights Reserved.
            </p>

            <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <a
                href="/privacy-policy"
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <span className="hidden md:inline">|</span>
              <a
                href="/terms-of-service"
                className="hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <span className="hidden md:inline">|</span>
              <a
                href="/shipping-policy"
                className="hover:text-blue-400 transition-colors"
              >
                Shipping Policy
              </a>
              <span className="hidden md:inline">|</span>
              <a
                href="/return-policy"
                className="hover:text-blue-400 transition-colors"
              >
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

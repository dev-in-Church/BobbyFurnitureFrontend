"use client";

import { Link } from "react-router-dom";
import {
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  Star,
  Clock,
  Gift,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
  Tag,
  Percent,
  Award,
  Users,
} from "lucide-react";

// Single Landscape Banner Component
export function FurnitureBanner() {
  return (
    <section className="mt-2 md:mt-4">
      <div className="">
        <div className="rounded-lg bg-gray-50 overflow-hidden h-40 md:h-60">
          <img
            src="/banners/placeholder.png?height=400&width=1200"
            alt="banner"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

// Grid Layout Component
export function FurnitureGrid() {
  const categories = [
    {
      name: "Flash Sales",
      image: "/flash-sale.gif?height=150&width=150",
      link: "/flash-sales",
      bgColor: "bg-red-500",
    },
    {
      name: "Living Room",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/living-room",
      bgColor: "bg-blue-500",
    },
    {
      name: "Bedroom Sets",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/bedroom",
      bgColor: "bg-purple-500",
    },
    {
      name: "Dining Room",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/dining-room",
      bgColor: "bg-green-500",
    },
    {
      name: "New Arrivals",
      image: "/new-arrivals.png?height=150&width=150",
      link: "/new-arrivals",
      bgColor: "bg-orange-500",
    },
    {
      name: "Home Office",
      image: "/banners/bottom.jpg?height=150&width=150",
      link: "/category/office",
      bgColor: "bg-indigo-500",
    },
    {
      name: "Outdoor Furniture",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/outdoor",
      bgColor: "bg-teal-500",
    },
    {
      name: "Storage Solutions",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/storage",
      bgColor: "bg-cyan-500",
    },
    {
      name: "Kids Furniture",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/kids",
      bgColor: "bg-pink-500",
    },
    {
      name: "Mattresses",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/mattresses",
      bgColor: "bg-emerald-500",
    },
    {
      name: "Home Decor",
      image: "/placeholder.png?height=150&width=150",
      link: "/category/decor",
      bgColor: "bg-yellow-500",
    },
    {
      name: "Clearance Sale",
      image: "/placeholder.png?height=150&width=150",
      link: "/clearance",
      bgColor: "bg-rose-500",
    },
  ];

  return (
    <section className="py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="group overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div
                className={`bg-gray-100 h-[10rem] sm:h-[11rem] md:h-48 rounded-lg flex items-center justify-center relative overflow-hidden`}
              >
                <img
                  src={category.image || "/placeholder.png"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-2 text-center">
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Two Column Banner Grid
export function TwoColumnBanners() {
  const banners = [
    {
      image: "/banners/placeholder.png?height=300&width=600",
      alt: "Special Offer",
      link: "/special-offers",
    },
    {
      image: "/banners/placeholder.png?height=300&width=600",
      alt: "New Collection",
      link: "/new-collection",
    },
  ];

  return (
    <section className="py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {banners.map((banner, index) => (
            <Link key={index} to={banner.link} className="group">
              <div className="rounded-lg bg-gray-100 overflow-hidden h-40 md:h-60">
                <img
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.alt}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Three Column Grid
export function ThreeColumnGrid() {
  const items = [
    {
      image: "/banners/placeholder.png?height=250&width=400",
      alt: "Living Room Sale",
      link: "/living-room-sale",
    },
    {
      image: "/banners/placeholder.png?height=250&width=400",
      alt: "Flash Sale",
      link: "/flash-sale",
    },
    {
      image: "/banners/placeholder.png?height=250&width=400",
      alt: "Bedroom Sets",
      link: "/bedroom-sets",
    },
  ];

  return (
    <section className="py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((item, index) => (
            <Link key={index} to={item.link} className="group">
              <div className="rounded-lg bg-gray-100 overflow-hidden h-32 md:h-48">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Four Column Grid
export function FourColumnGrid() {
  const items = [
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Sofas",
      link: "/category/sofas",
    },
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Dining",
      link: "/category/dining",
    },
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Office",
      link: "/category/office",
    },
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Outdoor",
      link: "/category/outdoor",
    },
  ];

  return (
    <section className="py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((item, index) => (
            <Link key={index} to={item.link} className="group">
              <div className="rounded-lg bg-gray-100 overflow-hidden h-28 md:h-40">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Mixed Layout Grid (1 large + 4 small)
export function MixedLayoutGrid() {
  const mainBanner = {
    image: "/banners/placeholder.png?height=400&width=600",
    alt: "Featured Collection",
    link: "/featured-collection",
  };

  const smallBanners = [
    {
      image: "/banners/placeholder.png?height=190&width=290",
      alt: "New Arrivals",
      link: "/new-arrivals",
    },
    {
      image: "/banners/placeholder.png?height=190&width=290",
      alt: "Best Sellers",
      link: "/best-sellers",
    },
    {
      image: "/banners/placeholder.png?height=190&width=290",
      alt: "Clearance",
      link: "/clearance",
    },
    {
      image: "/banners/placeholder.png?height=190&width=290",
      alt: "Premium",
      link: "/premium",
    },
  ];

  return (
    <section className="py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Large banner - takes 2 columns on desktop */}
          <div className="md:col-span-2">
            <Link to={mainBanner.link} className="group block">
              <div className="rounded-lg bg-gray-100 overflow-hidden h-48 md:h-80">
                <img
                  src={mainBanner.image || "/banners/placeholder.png"}
                  alt={mainBanner.alt}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          {/* Small banners - 1 column, stacked */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            {smallBanners.map((banner, index) => (
              <Link key={index} to={banner.link} className="group">
                <div className="rounded-lg bg-gray-100 overflow-hidden h-24 md:h-[4.75rem]">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.alt}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Horizontal Scroll Grid
export function HorizontalScrollGrid() {
  const items = [
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Category 1",
      link: "/category1",
    },
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Category 2",
      link: "/category2",
    },
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Category 3",
      link: "/category3",
    },
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Category 4",
      link: "/category4",
    },
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Category 5",
      link: "/category5",
    },
    {
      image: "/banners/placeholder.png?height=200&width=300",
      alt: "Category 6",
      link: "/category6",
    },
  ];

  return (
    <section className="md:hidden py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-3 md:gap-4 pb-4"
            style={{ width: "max-content" }}
          >
            {items.map((item, index) => (
              <Link key={index} to={item.link} className="group flex-shrink-0">
                <div className="rounded-lg bg-gray-100 overflow-hidden h-32 md:h-40 w-40 md:w-60">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Single Row Grid (5 columns)
export function SingleRowGrid() {
  const items = [
    {
      image: "/banners/placeholder.png?height=150&width=240",
      alt: "Item 1",
      link: "/item1",
    },
    {
      image: "/banners/placeholder.png?height=150&width=240",
      alt: "Item 2",
      link: "/item2",
    },
    {
      image: "/banners/placeholder.png?height=150&width=240",
      alt: "Item 3",
      link: "/item3",
    },
    {
      image: "/banners/placeholder.png?height=150&width=240",
      alt: "Item 4",
      link: "/item4",
    },
    {
      image: "/banners/placeholder.png?height=150&width=240",
      alt: "Item 5",
      link: "/item5",
    },
  ];

  return (
    <section className="py-6 bg-white rounded-md mt-2 md:mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {items.map((item, index) => (
            <Link key={index} to={item.link} className="group">
              <div className="rounded-lg bg-gray-100 overflow-hidden h-24 md:h-32">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Service Features Section
export function ServiceFeatures() {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Free Delivery",
      description: "Free delivery on orders over KSh 10,000",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Secure Payment",
      description: "100% secure payment methods",
      bgColor: "bg-green-50",
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-orange-600" />,
      title: "Easy Returns",
      description: "30-day return policy",
      bgColor: "bg-orange-50",
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-8 bg-white rounded-lg mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div
                className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Promotional Banners Section
export function PromotionalBanners() {
  const banners = [
    {
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      description: "On selected furniture items",
      image: "/banners/summer-sale.jpg?height=200&width=400",
      link: "/summer-sale",
      bgGradient: "from-orange-400 to-red-500",
    },
    {
      title: "New Collection",
      subtitle: "Modern Designs",
      description: "Discover our latest arrivals",
      image: "/banners/new-collection.jpg?height=200&width=400",
      link: "/new-arrivals",
      bgGradient: "from-blue-400 to-purple-500",
    },
    {
      title: "Free Assembly",
      subtitle: "Professional Service",
      description: "On all bedroom sets",
      image: "/banners/assembly.jpg?height=200&width=400",
      link: "/assembly-service",
      bgGradient: "from-green-400 to-teal-500",
    },
  ];

  return (
    <section className="py-6 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner, index) => (
            <Link key={index} to={banner.link} className="group">
              <div
                className={`bg-gradient-to-r ${banner.bgGradient} rounded-lg overflow-hidden h-48 relative`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <img
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                  <h3 className="text-xl font-bold mb-1">{banner.title}</h3>
                  <p className="text-lg font-semibold mb-2">
                    {banner.subtitle}
                  </p>
                  <p className="text-sm opacity-90">{banner.description}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                      Shop Now <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Quick Links Section
export function QuickLinks() {
  const linkCategories = [
    {
      title: "Shop by Room",
      links: [
        { name: "Living Room", url: "/category/living-room" },
        { name: "Bedroom", url: "/category/bedroom" },
        { name: "Dining Room", url: "/category/dining-room" },
        { name: "Home Office", url: "/category/office" },
        { name: "Kids Room", url: "/category/kids" },
      ],
    },
    {
      title: "Popular Categories",
      links: [
        { name: "Sofas & Couches", url: "/category/sofas" },
        { name: "Beds & Mattresses", url: "/category/beds" },
        { name: "Dining Tables", url: "/category/dining-tables" },
        { name: "Office Chairs", url: "/category/office-chairs" },
        { name: "Storage Solutions", url: "/category/storage" },
      ],
    },
    {
      title: "Special Offers",
      links: [
        { name: "Flash Sales", url: "/flash-sales" },
        { name: "Clearance", url: "/clearance" },
        { name: "New Arrivals", url: "/new-arrivals" },
        { name: "Best Sellers", url: "/best-sellers" },
        { name: "Weekly Deals", url: "/weekly-deals" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Help Center", url: "/help" },
        { name: "Track Order", url: "/track-order" },
        { name: "Returns", url: "/returns" },
        { name: "Contact Us", url: "/contact" },
        { name: "Size Guide", url: "/size-guide" },
      ],
    },
  ];

  return (
    <section className="py-8 bg-gray-50 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {linkCategories.map((category, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-800 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Statistics Section
export function StatsSection() {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      number: "50,000+",
      label: "Happy Customers",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      number: "15+",
      label: "Years Experience",
      bgColor: "bg-green-50",
    },
    {
      icon: <Tag className="h-8 w-8 text-orange-600" />,
      number: "10,000+",
      label: "Products Available",
      bgColor: "bg-orange-50",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      number: "4.8/5",
      label: "Customer Rating",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <section className="py-12 bg-white mt-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Why Choose Bobby Furniture?
          </h2>
          <p className="text-gray-600">
            Trusted by thousands of customers across Kenya
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`${stat.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter Signup Section
export function NewsletterSection() {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 mt-4">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Gift className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Get Exclusive Offers
          </h2>
          <p className="text-blue-100 mb-6">
            Subscribe to our newsletter and be the first to know about sales,
            new arrivals, and special promotions.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-blue-100 mt-3">
            By subscribing, you agree to our Privacy Policy and Terms of
            Service.
          </p>
        </div>
      </div>
    </section>
  );
}

// Payment Methods Section
export function PaymentMethods() {
  const paymentMethods = [
    { name: "M-Pesa", logo: "/payment/mpesa.png?height=40&width=80" },
    { name: "Visa", logo: "/payment/visa.png?height=40&width=80" },
    { name: "Mastercard", logo: "/payment/mastercard.png?height=40&width=80" },
    { name: "PayPal", logo: "/payment/paypal.png?height=40&width=80" },
    { name: "Bank Transfer", logo: "/payment/bank.png?height=40&width=80" },
  ];

  return (
    <section className="py-8 bg-gray-50 mt-4">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Secure Payment Methods
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                <img
                  src={method.logo || "/placeholder.svg"}
                  alt={method.name}
                  className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
            <Shield className="h-4 w-4 mr-2" />
            <span>SSL Encrypted & Secure Checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Information Section
export function ContactInfo() {
  const contactDetails = [
    {
      icon: <MapPin className="h-5 w-5 text-blue-600" />,
      title: "Visit Our Showroom",
      details: ["Nairobi CBD, Kenya", "Open Mon-Sat 9AM-6PM"],
    },
    {
      icon: <Phone className="h-5 w-5 text-green-600" />,
      title: "Call Us",
      details: ["+254 708 156 310", "Customer Service Available"],
    },
    {
      icon: <Mail className="h-5 w-5 text-orange-600" />,
      title: "Email Us",
      details: ["bobbyfurnitures254@gmail.com", "We reply within 24 hours"],
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      url: "https://facebook.com",
      name: "Facebook",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      url: "https://instagram.com",
      name: "Instagram",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      url: "https://twitter.com",
      name: "Twitter",
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      url: "https://youtube.com",
      name: "YouTube",
    },
  ];

  return (
    <section className="py-8 bg-white mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactDetails.map((contact, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">{contact.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {contact.title}
              </h3>
              {contact.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-sm text-gray-600">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center border-t pt-6">
          <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Trust Badges Section
export function TrustBadges() {
  const badges = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Verified Business",
      description: "Licensed & Registered",
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Quality Assured",
      description: "Premium Materials Only",
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Fast Delivery",
      description: "Same Day in Nairobi",
    },
    {
      icon: <Percent className="h-8 w-8 text-purple-600" />,
      title: "Best Prices",
      description: "Price Match Guarantee",
    },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-gray-50 to-blue-50 mt-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Your Trusted Furniture Partner
          </h2>
          <p className="text-gray-600">
            Quality, reliability, and customer satisfaction guaranteed
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-3">{badge.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

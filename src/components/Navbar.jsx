"use client";

import React from "react";

import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  Home,
  Sofa,
  Bed,
  Coffee,
  Briefcase,
  Tag,
  LogOut,
  LogIn,
  UserPlus,
  Settings,
  Package,
  Phone,
  Info,
  Mail,
  Gift,
  Truck,
  CreditCard,
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Clock,
  Percent,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
// import { Progress } from "./ui/progress";

// Categories data - moved outside component to prevent recreation on each render
const CATEGORIES = [
  {
    name: "Living Room",
    slug: "living-room",
    icon: <Sofa className="h-4 w-4" />,
  },
  { name: "Bedroom", slug: "bedroom", icon: <Bed className="h-4 w-4" /> },
  { name: "Dining", slug: "dining", icon: <Coffee className="h-4 w-4" /> },
  { name: "Office", slug: "office", icon: <Briefcase className="h-4 w-4" /> },
];

// Social media links
const SOCIAL_LINKS = [
  {
    icon: <Facebook className="h-4 w-4" />,
    url: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: <Instagram className="h-4 w-4" />,
    url: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: <Twitter className="h-4 w-4" />,
    url: "https://twitter.com",
    label: "Twitter",
  },
];

// Store locations
const STORE_LOCATIONS = [
  { id: "nairobi", name: "Nairobi" },
  // { id: "mombasa", name: "Mombasa" },
  // { id: "kisumu", name: "Kisumu" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("nairobi");
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);
  const locationMenuRef = useRef(null);

  // Auth context
  const { user, logout } = useContext(AuthContext);

  // Memoized cart count for performance
  const cartItemCount = cart.length;

  // Free shipping threshold
  const freeShippingThreshold = 200;
  const cartTotal = 120; // This would come from your cart context in a real app
  // const shippingProgress = Math.min(
  //   (cartTotal / freeShippingThreshold) * 100,
  //   100
  // );

  // Toggle menu handlers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleCategoryMenu = () => setIsCategoryMenuOpen(!isCategoryMenuOpen);
  const toggleLocationMenu = () => setIsLocationMenuOpen(!isLocationMenuOpen);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setIsCategoryMenuOpen(false);
      }
      if (
        locationMenuRef.current &&
        !locationMenuRef.current.contains(event.target)
      ) {
        setIsLocationMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Focus search input when mobile search is opened
  useEffect(() => {
    if (isMenuOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Extracted components for better organization
  const renderLogo = () => (
    <Link to="/" className="flex text-primary items-center gap-2">
      <Sofa className="h-6 w-6" aria-hidden="true" />
      <span className="font-bold text-xl hidden sm:inline-block">
        Bobby Furniture
      </span>
    </Link>
  );

  const renderTopBarLeft = () => (
    <div className="flex items-center gap-4 text-xs">
      <div className="hidden md:flex items-center gap-2">
        <Phone className="h-3 w-3" aria-hidden="true" />
        <span>+254 708 156 310</span>
      </div>
      <div className="flex md:flex items-center gap-2">
        <Mail className="h-3 w-3" aria-hidden="true" />
        <span>bobbyfurnitures254@gmail.com</span>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <Clock className="h-3 w-3" aria-hidden="true" />
        <span>Mon-Fri: 8am-5pm</span>
      </div>
    </div>
  );

  const renderStoreLocator = () => (
    <div className="relative" ref={locationMenuRef}>
      <button
        onClick={toggleLocationMenu}
        className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
        aria-expanded={isLocationMenuOpen}
        aria-haspopup="true"
      >
        <MapPin className="h-3 w-3" aria-hidden="true" />
        <span className="hidden sm:inline-block">Store: </span>
        {STORE_LOCATIONS.find((loc) => loc.id === selectedLocation)?.name}
        <ChevronDown className="h-3 w-3 ml-1" aria-hidden="true" />
      </button>

      {isLocationMenuOpen && (
        <div
          className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200"
          role="menu"
        >
          <div className="py-1">
            {STORE_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                className={`flex w-full items-center px-4 py-2 text-xs hover:bg-gray-100 text-left ${
                  selectedLocation === loc.id
                    ? "font-medium text-primary"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setSelectedLocation(loc.id);
                  setIsLocationMenuOpen(false);
                }}
                role="menuitem"
              >
                {loc.name}
              </button>
            ))}
            <Link
              to="/stores"
              className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 border-t border-gray-100 mt-1"
              onClick={() => setIsLocationMenuOpen(false)}
              role="menuitem"
            >
              View All Locations
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  // const renderFreeShippingProgress = () => (
  //   <div className="hidden lg:block relative">
  //     <div className="flex items-center gap-2 text-xs">
  //       <Truck className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
  //       <div className="w-[180px]">
  //         {cartTotal < freeShippingThreshold ? (
  //           <>
  //             <span className="block mb-1">
  //               ${(freeShippingThreshold - cartTotal).toFixed(2)} away from free
  //               shipping
  //             </span>
  //             <Progress
  //               value={shippingProgress}
  //               className="h-1.5"
  //               aria-label="Progress toward free shipping"
  //             />
  //           </>
  //         ) : (
  //           <span className="text-green-600 font-medium">
  //             You've unlocked free shipping!
  //           </span>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  const renderTopBarRight = () => (
    <div className="flex items-center gap-4 text-xs">
      {renderStoreLocator()}

      <Link
        to="/promotions"
        className="hidden md:flex items-center gap-1 hover:text-primary transition-colors"
      >
        <Percent className="h-3 w-3" aria-hidden="true" />
        <span>Promotions</span>
      </Link>

      <div className="flex md:flex items-center gap-3">
        {SOCIAL_LINKS.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label={social.label}
          >
            {React.cloneElement(social.icon, { "aria-hidden": "true" })}
          </a>
        ))}
      </div>
    </div>
  );

  const renderDesktopNav = () => (
    <nav
      className="hidden md:flex items-center gap-6 text-sm"
      aria-label="Main Navigation"
    >
      <Link to="/" className="font-medium transition-colors hover:text-primary">
        <Home className="h-4 w-4 inline mr-1" aria-hidden="true" />
        Home
      </Link>

      {/* Desktop Category Dropdown */}
      <div className="relative" ref={categoryMenuRef}>
        <button
          onClick={toggleCategoryMenu}
          className="flex items-center gap-1 font-medium hover:text-primary"
          aria-expanded={isCategoryMenuOpen}
          aria-haspopup="true"
        >
          <Tag className="h-4 w-4 inline" aria-hidden="true" />
          Categories
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>

        {isCategoryMenuOpen && (
          <div
            className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
            role="menu"
          >
            <div className="py-1">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsCategoryMenuOpen(false)}
                  role="menuitem"
                >
                  {React.cloneElement(category.icon, { "aria-hidden": "true" })}
                  <span className="ml-2">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link
        to="/products?sale=true"
        className="font-medium transition-colors hover:text-primary"
      >
        <Gift className="h-4 w-4 inline mr-1" aria-hidden="true" />
        Sale
      </Link>

      <Link
        to="/products?new=true"
        className="font-medium transition-colors hover:text-primary"
      >
        <Package className="h-4 w-4 inline mr-1" aria-hidden="true" />
        New Arrivals
      </Link>

      <Link
        to="/about"
        className="font-medium transition-colors hover:text-primary"
      >
        <Info className="h-4 w-4 inline mr-1" aria-hidden="true" />
        About
      </Link>

      <Link
        to="/contact"
        className="font-medium transition-colors hover:text-primary"
      >
        <Phone className="h-4 w-4 inline mr-1" aria-hidden="true" />
        Contact
      </Link>
    </nav>
  );

  const renderSearchForm = (isMobile = false) => (
    <form
      className={
        isMobile
          ? "relative w-full mb-6"
          : "hidden md:flex relative w-full max-w-sm items-center"
      }
      onSubmit={handleSearch}
      role="search"
    >
      <Search
        className={
          isMobile
            ? "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            : "absolute left-2.5 h-4 w-4 text-muted-foreground"
        }
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder="Search furniture..."
        className={
          isMobile
            ? "w-full rounded-lg pl-8"
            : "w-full rounded-lg pl-8 md:w-[300px] lg:w-[300px]"
        }
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        ref={isMobile ? searchInputRef : null}
        aria-label="Search furniture"
      />
      {isMobile && (
        <Button type="submit" className="absolute right-1 top-1 h-8" size="sm">
          Search
        </Button>
      )}
    </form>
  );

  const renderUserMenu = () => (
    <div className="relative" ref={userMenuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleUserMenu}
        aria-label="User menu"
        aria-expanded={isUserMenuOpen}
        aria-haspopup="true"
      >
        <User className="h-5 w-5" aria-hidden="true" />
      </Button>

      {isUserMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200"
          role="menu"
        >
          {user ? (
            <div>
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  Hi, {user.username}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                  role="menuitem"
                >
                  <User className="mr-2 h-4 w-4" aria-hidden="true" />
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                  role="menuitem"
                >
                  <Package className="mr-2 h-4 w-4" aria-hidden="true" />
                  My Orders
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                  role="menuitem"
                >
                  <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  role="menuitem"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="py-1">
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
                role="menuitem"
              >
                <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
                role="menuitem"
              >
                <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );

  ////promo section
  // const renderPromoBar = () => {
  //   if (!isPromoVisible) return null;

  //   return (
  //     <div className="bg-primary text-white py-2 relative">
  //       <div className="container flex justify-center items-center">
  //         <p className="text-center text-sm font-medium">
  //           Summer Sale! Use our <span className="font-bold">Promo Code</span>{" "}
  //           for 25% off all outdoor furniture{" "}
  //           <span className="font-bold">COMING SOON!!!</span>
  //         </p>
  //         <button
  //           className="absolute right-4 text-white"
  //           onClick={() => setIsPromoVisible(false)}
  //           aria-label="Close promotion"
  //         >
  //           <X className="h-4 w-4" aria-hidden="true" />
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  const renderMobileMenu = () =>
    isMenuOpen && (
      <div
        className="fixed inset-0 top-[104px] z-[100] bg-white md:hidden overflow-y-auto shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full p-6">
          {renderSearchForm(true)}

          <nav
            className="flex flex-col gap-5 flex-1"
            aria-label="Mobile Navigation"
          >
            <Link
              to="/"
              className="flex items-center gap-3 text-lg font-medium p-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Home
            </Link>

            <div className="space-y-3">
              <h3 className="font-medium text-muted-foreground px-2">
                Categories
              </h3>
              <div className="grid gap-2">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    {React.cloneElement(category.icon, {
                      "aria-hidden": "true",
                    })}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/products?sale=true"
              className="flex items-center gap-3 text-lg font-medium p-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <Gift className="h-5 w-5" aria-hidden="true" />
              Sale
            </Link>

            <Link
              to="/products?new=true"
              className="flex items-center gap-3 text-lg font-medium p-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <Package className="h-5 w-5" aria-hidden="true" />
              New Arrivals
            </Link>

            <div className="border-t border-gray-200 my-2 pt-2">
              <h3 className="font-medium text-muted-foreground px-2 mb-2">
                Shop
              </h3>

              <Link
                to="/wishlist"
                className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  <span>Wishlist</span>
                </div>
                <Badge>3</Badge>
              </Link>

              <Link
                to="/cart"
                className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                  <span>Cart</span>
                </div>
                {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
              </Link>

              <Link
                to="/orders"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Truck className="h-5 w-5" aria-hidden="true" />
                <span>Track Order</span>
              </Link>

              <Link
                to="/promotions"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Percent className="h-5 w-5" aria-hidden="true" />
                <span>Promotions & Coupons</span>
              </Link>
            </div>

            <div className="border-t border-gray-200 my-2 pt-2">
              <h3 className="font-medium text-muted-foreground px-2 mb-2">
                Store Locations
              </h3>

              <div className="px-2 py-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span className="font-medium">Current Store:</span>
                  <span>
                    {
                      STORE_LOCATIONS.find((loc) => loc.id === selectedLocation)
                        ?.name
                    }
                  </span>
                </div>

                <div className="grid gap-1 mt-2">
                  {STORE_LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-full text-left ${
                        selectedLocation === loc.id
                          ? "text-primary font-medium"
                          : ""
                      }`}
                      onClick={() => setSelectedLocation(loc.id)}
                    >
                      <span>{loc.name}</span>
                      {selectedLocation === loc.id && (
                        <Badge variant="outline" className="ml-auto">
                          Selected
                        </Badge>
                      )}
                    </button>
                  ))}

                  <Link
                    to="/stores"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-primary"
                    onClick={toggleMenu}
                  >
                    <span>View All Locations</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-2 pt-2">
              <h3 className="font-medium text-muted-foreground px-2 mb-2">
                Information
              </h3>

              <Link
                to="/about"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Info className="h-5 w-5" aria-hidden="true" />
                <span>About Us</span>
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span>Contact Us</span>
              </Link>

              <Link
                to="/shipping"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Truck className="h-5 w-5" aria-hidden="true" />
                <span>Shipping Policy</span>
              </Link>

              <Link
                to="/payment"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <CreditCard className="h-5 w-5" aria-hidden="true" />
                <span>Payment Options</span>
              </Link>
            </div>

            {/* User Account Section */}
            <div className="border-t border-gray-200 my-2 pt-2">
              <h3 className="font-medium text-muted-foreground px-2 mb-2">
                Account
              </h3>

              {user ? (
                <>
                  <div className="px-2 py-1 mb-2">
                    <p className="font-medium">Hi, {user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    <Package className="h-5 w-5" aria-hidden="true" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    <Settings className="h-5 w-5" aria-hidden="true" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-red-600 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    <LogIn className="h-5 w-5" aria-hidden="true" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    <UserPlus className="h-5 w-5" aria-hidden="true" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="border-t border-gray-200 mt-2 pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>support@bobbyfurniture.com</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>+254 708 156 310</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>Mon-Fri: 9am-6pm</span>
              </div>

              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    {React.cloneElement(social.icon, { "aria-hidden": "true" })}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    );

  return (
    <header className="sticky top-0 z-[90] w-full bg-white shadow-sm">
      {/* Promotional Banner */}
      {/* uncoment when promoode is ready */}
      {/* {renderPromoBar()} */}

      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container flex h-10 items-center justify-between text-gray-600">
          {renderTopBarLeft()}
          {renderTopBarRight()}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>

            {renderLogo()}
            {renderDesktopNav()}
          </div>

          <div className="flex items-center gap-4">
            {renderSearchForm()}
            {/* {renderFreeShippingProgress()} */}

            <div className="flex items-center gap-2">
              <Link
                to="/wishlist"
                className="relative"
                aria-label="Wishlist with 3 items"
              >
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>
              </Link>

              <Link
                to="/cart"
                className="relative"
                aria-label={`Cart with ${cartItemCount} items`}
              >
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {renderUserMenu()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fixed overlay */}
      {renderMobileMenu()}
    </header>
  );
}

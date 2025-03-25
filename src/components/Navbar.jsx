"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Uncomment when you have AuthContext
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
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);

  // Mock user state - replace with your actual auth context
  // const [user, setUser] = useState(null);
  const { user, logout } = useContext(AuthContext); // Uncomment when you have AuthContext

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  // Mock logout function - replace with your actual logout function
  const handleLogout = () => {
    logout(); // Uncomment when you have AuthContext
    // setUser(null);
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

  // Categories data
  const categories = [
    {
      name: "Living Room",
      slug: "living-room",
      icon: <Sofa className="h-4 w-4" />,
    },
    { name: "Bedroom", slug: "bedroom", icon: <Bed className="h-4 w-4" /> },
    { name: "Dining", slug: "dining", icon: <Coffee className="h-4 w-4" /> },
    { name: "Office", slug: "office", icon: <Briefcase className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-[90] w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <Link to="/" className="flex text-primary items-center gap-2">
            <Sofa className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">
              Bobby Furniture
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="font-medium transition-colors hover:text-primary"
            >
              <Home className="h-4 w-4 inline mr-1" />
              Home
            </Link>

            {/* Desktop Category Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1 font-medium hover:text-primary"
              >
                <Tag className="h-4 w-4 inline" />
                Categories
                <ChevronDown className="h-4 w-4" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/category/${category.slug}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsCategoryMenuOpen(false)}
                      >
                        {category.icon}
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
              <Gift className="h-4 w-4 inline mr-1" />
              Sale
            </Link>

            <Link
              to="/products?new=true"
              className="font-medium transition-colors hover:text-primary"
            >
              <Package className="h-4 w-4 inline mr-1" />
              New Arrivals
            </Link>

            <Link
              to="/about"
              className="font-medium transition-colors hover:text-primary"
            >
              <Info className="h-4 w-4 inline mr-1" />
              About
            </Link>

            <Link
              to="/contact"
              className="font-medium transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 inline mr-1" />
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form
            className="hidden md:flex relative w-full max-w-sm items-center"
            onSubmit={handleSearch}
          >
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search furniture..."
              className="w-full rounded-lg pl-8 md:w-[300px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center gap-2">
            <Link to="/wishlist" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </Link>

            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label={`Cart with ${cart.length} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
                  {user ? (
                    <div>
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          Hi, {user.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
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
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fixed overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-[100] bg-white md:hidden overflow-y-auto shadow-lg">
          <div className="flex flex-col h-full p-6">
            <form className="relative w-full mb-6" onSubmit={handleSearch}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search furniture..."
                className="w-full rounded-lg pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={searchInputRef}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 h-8"
                size="sm"
              >
                Search
              </Button>
            </form>

            <nav className="flex flex-col gap-5 flex-1">
              <Link
                to="/"
                className="flex items-center gap-3 text-lg font-medium p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Home className="h-5 w-5" />
                Home
              </Link>

              <div className="space-y-3">
                <h3 className="font-medium text-muted-foreground px-2">
                  Categories
                </h3>
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      {category.icon}
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
                <Gift className="h-5 w-5" />
                Sale
              </Link>

              <Link
                to="/products?new=true"
                className="flex items-center gap-3 text-lg font-medium p-2 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Package className="h-5 w-5" />
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
                    <Heart className="h-5 w-5" />
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
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart</span>
                  </div>
                  {cart.length > 0 && <Badge>{cart.length}</Badge>}
                </Link>

                <Link
                  to="/orders"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <Truck className="h-5 w-5" />
                  <span>Track Order</span>
                </Link>
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
                  <Info className="h-5 w-5" />
                  <span>About Us</span>
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <Phone className="h-5 w-5" />
                  <span>Contact Us</span>
                </Link>

                <Link
                  to="/shipping"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <Truck className="h-5 w-5" />
                  <span>Shipping Policy</span>
                </Link>

                <Link
                  to="/payment"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <CreditCard className="h-5 w-5" />
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
                      <User className="h-5 w-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-red-600 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
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
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 mt-2 pt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  <span>support@bobbyfurniture.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+254 712 345 678</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

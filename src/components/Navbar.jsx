import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Home,
  Info,
  Phone,
  Box,
  HelpCircle,
  BoxIcon,
  LogIn,
  Boxes,
  BoxSelect,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  //username
  // let userName = user.username;
  // let usernameFirstLetter = username.charAt(0).toUpperCase();

  // Handle closing dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white px-6 py-4 z-50 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <img src="/logo-white.png" alt="logo" className="h-10" />
          <span className="text-lg hidden sm:flex">Bobby Furniture</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex space-x-6">
          {[
            { to: "/", label: "Home", icon: <Home size={20} /> },
            { to: "/about-us", label: "About Us", icon: <Info size={20} /> },
            { to: "/contact-us", label: "Contact", icon: <Phone size={20} /> },
            { to: "/products", label: "Products", icon: <Box size={20} /> },
            { to: "/help", label: "Help", icon: <HelpCircle size={20} /> },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className="flex items-center space-x-1 transition-transform transform hover:scale-105"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          {/* Cart */}
          <li>
            <Link
              to="/cart"
              className="flex items-center space-x-1 transition-transform transform hover:scale-105 relative"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="ml-2 bg-blue-300 px-2 py-1 rounded-full text-sm">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>

          {/* User Dropdown */}
          {user ? (
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 transition-transform transform hover:scale-105"
              >
                <User size={20} />
                <span>
                  Hi,<span className="p-1">{user.username}</span>
                </span>
              </button>
              {isDropdownOpen && (
                <ul
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 bg-white text-black py-2 w-40 rounded shadow-lg"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <User size={18} className="mr-2" /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-200"
                    >
                      <LogOut size={18} className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="flex items-center space-x-1 transition-transform transform hover:scale-105"
              >
                <User size={20} /> <span>Login</span>
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}

        <Link
          to="/cart"
          className="flex items-center lg:hidden transition-transform transform hover:scale-105 relative"
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="ml-2 bg-white absolute left-3 bottom-2 text-blue-600 px-[9.5px] py-1 rounded-full text-sm">
              {cart.length}
            </span>
          )}
        </Link>

        {/* User Authentication */}
        {/* User Dropdown */}
        {user ? (
          <div className="relative flex lg:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 transition-transform transform hover:scale-105"
            >
              <User size={20} />
              <span className="truncate max-w-32 " title={user.username}>
                Hi,<span className="p-1">{user.username}</span>
              </span>
            </button>
            {isDropdownOpen && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 mt-5 bg-white text-black py-2 w-40 rounded shadow-lg"
              >
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                  >
                    <User size={18} className="mr-2" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                  >
                    <Boxes size={18} className="mr-2" />
                    My Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-200"
                  >
                    <LogOut size={18} className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="relative flex lg:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 transition-transform transform hover:scale-105"
            >
              <User size={20} />
              <span className="" title="register/login">
                Account
              </span>
            </button>
            {isDropdownOpen && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 mt-5 bg-white text-black py-2 w-40 rounded shadow-lg"
              >
                <li>
                  <Link
                    to="/signup"
                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                  >
                    <User size={18} className="mr-2" /> Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                  >
                    <LogIn size={18} className="mr-2" />
                    Log In
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden focus:outline-none"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 bg-opacity-95 text-white z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-gray-200 hover:text-white"
        >
          <X size={30} />
        </button>

        <ul className="flex flex-col items-start mt-16 space-y-6 pl-6 text-lg">
          {[
            { to: "/", label: "Home", icon: <Home size={24} /> },
            { to: "/about-us", label: "About Us", icon: <Info size={24} /> },
            { to: "/contact-us", label: "Contact", icon: <Phone size={24} /> },
            { to: "/products", label: "Products", icon: <Box size={24} /> },
            { to: "/help", label: "Help", icon: <HelpCircle size={24} /> },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 transition-transform transform hover:scale-105"
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            </li>
          ))}

          {/* Cart */}
          <li>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 transition-transform transform hover:scale-105"
            >
              <ShoppingCart size={24} />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="bg-red-500 px-2 py-1 rounded-full text-sm">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>

          {/* User Authentication */}
          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 transition-transform transform hover:scale-105"
                >
                  <User size={24} /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 transition-transform transform hover:scale-105"
                >
                  <Boxes size={24} /> <span>My Orders</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="flex items-center space-x-3 text-red-400 hover:text-red-600 transition-transform transform hover:scale-105"
                >
                  <LogOut size={24} /> <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 transition-transform transform hover:scale-105"
              >
                <User size={24} /> <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

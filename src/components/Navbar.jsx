// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext"; // Import AuthContext

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const { user, logout } = useContext(AuthContext); // Get user & logout from AuthContext

//   // Handle closing dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-blue-500 text-white px-4 py-3 z-50">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold flex items-center">
//           <img src="/logo-white.png" alt="logo" className="h-10" />
//           <div className="text-md font-script">Bobby Furniture</div>
//         </Link>

//         {/* Navbar Links */}
//         <ul className="hidden lg:flex space-x-4">
//           <li>
//             <Link to="/" className="hover:underline">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about-us" className="hover:underline">
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact-us" className="hover:underline">
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/products" className="hover:underline">
//               Products
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" className="hover:underline flex items-center">
//               Cart{" "}
//               <span className="ml-2 bg-red-500 px-2 py-1 rounded-full text-sm">
//                 0
//               </span>
//             </Link>
//           </li>

//           {/* Authentication Section */}
//           {user ? (
//             <li className="relative" ref={dropdownRef}>
//               <button onClick={toggleDropdown} className="hover:underline">
//                 Welcome, {user.username} ▼
//               </button>
//               {isDropdownOpen && (
//                 <ul className="absolute right-0 mt-2 bg-white text-black shadow-md py-2 w-40 rounded">
//                   {user.role === "admin" && (
//                     <li>
//                       <Link
//                         to="/admin"
//                         className="block px-4 py-2 hover:bg-gray-200"
//                       >
//                         Admin Panel
//                       </Link>
//                     </li>
//                   )}
//                   <li>
//                     <button
//                       onClick={logout}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-200"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           ) : (
//             <li>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>

//         {/* Hamburger Menu Button */}
//         <button
//           onClick={toggleMenu}
//           className="block lg:hidden focus:outline-none"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-gray-800 z-50 w-64 transform ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-300`}
//       >
//         <button
//           onClick={toggleMenu}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         <ul className="flex flex-col mt-16 space-y-6 px-6">
//           <li>
//             <Link
//               to="/"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/about-us"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact-us"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/products"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Products
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/cart"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Cart
//             </Link>
//           </li>

//           {/* Mobile Authentication Section */}
//           {user ? (
//             <>
//               {user.role === "admin" && (
//                 <li>
//                   <Link
//                     to="/admin"
//                     onClick={toggleMenu}
//                     className="block hover:bg-gray-700 p-2 rounded"
//                   >
//                     Admin Panel
//                   </Link>
//                 </li>
//               )}
//               <li>
//                 <button
//                   onClick={() => {
//                     logout();
//                     toggleMenu();
//                   }}
//                   className="block w-full text-left p-2 hover:bg-gray-700 rounded"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <li>
//               <Link
//                 to="/login"
//                 onClick={toggleMenu}
//                 className="block hover:bg-gray-700 p-2 rounded"
//               >
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

///wave 2
// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext"; // Import useCart hook
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext"; // Import AuthContext

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { cart } = useCart(); // Get cart data from CartContext
//   const { user, logout } = useContext(AuthContext); // Get user data from AuthContext
//   const dropdownRef = useRef(null);

//   // Handle closing dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-blue-500 text-white px-4 py-3 z-50">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold flex items-center">
//           <img src="/logo-white.png" alt="logo" className="h-10" />
//           <div className="text-md font-script">Bobby Furniture</div>
//         </Link>

//         {/* Hamburger Menu Button */}
//         <button
//           onClick={toggleMenu}
//           className="block lg:hidden focus:outline-none"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
//             />
//           </svg>
//         </button>

//         {/* Navbar Links */}
//         <ul className="hidden lg:flex space-x-4">
//           <li>
//             <Link to="/" className="hover:underline">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about-us" className="hover:underline">
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact-us" className="hover:underline">
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/products" className="hover:underline">
//               Products
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" className="hover:underline flex items-center">
//               Cart{" "}
//               <span className="ml-2 bg-red-500 px-2 py-1 rounded-full text-sm">
//                 {cart.length}
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/help" className="hover:underline">
//               Help
//             </Link>
//           </li>

//           {/* User Dropdown */}
//           {user ? (
//             <li className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="hover:underline flex items-center"
//               >
//                 {user.username}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="2"
//                   stroke="currentColor"
//                   className="w-4 h-4 ml-1"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>
//               {isDropdownOpen && (
//                 <ul
//                   ref={dropdownRef}
//                   className="absolute right-0 mt-2 bg-white text-black py-2 w-32 rounded shadow-lg"
//                 >
//                   <li>
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 hover:bg-gray-200"
//                     >
//                       Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       onClick={logout}
//                       className="block px-4 py-2 text-left w-full hover:bg-gray-200"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           ) : (
//             <li>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-gray-800 z-50 w-64 transform ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-300`}
//       >
//         <button
//           onClick={toggleMenu}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         <ul className="flex flex-col mt-16 space-y-6 px-6">
//           <li>
//             <Link
//               to="/"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/about-us"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact-us"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/products"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Products
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/cart"
//               onClick={toggleMenu}
//               className="hover:bg-gray-700 p-2 rounded flex justify-between items-center"
//             >
//               Cart
//               <span className="bg-red-500 px-2 py-1 rounded-full text-sm">
//                 {cart.length}
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/help"
//               onClick={toggleMenu}
//               className="block hover:bg-gray-700 p-2 rounded"
//             >
//               Help
//             </Link>
//           </li>

//           {user ? (
//             <li>
//               <button
//                 onClick={logout}
//                 className="block w-full text-left hover:bg-gray-700 p-2 rounded"
//               >
//                 Logout
//               </button>
//             </li>
//           ) : (
//             <li>
//               <Link
//                 to="/login"
//                 onClick={toggleMenu}
//                 className="block hover:bg-gray-700 p-2 rounded"
//               >
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

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
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);

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
          <span className="text-lg">Bobby Furniture</span>
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
            <li>
              <button
                onClick={logout}
                className="flex items-center space-x-3 text-red-400 hover:text-red-600 transition-transform transform hover:scale-105"
              >
                <LogOut size={24} /> <span>Logout</span>
              </button>
            </li>
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

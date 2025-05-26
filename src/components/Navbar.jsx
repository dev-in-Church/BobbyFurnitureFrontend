"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  HelpCircle,
  ChevronDown,
  Sofa,
  Bed,
  Coffee,
  Briefcase,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  LayoutGrid,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Banner from "./Banner";
import { useAuth } from "../contexts/auth-context";

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

// Categories for dropdown with subcategories and items
const CATEGORIES = [
  {
    name: "Living Room",
    icon: <Sofa className="h-5 w-5 mr-2" />,
    url: "/category/living-room",
    subcategories: [
      {
        name: "Sofas & Couches",
        items: [
          "3-Seater Sofas",
          "L-Shaped Sofas",
          "Recliners",
          "Sectionals",
          "Loveseats",
        ],
      },
      {
        name: "Coffee Tables",
        items: [
          "Glass Coffee Tables",
          "Wooden Coffee Tables",
          "Ottoman Coffee Tables",
          "Nesting Tables",
        ],
      },
      {
        name: "TV Stands",
        items: [
          "Modern TV Stands",
          "Corner TV Stands",
          "Wall Mounted Units",
          "Entertainment Centers",
        ],
      },
      {
        name: "Accent Chairs",
        items: [
          "Armchairs",
          "Accent Chairs",
          "Swivel Chairs",
          "Reading Chairs",
        ],
      },
    ],
  },
  {
    name: "Bedroom",
    icon: <Bed className="h-5 w-5 mr-2" />,
    url: "/category/bedroom",
    subcategories: [
      {
        name: "Beds & Frames",
        items: [
          "Queen Beds",
          "King Beds",
          "Single Beds",
          "Bunk Beds",
          "Platform Beds",
        ],
      },
      {
        name: "Mattresses",
        items: [
          "Memory Foam",
          "Spring Mattresses",
          "Hybrid Mattresses",
          "Latex Mattresses",
        ],
      },
      {
        name: "Wardrobes",
        items: [
          "Sliding Door Wardrobes",
          "Hinged Wardrobes",
          "Walk-in Closets",
          "Armoires",
        ],
      },
      {
        name: "Dressers",
        items: [
          "Chest of Drawers",
          "Vanity Tables",
          "Bedside Tables",
          "Mirrors",
        ],
      },
    ],
  },
  {
    name: "Dining",
    icon: <Coffee className="h-5 w-5 mr-2" />,
    url: "/category/dining",
    subcategories: [
      {
        name: "Dining Tables",
        items: [
          "6-Seater Tables",
          "4-Seater Tables",
          "Extendable Tables",
          "Round Tables",
        ],
      },
      {
        name: "Dining Chairs",
        items: [
          "Upholstered Chairs",
          "Wooden Chairs",
          "Bar Stools",
          "Bench Seating",
        ],
      },
      {
        name: "Storage",
        items: ["Buffets", "China Cabinets", "Sideboards", "Display Units"],
      },
      {
        name: "Bar Furniture",
        items: ["Bar Tables", "Bar Stools", "Wine Racks", "Bar Carts"],
      },
    ],
  },
  {
    name: "Office",
    icon: <Briefcase className="h-5 w-5 mr-2" />,
    url: "/category/office",
    subcategories: [
      {
        name: "Desks",
        items: [
          "Executive Desks",
          "Standing Desks",
          "Computer Desks",
          "Writing Desks",
        ],
      },
      {
        name: "Office Chairs",
        items: [
          "Ergonomic Chairs",
          "Executive Chairs",
          "Task Chairs",
          "Gaming Chairs",
        ],
      },
      {
        name: "Storage",
        items: [
          "Filing Cabinets",
          "Bookcases",
          "Office Shelving",
          "Storage Boxes",
        ],
      },
      {
        name: "Accessories",
        items: [
          "Desk Lamps",
          "Monitor Stands",
          "Keyboard Trays",
          "Cable Management",
        ],
      },
    ],
  },
  {
    name: "Kitchen",
    icon: <Coffee className="h-5 w-5 mr-2" />,
    url: "/category/kitchen",
    subcategories: [
      {
        name: "Kitchen Islands",
        items: [
          "Rolling Islands",
          "Stationary Islands",
          "Kitchen Carts",
          "Butcher Blocks",
        ],
      },
      {
        name: "Kitchen Storage",
        items: [
          "Pantry Cabinets",
          "Kitchen Cabinets",
          "Spice Racks",
          "Bakers Racks",
        ],
      },
      {
        name: "Breakfast Nooks",
        items: [
          "Breakfast Tables",
          "Counter Height Sets",
          "Banquette Seating",
          "Corner Breakfast Sets",
        ],
      },
      {
        name: "Kitchen Accessories",
        items: [
          "Kitchen Stools",
          "Pot Racks",
          "Wine Storage",
          "Microwave Carts",
        ],
      },
    ],
  },
  {
    name: "Outdoor",
    icon: <Sofa className="h-5 w-5 mr-2" />,
    url: "/category/outdoor",
    subcategories: [
      {
        name: "Patio Furniture",
        items: [
          "Outdoor Sofas",
          "Patio Dining Sets",
          "Adirondack Chairs",
          "Outdoor Benches",
        ],
      },
      {
        name: "Outdoor Dining",
        items: [
          "Outdoor Dining Tables",
          "Outdoor Dining Chairs",
          "Bistro Sets",
          "Picnic Tables",
        ],
      },
      {
        name: "Outdoor Accessories",
        items: [
          "Patio Umbrellas",
          "Outdoor Cushions",
          "Outdoor Rugs",
          "Patio Heaters",
        ],
      },
      {
        name: "Garden Furniture",
        items: [
          "Garden Benches",
          "Planters",
          "Garden Stools",
          "Outdoor Storage",
        ],
      },
    ],
  },
  {
    name: "Kids & Nursery",
    icon: <Bed className="h-5 w-5 mr-2" />,
    url: "/category/kids-nursery",
    subcategories: [
      {
        name: "Kids Beds",
        items: [
          "Bunk Beds",
          "Loft Beds",
          "Trundle Beds",
          "Toddler Beds",
          "Teen Beds",
        ],
      },
      {
        name: "Nursery Furniture",
        items: [
          "Cribs",
          "Changing Tables",
          "Rocking Chairs",
          "Gliders",
          "Baby Dressers",
        ],
      },
      {
        name: "Kids Storage",
        items: [
          "Toy Boxes",
          "Kids Bookcases",
          "Kids Dressers",
          "Study Desks",
          "Wall Shelves",
        ],
      },
      {
        name: "Playroom",
        items: [
          "Play Tables",
          "Kids Chairs",
          "Activity Centers",
          "Play Mats",
          "Teepees",
        ],
      },
    ],
  },
  {
    name: "Accent Furniture",
    icon: <Coffee className="h-5 w-5 mr-2" />,
    url: "/category/accent-furniture",
    subcategories: [
      {
        name: "Accent Tables",
        items: [
          "Side Tables",
          "Console Tables",
          "Accent Chests",
          "Pedestals",
          "Nesting Tables",
        ],
      },
      {
        name: "Accent Seating",
        items: ["Ottomans", "Poufs", "Benches", "Accent Stools", "Settees"],
      },
      {
        name: "Wall Decor",
        items: ["Wall Shelves", "Wall Art", "Mirrors", "Clocks", "Tapestries"],
      },
      {
        name: "Room Dividers",
        items: [
          "Folding Screens",
          "Bookcase Dividers",
          "Hanging Dividers",
          "Decorative Panels",
        ],
      },
    ],
  },
  {
    name: "Home Decor",
    icon: <Coffee className="h-5 w-5 mr-2" />,
    url: "/category/home-decor",
    subcategories: [
      {
        name: "Lighting",
        items: [
          "Floor Lamps",
          "Table Lamps",
          "Pendant Lights",
          "Chandeliers",
          "Wall Sconces",
        ],
      },
      {
        name: "Textiles",
        items: [
          "Area Rugs",
          "Throw Pillows",
          "Throw Blankets",
          "Curtains",
          "Bedding Sets",
        ],
      },
      {
        name: "Decorative Accents",
        items: [
          "Vases",
          "Candles & Holders",
          "Decorative Bowls",
          "Sculptures",
          "Bookends",
        ],
      },
      {
        name: "Wall Decor",
        items: [
          "Wall Art",
          "Mirrors",
          "Wall Clocks",
          "Picture Frames",
          "Tapestries",
        ],
      },
    ],
  },
  {
    name: "Storage & Organization",
    icon: <Briefcase className="h-5 w-5 mr-2" />,
    url: "/category/storage-organization",
    subcategories: [
      {
        name: "Shelving",
        items: [
          "Bookcases",
          "Wall Shelves",
          "Cube Storage",
          "Floating Shelves",
          "Corner Shelves",
        ],
      },
      {
        name: "Cabinets",
        items: [
          "Storage Cabinets",
          "Media Cabinets",
          "Accent Cabinets",
          "Bathroom Cabinets",
          "Garage Cabinets",
        ],
      },
      {
        name: "Baskets & Bins",
        items: [
          "Storage Baskets",
          "Decorative Bins",
          "Underbed Storage",
          "Toy Storage",
          "Laundry Hampers",
        ],
      },
      {
        name: "Closet Organization",
        items: [
          "Closet Systems",
          "Shoe Storage",
          "Hanging Organizers",
          "Jewelry Storage",
          "Garment Racks",
        ],
      },
    ],
  },
  {
    name: "All Categories",
    icon: <LayoutGrid className="h-5 w-5 mr-2" />,
    url: "/categories",
    subcategories: [],
  },
];

// Banner component
// const Banner = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   if (!isVisible) return null;

//   return (
//     <div className="relative bg-primary text-primary-foreground">
//       <div className="container mx-auto px-4 py-1 text-center text-xs sm:text-sm">
//         <p>Free delivery on orders over $100. Shop now!</p>
//       </div>
//       <button
//         onClick={() => setIsVisible(false)}
//         className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground"
//         aria-label="Close banner"
//       >
//         <X className="h-4 w-4" />
//       </button>
//     </div>
//   );
// };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);
  const location = useLocation();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { user, logout } = useAuth();

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Handle click outside to close category dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderTopBarLeft = () => (
    <div className="flex items-center gap-4 text-xs">
      <div className="hidden md:flex items-center gap-2">
        <Phone className="h-3 w-3" aria-hidden="true" />
        <span>+254 708 156 310</span>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <Mail className="h-3 w-3" aria-hidden="true" />
        <span className="truncate">bobbyfurnitures254@gmail.com</span>
      </div>
    </div>
  );

  const renderTopBarRight = () => (
    <div className="flex items-center gap-4 text-xs">
      <Link
        to="/about"
        className="hidden md:flex items-center gap-1 hover:text-primary transition-colors"
      >
        <span>About</span>
      </Link>

      <Link
        to="/contact"
        className="hidden md:flex items-center gap-1 hover:text-primary transition-colors"
      >
        <span>Contact</span>
      </Link>

      <div className="flex items-center gap-3">
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

  const renderCategoryDropdown = () => {
    return (
      <div
        ref={categoryDropdownRef}
        className="relative"
        onMouseEnter={() => setShowCategoryDropdown(true)}
        onMouseLeave={() => {
          setShowCategoryDropdown(false);
          setHoveredCategory(null);
        }}
      >
        <Button
          variant="ghost"
          className="flex items-center space-x-1 p-1"
          aria-label="Categories"
        >
          <LayoutGrid className="h-5 w-5" />
          <span className="sr-only">Categories</span>
        </Button>

        {showCategoryDropdown && (
          <div className="absolute left-0 top-full z-50 mt-1 flex rounded-md border border-gray-200 bg-white shadow-lg">
            {/* Main Categories */}
            <div className="w-56 p-2">
              <div className="py-1">
                {CATEGORIES.map((category, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() =>
                      setHoveredCategory(
                        category.subcategories.length > 0 ? category : null
                      )
                    }
                  >
                    <Link
                      to={category.url}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {category.icon}
                      {category.name}
                      {category.subcategories.length > 0 && (
                        <ChevronDown className="h-4 w-4 ml-auto rotate-[-90deg]" />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Subcategories Mega Menu */}
            {hoveredCategory && hoveredCategory.subcategories.length > 0 && (
              <div className="w-96 border-l border-gray-200 p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3 text-base">
                  {hoveredCategory.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {hoveredCategory.subcategories.map(
                    (subcategory, subIndex) => (
                      <div key={subIndex} className="space-y-2">
                        <h4 className="font-medium text-gray-800 text-sm border-b border-gray-300 pb-1">
                          {subcategory.name}
                        </h4>
                        <ul className="space-y-1">
                          {subcategory.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                to={`${hoveredCategory.url}/${subcategory.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}/${item
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="text-xs text-gray-600 hover:text-primary hover:underline block py-1"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-300">
                  <Link
                    to={hoveredCategory.url}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View All {hoveredCategory.name} →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderMobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Bobby Furniture</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input placeholder="Search products..." className="pl-10 pr-4" />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="categories">
              <AccordionTrigger className="py-2">Categories</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  {CATEGORIES.map((category, index) => (
                    <Link
                      key={index}
                      to={category.url}
                      className="flex items-center py-2 text-sm"
                    >
                      {category.icon}
                      {category.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="account">
              <AccordionTrigger className="py-2">
                {user
                  ? user.isAdmin
                    ? "Admin Menu"
                    : "My Account"
                  : "Account"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  {user ? (
                    <>
                      {user.isAdmin && (
                        <>
                          <Link to="/admin" className="py-2 text-sm">
                            Admin Dashboard
                          </Link>
                          <Link to="/admin/products" className="py-2 text-sm">
                            Manage Products
                          </Link>
                          <Link to="/admin/orders" className="py-2 text-sm">
                            Manage Orders
                          </Link>
                          <Link to="/admin/users" className="py-2 text-sm">
                            Manage Users
                          </Link>
                          <div className="border-t my-2"></div>
                        </>
                      )}
                      <Link to="/account" className="py-2 text-sm">
                        My Account
                      </Link>
                      {!user.isAdmin && (
                        <>
                          <Link to="/orders" className="py-2 text-sm">
                            My Orders
                          </Link>
                          <Link to="/wishlist" className="py-2 text-sm">
                            Wishlist
                          </Link>
                        </>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          if (location.pathname.startsWith("/admin")) {
                            window.location.href = "/";
                          }
                        }}
                        className="py-2 text-sm text-left text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="py-2 text-sm">
                        Login
                      </Link>
                      <Link to="/register" className="py-2 text-sm">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="help">
              <AccordionTrigger className="py-2">Help</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link to="/help-center" className="py-2 text-sm">
                    Help Center
                  </Link>
                  <Link to="/place-order" className="py-2 text-sm">
                    Place an Order
                  </Link>
                  <Link to="/payment-options" className="py-2 text-sm">
                    Payment Options
                  </Link>
                  <Link to="/track-order" className="py-2 text-sm">
                    Track an Order
                  </Link>
                  <Link to="/cancel-order" className="py-2 text-sm">
                    Cancel an Order
                  </Link>
                  <Link to="/returns-refunds" className="py-2 text-sm">
                    Returns & Refunds
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 space-y-2">
            <Link to="/about" className="flex items-center py-2 text-sm">
              About
            </Link>
            <Link to="/contact" className="flex items-center py-2 text-sm">
              Contact
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-start space-x-4">
            {SOCIAL_LINKS.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label={social.label}
              >
                {React.cloneElement(social.icon, { className: "h-5 w-5" })}
              </a>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-[90] w-full bg-white shadow-sm">
      {/* gif advert */}
      <Banner />
      {/* Top Bar */}
      <div className="bg-[url('/textures/moroccan-flower-dark.png')] bg-repeat">
        <div className="container mx-auto flex h-8 items-center justify-between px-4 text-white">
          {renderTopBarLeft()}
          {renderTopBarRight()}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            {renderMobileMenu()}

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <span className="text-xl md:text-2xl font-bold text-primary">
                  Bobby Furniture
                </span>
                <div className="ml-1">
                  <img
                    src="/logo4.png"
                    alt="Bobby Furniture Logo"
                    className="h-6"
                  />
                </div>
              </div>
            </Link>

            {/* Category Dropdown (Desktop) */}
            {location.pathname !== "/" && (
              <div className="hidden md:block ml-2">
                {renderCategoryDropdown()}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex w-full max-w-xl items-center px-4">
            <div className="relative flex w-full items-center">
              <div className="relative flex w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search products, brands and categories"
                  className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button
                className="ml-1 h-10 bg-blue-500 hover:bg-primary"
                type="submit"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2 md:space-x-6">
            {/* Category Dropdown (Mobile) */}
            {location.pathname !== "/" && (
              <div className="md:hidden">{renderCategoryDropdown()}</div>
            )}

            {/* Search Button (Mobile) */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 p-1"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">
                    {user
                      ? user.isAdmin
                        ? "Admin"
                        : user.name?.split(" ")[0] || "Account"
                      : "Account"}
                  </span>
                  <ChevronDown className="h-4 w-4 hidden sm:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    {user.isAdmin && (
                      <>
                        <DropdownMenuItem>
                          <Link to="/admin" className="w-full">
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/admin/products" className="w-full">
                            Manage Products
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/admin/orders" className="w-full">
                            Manage Orders
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/admin/users" className="w-full">
                            Manage Users
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="border-t">
                          <Link to="/account" className="w-full">
                            My Account
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {!user.isAdmin && (
                      <>
                        <DropdownMenuItem>
                          <Link to="/account" className="w-full">
                            My Account
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/orders" className="w-full">
                            My Orders
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/wishlist" className="w-full">
                            Wishlist
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem
                      className="border-t cursor-pointer text-red-600"
                      onClick={() => {
                        logout();
                        // Redirect to home if on admin pages
                        if (location.pathname.startsWith("/admin")) {
                          window.location.href = "/";
                        }
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link to="/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/register" className="w-full">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hidden sm:flex items-center space-x-1 p-1"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/help-center" className="w-full">
                    Help Center
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/place-order" className="w-full">
                    Place an Order
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/payment-options" className="w-full">
                    Payment Options
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/track-order" className="w-full">
                    Track an Order
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/cancel-order" className="w-full">
                    Cancel an Order
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/returns-refunds" className="w-full">
                    Returns & Refunds
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" className="p-1">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  1
                </span>
                <span className="ml-1 hidden sm:inline">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

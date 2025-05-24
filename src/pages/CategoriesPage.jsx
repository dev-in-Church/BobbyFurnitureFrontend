"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sofa,
  Bed,
  Coffee,
  Briefcase,
  Search,
  ChevronRight,
  LayoutGrid,
  Home,
  Sun,
  Baby,
  Lamp,
  BookOpen,
  ShoppingBag,
  Sparkles,
  Tag,
  Clock,
  Heart,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

// Import the categories from the navbar component
// This is the same data structure used in the navbar
const CATEGORIES = [
  {
    name: "Living Room",
    icon: <Sofa className="h-5 w-5" />,
    url: "/category/living-room",
    image: "/placeholder.png?height=300&width=300",
    description: "Stylish and comfortable furniture for your living space",
    featured: true,
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
    icon: <Bed className="h-5 w-5" />,
    url: "/category/bedroom",
    image: "/placeholder.png?height=300&width=300",
    description:
      "Create your perfect sleep sanctuary with our bedroom furniture",
    featured: true,
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
    icon: <Coffee className="h-5 w-5" />,
    url: "/category/dining",
    image: "/placeholder.png?height=300&width=300",
    description: "Elegant dining furniture for memorable meals",
    featured: true,
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
    icon: <Briefcase className="h-5 w-5" />,
    url: "/category/office",
    image: "/placeholder.png?height=300&width=300",
    description: "Productive and stylish workspace furniture",
    featured: true,
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
    icon: <Coffee className="h-5 w-5" />,
    url: "/category/kitchen",
    image: "/placeholder.png?height=300&width=300",
    description: "Functional and stylish kitchen furniture and accessories",
    featured: false,
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
    icon: <Sun className="h-5 w-5" />,
    url: "/category/outdoor",
    image: "/placeholder.png?height=300&width=300",
    description: "Weather-resistant furniture for your outdoor spaces",
    featured: false,
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
    icon: <Baby className="h-5 w-5" />,
    url: "/category/kids-nursery",
    image: "/placeholder.png?height=300&width=300",
    description: "Furniture designed for children of all ages",
    featured: false,
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
    icon: <Sparkles className="h-5 w-5" />,
    url: "/category/accent-furniture",
    image: "/placeholder.png?height=300&width=300",
    description: "Decorative pieces that add character to any room",
    featured: false,
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
    icon: <Lamp className="h-5 w-5" />,
    url: "/category/home-decor",
    image: "/placeholder.png?height=300&width=300",
    description: "Finishing touches to complete your home's style",
    featured: false,
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
    icon: <BookOpen className="h-5 w-5" />,
    url: "/category/storage-organization",
    image: "/placeholder.png?height=300&width=300",
    description: "Solutions to keep your home tidy and organized",
    featured: false,
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
];

// Additional special categories
const SPECIAL_CATEGORIES = [
  {
    name: "New Arrivals",
    icon: <Sparkles className="h-5 w-5" />,
    url: "/new-arrivals",
    image: "/placeholder.png?height=300&width=300",
    description: "Our latest furniture collections and pieces",
  },
  {
    name: "Sale & Clearance",
    icon: <Tag className="h-5 w-5" />,
    url: "/sale",
    image: "/placeholder.png?height=300&width=300",
    description: "Special deals and discounted furniture",
  },
  {
    name: "Best Sellers",
    icon: <ShoppingBag className="h-5 w-5" />,
    url: "/best-sellers",
    image: "/placeholder.png?height=300&width=300",
    description: "Our most popular furniture items",
  },
  {
    name: "Limited Edition",
    icon: <Clock className="h-5 w-5" />,
    url: "/limited-edition",
    image: "/placeholder.png?height=300&width=300",
    description: "Exclusive furniture pieces available for a limited time",
  },
];

// Room-based categories for inspiration
const ROOM_CATEGORIES = [
  {
    name: "Living Room",
    image: "/placeholder.png?height=300&width=300",
    url: "/room-inspiration/living-room",
  },
  {
    name: "Bedroom",
    image: "/placeholder.png?height=300&width=300",
    url: "/room-inspiration/bedroom",
  },
  {
    name: "Dining Room",
    image: "/placeholder.png?height=300&width=300",
    url: "/room-inspiration/dining-room",
  },
  {
    name: "Home Office",
    image: "/placeholder.png?height=300&width=300",
    url: "/room-inspiration/home-office",
  },
  {
    name: "Kitchen",
    image: "/placeholder.png?height=300&width=300",
    url: "/room-inspiration/kitchen",
  },
  {
    name: "Bathroom",
    image: "/placeholder.png?height=300&width=300",
    url: "/room-inspiration/bathroom",
  },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Filter categories based on search query
  const filteredCategories = searchQuery
    ? CATEGORIES.filter(
        (category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          category.subcategories.some(
            (subcat) =>
              subcat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              subcat.items.some((item) =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
      )
    : CATEGORIES;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Banner */}
      <div className="relative bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              All Categories
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Browse our complete collection of furniture and home decor
              categories
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search categories, furniture types, or items..."
                className="h-12 w-full rounded-md border-0 pl-10 pr-4 bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-200 focus-visible:ring-2 focus-visible:ring-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50">
          <svg
            className="absolute bottom-0 w-full h-16 text-gray-50"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-500 flex items-center"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">All Categories</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Special Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Special Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPECIAL_CATEGORIES.map((category, index) => (
              <Link
                key={index}
                to={category.url}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.png"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-lg">
                          {category.name}
                        </h3>
                        <div className="bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Main Categories Tabs/Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Browse Categories</h2>
            {searchQuery && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                Search results for: {searchQuery}
              </Badge>
            )}
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-end mb-4">
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Grid View
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  List View
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Grid View */}
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Link to={category.url} className="block group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.image || "/placeholder.png"}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        {category.featured && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="mr-2 text-blue-600">
                            {React.cloneElement(category.icon, {
                              className: "h-5 w-5",
                            })}
                          </div>
                          <h3 className="font-bold text-lg">{category.name}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {category.description}
                        </p>
                      </div>
                    </Link>

                    <div className="px-4 pb-4">
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories
                          .slice(0, 3)
                          .map((subcat, subIndex) => (
                            <Link
                              key={subIndex}
                              to={`${category.url}/${subcat.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-md transition-colors"
                            >
                              {subcat.name}
                            </Link>
                          ))}
                        {category.subcategories.length > 3 && (
                          <Link
                            to={category.url}
                            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-1 rounded-md transition-colors"
                          >
                            +{category.subcategories.length - 3} more
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                      <Link
                        to={category.url}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        View All {category.name}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* List View */}
            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {filteredCategories.map((category, index) => (
                  <Accordion
                    key={index}
                    type="single"
                    collapsible
                    value={
                      expandedCategory === index ? `item-${index}` : undefined
                    }
                    onValueChange={(value) =>
                      setExpandedCategory(
                        value === `item-${index}` ? index : null
                      )
                    }
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="border rounded-lg bg-white shadow-sm"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex items-center">
                          <div className="mr-3 text-blue-600">
                            {React.cloneElement(category.icon, {
                              className: "h-5 w-5",
                            })}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-left">
                              {category.name}
                            </h3>
                            <p className="text-gray-600 text-sm text-left">
                              {category.description}
                            </p>
                          </div>
                          {category.featured && (
                            <Badge className="ml-3 bg-yellow-500 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {category.subcategories.map((subcat, subIndex) => (
                            <div key={subIndex} className="space-y-2">
                              <Link
                                to={`${category.url}/${subcat.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="font-medium text-gray-900 hover:text-blue-600 block"
                              >
                                {subcat.name}
                              </Link>
                              <ul className="space-y-1">
                                {subcat.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link
                                      to={`${category.url}/${subcat.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}/${item
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                      className="text-sm text-gray-600 hover:text-blue-600 hover:underline block"
                                    >
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <Link
                            to={category.url}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            View All {category.name} Products
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Room Inspiration Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop by Room</h2>
            <Link
              to="/room-inspiration"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              View All Rooms
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ROOM_CATEGORIES.map((room, index) => (
              <Link
                key={index}
                to={room.url}
                className="group relative rounded-lg overflow-hidden aspect-square shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={room.image || "/placeholder.png"}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-3 w-full">
                    <h3 className="text-white font-medium text-center">
                      {room.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Searches */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Sectional Sofas",
              "Queen Beds",
              "Dining Sets",
              "Office Desks",
              "Bookshelves",
              "Coffee Tables",
              "Accent Chairs",
              "Outdoor Furniture",
              "Kids Beds",
              "Storage Solutions",
              "Recliners",
              "TV Stands",
              "Mattresses",
              "Bar Stools",
              "Rugs",
              "Lighting",
              "Wall Decor",
              "Kitchen Islands",
            ].map((term, index) => (
              <Link
                key={index}
                to={`/search?q=${term.toLowerCase().replace(/\s+/g, "+")}`}
                className="bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-full px-4 py-2 text-sm transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </section>

        {/* Recently Viewed */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recently Viewed</h2>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-800 p-0 h-auto"
            >
              <Heart className="h-4 w-4 mr-1" />
              View Saved Items
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No recently viewed items
            </h3>
            <p className="text-gray-500 mb-4">
              Browse our categories to discover beautiful furniture for your
              home
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Shopping
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

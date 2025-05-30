"use client";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  Zap,
  Sofa,
  Bed,
  Utensils,
  Laptop,
  Umbrella,
  Archive,
  Palette,
  Baby,
  Bath,
} from "lucide-react";
import clsx from "clsx";
// import Link from "next/link";
import { Link } from "react-router-dom";

// Updated category data with furniture-specific subcategories
const categories = [
  {
    id: 1,
    name: "Living Room",
    icon: <Sofa className="h-4 w-4" />,
    subcategories: [
      {
        title: "SOFAS",
        items: [
          "3-Seater Sofas",
          "L-Shaped Sofas",
          "Recliners",
          "Sectionals",
          "Loveseats",
        ],
      },
      {
        title: "COFFEE TABLES",
        items: [
          "Glass Coffee Tables",
          "Wooden Coffee Tables",
          "Ottoman Tables",
          "Nesting Tables",
          "Console Tables",
        ],
      },
      {
        title: "TV STANDS",
        items: [
          "Modern TV Stands",
          "Corner TV Units",
          "Entertainment Centers",
          "Media Consoles",
          "TV Cabinets",
        ],
      },
      {
        title: "ACCENT FURNITURE",
        items: [
          "Side Tables",
          "End Tables",
          "Accent Chairs",
          "Ottomans",
          "Poufs",
        ],
      },
      {
        title: "BOOKCASES",
        items: [
          "Open Shelving",
          "Closed Bookcases",
          "Corner Bookcases",
          "Ladder Shelves",
          "Wall-Mounted Shelves",
        ],
      },
      {
        title: "LIVING ROOM SETS",
        items: [
          "Complete Sets",
          "Sofa & Loveseat Sets",
          "Sectional Sets",
          "3-2-1 Sets",
          "Modular Sets",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Bedroom",
    icon: <Bed className="h-4 w-4" />,
    subcategories: [
      {
        title: "BEDS",
        items: [
          "Queen Beds",
          "King Beds",
          "Single Beds",
          "Double Beds",
          "Platform Beds",
        ],
      },
      {
        title: "DRESSERS",
        items: [
          "Chest of Drawers",
          "Double Dressers",
          "Tallboys",
          "Lingerie Chests",
          "Media Chests",
        ],
      },
      {
        title: "NIGHTSTANDS",
        items: [
          "Bedside Tables",
          "Nightstands with Storage",
          "Floating Nightstands",
          "Mirrored Nightstands",
          "Modern Nightstands",
        ],
      },
      {
        title: "WARDROBES",
        items: [
          "Armoires",
          "Sliding Door Wardrobes",
          "Fitted Wardrobes",
          "Corner Wardrobes",
          "Mirrored Wardrobes",
        ],
      },
      {
        title: "MATTRESSES",
        items: [
          "Memory Foam",
          "Spring Mattresses",
          "Hybrid Mattresses",
          "Latex Mattresses",
          "Orthopedic Mattresses",
        ],
      },
      {
        title: "BEDROOM SETS",
        items: [
          "Complete Bedroom Sets",
          "5-Piece Sets",
          "King Sets",
          "Queen Sets",
          "Youth Bedroom Sets",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Dining Room",
    icon: <Utensils className="h-4 w-4" />,
    subcategories: [
      {
        title: "DINING TABLES",
        items: [
          "Rectangular Tables",
          "Round Tables",
          "Extendable Tables",
          "Glass Tables",
          "Wooden Tables",
        ],
      },
      {
        title: "DINING CHAIRS",
        items: [
          "Upholstered Chairs",
          "Wooden Chairs",
          "Metal Chairs",
          "Parsons Chairs",
          "Bench Seating",
        ],
      },
      {
        title: "BUFFETS",
        items: [
          "Sideboards",
          "Credenzas",
          "Server Tables",
          "Wine Cabinets",
          "Hutches",
        ],
      },
      {
        title: "BAR FURNITURE",
        items: [
          "Bar Carts",
          "Bar Stools",
          "Home Bars",
          "Wine Racks",
          "Pub Tables",
        ],
      },
      {
        title: "DINING SETS",
        items: [
          "5-Piece Sets",
          "7-Piece Sets",
          "Counter Height Sets",
          "Breakfast Nook Sets",
          "Formal Dining Sets",
        ],
      },
      {
        title: "CHINA CABINETS",
        items: [
          "Display Cabinets",
          "Curio Cabinets",
          "Corner Cabinets",
          "Modern China Cabinets",
          "Hutch Cabinets",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Office",
    icon: <Laptop className="h-4 w-4" />,
    subcategories: [
      {
        title: "DESKS",
        items: [
          "Computer Desks",
          "Writing Desks",
          "Executive Desks",
          "Standing Desks",
          "L-Shaped Desks",
        ],
      },
      {
        title: "OFFICE CHAIRS",
        items: [
          "Ergonomic Chairs",
          "Executive Chairs",
          "Task Chairs",
          "Mesh Chairs",
          "Leather Office Chairs",
        ],
      },
      {
        title: "STORAGE",
        items: [
          "Filing Cabinets",
          "Bookcases",
          "Credenzas",
          "Mobile Pedestals",
          "Storage Cabinets",
        ],
      },
      {
        title: "OFFICE SETS",
        items: [
          "Complete Office Sets",
          "Desk & Chair Sets",
          "Executive Sets",
          "Home Office Sets",
          "Modular Office",
        ],
      },
      {
        title: "ACCESSORIES",
        items: [
          "Desk Lamps",
          "Monitor Stands",
          "Keyboard Trays",
          "Cable Management",
          "Desk Organizers",
        ],
      },
      {
        title: "CONFERENCE",
        items: [
          "Conference Tables",
          "Meeting Chairs",
          "Presentation Boards",
          "Podiums",
          "Training Tables",
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Outdoor",
    icon: <Umbrella className="h-4 w-4" />,
    subcategories: [
      {
        title: "PATIO SETS",
        items: [
          "Dining Sets",
          "Conversation Sets",
          "Bistro Sets",
          "Sectional Sets",
          "Bar Sets",
        ],
      },
      {
        title: "SEATING",
        items: [
          "Outdoor Sofas",
          "Lounge Chairs",
          "Adirondack Chairs",
          "Hammocks",
          "Porch Swings",
        ],
      },
      {
        title: "TABLES",
        items: [
          "Dining Tables",
          "Side Tables",
          "Coffee Tables",
          "Bar Tables",
          "Folding Tables",
        ],
      },
      {
        title: "SHADE",
        items: ["Umbrellas", "Canopies", "Pergolas", "Gazebos", "Shade Sails"],
      },
      {
        title: "OUTDOOR DECOR",
        items: [
          "Outdoor Rugs",
          "Planters",
          "Outdoor Lighting",
          "Garden Sculptures",
          "Fountains",
        ],
      },
      {
        title: "MATERIALS",
        items: [
          "Wicker/Rattan",
          "Teak",
          "Aluminum",
          "Wrought Iron",
          "Plastic/Resin",
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Storage",
    icon: <Archive className="h-4 w-4" />,
    subcategories: [
      {
        title: "SHELVING",
        items: [
          "Bookcases",
          "Wall Shelves",
          "Cube Storage",
          "Etageres",
          "Ladder Shelves",
        ],
      },
      {
        title: "CABINETS",
        items: [
          "Storage Cabinets",
          "Media Cabinets",
          "Accent Cabinets",
          "Utility Cabinets",
          "Pantry Cabinets",
        ],
      },
      {
        title: "CLOSET",
        items: [
          "Closet Systems",
          "Wardrobes",
          "Clothing Racks",
          "Shoe Storage",
          "Accessory Organizers",
        ],
      },
      {
        title: "ENTRYWAY",
        items: [
          "Hall Trees",
          "Console Tables",
          "Coat Racks",
          "Shoe Benches",
          "Key Organizers",
        ],
      },
      {
        title: "BASKETS & BINS",
        items: [
          "Storage Baskets",
          "Decorative Bins",
          "Underbed Storage",
          "Toy Storage",
          "Magazine Holders",
        ],
      },
      {
        title: "SPECIALTY",
        items: [
          "Wine Storage",
          "Record Storage",
          "Bathroom Storage",
          "Garage Storage",
          "Kitchen Organization",
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Decor",
    icon: <Palette className="h-4 w-4" />,
    subcategories: [
      {
        title: "WALL DECOR",
        items: [
          "Wall Art",
          "Mirrors",
          "Wall Clocks",
          "Tapestries",
          "Wall Sculptures",
        ],
      },
      {
        title: "LIGHTING",
        items: [
          "Table Lamps",
          "Floor Lamps",
          "Pendant Lights",
          "Chandeliers",
          "Wall Sconces",
        ],
      },
      {
        title: "TEXTILES",
        items: [
          "Throw Pillows",
          "Throw Blankets",
          "Area Rugs",
          "Curtains",
          "Decorative Cushions",
        ],
      },
      {
        title: "ACCENTS",
        items: [
          "Vases",
          "Candles & Holders",
          "Decorative Bowls",
          "Bookends",
          "Sculptures",
        ],
      },
      {
        title: "SEASONAL",
        items: [
          "Holiday Decor",
          "Seasonal Wreaths",
          "Outdoor Decorations",
          "Festive Lighting",
          "Table Decorations",
        ],
      },
      {
        title: "FRAMES & ALBUMS",
        items: [
          "Picture Frames",
          "Photo Albums",
          "Digital Frames",
          "Shadow Boxes",
          "Poster Frames",
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Kids & Baby",
    icon: <Baby className="h-4 w-4" />,
    subcategories: [
      {
        title: "KIDS FURNITURE",
        items: ["Kids Beds", "Bunk Beds", "Desks", "Dressers", "Bookcases"],
      },
      {
        title: "BABY FURNITURE",
        items: [
          "Cribs",
          "Changing Tables",
          "Gliders & Rockers",
          "Bassinets",
          "Toddler Beds",
        ],
      },
      {
        title: "PLAYROOM",
        items: [
          "Play Tables",
          "Toy Storage",
          "Play Kitchens",
          "Activity Centers",
          "Kids Seating",
        ],
      },
      {
        title: "KIDS BEDDING",
        items: [
          "Kids Comforters",
          "Sheet Sets",
          "Pillows",
          "Bed Canopies",
          "Sleeping Bags",
        ],
      },
      {
        title: "DECOR",
        items: ["Wall Art", "Rugs", "Lighting", "Wall Decals", "Growth Charts"],
      },
      {
        title: "STORAGE",
        items: [
          "Toy Boxes",
          "Book Racks",
          "Cubbies",
          "Hampers",
          "Wall Organizers",
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Mattresses",
    icon: <Bed className="h-4 w-4" />,
    subcategories: [
      {
        title: "TYPES",
        items: ["Memory Foam", "Innerspring", "Hybrid", "Latex", "Adjustable"],
      },
      {
        title: "SIZES",
        items: ["King", "Queen", "Full", "Twin", "California King"],
      },
      {
        title: "BRANDS",
        items: ["Sealy", "Serta", "Tempur-Pedic", "Purple", "Casper"],
      },
      {
        title: "FIRMNESS",
        items: ["Soft", "Medium", "Firm", "Extra Firm", "Customizable"],
      },
      {
        title: "ACCESSORIES",
        items: [
          "Mattress Toppers",
          "Mattress Pads",
          "Mattress Protectors",
          "Bed Frames",
          "Foundations",
        ],
      },
      {
        title: "SPECIALTY",
        items: [
          "Cooling Mattresses",
          "Organic Mattresses",
          "RV Mattresses",
          "Crib Mattresses",
          "Air Mattresses",
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Bathroom",
    icon: <Bath className="h-4 w-4" />,
    subcategories: [
      {
        title: "VANITIES",
        items: [
          "Single Vanities",
          "Double Vanities",
          "Vessel Sink Vanities",
          "Wall-Mounted Vanities",
          "Corner Vanities",
        ],
      },
      {
        title: "STORAGE",
        items: [
          "Linen Cabinets",
          "Over-Toilet Storage",
          "Medicine Cabinets",
          "Bathroom Shelving",
          "Towel Storage",
        ],
      },
      {
        title: "FIXTURES",
        items: ["Faucets", "Sinks", "Shower Heads", "Bathtubs", "Toilets"],
      },
      {
        title: "ACCESSORIES",
        items: [
          "Towel Bars",
          "Toilet Paper Holders",
          "Shower Caddies",
          "Soap Dispensers",
          "Bathroom Mirrors",
        ],
      },
      {
        title: "BATH LINENS",
        items: [
          "Bath Towels",
          "Hand Towels",
          "Washcloths",
          "Bath Mats",
          "Shower Curtains",
        ],
      },
      {
        title: "DECOR",
        items: [
          "Bathroom Art",
          "Decorative Storage",
          "Candles",
          "Plants",
          "Bathroom Sets",
        ],
      },
    ],
  },
];

const CategoryItem = ({ category, isActive, setActiveCategory }) => {
  return (
    <li
      className={clsx("relative", { "text-primary": isActive })}
      onMouseEnter={() => setActiveCategory(category.id)}
      onMouseLeave={() => setActiveCategory(null)}
    >
      <Link
        to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
        className="flex items-center px-4"
        // onClick={(e) => category.subcategories.length > 0 && e.preventDefault()}
      >
        <span className="mr-3 w-6 text-center">{category.icon}</span>
        <span className="text-sm">{category.name}</span>
      </Link>
    </li>
  );
};

const SubcategoriesPanel = ({ category, setActiveCategory }) => {
  if (!category || category.subcategories.length === 0) return null;

  return (
    <div
      className="absolute bg-white overflow-y-auto grid grid-cols-3 gap-6 top-0 left-[210px] border border-gray-200 z-50 w-[730px] h-full p-4 rounded-r-lg shadow-md"
      // style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      onMouseEnter={() => setActiveCategory(category.id)}
      onMouseLeave={() => setActiveCategory(null)}
    >
      {category.subcategories.map((subcategory, index) => (
        <div key={index} className="space-y-1">
          <h3 className="font-bold text-sm text-gray-700 underline">
            {subcategory.title}
          </h3>
          <ul className="">
            {subcategory.items.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/category/${subcategory.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}/${item
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const banners = [
    {
      id: 1,
      image: "/banners/one.jpg?height=400&width=800&text=Banner+1",
      alt: "Banner 1",
      link: "/promo/banner-1",
    },
    {
      id: 2,
      image: "/banners/two.jpg?height=400&width=800&text=Banner+2",
      alt: "Banner 2",
      link: "/promo/banner-2",
    },
    {
      id: 3,
      image: "/banners/three.jpg?height=400&width=800&text=Banner+3",
      alt: "Banner 3",
      link: "/promo/banner-3",
    },
    {
      id: 4,
      image: "/banners/four.jpg?height=400&width=800&text=Banner+3",
      alt: "Banner 4",
      link: "/promo/banner-4",
    },
    // {
    //   id: 5,
    //   image: "/banners/slider.jpg?height=400&width=800&text=Banner+3",
    //   alt: "Banner 5",
    //   link: "/promo/banner-5",
    // },
    // {
    //   id: 6,
    //   image: "/banners/slider.jpg?height=400&width=800&text=Banner+3",
    //   alt: "Banner 6",
    //   link: "/promo/banner-6",
    // },
    // {
    //   id: 7,
    //   image: "/banners/slider.jpg?height=400&width=800&text=Banner+3",
    //   alt: "Banner 7",
    //   link: "/promo/banner-7",
    // },
    // {
    //   id: 8,
    //   image: "/banners/slider.jpg?height=400&width=800&text=Banner+3",
    //   alt: "Banner 8",
    //   link: "/promo/banner-8",
    // },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const activeCategoryData = categories.find(
    (cat) => cat.id === activeCategory
  );

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="bg-primary py-4 h-screen">
    <div className="md:mb-4">
      <div className="grid grid-cols-1 w-full h-auto md:grid-cols-[1fr_750px_1fr] gap-5">
        {/* Categories sidebar - fixed width */}
        <div className="relative hidden md:block bg-white rounded-md h-full shadow-md ">
          <ul className="flex flex-col h-full py-3 justify-between">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                setActiveCategory={setActiveCategory}
              />
            ))}
          </ul>

          {/* Subcategories panel */}
          {activeCategory && (
            <SubcategoriesPanel
              category={activeCategoryData}
              setActiveCategory={setActiveCategory}
            />
          )}
        </div>

        {/* Banner slider - flexible width */}
        <div className="relative bg-[url('/banners/slider.jpg')] overflow-hidden h-full rounded-md shadow-md">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="h-full w-full flex-shrink-0">
                <Link to={banner.link}>
                  <img
                    src={banner.image || "/banners/slider.jpg"}
                    alt={banner.alt}
                    className="h-full  w-full"
                    loading="lazy"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentBanner === index ? "bg-white" : "bg-white/40"
                }`}
                onClick={() => setCurrentBanner(index)}
              >
                <span className="sr-only">Banner {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right sidebar - fixed width with two sections */}
        <div className="hidden md:grid overflow-hidden grid-rows-[1fr_1fr] gap-4">
          {/* Top section - white box with info items */}
          <div className="flex flex-col justify-between bg-white p-3 py-5 rounded-sm shadow-md gap-4">
            {/* Help Center */}
            <Link to="/help" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <HelpCircle size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm">HELP CENTER</h3>
                <p className="text-xs text-gray-500">Guide To Customer Care</p>
              </div>
            </Link>

            {/* Top Deals */}
            <Link className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Zap size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm">TOP DEALS</h3>
                <p className="text-xs text-gray-500">LIVE NOW</p>
              </div>
            </Link>

            {/* Sell at bobby */}
            <Link className="flex items-center cursor-not-allowed">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-primary font-bold">$</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">SELL AT BOBBY</h3>
                <p className="text-xs text-gray-500">Thousands Of Visitors</p>
              </div>
            </Link>
          </div>

          {/* Bottom section - Call/WhatsApp gif */}
          <div className="bg-white rounded-sm shadow-md overflow-hidden">
            <img
              src="/banners/bottom.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default HeroSection;

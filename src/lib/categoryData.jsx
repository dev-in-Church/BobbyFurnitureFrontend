import React from "react";

import {
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

export const categories = [
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

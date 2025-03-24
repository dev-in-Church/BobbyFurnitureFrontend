// Sample product data for the furniture e-commerce store
export const productsData = [
  // Living Room
  {
    id: "lv-001",
    name: "Modern Leather Sofa",
    category: "Living Room",
    price: 1299,
    originalPrice: 1699,
    rating: 4.5,
    reviewCount: 42,
    isNew: true,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Elegant modern sofa with genuine leather upholstery and solid wood legs.",
    features: [
      "Genuine leather",
      "Solid wood frame",
      "High-density foam cushions",
      "Stain-resistant",
    ],
    colors: ["Black", "Brown", "Tan"],
    dimensions: {
      width: 84,
      depth: 38,
      height: 34,
    },
  },
  {
    id: "lv-002",
    name: "Minimalist Coffee Table",
    category: "Living Room",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 36,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Sleek minimalist coffee table with tempered glass top and metal frame.",
    features: [
      "Tempered glass",
      "Metal frame",
      "Scratch-resistant",
      "Easy assembly",
    ],
    colors: ["Black", "White", "Gold"],
    dimensions: {
      width: 48,
      depth: 24,
      height: 18,
    },
  },
  {
    id: "lv-003",
    name: "Accent Armchair",
    category: "Living Room",
    price: 499,
    originalPrice: 599,
    rating: 4.3,
    reviewCount: 28,
    isNew: true,
    isSale: false,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Comfortable accent armchair with plush cushioning and stylish design.",
    features: [
      "High-quality fabric",
      "Solid wood legs",
      "Ergonomic design",
      "Stain-resistant",
    ],
    colors: ["Gray", "Blue", "Green", "Beige"],
    dimensions: {
      width: 32,
      depth: 34,
      height: 36,
    },
  },
  {
    id: "lv-004",
    name: "Entertainment Center",
    category: "Living Room",
    price: 899,
    originalPrice: 1099,
    rating: 4.6,
    reviewCount: 19,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Spacious entertainment center with ample storage for media devices.",
    features: [
      "Solid wood construction",
      "Cable management",
      "Adjustable shelves",
      "Scratch-resistant finish",
    ],
    colors: ["Walnut", "Oak", "White", "Black"],
    dimensions: {
      width: 72,
      depth: 18,
      height: 24,
    },
  },
  {
    id: "lv-005",
    name: "Sectional Sofa",
    category: "Living Room",
    price: 1899,
    originalPrice: 2299,
    rating: 4.7,
    reviewCount: 53,
    isNew: true,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Versatile sectional sofa with modular design for flexible arrangement.",
    features: [
      "Modular design",
      "Stain-resistant fabric",
      "High-density foam",
      "Hardwood frame",
    ],
    colors: ["Gray", "Navy", "Beige"],
    dimensions: {
      width: 112,
      depth: 84,
      height: 34,
    },
  },

  // Bedroom
  {
    id: "bd-001",
    name: "Queen Size Bed Frame",
    category: "Bedroom",
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviewCount: 53,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Elegant queen size bed frame with upholstered headboard and solid wood base.",
    features: [
      "Upholstered headboard",
      "Solid wood frame",
      "No box spring needed",
      "Easy assembly",
    ],
    colors: ["Gray", "Beige", "Blue"],
    dimensions: {
      width: 64,
      length: 84,
      height: 48,
    },
  },
  {
    id: "bd-002",
    name: "6-Drawer Dresser",
    category: "Bedroom",
    price: 749,
    originalPrice: 899,
    rating: 4.5,
    reviewCount: 38,
    isNew: true,
    isSale: false,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Spacious 6-drawer dresser with smooth gliding drawers and modern design.",
    features: [
      "Solid wood construction",
      "Smooth gliding drawers",
      "Anti-tip hardware",
      "Dovetail joinery",
    ],
    colors: ["Walnut", "White", "Black", "Oak"],
    dimensions: {
      width: 60,
      depth: 18,
      height: 36,
    },
  },
  {
    id: "bd-003",
    name: "Nightstand with Drawer",
    category: "Bedroom",
    price: 249,
    originalPrice: 299,
    rating: 4.4,
    reviewCount: 42,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Compact nightstand with drawer and open shelf for bedside storage.",
    features: [
      "Solid wood construction",
      "Smooth drawer operation",
      "Open shelf",
      "Cable management",
    ],
    colors: ["Walnut", "White", "Black", "Oak"],
    dimensions: {
      width: 22,
      depth: 16,
      height: 24,
    },
  },
  {
    id: "bd-004",
    name: "King Size Mattress",
    category: "Bedroom",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewCount: 87,
    isNew: true,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Premium king size mattress with memory foam and cooling technology.",
    features: [
      "Memory foam",
      "Cooling gel",
      "Hypoallergenic",
      "10-year warranty",
    ],
    firmness: "Medium-firm",
    dimensions: {
      width: 76,
      length: 80,
      height: 12,
    },
  },
  {
    id: "bd-005",
    name: "Wardrobe Cabinet",
    category: "Bedroom",
    price: 1199,
    originalPrice: 1499,
    rating: 4.6,
    reviewCount: 29,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Spacious wardrobe cabinet with hanging rod and adjustable shelves.",
    features: [
      "Solid wood construction",
      "Adjustable shelves",
      "Hanging rod",
      "Soft-close doors",
    ],
    colors: ["Walnut", "White", "Black"],
    dimensions: {
      width: 48,
      depth: 24,
      height: 72,
    },
  },

  // Dining
  {
    id: "dn-001",
    name: "Dining Table Set",
    category: "Dining",
    price: 1499,
    originalPrice: 1899,
    rating: 4.8,
    reviewCount: 46,
    isNew: true,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Complete dining set with table and 6 chairs in modern design.",
    features: [
      "Solid wood construction",
      "Comfortable chairs",
      "Extendable table",
      "Scratch-resistant finish",
    ],
    colors: ["Walnut", "Oak", "Black"],
    dimensions: {
      table: {
        width: 72,
        depth: 42,
        height: 30,
      },
      chairs: {
        width: 18,
        depth: 22,
        height: 36,
      },
    },
    seating: 6,
  },
  {
    id: "dn-002",
    name: "Counter Height Stools",
    category: "Dining",
    price: 199,
    originalPrice: 249,
    rating: 4.3,
    reviewCount: 32,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Stylish counter height stools with comfortable seating and footrest.",
    features: [
      "Padded seat",
      "Sturdy metal frame",
      "Footrest",
      "Non-slip feet",
    ],
    colors: ["Black", "Gray", "Brown"],
    dimensions: {
      width: 18,
      depth: 18,
      height: 30,
    },
  },
  {
    id: "dn-003",
    name: "Buffet Cabinet",
    category: "Dining",
    price: 899,
    originalPrice: 1099,
    rating: 4.6,
    reviewCount: 28,
    isNew: true,
    isSale: false,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Elegant buffet cabinet with ample storage for dining essentials.",
    features: [
      "Solid wood construction",
      "Adjustable shelves",
      "Soft-close doors",
      "Wine rack",
    ],
    colors: ["Walnut", "White", "Black"],
    dimensions: {
      width: 60,
      depth: 18,
      height: 36,
    },
  },
  {
    id: "dn-004",
    name: "Round Dining Table",
    category: "Dining",
    price: 699,
    originalPrice: 899,
    rating: 4.5,
    reviewCount: 34,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description: "Elegant round dining table perfect for intimate gatherings.",
    features: [
      "Solid wood construction",
      "Pedestal base",
      "Scratch-resistant finish",
    ],
    colors: ["Walnut", "White", "Black"],
    dimensions: {
      diameter: 48,
      height: 30,
    },
    seating: 4,
  },
  {
    id: "dn-005",
    name: "Dining Chairs Set",
    category: "Dining",
    price: 599,
    originalPrice: 799,
    rating: 4.4,
    reviewCount: 38,
    isNew: true,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description: "Set of 4 comfortable dining chairs with elegant design.",
    features: [
      "Upholstered seats",
      "Solid wood frame",
      "Ergonomic design",
      "Stain-resistant fabric",
    ],
    colors: ["Gray", "Beige", "Blue", "Green"],
    dimensions: {
      width: 18,
      depth: 22,
      height: 36,
    },
  },

  // Office
  {
    id: "of-001",
    name: "Ergonomic Office Chair",
    category: "Office",
    price: 249,
    originalPrice: 299,
    rating: 4.2,
    reviewCount: 28,
    isNew: true,
    isSale: false,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Comfortable ergonomic office chair with adjustable features for all-day comfort.",
    features: [
      "Adjustable height",
      "Lumbar support",
      "Breathable mesh",
      "360° swivel",
      "Armrests",
    ],
    colors: ["Black", "Gray", "Blue"],
    dimensions: {
      width: 26,
      depth: 26,
      height: "36-42",
    },
  },
  {
    id: "of-002",
    name: "Executive Desk",
    category: "Office",
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 32,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description: "Spacious executive desk with drawers and ample workspace.",
    features: [
      "Solid wood construction",
      "Cable management",
      "Lockable drawers",
      "Scratch-resistant finish",
    ],
    colors: ["Walnut", "Oak", "Black"],
    dimensions: {
      width: 60,
      depth: 30,
      height: 30,
    },
  },
  {
    id: "of-003",
    name: "Bookshelf",
    category: "Office",
    price: 349,
    originalPrice: 449,
    rating: 4.5,
    reviewCount: 42,
    isNew: true,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Modern bookshelf with adjustable shelves for books and decor.",
    features: [
      "Adjustable shelves",
      "Solid wood construction",
      "Anti-tip hardware",
      "Easy assembly",
    ],
    colors: ["Walnut", "White", "Black"],
    dimensions: {
      width: 36,
      depth: 12,
      height: 72,
    },
  },
  {
    id: "of-004",
    name: "Filing Cabinet",
    category: "Office",
    price: 199,
    originalPrice: 249,
    rating: 4.3,
    reviewCount: 26,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Compact filing cabinet with lockable drawers for document storage.",
    features: [
      "Lockable drawers",
      "Smooth gliding",
      "Letter/legal size",
      "Anti-tip mechanism",
    ],
    colors: ["Black", "White", "Gray"],
    dimensions: {
      width: 15,
      depth: 22,
      height: 28,
    },
  },
  {
    id: "of-005",
    name: "Standing Desk",
    category: "Office",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviewCount: 48,
    isNew: true,
    isSale: false,
    image: "/placeholder.svg?height=300&width=300",
    description: "Adjustable standing desk for ergonomic work setup.",
    features: [
      "Electric height adjustment",
      "Memory settings",
      "Cable management",
      "Sturdy construction",
    ],
    colors: ["Black", "White", "Bamboo"],
    dimensions: {
      width: 60,
      depth: 30,
      height: "28-48",
    },
  },

  // Outdoor
  {
    id: "ou-001",
    name: "Patio Dining Set",
    category: "Outdoor",
    price: 899,
    originalPrice: 1199,
    rating: 4.6,
    reviewCount: 38,
    isNew: true,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Complete patio dining set with table and 6 chairs for outdoor entertaining.",
    features: [
      "Weather-resistant",
      "UV-protected",
      "Rust-proof frame",
      "Easy to clean",
    ],
    colors: ["Brown", "Gray", "Black"],
    dimensions: {
      table: {
        width: 72,
        depth: 42,
        height: 30,
      },
      chairs: {
        width: 22,
        depth: 24,
        height: 36,
      },
    },
    seating: 6,
  },
  {
    id: "ou-002",
    name: "Outdoor Lounge Chair",
    category: "Outdoor",
    price: 349,
    originalPrice: 449,
    rating: 4.4,
    reviewCount: 32,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description: "Comfortable outdoor lounge chair with adjustable backrest.",
    features: [
      "Weather-resistant",
      "Adjustable backrest",
      "Cushioned seat",
      "Foldable design",
    ],
    colors: ["Brown", "Gray", "Blue"],
    dimensions: {
      width: 26,
      depth: 70,
      height: 38,
    },
  },
  {
    id: "ou-003",
    name: "Patio Umbrella",
    category: "Outdoor",
    price: 129,
    originalPrice: 179,
    rating: 4.3,
    reviewCount: 45,
    isNew: true,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description: "Large patio umbrella with tilt function for optimal shade.",
    features: [
      "UV-resistant fabric",
      "Tilt function",
      "Crank mechanism",
      "Wind vent",
    ],
    colors: ["Beige", "Green", "Blue", "Red"],
    dimensions: {
      diameter: 9,
      height: 8,
    },
  },
  {
    id: "ou-004",
    name: "Outdoor Fire Pit",
    category: "Outdoor",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 56,
    isNew: false,
    isSale: true,
    image: "/placeholder.svg?height=300&width=300",
    description: "Stylish outdoor fire pit for cozy gatherings.",
    features: [
      "Weather-resistant",
      "Spark screen",
      "Wood-burning",
      "Easy assembly",
    ],
    colors: ["Black", "Bronze", "Copper"],
    dimensions: {
      diameter: 36,
      height: 24,
    },
  },
  {
    id: "ou-005",
    name: "Garden Bench",
    category: "Outdoor",
    price: 249,
    originalPrice: 329,
    rating: 4.5,
    reviewCount: 38,
    isNew: true,
    isSale: false,
    image: "/placeholder.svg?height=300&width=300",
    description: "Elegant garden bench for outdoor seating.",
    features: [
      "Weather-resistant",
      "Sturdy construction",
      "Ergonomic design",
      "Easy assembly",
    ],
    colors: ["Teak", "White", "Black"],
    dimensions: {
      width: 48,
      depth: 24,
      height: 36,
    },
  },
];

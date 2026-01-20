"use client";

import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductSectionDynamic from "../components/product-section-dynamic";
import QuickLinks from "../components/home/QuickLinks";
import InfoSection from "../components/info-section";
import {categories} from "../lib/categoryData"; // Ensure categories data is imported

export default function HomeDynamic() {
  // ================= SCHEMA DATA =================
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bobby Furniture",
    url: "https://bobbyfurniturekenya.com",
    logo: "https://bobbyfurniturekenya.com/logo5.png",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Bobby Furniture",
    image: "https://bobbyfurniturekenya.com/logo5.png",
    url: "https://bobbyfurniturekenya.com",
    telephone: "+254-708-156310",
    priceRange: "KES",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kahawa Sukari",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-1.286389",
      longitude: "36.817223"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00"
      }
    ],
    sameAs: [
      "https://www.facebook.com/bobbyfurnitureKenya",
      "https://www.instagram.com/bobbyfurniturekenya",
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bobby Furniture",
    url: "https://bobbyfurniturekenya.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://bobbyfurniturekenya.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://bobbyfurniturekenya.com/"
    }]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you deliver furniture across Kenya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we deliver furniture to all major towns across Kenya including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, and many other locations. We offer both free delivery within Nairobi and affordable delivery rates for upcountry locations."
        }
      },
      {
        "@type": "Question",
        name: "What types of furniture do you sell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer a wide range of furniture including living room furniture (sofas, coffee tables, TV stands), bedroom furniture (beds, wardrobes, dressing tables), dining room furniture (dining tables and chairs), office furniture (desks, office chairs, cabinets), and kids furniture (bunk beds, study desks, storage solutions)."
        }
      },
      {
        "@type": "Question",
        name: "Do you offer furniture installation services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide professional furniture assembly and installation services. Our experienced team ensures your furniture is properly set up in your home or office."
        }
      },
      {
        "@type": "Question",
        name: "What are your payment options?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept multiple payment methods including M-PESA, bank transfers, credit/debit cards, and cash on delivery. We also offer flexible payment plans for larger purchases."
        }
      },
      {
        "@type": "Question",
        name: "Do you offer warranty on furniture?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our furniture comes with a warranty. The warranty period varies by product type and ranges from 6 months to 2 years, covering manufacturing defects and craftsmanship issues."
        }
      }
    ]
  };

  // Update meta tags using useEffect (works without HelmetProvider)

  
useEffect(() => {
  // ================== META HELPER ==================
  const setMetaTag = (name, content, property = false) => {
    const attr = property ? "property" : "name";
    let meta = document.querySelector(`meta[${attr}="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attr, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  };

  // ================== PAGE META ==================
  document.title = "Bobby Furniture | Quality Furniture for Sale in Kenya";

  setMetaTag(
    "description",
    "Buy quality furniture in Nairobi. Shop sofas, beds, dining tables, office & kids furniture at affordable prices."
  );

  setMetaTag(
    "keywords",
    "furniture Kenya, furniture Nairobi, buy furniture online Kenya, sofa sets Kenya, beds Kenya, dining tables Kenya, office furniture Kenya"
  );

  // ================== OPEN GRAPH ==================
  setMetaTag("og:type", "website", true);
  setMetaTag("og:url", "https://bobbyfurniturekenya.com", true);
  setMetaTag(
    "og:title",
    "Furniture Shop in Kenya | Affordable Home & Office Furniture",
    true
  );
  setMetaTag(
    "og:description",
    "Buy quality furniture in Kenya. Shop sofas, beds, dining tables, office & kids furniture.",
    true
  );
  setMetaTag(
    "og:image",
    "https://bobbyfurniturekenya.com/images/og-image.jpg",
    true
  );

  // ================== TWITTER ==================
  setMetaTag("twitter:card", "summary_large_image", true);
  setMetaTag("twitter:url", "https://bobbyfurniturekenya.com", true);
  setMetaTag(
    "twitter:title",
    "Bobby Furniture | Quality Furniture for Sale in Kenya",
    true
  );
  setMetaTag(
    "twitter:description",
    "Buy quality furniture in Nairobi. Shop sofas, beds, dining tables, office & kids furniture.",
    true
  );
  setMetaTag(
    "twitter:image",
    "https://bobbyfurniturekenya.com/images/og-image.jpg",
    true
  );

  // ================== CANONICAL ==================
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", "https://bobbyfurniturekenya.com");

  // ================== SCHEMA HELPER ==================
  const addSchema = (schema, id) => {
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);     
    }
    script.textContent = JSON.stringify(schema);
  };

  // ================== CATEGORY PRODUCT SCHEMA ==================
  categories.forEach((category, index) => {
    const categoryDescription = `Shop ${category.name} in Nairobi. Available online at Bobby Furniture.`;

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": category.h1 || `${category.name} in Nairobi`,
      "description": category.seoDescription || categoryDescription,
      "image": [
        `https://bobbyfurniturekenya.com/images/categories/${category.slug}.jpg`
      ],
      "brand": {
        "@type": "Brand",
        "name": "Bobby Furniture"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://bobbyfurniturekenya.com/category/${category.slug}`,
        "priceCurrency": "KES",
        "price": category.startingPrice || "15000",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      }
    };

    addSchema(productSchema, `schema-category-${index}`);
  });
}, [categories]);





  return (
    // bg-[url('/banners/bg_img.jpg')] bg-no-repeat bg-top
    <div className="bg-[#e9e9e9]">
      <main className="min-h-screen mx-auto max-w-[1170px] py-1 sm:py-2 md:py-4">

        {/* ================= HERO SECTION ================= */}
       
        <HeroSection />
        {/* ================================================= */}

        {/* ================= FEATURED / SPONSORED ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Featured Furniture Deals in Kenya"
            viewMoreLink="/featured"
            color="blue-500"
            text="white"
            type="featured"
            limit={9}
          />
        </div>

        {/* ================= NEW ARRIVALS ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="New Furniture Arrivals in Kenya"
            viewMoreLink="/new-arrivals"
            color="blue-500"
            text="white"
            type="new-arrivals"
            limit={9}
          />
        </div>

        {/* ================= KIDS FURNITURE ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Kids Furniture for Sale in Kenya"
            viewMoreLink="/categories/kids-room"
            color="white"
            text="gray-500"
            categories="kids-room"
            type="categories"
            limit={9}
          />
        </div>

        <div className="mt-2">
          <ProductSectionDynamic
            title="Bunk Beds & Double Deckers in Kenya"
            viewMoreLink="/categories/kids-room-double-deckers"
            color="white"
            text="gray-500"
            categories="kids-room-double-deckers"
            type="categories"
            limit={9}
          />
        </div>

        {/* ================= LIVING ROOM ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Sofa Sets for Sale in Kenya"
            viewMoreLink="/categories/living-room-sectional-sofas"
            color="white"
            text="gray-500"
            categories="living-room-sectional-sofas"
            type="categories"
            limit={9}
          />
        </div>

        <div className="mt-2">
          <ProductSectionDynamic
            title="Living Room Furniture for Sale in Kenya"
            viewMoreLink="/categories/living-room"
            color="white"
            text="gray-500"
            categories="living-room"
            type="categories"
            limit={9}
          />
        </div>

        {/* ================= DINING ROOM ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Dining Tables and Sets for Sale in Kenya"
            viewMoreLink="/categories/dining-room"
            color="blue-500"
            text="white"
            categories="dining-room"
            type="categories"
            limit={9}
          />
        </div>

        

        <QuickLinks />
        <InfoSection />

      </main>
    </div>
  );
}
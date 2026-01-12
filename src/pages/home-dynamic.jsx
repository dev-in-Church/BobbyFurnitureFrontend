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
    telephone: "+254-XXX-XXXXXX",
    priceRange: "KES",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address",
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
  const siteName = "Bobby Furniture";
  const city = "Nairobi";
  const siteUrl = "https://bobbyfurniturekenya.com";

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

  // Default homepage meta
  document.title = `${siteName} | Quality Furniture in ${city}`;
  setMetaTag("description", `Shop quality furniture in ${city} and across Kenya. Sofas, beds, dining tables, office and kids furniture at affordable prices.`);
  setMetaTag("keywords", `furniture ${city}, furniture Kenya, buy sofas ${city}, beds ${city}, dining tables ${city}, office furniture ${city}, kids furniture ${city}`);

  // Open Graph / Twitter
  setMetaTag("og:type", "website", true);
  setMetaTag("og:url", siteUrl, true);
  setMetaTag("og:title", `${siteName} | Quality Furniture in ${city}`, true);
  setMetaTag("og:description", `Shop quality furniture in ${city} and across Kenya. Sofas, beds, dining tables, office and kids furniture.`, true);
  setMetaTag("og:image", `${siteUrl}/og-image.jpg`, true);

  setMetaTag("twitter:card", "summary_large_image", true);
  setMetaTag("twitter:url", siteUrl, true);
  setMetaTag("twitter:title", `${siteName} | Quality Furniture in ${city}`, true);
  setMetaTag("twitter:description", `Shop quality furniture in ${city} and across Kenya.`, true);
  setMetaTag("twitter:image", `${siteUrl}/og-image.jpg`, true);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", siteUrl);

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: siteName,
    image: `${siteUrl}/logo5.png`,
    url: siteUrl,
    telephone: "+254-708-156310",
    priceRange: "KES",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kahawa Sukari, Nairobi",
      addressLocality: city,
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-1.286389",
      longitude: "36.817223",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" }
    ],
    sameAs: [
      "https://www.facebook.com/bobbyfurnitureKenya",
      "https://www.instagram.com/bobbyfurniturekenya"
    ]
  };

  let scriptLB = document.getElementById('schema-local-business');
  if (!scriptLB) {
    scriptLB = document.createElement('script');
    scriptLB.type = 'application/ld+json';
    scriptLB.id = 'schema-local-business';
    document.head.appendChild(scriptLB);
  }
  scriptLB.textContent = JSON.stringify(localBusinessSchema);

  //  Generate Product Schema for each category dynamically
  categories.forEach((category, index) => {
    let script = document.getElementById(`schema-category-${index}`);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `schema-category-${index}`;
      document.head.appendChild(script);
    }

    // Build description dynamically from subcategories
    const subcatDescriptions = category.subcategories.map(sub => sub.title).join(", ");
    const itemsList = category.subcategories.flatMap(sub => sub.items).join(", ");

    const categorySchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${category.name} Furniture in ${city}`,
      description: `Shop ${category.name} furniture in ${city}: ${subcatDescriptions}. Items include: ${itemsList}. Available online at ${siteName}.`,
      brand: siteName,
      offers: {
        "@type": "Offer",
        priceCurrency: "KES",
        price: "Varies",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/category/${category.name.toLowerCase().replace(/\s+/g,"-")}`
      }
    };

    script.textContent = JSON.stringify(categorySchema);

    // Optional: Add meta description/keywords per category
    setMetaTag(`description-${category.id}`, categorySchema.description);
    setMetaTag(`keywords-${category.id}`, `${category.name} furniture ${city}, ${itemsList.split(", ").slice(0, 10).join(", ")}...`);
  });

}, []);



  return (
    <div className="bg-[#0B3D2E] bg-[url('/banners/bg_img.jpg')] bg-no-repeat bg-top">

      <main className="min-h-screen mx-auto max-w-[1170px] py-1 sm:py-2 md:py-4">

        {/* ================= HERO SECTION ================= */}
       
        <HeroSection />
        {/* ================================================= */}

        {/* ================= FEATURED / SPONSORED ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Featured Furniture Deals in Kenya"
            viewMoreLink="/featured"
            color="red-500"
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
            color="green-500"
            text="white"
            type="new-arrivals"
            limit={9}
          />
        </div>

        {/* ================= KIDS FURNITURE ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Kids Furniture for Sale in Kenya"
            viewMoreLink="/category/kids-room"
            color="white"
            text="gray-500"
            category="kids-room"
            type="category"
            limit={9}
          />
        </div>

        <div className="mt-2">
          <ProductSectionDynamic
            title="Bunk Beds & Double Deckers in Kenya"
            viewMoreLink="/category/kids-room-double-deckers"
            color="white"
            text="gray-500"
            category="kids-room-double-deckers"
            type="category"
            limit={9}
          />
        </div>

        {/* ================= LIVING ROOM ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Sofa Sets for Sale in Kenya"
            viewMoreLink="/category/living-room-sectional-sofas"
            color="white"
            text="gray-500"
            category="living-room-sectional-sofas"
            type="category"
            limit={9}
          />
        </div>

        <div className="mt-2">
          <ProductSectionDynamic
            title="Living Room Furniture for Sale in Kenya"
            viewMoreLink="/category/living-room"
            color="white"
            text="gray-500"
            category="living-room"
            type="category"
            limit={9}
          />
        </div>

        {/* ================= DINING ROOM ================= */}
        <div className="mt-2">
          <ProductSectionDynamic
            title="Dining Tables and Sets for Sale in Kenya"
            viewMoreLink="/category/dining-room"
            color="blue-500"
            text="white"
            category="dining-room"
            type="category"
            limit={9}
          />
        </div>

        

        <QuickLinks />
        <InfoSection />

      </main>
    </div>
  );
}
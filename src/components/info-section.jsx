"use client";

import { Link } from "react-router-dom";

export default function InfoSection() {
  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Placing an order is easy! Simply browse our website, select the products you want, add them to your cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit cards, M-Pesa, and bank transfers. Choose the one that suits you best during the checkout process.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery times may vary depending on your location and the product. We strive to deliver your orders as quickly as possible, and you can check the estimated delivery time during the checkout process. Standard delivery within Nairobi takes 3-7 business days.",
    },
    {
      question: "Do you offer refunds or returns?",
      answer:
        "Yes, we have a hassle-free return and refund policy. If you're not satisfied with your purchase, you can initiate a return request, and we'll guide you through the process. We offer a 30-day return policy on most items.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely. We take data security seriously and have robust measures in place to protect your personal information. Your data is safe with us, and we never share your information with third parties without your consent.",
    },
  ];

  return (
    <section className="overflow-hidden min-h-screen mt-4 rounded-sm">
      <div className="px-2 bg-white">
        <div className="p-2">
          {/* Company Introduction */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Bobby Furniture - Kenya's Leading Furniture E-Commerce
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to the ultimate online furniture shopping destination!
            </p>
            <p className="text-gray-600 text-sm">
              Our{" "}
              <span className="font-semibold">premium furniture platform</span>{" "}
              is here to revolutionize your shopping journey. Whether you're on
              the hunt for cozy sofas, elegant bedroom sets, or essential
              household appliances, we've got it all. We're not just an ordinary
              online shop; we're your digital shopping haven. Be prepared to
              discover a world of quality, affordability, and convenience at
              Bobby Furniture. Modern, stylish, and at amazing prices!
            </p>
          </div>

          {/* Best Prices Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Best Prices, Premium Brands, and Diverse Categories
            </h3>
            <p className="text-gray-600 text-sm">
              Our commitment to excellence is evident in our extensive
              collection of{" "}
              <span className="font-semibold">high-quality furniture</span>,
              including <span className="font-semibold">living room sets</span>,{" "}
              <span className="font-semibold">bedroom collections</span>,{" "}
              <span className="font-semibold">dining room furniture</span>, and{" "}
              <span className="font-semibold">office solutions</span>. From the
              newest{" "}
              <Link
                to="/category/modern"
                className="text-blue-600 hover:underline"
              >
                Modern
              </Link>{" "}
              to the established{" "}
              <Link
                to="/category/traditional"
                className="text-blue-600 hover:underline"
              >
                Traditional
              </Link>{" "}
              and{" "}
              <Link
                to="/category/classic"
                className="text-blue-600 hover:underline"
              >
                Classic
              </Link>{" "}
              styles, we offer the products that you crave. We take pride in our
              regularly updated{" "}
              <Link
                to="/new-arrivals"
                className="text-blue-600 hover:underline"
              >
                New Arrivals
              </Link>{" "}
              and{" "}
              <Link
                to="/best-sellers"
                className="text-blue-600 hover:underline"
              >
                Best Sellers
              </Link>{" "}
              with exceptional designs from renowned top brands.
            </p>
          </div>

          {/* Offers Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Tempting Offers, Exclusive Promotions, and Enormous Savings
            </h3>
            <p className="text-gray-600 text-sm">
              Get ready to be enchanted by our incredible{" "}
              <Link to="/offers" className="text-blue-600 hover:underline">
                offers
              </Link>
              , exclusive{" "}
              <Link to="/promotions" className="text-blue-600 hover:underline">
                promotions
              </Link>
              , and substantial{" "}
              <Link to="/discounts" className="text-blue-600 hover:underline">
                discounts
              </Link>{" "}
              when you buy online. Our online store is your gateway to
              unparalleled{" "}
              <span className="font-semibold">great clearance sales</span> from
              high-quality{" "}
              <Link to="/brands" className="text-blue-600 hover:underline">
                furniture brands
              </Link>{" "}
              in the grandeur of their glory. We ensure that your{" "}
              <span className="font-semibold">online shopping experience</span>{" "}
              is nothing short of astonishing, due to an extensive range of
              products, from sofas to dining tables, all at competitive prices.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Exceptional Services
            </h3>
            <p className="text-gray-600 text-sm">
              At Bobby Furniture, we pride ourselves on offering exceptional
              services that set us apart from other furniture online retailers.
              What's more, we offer a wide range of products with{" "}
              <span className="font-semibold">
                free delivery & assembly within NAIROBI
              </span>
              <img
                src="kenya.svg"
                alt="kenya"
                className="h-4 inline-block ml-2"
              />
              , making your shopping experience convenient and economical. To
              bolster our selection and enrich the overall appeal of our
              shopping features and items, shop with confidence in the{" "}
              <span className="font-semibold">
                official Bobby Furniture store
              </span>{" "}
              for quality without breaking the bank. When you shop with us,
              you're not just buying furniture; you're investing in a lifestyle.
              Our team of experts is dedicated to providing you with an
              exceptional quality and innovation right to your fingertips.
            </p>
          </div>

          {/* Events Section */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              Mark your calendar for our spectacular campaign events.{" "}
              <Link to="/flash-sales" className="text-blue-600 hover:underline">
                Flash Sales
              </Link>{" "}
              is your portal to the latest technological innovations.{" "}
              <Link
                to="/anniversary-sale"
                className="text-blue-600 hover:underline"
              >
                Anniversary Sales
              </Link>{" "}
              celebrates fantastic deals.{" "}
              <Link
                to="/black-friday"
                className="text-blue-600 hover:underline"
              >
                Black Friday
              </Link>{" "}
              promises to be the shopping extravaganza of the year, and{" "}
              <Link
                to="/festive-sale"
                className="text-blue-600 hover:underline"
              >
                Festive Sales
              </Link>{" "}
              are a celebration of all seasons. Brace yourself for the ultimate
              online shopping experience brimming with exciting deals,
              discounts, and products that cater to your every need when you buy
              online. You're now part of the excitement!
            </p>
          </div>

          {/* Mobile App Section */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              At Bobby Furniture, we've brought the entire shopping universe
              right to your fingertips. We're available on all platforms,
              ensuring that you get a full dose of discovering the best{" "}
              <span className="font-semibold">online deals</span>, exciting
              offers, enticing deals, and unbeatable prices.
            </p>
          </div>

          {/* FAQs Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-5">FAQs</h3>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-2"
                >
                  <h4 className="font-medium text-gray-800 mb-2">
                    {index + 1}. {faq.question}
                  </h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

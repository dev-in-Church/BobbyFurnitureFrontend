import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaMinus,
  FaRegEnvelope,
  FaHeadset,
  FaRegSmile,
} from "react-icons/fa";

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqData = [
    {
      category: "Orders",
      question: "How do I place an order?",
      answer:
        "To place an order, browse our products, add them to the cart, and proceed to checkout.",
    },
    {
      category: "Payments",
      question: "What payment methods do you accept?",
      answer: "We accept payments via credit cards, M-Pesa, and more.",
    },
    {
      category: "Shipping",
      question: "How can I track my order?",
      answer:
        "Once shipped, you will receive a tracking number to track your order.",
    },
    {
      category: "Returns",
      question: "What is your return policy?",
      answer: "We accept returns within 30 days for most products.",
    },
  ];

  const filteredFAQs = faqData.filter(
    (faq) =>
      (selectedCategory === "all" || faq.category === selectedCategory) &&
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📖 Help Center
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["all", "Orders", "Payments", "Shipping", "Returns"].map(
            (category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-300 text-gray-800"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300"
              >
                <div
                  className={`p-4 flex justify-between items-center cursor-pointer border-b ${
                    activeIndex === index ? "bg-blue-100" : "bg-gray-50"
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h2>
                  <span className="text-xl text-gray-500">
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="p-4 text-gray-600 bg-white">{faq.answer}</div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              ❌ No results found. Try a different search term.
            </p>
          )}
        </div>

        {/* Contact Form for Unresolved Issues */}
        <div className="mt-10 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaRegEnvelope className="text-blue-600" /> Still Need Help?
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Your Name"
            />
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Your Email"
            />
            <textarea
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Describe your issue..."
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Submit
            </button>
          </form>
        </div>

        {/* Feedback Section */}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaRegSmile className="text-green-600" /> Provide Feedback
          </h2>
          <textarea
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
            placeholder="Tell us how we can improve our help page..."
          ></textarea>
          <button className="mt-4 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition">
            Submit Feedback
          </button>
        </div>

        {/* Live Chat Widget */}
        <div className="mt-10 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaHeadset className="text-blue-600" /> Live Chat Support
          </h2>
          <p className="text-gray-600 mb-4">
            Chat with our support team for instant help.
          </p>
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
            Start Live Chat
          </button>
        </div>

        {/* FAQ Summary */}
        <div className="mt-10 text-center">
          <p className="text-gray-600">Total FAQs: {faqData.length}</p>
          <p className="text-gray-600">Current Category: {selectedCategory}</p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;

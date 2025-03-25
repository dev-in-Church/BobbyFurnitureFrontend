"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Minus,
  Mail,
  Headphones,
  SmilePlus,
  ChevronUp,
  ChevronDown,
  BookOpen,
  HelpingHand,
  MessageSquare,
  Tag,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  Filter,
  Send,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedbackText, setFeedbackText] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Reset status messages after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  useEffect(() => {
    if (feedbackStatus) {
      const timer = setTimeout(() => {
        setFeedbackStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [feedbackStatus]);

  const faqData = [
    {
      category: "General",
      question: "What is Bobby Furniture?",
      answer:
        "Bobby Furniture is a leading online furniture store that offers high-quality, stylish, and durable furniture for homes, offices, and commercial spaces. We provide a wide range of products, including sofas, tables, chairs, beds, wardrobes, and custom-made furniture.",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      category: "General",
      question: "Where is your store located?",
      answer:
        "Our main office and showroom are located at Kahawa Sukari, Nairobi, Kenya. However, we are primarily an online store, and you can conveniently shop through our website.",
      icon: <HelpingHand className="w-5 h-5" />,
    },
    {
      category: "General",
      question: "Do you offer custom furniture designs?",
      answer:
        "Yes! We allow customers to request custom furniture designs, including size, material, and color preferences. Contact our team for a consultation and quotation.",
      icon: <HelpingHand className="w-5 h-5" />,
    },
    {
      category: "General",
      question: "Do you provide interior design consultation services?",
      answer:
        "Yes, we offer interior design consultation to help you choose the perfect furniture that suits your space and style. Contact us for more details.",
      icon: <HelpingHand className="w-5 h-5" />,
    },
    {
      category: "General",
      question: "Are your products made from sustainable materials?",
      answer:
        "We prioritize sustainability and use responsibly sourced wood and eco-friendly materials wherever possible. Each product page provides information about the materials used.",
      icon: <HelpingHand className="w-5 h-5" />,
    },
    {
      category: "General",
      question: "How do I contact customer support?",
      answer:
        "You can contact us via: Phone: +254 712 345 678 Email: bobbyfurniture@gmail.com Live Chat: Visit our website and click on the chat icon in the bottom right corner.",
      icon: <HelpingHand className="w-5 h-5" />,
    },
    {
      category: "Orders",
      question: "How do I place an order?",
      answer:
        "To place an order, browse our products, add them to the cart, and proceed to checkout. Follow the steps to enter your shipping details and payment information.",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      category: "Payments",
      question: "What payment methods do you accept?",
      answer: "We accept payments via credit cards, M-Pesa, and more.",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      category: "Shipping",
      question: "How can I track my order?",
      answer:
        "Once shipped, you will receive a tracking number to track your order.",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      category: "Returns",
      question: "What is your return policy?",
      answer: "We accept returns within 30 days for most products.",
      icon: <RotateCcw className="w-5 h-5" />,
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

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateContactForm = () => {
    const errors = {};

    if (!contactForm.name.trim()) {
      errors.name = "Name is required";
    }

    if (!contactForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = "Email is invalid";
    }

    if (!contactForm.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!validateContactForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubmitStatus("success");
      setContactForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackText.trim()) {
      setFormErrors({
        ...formErrors,
        feedback: "Please enter your feedback",
      });
      return;
    }

    setFeedbackSubmitting(true);
    setFeedbackStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setFeedbackStatus("success");
      setFeedbackText("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setFeedbackStatus("error");
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const categoryIcons = {
    all: <Filter className="w-5 h-5" />,
    General: <HelpingHand className="w-5 h-5" />,
    Orders: <ShoppingCart className="w-5 h-5" />,
    Payments: <CreditCard className="w-5 h-5" />,
    Shipping: <Truck className="w-5 h-5" />,
    Returns: <RotateCcw className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <HelpingHand className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How Can We Help You?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions or contact our support
            team for assistance.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="relative mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {Object.keys(categoryIcons).map((category, index) => (
            <motion.button
              key={category}
              className={`px-5 py-3 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              {categoryIcons[category]}
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="text-blue-600 w-6 h-6" />
            Frequently Asked Questions
          </h2>

          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <div
                    className={`p-5 flex justify-between items-center cursor-pointer transition-colors ${
                      activeIndex === index ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          activeIndex === index
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {faq.icon}
                      </div>
                      <h3
                        className={`text-lg font-medium ${
                          activeIndex === index
                            ? "text-blue-700"
                            : "text-gray-800"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`p-1 rounded-full ${
                        activeIndex === index
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {activeIndex === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 text-gray-600 border-t border-gray-100 bg-white">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try a different search term or browse by category.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Mail className="text-blue-600 w-6 h-6" />
              Still Need Help?
            </h2>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className={`w-full p-3 border ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="Enter your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className={`w-full p-3 border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows="4"
                  className={`w-full p-3 border ${
                    formErrors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="Describe your issue in detail..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Request
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>
                    Your message has been sent successfully! We'll get back to
                    you soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>
                    There was an error sending your message. Please try again
                    later.
                  </p>
                </div>
              )}
            </form>
          </motion.div>

          {/* Live Chat & Feedback */}
          <div className="space-y-8">
            {/* Live Chat Widget */}
            <motion.div
              className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Headphones className="text-blue-600 w-6 h-6" />
                Live Chat Support
              </h2>

              <p className="text-gray-600 mb-6">
                Need immediate assistance? Our support team is available to chat
                with you in real-time during business hours.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-green-600 font-medium">
                  Support agents are online
                </p>
              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Live Chat
              </button>
            </motion.div>

            {/* Feedback Section */}
            <motion.div
              className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SmilePlus className="text-blue-600 w-6 h-6" />
                Provide Feedback
              </h2>

              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  rows="4"
                  value={feedbackText}
                  onChange={(e) => {
                    setFeedbackText(e.target.value);
                    if (formErrors.feedback) {
                      setFormErrors({
                        ...formErrors,
                        feedback: null,
                      });
                    }
                  }}
                  className={`w-full p-3 border ${
                    formErrors.feedback ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="Tell us how we can improve our help page..."
                ></textarea>

                {formErrors.feedback && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.feedback}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={feedbackSubmitting}
                  className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {feedbackSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </button>

                {feedbackStatus === "success" && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p>Thank you for your feedback!</p>
                  </div>
                )}

                {feedbackStatus === "error" && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                    <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p>
                      There was an error submitting your feedback. Please try
                      again.
                    </p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>

        {/* FAQ Summary */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              Total FAQs: {faqData.length}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              Current Category: {selectedCategory}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              Showing: {filteredFAQs.length} results
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;

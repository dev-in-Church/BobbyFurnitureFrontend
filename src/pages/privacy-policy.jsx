"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
  FaPrint,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({
    information: true,
    collection: false,
    usage: false,
    sharing: false,
    cookies: false,
    security: false,
    rights: false,
    children: false,
    changes: false,
    contact: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setExpandedSections({
        ...expandedSections,
        [sectionId]: true,
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 print:bg-blue-500">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            <div className="flex space-x-3">
              <button
                onClick={handlePrint}
                className="text-white hover:text-blue-100 transition-colors"
                aria-label="Print this page"
              >
                <FaPrint className="h-5 w-5" />
              </button>
              <Link
                to="/"
                className="text-white hover:text-blue-100 transition-colors flex items-center"
              >
                <FaArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
          <p className="text-blue-100 mt-2">Last Updated: March 26, 2025</p>
        </div>

        <div className="p-6 md:flex">
          {/* Table of Contents - Desktop */}
          <div className="hidden md:block w-64 pr-8 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Contents
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("information")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    1. Information We Collect
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("collection")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    2. How We Collect Information
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("usage")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    3. How We Use Your Information
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("sharing")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    4. Information Sharing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("cookies")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    5. Cookies & Tracking
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("security")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    6. Data Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("rights")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    7. Your Rights
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("children")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    8. Children's Privacy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("changes")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    9. Changes to This Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-left"
                  >
                    10. Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Table of Contents - Mobile */}
            <div className="md:hidden mb-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Quick Navigation
              </h2>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => scrollToSection(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Jump to section...
                </option>
                <option value="information">Information We Collect</option>
                <option value="collection">How We Collect Information</option>
                <option value="usage">How We Use Your Information</option>
                <option value="sharing">Information Sharing</option>
                <option value="cookies">Cookies & Tracking</option>
                <option value="security">Data Security</option>
                <option value="rights">Your Rights</option>
                <option value="children">Children's Privacy</option>
                <option value="changes">Changes to This Policy</option>
                <option value="contact">Contact Us</option>
              </select>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                This Privacy Policy describes how we collect, use, and share
                your personal information when you visit our website, use our
                services, or make a purchase. By using our services, you agree
                to the terms of this Privacy Policy.
              </p>

              {/* Section 1 */}
              <div className="mb-6 border-b pb-2" id="information">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("information")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    1. Information We Collect
                  </h2>
                  <span>
                    {expandedSections.information ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.information && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Personal Information:</strong> Name, email
                        address, phone number, shipping address, billing
                        address, and payment information.
                      </li>
                      <li>
                        <strong>Account Information:</strong> Login credentials,
                        purchase history, and preferences.
                      </li>
                      <li>
                        <strong>Device Information:</strong> IP address, browser
                        type, operating system, and device identifiers.
                      </li>
                      <li>
                        <strong>Usage Information:</strong> Pages visited,
                        products viewed, time spent on the site, and
                        interactions with our content.
                      </li>
                      <li>
                        <strong>Communication Information:</strong> Emails, chat
                        messages, and customer service interactions.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Section 2 */}
              <div className="mb-6 border-b pb-2" id="collection">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("collection")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    2. How We Collect Information
                  </h2>
                  <span>
                    {expandedSections.collection ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.collection && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We collect information through various methods:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Direct Interactions:</strong> When you create an
                        account, make a purchase, sign up for newsletters, or
                        contact our customer service.
                      </li>
                      <li>
                        <strong>Automated Technologies:</strong> Through
                        cookies, web beacons, and similar technologies when you
                        browse our website.
                      </li>
                      <li>
                        <strong>Third Parties:</strong> We may receive
                        information from business partners, social media
                        platforms, and analytics providers.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Section 3 */}
              <div className="mb-6 border-b pb-2" id="usage">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("usage")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    3. How We Use Your Information
                  </h2>
                  <span>
                    {expandedSections.usage ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.usage && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We use your information for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        To process and fulfill your orders, including shipping
                        and payment processing.
                      </li>
                      <li>To create and manage your account.</li>
                      <li>
                        To provide customer support and respond to inquiries.
                      </li>
                      <li>
                        To send transactional emails, such as order
                        confirmations and shipping updates.
                      </li>
                      <li>
                        To send marketing communications, if you have opted in.
                      </li>
                      <li>To improve our website, products, and services.</li>
                      <li>To personalize your shopping experience.</li>
                      <li>
                        To detect and prevent fraud and unauthorized access.
                      </li>
                      <li>To comply with legal obligations.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Section 4 */}
              <div className="mb-6 border-b pb-2" id="sharing">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("sharing")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    4. Information Sharing
                  </h2>
                  <span>
                    {expandedSections.sharing ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.sharing && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">We may share your information with:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Service Providers:</strong> Payment processors,
                        shipping companies, and customer service providers who
                        help us operate our business.
                      </li>
                      <li>
                        <strong>Business Partners:</strong> Trusted third
                        parties who assist us in offering products and services.
                      </li>
                      <li>
                        <strong>Legal Authorities:</strong> When required by
                        law, court order, or governmental regulation.
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In connection with
                        a merger, acquisition, or sale of assets.
                      </li>
                    </ul>
                    <p className="mt-3">
                      We do not sell your personal information to third parties.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 5 */}
              <div className="mb-6 border-b pb-2" id="cookies">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("cookies")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    5. Cookies & Tracking
                  </h2>
                  <span>
                    {expandedSections.cookies ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.cookies && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We use cookies and similar tracking technologies to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Remember your preferences and settings.</li>
                      <li>Keep track of items in your shopping cart.</li>
                      <li>Understand how you use our website.</li>
                      <li>
                        Improve our services and provide personalized content.
                      </li>
                      <li>
                        Measure the effectiveness of our marketing campaigns.
                      </li>
                    </ul>
                    <p className="mt-3">
                      You can manage your cookie preferences through your
                      browser settings. However, disabling certain cookies may
                      limit your ability to use some features of our website.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 6 */}
              <div className="mb-6 border-b pb-2" id="security">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("security")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    6. Data Security
                  </h2>
                  <span>
                    {expandedSections.security ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.security && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We implement appropriate security measures to protect your
                      personal information from unauthorized access, alteration,
                      disclosure, or destruction. These measures include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Encryption of sensitive data.</li>
                      <li>Secure networks and servers.</li>
                      <li>Regular security assessments.</li>
                      <li>Access controls and authentication procedures.</li>
                    </ul>
                    <p className="mt-3">
                      However, no method of transmission over the Internet or
                      electronic storage is 100% secure. While we strive to use
                      commercially acceptable means to protect your personal
                      information, we cannot guarantee its absolute security.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 7 */}
              <div className="mb-6 border-b pb-2" id="rights">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("rights")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    7. Your Rights
                  </h2>
                  <span>
                    {expandedSections.rights ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.rights && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      Depending on your location, you may have the following
                      rights regarding your personal information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Access:</strong> Request access to the personal
                        information we hold about you.
                      </li>
                      <li>
                        <strong>Correction:</strong> Request correction of
                        inaccurate or incomplete information.
                      </li>
                      <li>
                        <strong>Deletion:</strong> Request deletion of your
                        personal information in certain circumstances.
                      </li>
                      <li>
                        <strong>Restriction:</strong> Request restriction of
                        processing of your personal information.
                      </li>
                      <li>
                        <strong>Data Portability:</strong> Request the transfer
                        of your personal information to another service
                        provider.
                      </li>
                      <li>
                        <strong>Objection:</strong> Object to processing of your
                        personal information for certain purposes.
                      </li>
                      <li>
                        <strong>Withdraw Consent:</strong> Withdraw consent
                        where we rely on consent to process your personal
                        information.
                      </li>
                    </ul>
                    <p className="mt-3">
                      To exercise these rights, please contact us using the
                      information provided in the "Contact Us" section.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 8 */}
              <div className="mb-6 border-b pb-2" id="children">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("children")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    8. Children's Privacy
                  </h2>
                  <span>
                    {expandedSections.children ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.children && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      Our services are not intended for children under the age
                      of 13. We do not knowingly collect personal information
                      from children under 13. If you are a parent or guardian
                      and believe that your child has provided us with personal
                      information, please contact us, and we will take steps to
                      delete such information.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 9 */}
              <div className="mb-6 border-b pb-2" id="changes">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("changes")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    9. Changes to This Policy
                  </h2>
                  <span>
                    {expandedSections.changes ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.changes && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We may update this Privacy Policy from time to time to
                      reflect changes in our practices or for other operational,
                      legal, or regulatory reasons. The updated policy will be
                      posted on this page with a revised "Last Updated" date. We
                      encourage you to review this Privacy Policy periodically
                      to stay informed about how we are protecting your
                      information.
                    </p>
                    <p>
                      For significant changes, we will notify you through a
                      prominent notice on our website or by email.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 10 */}
              <div className="mb-6" id="contact">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("contact")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    10. Contact Us
                  </h2>
                  <span>
                    {expandedSections.contact ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.contact && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      If you have any questions, concerns, or requests regarding
                      this Privacy Policy or our privacy practices, please
                      contact us at:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>Email:</strong> privacy@yourcompany.com
                      </p>
                      <p>
                        <strong>Phone:</strong> (555) 123-4567
                      </p>
                      <p>
                        <strong>Address:</strong> 123 Main Street, Suite 100,
                        Anytown, ST 12345
                      </p>
                    </div>
                    <p className="mt-3">
                      We will respond to your inquiry as soon as possible and
                      within the timeframe required by applicable law.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
  FaPrint,
  FaTruck,
  FaGlobe,
  FaBox,
  FaExchangeAlt,
  FaShieldAlt,
} from "react-icons/fa";

const ShippingPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({
    domestic: true,
    international: false,
    processing: false,
    tracking: false,
    delivery: false,
    returns: false,
    damages: false,
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
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 print:bg-green-500">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Shipping Policy</h1>
            <div className="flex space-x-3">
              <button
                onClick={handlePrint}
                className="text-white hover:text-green-100 transition-colors"
                aria-label="Print this page"
              >
                <FaPrint className="h-5 w-5" />
              </button>
              <Link
                to="/"
                className="text-white hover:text-green-100 transition-colors flex items-center"
              >
                <FaArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
          <p className="text-green-100 mt-2">Last Updated: March 26, 2025</p>
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
                    onClick={() => scrollToSection("domestic")}
                    className="text-green-600 hover:text-green-800 transition-colors text-left"
                  >
                    1. Domestic Shipping
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("international")}
                    className="text-green-600 hover:text-green-800 transition-colors text-left"
                  >
                    2. International Shipping
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("processing")}
                    className="text-green-600 hover:text-green-800 transition-colors text-left"
                  >
                    3. Order Processing Time
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tracking")}
                    className="text-green-600 hover:text-green-800 transition-colors text-left"
                  >
                    4. Tracking Information
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("delivery")}
                    className="text-green-600 hover:text-green-800 transition-colors text-left"
                  >
                    5. Delivery Issues
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("returns")}
                    className="text-green-600 hover:text-green-800 transition-colors text-left"
                  >
                    6. Returns & Exchanges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("damages")}
                    className="text-green-600 hover:text-green-800 transition-colors text-left"
                  >
                    7. Damaged or Lost Items
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-green-600 hover:text-green-800 transition-colors text-left"
                  >
                    8. Contact Us
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
                <option value="domestic">Domestic Shipping</option>
                <option value="international">International Shipping</option>
                <option value="processing">Order Processing Time</option>
                <option value="tracking">Tracking Information</option>
                <option value="delivery">Delivery Issues</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="damages">Damaged or Lost Items</option>
                <option value="contact">Contact Us</option>
              </select>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Thank you for shopping with us. We want to ensure that your
                order reaches you in a timely manner and in perfect condition.
                This Shipping Policy outlines our shipping procedures, delivery
                timeframes, and related policies to provide you with a
                transparent and satisfactory shopping experience.
              </p>

              {/* Section 1 */}
              <div className="mb-6 border-b pb-2" id="domestic">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("domestic")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaTruck className="mr-2 text-green-500" />
                    1. Domestic Shipping
                  </h2>
                  <span>
                    {expandedSections.domestic ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.domestic && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We offer the following shipping options for domestic
                      orders:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 mb-4">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b text-left">
                              Shipping Method
                            </th>
                            <th className="py-2 px-4 border-b text-left">
                              Estimated Delivery Time
                            </th>
                            <th className="py-2 px-4 border-b text-left">
                              Cost
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border-b">
                              Standard Shipping
                            </td>
                            <td className="py-2 px-4 border-b">
                              5-7 business days
                            </td>
                            <td className="py-2 px-4 border-b">$5.99</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b">
                              Express Shipping
                            </td>
                            <td className="py-2 px-4 border-b">
                              2-3 business days
                            </td>
                            <td className="py-2 px-4 border-b">$12.99</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b">
                              Next Day Delivery
                            </td>
                            <td className="py-2 px-4 border-b">
                              1 business day
                            </td>
                            <td className="py-2 px-4 border-b">$19.99</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-3">
                      Free standard shipping is available for orders over $75.
                    </p>
                    <p>
                      Please note that delivery times are estimates and not
                      guaranteed. Delivery times may be affected by factors
                      outside our control, such as weather conditions, holidays,
                      or carrier delays.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 2 */}
              <div className="mb-6 border-b pb-2" id="international">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("international")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaGlobe className="mr-2 text-green-500" />
                    2. International Shipping
                  </h2>
                  <span>
                    {expandedSections.international ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.international && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We ship to most countries worldwide. International
                      shipping rates and delivery times vary depending on the
                      destination country and the shipping method selected at
                      checkout.
                    </p>
                    <p className="mb-3">
                      International customers are responsible for all duties,
                      import taxes, and customs fees that may be imposed by
                      their country's government. These charges are not included
                      in the order total and will be collected by the delivery
                      carrier or local customs office.
                    </p>
                    <p className="mb-3">
                      Estimated delivery times for international orders:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-3">
                      <li>
                        <strong>Canada and Mexico:</strong> 7-14 business days
                      </li>
                      <li>
                        <strong>Europe:</strong> 10-20 business days
                      </li>
                      <li>
                        <strong>Asia Pacific:</strong> 14-21 business days
                      </li>
                      <li>
                        <strong>Rest of World:</strong> 14-30 business days
                      </li>
                    </ul>
                    <p>
                      International delivery times are estimates only and may be
                      affected by customs processing, local delivery conditions,
                      and other factors outside our control.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 3 */}
              <div className="mb-6 border-b pb-2" id="processing">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("processing")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaBox className="mr-2 text-green-500" />
                    3. Order Processing Time
                  </h2>
                  <span>
                    {expandedSections.processing ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.processing && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      Orders are typically processed within 1-2 business days
                      after payment confirmation. During peak seasons or
                      promotional periods, processing times may be extended by
                      an additional 1-3 business days.
                    </p>
                    <p className="mb-3">
                      Business days are Monday through Friday, excluding
                      holidays. Orders placed after 2:00 PM EST will be
                      processed the following business day.
                    </p>
                    <p>
                      Once your order has been processed and shipped, you will
                      receive a shipping confirmation email with tracking
                      information.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 4 */}
              <div className="mb-6 border-b pb-2" id="tracking">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("tracking")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaBox className="mr-2 text-green-500" />
                    4. Tracking Information
                  </h2>
                  <span>
                    {expandedSections.tracking ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.tracking && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      A tracking number will be provided in your shipping
                      confirmation email for all orders. You can use this
                      tracking number to monitor the status and location of your
                      package.
                    </p>
                    <p className="mb-3">
                      For domestic shipments, tracking information is typically
                      updated within 24-48 hours after the shipping label is
                      created. International tracking may take longer to update
                      and may not provide the same level of detail as domestic
                      tracking.
                    </p>
                    <p>
                      If you have not received tracking information within 3
                      business days of your order confirmation, please contact
                      our customer service team.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 5 */}
              <div className="mb-6 border-b pb-2" id="delivery">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("delivery")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaTruck className="mr-2 text-green-500" />
                    5. Delivery Issues
                  </h2>
                  <span>
                    {expandedSections.delivery ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.delivery && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      If your package shows as delivered but you have not
                      received it, please:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mb-3">
                      <li>
                        Check with neighbors or others at your address who may
                        have accepted the package.
                      </li>
                      <li>
                        Look around the delivery location for the package
                        (porch, back door, garage, etc.).
                      </li>
                      <li>
                        Wait 24 hours, as sometimes packages are marked as
                        delivered before they actually arrive.
                      </li>
                      <li>
                        Contact the carrier directly using the tracking number
                        provided.
                      </li>
                      <li>
                        If you still cannot locate your package, please contact
                        our customer service team.
                      </li>
                    </ol>
                    <p>
                      For packages that are significantly delayed beyond the
                      estimated delivery timeframe, please contact our customer
                      service team for assistance.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 6 */}
              <div className="mb-6 border-b pb-2" id="returns">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("returns")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaExchangeAlt className="mr-2 text-green-500" />
                    6. Returns & Exchanges
                  </h2>
                  <span>
                    {expandedSections.returns ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.returns && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We accept returns and exchanges within 30 days of delivery
                      for items in their original condition. To initiate a
                      return or exchange, please:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mb-3">
                      <li>
                        Contact our customer service team to request a Return
                        Merchandise Authorization (RMA) number.
                      </li>
                      <li>
                        Package the item securely with all original packaging
                        and accessories.
                      </li>
                      <li>
                        Include the RMA number on the outside of the package.
                      </li>
                      <li>
                        Ship the package to the address provided by our customer
                        service team.
                      </li>
                    </ol>
                    <p className="mb-3">
                      Return shipping costs are the responsibility of the
                      customer unless the return is due to our error (damaged,
                      defective, or incorrect item).
                    </p>
                    <p>
                      Refunds will be issued to the original payment method
                      within 5-10 business days after we receive and inspect the
                      returned item.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 7 */}
              <div className="mb-6 border-b pb-2" id="damages">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("damages")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaShieldAlt className="mr-2 text-green-500" />
                    7. Damaged or Lost Items
                  </h2>
                  <span>
                    {expandedSections.damages ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.damages && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      If your item arrives damaged or defective, please contact
                      our customer service team within 48 hours of delivery.
                      Please include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-3">
                      <li>Your order number</li>
                      <li>A description of the damage or defect</li>
                      <li>Photos of the damaged item and packaging</li>
                    </ul>
                    <p className="mb-3">
                      For lost packages, we will initiate a trace with the
                      carrier if your tracking information has not updated for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-3">
                      <li>7 days for domestic shipments</li>
                      <li>21 days for international shipments</li>
                    </ul>
                    <p>
                      If the carrier confirms that the package is lost, we will
                      either replace the item or issue a full refund, at our
                      discretion.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 8 */}
              <div className="mb-6" id="contact">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("contact")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    8. Contact Us
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
                      If you have any questions about our Shipping Policy,
                      please contact our customer service team:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>Email:</strong> shipping@yourcompany.com
                      </p>
                      <p>
                        <strong>Phone:</strong> (555) 123-4567
                      </p>
                      <p>
                        <strong>Hours:</strong> Monday-Friday, 9:00 AM - 5:00 PM
                        EST
                      </p>
                    </div>
                    <p className="mt-3">
                      We strive to respond to all inquiries within 24 business
                      hours.
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

export default ShippingPolicy;

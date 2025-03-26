"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
  FaPrint,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaBoxOpen,
  FaExclamationTriangle,
  FaTruck,
  FaQuestionCircle,
  FaShieldAlt,
} from "react-icons/fa";

const ReturnPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({
    eligibility: true,
    process: false,
    refunds: false,
    exchanges: false,
    nonReturnable: false,
    shippingCosts: false,
    damaged: false,
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
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 print:bg-purple-500">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Return Policy</h1>
            <div className="flex space-x-3">
              <button
                onClick={handlePrint}
                className="text-white hover:text-purple-100 transition-colors"
                aria-label="Print this page"
              >
                <FaPrint className="h-5 w-5" />
              </button>
              <Link
                to="/"
                className="text-white hover:text-purple-100 transition-colors flex items-center"
              >
                <FaArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
          <p className="text-purple-100 mt-2">Last Updated: March 26, 2025</p>
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
                    onClick={() => scrollToSection("eligibility")}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left"
                  >
                    1. Return Eligibility
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("process")}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left"
                  >
                    2. Return Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("refunds")}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left"
                  >
                    3. Refunds
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("exchanges")}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left"
                  >
                    4. Exchanges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("nonReturnable")}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left"
                  >
                    5. Non-Returnable Items
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("shippingCosts")}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left"
                  >
                    6. Return Shipping Costs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("damaged")}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left"
                  >
                    7. Damaged or Defective Items
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left"
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
                <option value="eligibility">Return Eligibility</option>
                <option value="process">Return Process</option>
                <option value="refunds">Refunds</option>
                <option value="exchanges">Exchanges</option>
                <option value="nonReturnable">Non-Returnable Items</option>
                <option value="shippingCosts">Return Shipping Costs</option>
                <option value="damaged">Damaged or Defective Items</option>
                <option value="contact">Contact Us</option>
              </select>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                We want you to be completely satisfied with your purchase. If
                you're not entirely happy with your order, we're here to help.
                This Return Policy outlines our guidelines and procedures for
                returns, exchanges, and refunds.
              </p>

              {/* Alert Box */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-700">
                      <strong>Important:</strong> All return requests must be
                      initiated within 30 days of delivery. Please read our full
                      policy below for details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <div className="mb-6 border-b pb-2" id="eligibility">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("eligibility")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaBoxOpen className="mr-2 text-purple-500" />
                    1. Return Eligibility
                  </h2>
                  <span>
                    {expandedSections.eligibility ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.eligibility && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      To be eligible for a return, your item must meet the
                      following criteria:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-3">
                      <li>
                        The return request must be initiated within 30 days of
                        the delivery date.
                      </li>
                      <li>
                        The item must be in its original condition, unused, and
                        with all original tags/labels attached.
                      </li>
                      <li>
                        The item must be in its original packaging, which should
                        be undamaged and complete.
                      </li>
                      <li>
                        You must have proof of purchase (order number, receipt,
                        or confirmation email).
                      </li>
                    </ul>
                    <p className="mb-3">
                      Items that have been used, assembled, modified, or show
                      signs of wear may not be eligible for a return or may be
                      subject to a restocking fee.
                    </p>
                    <p>
                      Certain items are non-returnable due to health, safety, or
                      other reasons. Please see the "Non-Returnable Items"
                      section for details.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 2 */}
              <div className="mb-6 border-b pb-2" id="process">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("process")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaExchangeAlt className="mr-2 text-purple-500" />
                    2. Return Process
                  </h2>
                  <span>
                    {expandedSections.process ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.process && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      To initiate a return, please follow these steps:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mb-3">
                      <li>
                        <strong>Contact Customer Service:</strong> Email us at
                        returns@yourcompany.com or call (555) 123-4567 with your
                        order number and return reason.
                      </li>
                      <li>
                        <strong>Receive Return Authorization:</strong> Our team
                        will review your request and, if approved, provide you
                        with a Return Merchandise Authorization (RMA) number and
                        return instructions.
                      </li>
                      <li>
                        <strong>Package Your Return:</strong> Securely package
                        the item(s) in their original packaging, including all
                        accessories, manuals, and free gifts that came with the
                        order.
                      </li>
                      <li>
                        <strong>Include Return Form:</strong> Place the return
                        form (which will be provided with your RMA) inside the
                        package.
                      </li>
                      <li>
                        <strong>Ship Your Return:</strong> Send the package to
                        the address provided in the return instructions. We
                        recommend using a trackable shipping method.
                      </li>
                      <li>
                        <strong>Return Processing:</strong> Once we receive your
                        return, we'll inspect the item and process your refund
                        or exchange within 5-7 business days.
                      </li>
                    </ol>
                    <div className="bg-gray-50 p-4 rounded-lg mb-3">
                      <p className="font-medium text-gray-700">
                        Important Notes:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          Returns without an RMA number may be refused or
                          delayed.
                        </li>
                        <li>
                          Please do not send your return to the manufacturer.
                        </li>
                        <li>
                          Processing times may be longer during peak seasons.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3 */}
              <div className="mb-6 border-b pb-2" id="refunds">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("refunds")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaMoneyBillWave className="mr-2 text-purple-500" />
                    3. Refunds
                  </h2>
                  <span>
                    {expandedSections.refunds ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.refunds && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      Once your return is received and inspected, we will
                      process your refund according to the following guidelines:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-3">
                      <li>
                        <strong>Refund Method:</strong> Refunds will be issued
                        to the original payment method used for the purchase.
                      </li>
                      <li>
                        <strong>Refund Amount:</strong> You will be refunded the
                        full purchase price of the returned item(s), minus any
                        applicable restocking fees or return shipping costs.
                      </li>
                      <li>
                        <strong>Original Shipping Costs:</strong> Original
                        shipping costs are non-refundable unless the return is
                        due to our error (such as sending the wrong item).
                      </li>
                      <li>
                        <strong>Processing Time:</strong> Refunds typically take
                        5-7 business days to process after we receive and
                        inspect your return.
                      </li>
                      <li>
                        <strong>Bank Processing:</strong> After we process your
                        refund, your bank or credit card company may require
                        additional time (typically 3-10 business days) to post
                        the refund to your account.
                      </li>
                    </ul>
                    <p className="mb-3">
                      You will receive an email notification when your refund
                      has been processed.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-purple-700">
                        <strong>Gift Returns:</strong> For items received as
                        gifts, refunds will be issued as store credit to the
                        gift recipient, unless otherwise arranged with customer
                        service.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4 */}
              <div className="mb-6 border-b pb-2" id="exchanges">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("exchanges")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaExchangeAlt className="mr-2 text-purple-500" />
                    4. Exchanges
                  </h2>
                  <span>
                    {expandedSections.exchanges ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.exchanges && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      If you need to exchange an item for a different size,
                      color, or model, please follow these steps:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mb-3">
                      <li>
                        Initiate the return process as described above,
                        indicating that you want an exchange.
                      </li>
                      <li>
                        Specify the details of the item you would like to
                        receive instead (size, color, model, etc.).
                      </li>
                      <li>
                        If the exchange item has a different price:
                        <ul className="list-disc pl-6 mt-2">
                          <li>
                            If more expensive: We will contact you regarding the
                            price difference payment.
                          </li>
                          <li>
                            If less expensive: We will refund the difference to
                            your original payment method.
                          </li>
                        </ul>
                      </li>
                    </ol>
                    <p className="mb-3">
                      For faster service, you may choose to place a new order
                      for the desired item and return the original item for a
                      refund.
                    </p>
                    <p>
                      Exchange availability is subject to current inventory. If
                      your desired exchange item is out of stock, we will
                      contact you to discuss alternatives.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 5 */}
              <div className="mb-6 border-b pb-2" id="nonReturnable">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("nonReturnable")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaExclamationTriangle className="mr-2 text-purple-500" />
                    5. Non-Returnable Items
                  </h2>
                  <span>
                    {expandedSections.nonReturnable ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.nonReturnable && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      The following items cannot be returned or exchanged:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-3">
                      <li>Custom or personalized items</li>
                      <li>Gift cards</li>
                      <li>Downloadable software products</li>
                      <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                      <li>Items that have been used, assembled, or modified</li>
                      <li>Perishable goods</li>
                      <li>
                        Personal care items and products with broken seals for
                        hygiene reasons
                      </li>
                      <li>Intimate apparel</li>
                      <li>Hazardous materials</li>
                      <li>
                        Items missing the original packaging, tags, or
                        accessories
                      </li>
                    </ul>
                    <p>
                      If you have received a non-returnable item that is damaged
                      or defective, please contact our customer service team
                      within 48 hours of delivery.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 6 */}
              <div className="mb-6 border-b pb-2" id="shippingCosts">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("shippingCosts")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaTruck className="mr-2 text-purple-500" />
                    6. Return Shipping Costs
                  </h2>
                  <span>
                    {expandedSections.shippingCosts ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.shippingCosts && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      Return shipping costs are handled as follows:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 mb-4">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b text-left">
                              Return Reason
                            </th>
                            <th className="py-2 px-4 border-b text-left">
                              Who Pays Return Shipping
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border-b">
                              Our Error (wrong item, defective, damaged)
                            </td>
                            <td className="py-2 px-4 border-b">
                              We provide a prepaid return label
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b">
                              Change of mind, didn't like it, no longer needed
                            </td>
                            <td className="py-2 px-4 border-b">
                              Customer pays return shipping
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b">
                              Item doesn't match description
                            </td>
                            <td className="py-2 px-4 border-b">
                              We provide a prepaid return label
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b">
                              Size or fit issue
                            </td>
                            <td className="py-2 px-4 border-b">
                              Customer pays return shipping
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mb-3">
                      For customer-paid returns, you may use the carrier of your
                      choice. We recommend using a trackable shipping method to
                      ensure your return can be tracked.
                    </p>
                    <p>
                      Premium members or customers with store credit above
                      certain thresholds may be eligible for free return
                      shipping. Please contact customer service to check your
                      eligibility.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 7 */}
              <div className="mb-6 border-b pb-2" id="damaged">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("damaged")}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaShieldAlt className="mr-2 text-purple-500" />
                    7. Damaged or Defective Items
                  </h2>
                  <span>
                    {expandedSections.damaged ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.damaged && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      If you receive a damaged or defective item, please contact
                      our customer service team within 48 hours of delivery.
                      Please include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-3">
                      <li>Your order number</li>
                      <li>Photos of the damaged or defective item</li>
                      <li>
                        Photos of the packaging if it was damaged during
                        shipping
                      </li>
                      <li>A description of the issue</li>
                    </ul>
                    <p className="mb-3">
                      For damaged or defective items, we offer the following
                      options:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mb-3">
                      <li>Full refund</li>
                      <li>
                        Replacement of the same item (subject to availability)
                      </li>
                      <li>Store credit</li>
                    </ol>
                    <p>
                      We will provide a prepaid return shipping label for
                      damaged or defective items. In some cases, we may not
                      require you to return the item, but this will be
                      determined on a case-by-case basis.
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
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaQuestionCircle className="mr-2 text-purple-500" />
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
                      If you have any questions about our Return Policy, please
                      contact our customer service team:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>Email:</strong> returns@yourcompany.com
                      </p>
                      <p>
                        <strong>Phone:</strong> (555) 123-4567
                      </p>
                      <p>
                        <strong>Hours:</strong> Monday-Friday, 9:00 AM - 5:00 PM
                        EST
                      </p>
                      <p>
                        <strong>Online:</strong> Use the Contact Form on our
                        website
                      </p>
                    </div>
                    <p className="mt-3">
                      We strive to respond to all inquiries within 24 business
                      hours.
                    </p>
                    <p className="mt-3 text-sm text-gray-500">
                      This Return Policy was last updated on March 26, 2025 and
                      applies to all purchases made on or after that date.
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

export default ReturnPolicy;

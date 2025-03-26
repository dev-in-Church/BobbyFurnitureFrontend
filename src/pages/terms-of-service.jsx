"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
  FaPrint,
  FaExclamationTriangle,
} from "react-icons/fa";

const TermsOfService = () => {
  const [expandedSections, setExpandedSections] = useState({
    acceptance: true,
    accounts: false,
    products: false,
    orders: false,
    payment: false,
    intellectual: false,
    prohibited: false,
    disclaimer: false,
    limitation: false,
    termination: false,
    governing: false,
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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 print:bg-indigo-600">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
            <div className="flex space-x-3">
              <button
                onClick={handlePrint}
                className="text-white hover:text-indigo-100 transition-colors"
                aria-label="Print this page"
              >
                <FaPrint className="h-5 w-5" />
              </button>
              <Link
                to="/"
                className="text-white hover:text-indigo-100 transition-colors flex items-center"
              >
                <FaArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
          <p className="text-indigo-100 mt-2">Last Updated: March 26, 2025</p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 print:bg-yellow-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>IMPORTANT:</strong> Please read these Terms of Service
                carefully before using our website or services. By accessing or
                using our services, you agree to be bound by these terms.
              </p>
            </div>
          </div>
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
                    onClick={() => scrollToSection("acceptance")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    1. Acceptance of Terms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("accounts")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    2. User Accounts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("products")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    3. Products & Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("orders")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    4. Orders & Cancellations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("payment")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    5. Payment Terms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("intellectual")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    6. Intellectual Property
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("prohibited")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    7. Prohibited Activities
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("disclaimer")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    8. Disclaimer of Warranties
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("limitation")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    9. Limitation of Liability
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("termination")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    10. Termination
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("governing")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    11. Governing Law
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("changes")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    12. Changes to Terms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors text-left"
                  >
                    13. Contact Us
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
                <option value="acceptance">Acceptance of Terms</option>
                <option value="accounts">User Accounts</option>
                <option value="products">Products & Services</option>
                <option value="orders">Orders & Cancellations</option>
                <option value="payment">Payment Terms</option>
                <option value="intellectual">Intellectual Property</option>
                <option value="prohibited">Prohibited Activities</option>
                <option value="disclaimer">Disclaimer of Warranties</option>
                <option value="limitation">Limitation of Liability</option>
                <option value="termination">Termination</option>
                <option value="governing">Governing Law</option>
                <option value="changes">Changes to Terms</option>
                <option value="contact">Contact Us</option>
              </select>
            </div>

            <div className="prose max-w-none">
              {/* Section 1 */}
              <div className="mb-6 border-b pb-2" id="acceptance">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("acceptance")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    1. Acceptance of Terms
                  </h2>
                  <span>
                    {expandedSections.acceptance ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.acceptance && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      By accessing or using our website, mobile applications, or
                      any other services provided by us (collectively, the
                      "Services"), you agree to be bound by these Terms of
                      Service and all applicable laws and regulations. If you do
                      not agree with any of these terms, you are prohibited from
                      using or accessing our Services.
                    </p>
                    <p>
                      These Terms of Service apply to all users of the Services,
                      including without limitation users who are browsers,
                      vendors, customers, merchants, and/or contributors of
                      content.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 2 */}
              <div className="mb-6 border-b pb-2" id="accounts">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("accounts")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    2. User Accounts
                  </h2>
                  <span>
                    {expandedSections.accounts ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.accounts && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      To access certain features of our Services, you may be
                      required to create an account. You are responsible for
                      maintaining the confidentiality of your account
                      information, including your password, and for all activity
                      that occurs under your account. You agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Provide accurate, current, and complete information
                        during the registration process.
                      </li>
                      <li>
                        Maintain and promptly update your account information.
                      </li>
                      <li>Keep your password secure and confidential.</li>
                      <li>
                        Notify us immediately of any unauthorized use of your
                        account or any other breach of security.
                      </li>
                    </ul>
                    <p className="mt-3">
                      We reserve the right to terminate or suspend your account
                      at our sole discretion, without notice, for conduct that
                      we believe violates these Terms of Service or is harmful
                      to other users of the Services, us, or third parties, or
                      for any other reason.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 3 */}
              <div className="mb-6 border-b pb-2" id="products">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("products")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    3. Products & Services
                  </h2>
                  <span>
                    {expandedSections.products ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.products && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      All products and services are subject to availability. We
                      reserve the right to discontinue any product or service at
                      any time. Prices for our products are subject to change
                      without notice.
                    </p>
                    <p className="mb-3">
                      We make every effort to display as accurately as possible
                      the colors and images of our products. We cannot guarantee
                      that your computer or mobile device's display of any color
                      will be accurate.
                    </p>
                    <p>
                      We reserve the right to limit the quantities of any
                      products or services that we offer. All descriptions of
                      products and services and their pricing are subject to
                      change at any time without notice, at our sole discretion.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 4 */}
              <div className="mb-6 border-b pb-2" id="orders">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("orders")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    4. Orders & Cancellations
                  </h2>
                  <span>
                    {expandedSections.orders ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.orders && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We reserve the right to refuse any order you place with
                      us. We may, in our sole discretion, limit or cancel
                      quantities purchased per person, per household, or per
                      order. These restrictions may include orders placed by or
                      under the same customer account, the same credit card,
                      and/or orders that use the same billing and/or shipping
                      address.
                    </p>
                    <p className="mb-3">
                      In the event that we make a change to or cancel an order,
                      we will attempt to notify you by contacting the email
                      and/or billing address/phone number provided at the time
                      the order was made.
                    </p>
                    <p>
                      For order cancellations, please refer to our Shipping
                      Policy for detailed information on cancellation procedures
                      and refund eligibility.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 5 */}
              <div className="mb-6 border-b pb-2" id="payment">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("payment")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    5. Payment Terms
                  </h2>
                  <span>
                    {expandedSections.payment ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.payment && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We accept the following payment methods:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Credit cards (Visa, MasterCard, American Express)</li>
                      <li>Debit cards</li>
                      <li>PayPal</li>
                      <li>Other payment methods as indicated at checkout</li>
                    </ul>
                    <p className="mt-3 mb-3">
                      By providing a payment method, you represent and warrant
                      that you are authorized to use the designated payment
                      method and that you authorize us to charge your payment
                      method for the total amount of your order (including any
                      applicable taxes and other charges).
                    </p>
                    <p>
                      If the payment method you provide cannot be verified, is
                      invalid, or is otherwise not acceptable, your order may be
                      suspended or cancelled. You must resolve any payment
                      method problems before we proceed with your order.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 6 */}
              <div className="mb-6 border-b pb-2" id="intellectual">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("intellectual")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    6. Intellectual Property
                  </h2>
                  <span>
                    {expandedSections.intellectual ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.intellectual && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      The Services and all content, features, and functionality
                      thereof, including but not limited to all information,
                      software, text, displays, images, video, and audio, and
                      the design, selection, and arrangement thereof
                      (collectively, the "Content"), are owned by us, our
                      licensors, or other providers of such material and are
                      protected by copyright, trademark, patent, trade secret,
                      and other intellectual property or proprietary rights
                      laws.
                    </p>
                    <p className="mb-3">
                      These Terms of Service permit you to use the Services for
                      your personal, non-commercial use only. You must not
                      reproduce, distribute, modify, create derivative works of,
                      publicly display, publicly perform, republish, download,
                      store, or transmit any of the Content, except as follows:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Your computer may temporarily store copies of such
                        materials in RAM incidental to your accessing and
                        viewing those materials.
                      </li>
                      <li>
                        You may store files that are automatically cached by
                        your web browser for display enhancement purposes.
                      </li>
                      <li>
                        You may print or download one copy of a reasonable
                        number of pages of the website for your own personal,
                        non-commercial use and not for further reproduction,
                        publication, or distribution.
                      </li>
                    </ul>
                    <p className="mt-3">You must not:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Modify copies of any materials from the Services.</li>
                      <li>
                        Use any illustrations, photographs, video or audio
                        sequences, or any graphics separately from the
                        accompanying text.
                      </li>
                      <li>
                        Delete or alter any copyright, trademark, or other
                        proprietary rights notices from copies of materials from
                        the Services.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Section 7 */}
              <div className="mb-6 border-b pb-2" id="prohibited">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("prohibited")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    7. Prohibited Activities
                  </h2>
                  <span>
                    {expandedSections.prohibited ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.prohibited && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      You may use the Services only for lawful purposes and in
                      accordance with these Terms of Service. You agree not to
                      use the Services:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        In any way that violates any applicable federal, state,
                        local, or international law or regulation.
                      </li>
                      <li>
                        For the purpose of exploiting, harming, or attempting to
                        exploit or harm minors in any way.
                      </li>
                      <li>
                        To transmit, or procure the sending of, any advertising
                        or promotional material, including any "junk mail,"
                        "chain letter," "spam," or any other similar
                        solicitation.
                      </li>
                      <li>
                        To impersonate or attempt to impersonate us, our
                        employees, another user, or any other person or entity.
                      </li>
                      <li>
                        To engage in any other conduct that restricts or
                        inhibits anyone's use or enjoyment of the Services, or
                        which may harm us or users of the Services or expose
                        them to liability.
                      </li>
                    </ul>
                    <p className="mt-3">Additionally, you agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Use the Services in any manner that could disable,
                        overburden, damage, or impair the site or interfere with
                        any other party's use of the Services.
                      </li>
                      <li>
                        Use any robot, spider, or other automatic device,
                        process, or means to access the Services for any
                        purpose, including monitoring or copying any of the
                        material on the Services.
                      </li>
                      <li>
                        Use any manual process to monitor or copy any of the
                        material on the Services or for any other unauthorized
                        purpose without our prior written consent.
                      </li>
                      <li>
                        Use any device, software, or routine that interferes
                        with the proper working of the Services.
                      </li>
                      <li>
                        Introduce any viruses, Trojan horses, worms, logic
                        bombs, or other material that is malicious or
                        technologically harmful.
                      </li>
                      <li>
                        Attempt to gain unauthorized access to, interfere with,
                        damage, or disrupt any parts of the Services, the server
                        on which the Services are stored, or any server,
                        computer, or database connected to the Services.
                      </li>
                      <li>
                        Attack the Services via a denial-of-service attack or a
                        distributed denial-of-service attack.
                      </li>
                      <li>
                        Otherwise attempt to interfere with the proper working
                        of the Services.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Section 8 */}
              <div className="mb-6 border-b pb-2" id="disclaimer">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("disclaimer")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    8. Disclaimer of Warranties
                  </h2>
                  <span>
                    {expandedSections.disclaimer ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.disclaimer && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      THE SERVICES AND ALL CONTENT, PRODUCTS, AND SERVICES
                      INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE
                      SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE"
                      BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS
                      OR IMPLIED. NEITHER WE NOR ANY PERSON ASSOCIATED WITH US
                      MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
                      COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR
                      AVAILABILITY OF THE SERVICES.
                    </p>
                    <p className="mb-3">
                      THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT
                      BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 9 */}
              <div className="mb-6 border-b pb-2" id="limitation">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("limitation")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    9. Limitation of Liability
                  </h2>
                  <span>
                    {expandedSections.limitation ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.limitation && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      IN NO EVENT WILL WE, OUR AFFILIATES, OR THEIR LICENSORS,
                      SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR
                      DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY
                      LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR
                      USE, OR INABILITY TO USE, THE SERVICES, ANY WEBSITES
                      LINKED TO IT, ANY CONTENT ON THE SERVICES OR SUCH OTHER
                      WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
                      INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                      BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING,
                      EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS
                      OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF
                      GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT
                      (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE,
                      EVEN IF FORESEEABLE.
                    </p>
                    <p className="mb-3">
                      THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE
                      EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 10 */}
              <div className="mb-6 border-b pb-2" id="termination">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("termination")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    10. Termination
                  </h2>
                  <span>
                    {expandedSections.termination ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.termination && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      We may terminate or suspend your account and bar access to
                      the Services immediately, without prior notice or
                      liability, under our sole discretion, for any reason
                      whatsoever and without limitation, including but not
                      limited to a breach of these Terms of Service.
                    </p>
                    <p className="mb-3">
                      If you wish to terminate your account, you may simply
                      discontinue using the Services, or contact us to request
                      account deletion.
                    </p>
                    <p>
                      All provisions of these Terms of Service which by their
                      nature should survive termination shall survive
                      termination, including, without limitation, ownership
                      provisions, warranty disclaimers, indemnity, and
                      limitations of liability.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 11 */}
              <div className="mb-6 border-b pb-2" id="governing">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("governing")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    11. Governing Law
                  </h2>
                  <span>
                    {expandedSections.governing ? (
                      <FaChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </button>

                {expandedSections.governing && (
                  <div className="mt-3 text-gray-600">
                    <p className="mb-3">
                      These Terms of Service and any separate agreements whereby
                      we provide you Services shall be governed by and construed
                      in accordance with the laws of [Your State/Country]
                      without regard to its conflict of law provisions.
                    </p>
                    <p>
                      Any legal suit, action, or proceeding arising out of, or
                      related to, these Terms of Service or the Services shall
                      be instituted exclusively in the federal courts of [Your
                      State/Country] or the courts of [Your State/County],
                      although we retain the right to bring any suit, action, or
                      proceeding against you for breach of these Terms of
                      Service in your country of residence or any other relevant
                      country.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 12 */}
              <div className="mb-6 border-b pb-2" id="changes">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("changes")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    12. Changes to Terms
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
                      We may revise and update these Terms of Service from time
                      to time at our sole discretion. All changes are effective
                      immediately when we post them, and apply to all access to
                      and use of the Services thereafter.
                    </p>
                    <p className="mb-3">
                      Your continued use of the Services following the posting
                      of revised Terms of Service means that you accept and
                      agree to the changes. You are expected to check this page
                      frequently so you are aware of any changes, as they are
                      binding on you.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 13 */}
              <div className="mb-6" id="contact">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection("contact")}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    13. Contact Us
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
                      If you have any questions about these Terms of Service,
                      please contact us at:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>Email:</strong> legal@yourcompany.com
                      </p>
                      <p>
                        <strong>Phone:</strong> (555) 123-4567
                      </p>
                      <p>
                        <strong>Address:</strong> 123 Main Street, Suite 100,
                        Anytown, ST 12345
                      </p>
                    </div>
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

export default TermsOfService;

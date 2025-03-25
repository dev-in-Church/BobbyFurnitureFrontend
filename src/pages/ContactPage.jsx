"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  CheckCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (
      formData.phone &&
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Handle form submission (e.g., send data to backend)
      console.log(formData);

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setSubmitStatus("success");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero2.png')" }}
        data-aos="fade-in"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            We're here to help with any questions about our products, services,
            or custom furniture needs
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 px-4 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-3">Mon-Fri from 8am to 5pm</p>
            <a
              href="tel:+254712345678"
              className="text-blue-600 font-medium hover:underline"
            >
              +254 712 345 678
            </a>
          </div>

          <div
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-3">We'll respond within 24 hours</p>
            <a
              href="mailto:info@bobbyfurniture.com"
              className="text-blue-600 font-medium hover:underline"
            >
              info@bobbyfurniture.com
            </a>
          </div>

          <div
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-3">Our showroom is open daily</p>
            <p className="text-blue-600 font-medium">
              Kahawa Sukari, Nairobi, Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 container mx-auto" data-aos="fade-up">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>
                    Your message has been sent successfully! We'll be in touch
                    soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>
                    There was an error sending your message. Please try again
                    later.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject (optional)
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full p-3 border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-600 text-white p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <MapPin className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Our Location</p>
                      <p className="opacity-90">
                        123 Furniture Avenue, Kahawa Sukari, Nairobi, Kenya
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <Phone className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Phone Number</p>
                      <p className="opacity-90">+254 712 345 678</p>
                      <p className="opacity-90">+254 723 456 789</p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <Mail className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Email Address</p>
                      <p className="opacity-90">info@bobbyfurniture.com</p>
                      <p className="opacity-90">sales@bobbyfurniture.com</p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <Clock className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Working Hours</p>
                      <p className="opacity-90">
                        Monday - Friday: 8:00 AM - 5:00 PM
                      </p>
                      <p className="opacity-90">Saturday: 9:00 AM - 3:00 PM</p>
                      <p className="opacity-90">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <p className="font-medium mb-3">Follow Us</p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61558829731076"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/furniture_by_bobby/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.youtube.com/@Furniture_by_Bobb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section with Map */}
      <section className="py-16 px-4 container mx-auto" data-aos="fade-up">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Location
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Come visit our showroom to experience our furniture collections in
              person. Our team is ready to assist you with any inquiries.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.342492784928!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183f4b78d25a6f9b%3A0xb26b083d7ea04f23!2sFurniture%20Shop%20XYZ!5e0!3m2!1sen!2ske!4v1673590472524"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our products, services, and
              policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Do you offer custom furniture designs?",
                answer:
                  "Yes, we specialize in custom furniture designs tailored to your specific needs and preferences. Contact us to discuss your requirements.",
              },
              {
                question: "What is your delivery policy?",
                answer:
                  "We offer delivery within Nairobi and surrounding areas. Delivery fees vary based on location and order size. Free delivery is available for orders above Ksh. 50,000.",
              },
              {
                question: "Do you offer furniture assembly services?",
                answer:
                  "Yes, our professional team provides assembly services for all furniture purchased from us, ensuring proper installation and setup.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "We accept returns within 14 days of delivery for items in original condition. Custom-made furniture is non-returnable unless there are manufacturing defects.",
              },
              {
                question: "Do you offer warranties on your furniture?",
                answer:
                  "Yes, all our furniture comes with a 1-year warranty against manufacturing defects. Some premium items have extended warranty options.",
              },
              {
                question: "Can I schedule a showroom visit?",
                answer:
                  "Our showroom is open during regular business hours. For personalized assistance, we recommend scheduling an appointment through our contact form or by calling us.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4 bg-blue-600 text-white text-center"
        data-aos="fade-up"
      >
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Whether you're looking for ready-made furniture or custom designs,
            we're here to help you create the perfect living space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Browse Products
            </a>
            <a
              href="tel:+254712345678"
              className="px-8 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition duration-300"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

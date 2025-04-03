"use client";

import { useState } from "react";
import {
  Shield,
  Truck,
  RotateCcw,
  CreditCard,
  Clock,
  Headphones,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBadges() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const trustFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Shopping",
      description: "Your data is protected with industry-leading encryption",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Delivery",
      description: "On all orders above Ksh. 10,000",
    },
    {
      icon: <RotateCcw className="h-6 w-6" />,
      title: "Easy Returns",
      description: "30-day money-back guarantee",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Flexible Payment",
      description: "Multiple payment options available",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Get your furniture within 3-5 business days",
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Our customer service team is always available",
    },
  ];

  const paymentMethods = [
    { name: "Visa", src: "/visa.png", width: 60, height: 30 },
    {
      name: "Mastercard",
      src: "/master-card.png",
      width: 60,
      height: 30,
    },
    { name: "M-Pesa", src: "/lipa-na-m-pesa.png", width: 60, height: 30 },
    // {
    //   name: "PayPal",
    //   src: "/lipa-na-m-pesa.png",
    //   width: 60,
    //   height: 30,
    // },
    // {
    //   name: "American Express",
    //   src: "/images/payment/american-express.svg",
    //   width: 60,
    //   height: 30,
    // },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="bg-muted/50 py-16" aria-labelledby="trust-badges-title">
      <div className="container px-4 mx-auto">
        <h2
          id="trust-badges-title"
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          Why Shop With Us
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div
                className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${
                  hoveredIndex === index
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary"
                }`}
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
              {hoveredIndex === index && (
                <CheckCircle
                  className="h-5 w-5 text-primary mt-3 animate-pulse"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Methods */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-medium mb-4">Accepted Payment Methods</h3>
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={method.src || "/placeholder.svg"}
                  alt={`${method.name} payment method`}
                  className="h-8 w-auto"
                  width={method.width}
                  height={method.height}
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/${method.width}x${method.height}?text=${method.name}`;
                    e.currentTarget.alt = `${method.name} logo (placeholder)`;
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
          <p className="text-sm text-muted-foreground mt-6">
            All transactions are secure and encrypted
          </p>
        </div>

        {/* Trust Seal */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
            <Shield className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">
              Trusted by over 10,000 customers across Kenya
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

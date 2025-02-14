import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 flex items-center z-50">
      {/* Tooltip - Appears on the right with a modern glowing effect */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 10 : -10 }}
        transition={{ duration: 0.3 }}
        className={`absolute left-16 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg 
                    transform scale-95 transition-all duration-300 ease-in-out 
                    ${
                      hovered
                        ? "scale-100 shadow-green-400/50 border border-green-400"
                        : "scale-95"
                    }`}
      >
        Chat with us!
      </motion.div>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/254708156310"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center
                   hover:shadow-green-500/70 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FaWhatsapp className="text-2xl" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;

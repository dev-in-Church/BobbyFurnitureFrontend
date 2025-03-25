"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [initialDisplay, setInitialDisplay] = useState(false);

  // Handle scroll behavior - hide when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Show initial tooltip after 2 seconds, hide after 5 seconds
    const initialTimer = setTimeout(() => {
      setInitialDisplay(true);

      const hideTimer = setTimeout(() => {
        setInitialDisplay(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(initialTimer);
    };
  }, [lastScrollY]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Tooltip */}
      <AnimatePresence>
        {(hovered || initialDisplay) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute left-16 bg-white text-gray-800 px-4 py-3 rounded-lg text-sm font-medium shadow-lg border border-gray-200 w-max max-w-[200px]"
          >
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-b border-gray-200"></div>
            <p>Chat with us on WhatsApp for quick assistance!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/254708156310"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: visible ? 0 : 20,
          opacity: visible ? 1 : 0,
          scale: [1, hovered ? 1.1 : 1],
        }}
        transition={{
          y: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.9 }}
      >
        {/* Pulsing background effect (moved inside the button) */}
        <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-30 pointer-events-none"></div>

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5988 2.39453 15.1285 3.10039 16.4731L2.05176 20.9417C1.95313 21.3342 2.06641 21.7494 2.34473 22.0547C2.62305 22.3599 3.0293 22.4926 3.42188 22.3939L7.89062 21.3452C9.23535 22.0511 10.7559 22.4447 12.3457 22.4447C17.8687 22.4447 22.3458 17.9676 22.3458 12.4447C22.3458 6.92188 17.5238 2 12.001 2ZM17.0068 16.0068C16.7793 16.6914 15.8184 17.2754 15.1914 17.3828C14.6543 17.4707 13.9902 17.5078 13.2754 17.2812C12.8379 17.1445 12.3008 16.9551 11.6367 16.6367C9.0332 15.3125 7.31055 12.7188 7.16211 12.5215C7.01367 12.3242 6.00098 11.0078 6.00098 9.64844C6.00098 8.28906 6.70801 7.61719 6.98633 7.33887C7.26465 7.06055 7.59277 7 7.76953 7C7.94629 7 8.12305 7 8.27148 7.00977C8.43555 7.01953 8.64844 6.9707 8.85645 7.41797C9.07422 7.88477 9.54102 9.24414 9.61523 9.38281C9.68945 9.52148 9.74414 9.69824 9.64551 9.87012C9.54688 10.042 9.49219 10.1504 9.35352 10.3184C9.21484 10.4863 9.06641 10.6934 8.94238 10.8174C8.80371 10.9561 8.65527 11.1045 8.81934 11.3633C8.9834 11.6221 9.54102 12.5537 10.3848 13.2949C11.4609 14.2461 12.3301 14.5547 12.5889 14.6934C12.8477 14.832 13.0254 14.8125 13.1836 14.6348C13.3418 14.457 13.8789 13.8301 14.0566 13.5713C14.2344 13.3125 14.4121 13.3516 14.6602 13.4307C14.9082 13.5098 16.2676 14.1855 16.5361 14.3242C16.8047 14.4629 16.9824 14.5322 17.0566 14.6348C17.1309 14.7471 17.1309 15.3223 17.0068 16.0068Z" />
        </svg>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;

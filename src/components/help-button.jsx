import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [initialDisplay, setInitialDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY <= lastScrollY || currentScrollY < 300);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    const initialTimer = setTimeout(() => {
      setInitialDisplay(true);
      const hideTimer = setTimeout(() => setInitialDisplay(false), 6000);
      return () => clearTimeout(hideTimer);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(initialTimer);
    };
  }, [lastScrollY]);

  const navigateToHelp = () => {
    navigate("/help");
    setIsOpen(false);
  };

  const helpOptions = [
    {
      title: "Help Center",
      description: "Browse our comprehensive help articles",
      action: navigateToHelp,
      icon: <ExternalLink className="w-5 h-5" />,
    },
    {
      title: "Live Chat",
      description: "Chat with our support team",
      action: () => window.open("https://wa.me/254708156310", "_blank"),
      icon: <ExternalLink className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Help Button Wrapper */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        {/* Pulsing Effect - Separate from button */}
        {!isOpen && (
          <div className="absolute w-14 h-14 rounded-full animate-ping bg-blue-500 opacity-30"></div>
        )}

        {/* Help Options Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border border-gray-200 w-64 overflow-hidden z-50"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">How can we help?</h3>
                <p className="text-sm text-gray-500">Choose an option below</p>
              </div>

              <div className="p-2">
                {helpOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      option.action();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {option.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {option.description}
                      </p>
                    </div>
                    {option.icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Button */}
        <motion.button
          aria-label="Get help"
          className={`relative p-4 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            isOpen
              ? "bg-red-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: visible ? 0 : 20,
            opacity: visible ? 1 : 0,
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            rotate: { duration: 0.2 },
          }}
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <HelpCircle className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default HelpButton;

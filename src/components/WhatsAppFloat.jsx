import React from "react";

const WhatsAppFloat = () => {
  const phoneNumber = "254708156310"; // no + sign
  const message = "Hello, I would like to inquire."; // optional

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.whatsappButton}
      aria-label="Chat on WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        style={styles.icon}
      />
    </a>
  );
};

const styles = {
  whatsappButton: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    width: "60px",
    height: "60px",
    backgroundColor: "#25D366",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  icon: {
    width: "35px",
    height: "35px",
  },
};

export default WhatsAppFloat;

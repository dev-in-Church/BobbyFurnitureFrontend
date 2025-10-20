"use client";

import { useEffect, useState } from "react";

const CookieConsentPopup = () => {
  const [visible, setVisible] = useState(false);
  const [cookiesBlocked, setCookiesBlocked] = useState(false);
  const [cookiesAllowed, setCookiesAllowed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    const maybeLater = localStorage.getItem("cookieMaybeLater");

    // 🕒 If user clicked "Maybe later", only show again after 7 days
    if (maybeLater) {
      const lastTime = new Date(maybeLater);
      const now = new Date();
      const diffDays = (now - lastTime) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) return; // don’t show again yet
    }

    if (consent === "true") {
      setCookiesAllowed(true);
      return;
    }

    // ✅ Check if cookies are blocked
    try {
      document.cookie = "cookietest=1; SameSite=None; Secure";
      const cookiesEnabled = document.cookie.indexOf("cookietest=") !== -1;
      if (!cookiesEnabled) setCookiesBlocked(true);
      document.cookie =
        "cookietest=1; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    } catch {
      setCookiesBlocked(true);
    }

    setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.removeItem("cookieMaybeLater");
    setCookiesAllowed(true);
    setVisible(false);
  };

  const handleMaybeLater = () => {
    localStorage.setItem("cookieMaybeLater", new Date().toISOString());
    setVisible(false);
  };

  if (!visible || cookiesAllowed) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl border border-gray-200 rounded-2xl p-4 max-w-sm text-sm z-50 animate-slide-up">
      {cookiesBlocked ? (
        <>
          <p className="text-red-600 font-semibold mb-2">
            Cookies are blocked in your browser.
          </p>
          <p className="text-gray-700 mb-3">
            Google sign-in and secure sessions won’t work until cookies are
            enabled. Please enable cookies in your browser settings.
          </p>
          <a
            href="https://support.google.com/accounts/answer/61416"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-xs underline hover:text-blue-700"
          >
            Learn how to enable cookies →
          </a>
        </>
      ) : (
        <>
          <p className="text-gray-800 mb-3">
            This site uses cookies to keep you signed in securely and enable
            Google login.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleMaybeLater}
              className="text-gray-500 hover:text-gray-700 text-xs"
            >
              Maybe later
            </button>
            <button
              onClick={handleAccept}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700"
            >
              Allow cookies
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CookieConsentPopup;

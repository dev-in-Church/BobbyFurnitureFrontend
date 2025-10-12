// analytics.js
export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag("config", "G-05CDKQX00FX", { page_path: url });
  }
};

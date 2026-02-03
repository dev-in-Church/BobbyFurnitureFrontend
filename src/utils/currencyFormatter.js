// currencyFormatter.js

// KES currency formatter
export const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
});

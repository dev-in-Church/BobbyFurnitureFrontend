"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query-client";
import { CartProvider } from "./contexts/cart-context";
import { WishlistProvider } from "./contexts/wishlist-context";
import { AuthProvider, AuthContext } from "./contexts/auth-context";
import ScrollToTop from "./components/scroll-to-top.jsx";
import { ToastContainer } from "./components/ui/toast";
import "react-toastify/dist/ReactToastify.css";
import PageLoader from "./components/ui/PageLoader";
import CookieConsentPopup from "./components/CookieConsentPopup.jsx";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
// Page Components
import Home from "./pages/home.jsx";
import ProductsPage from "./pages/products";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailPage from "./pages/product-detail";
import CartPage from "./pages/cart-page";
import WishlistPage from "./pages/wishlist-page";
import CheckoutPage from "./pages/checkout-page";
import OrderConfirmationPage from "./pages/order-confirmation";
import UserAccountPage from "./pages/user-account";
import OrderHistoryPage from "./pages/order-history";
import OrderDetailsPage from "./pages/order-details";
import ContactPage from "./pages/contact-page";
import AboutPage from "./pages/about-page";
import HelpCenterPage from "./pages/help-center";
import AuthSuccess from "./pages/auth-success.jsx";
import PrivacyPolicy from "./pages/privacy-policy.jsx";
import TermsAndConditions from "./pages/terms-and-conditions.jsx";
import ShippingPolicy from "./pages/shipping-policy.jsx";
import ReturnPolicy from "./pages/return-policy.jsx";

// Admin Components
import AdminDashboard from "./pages/admin-dashboard.jsx";
import ManageProducts from "./components/manage-products.jsx";
import AdminOrderList from "./pages/admin-order-list";
import AdminUserManagement from "./pages/admin-user-management";
import AdminOrderDetail from "./pages/admin-order-details";

// Auth Components
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ForgotPasswordPage from "./pages/forgot-password";

// Error Components
import NotFoundPage from "./pages/not-found";
import ErrorBoundary from "./components/error-boundary";

///others
import GenericProductPage from "./pages/GenericProductPage";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Layout Component
const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out sequence once page starts loading
    const fadeTimer = setTimeout(() => setFadeOut(true), 1000);
    const hideTimer = setTimeout(() => setLoading(false), 1700);

    // Also stop loader if everything finishes before timer
    window.addEventListener("load", () => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 700);
    });

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (loading) {
    return <PageLoader fadeOut={fadeOut} />;
  }
  return (
    <div className="flex flex-col min-h-screen bg-[#f1f1f2] text-[#313133] text-[0.875rem] font-['Roboto','-apple-system','BlinkMacSystemFont','Segoe UI','Helvetica Neue','Arial','sans-serif'] antialiased">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <WhatsAppFloat />
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/all-products" element={<ProductsPage />} />

                  {/*Category pages */}
                  <Route
                    path="/category/:category"
                    element={<GenericProductPage type="category" />}
                  />

                  <Route
                    path="/featured"
                    element={<GenericProductPage type="featured" />}
                  />

                  <Route
                    path="/new-arrivals"
                    element={<GenericProductPage type="new-arrivals" />}
                  />

                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/help" element={<HelpCenterPage />} />

                  {/* other */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/return-policy" element={<ReturnPolicy />} />
                  <Route path="/shipping-policy" element={<ShippingPolicy />} />
                  <Route
                    path="/terms-and-conditions"
                    element={<TermsAndConditions />}
                  />

                  {/* Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                  <Route path="/auth/success" element={<AuthSuccess />} />

                  {/* Protected User Routes */}
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders/:orderId"
                    element={
                      <ProtectedRoute>
                        <OrderDetailsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order-confirmation/:orderId"
                    element={
                      <ProtectedRoute>
                        <OrderConfirmationPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <ProtectedRoute>
                        <UserAccountPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <OrderHistoryPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/manage-products"
                    element={
                      <ProtectedRoute requireAdmin>
                        <ManageProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminOrderList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/orders/:orderId"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminOrderDetail />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin/manage-users"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminUserManagement />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch all route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
        <CookieConsentPopup />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

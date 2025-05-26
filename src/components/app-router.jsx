"use client";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "../contexts/cart-context";
import { WishlistProvider } from "../contexts/wishlist-context";
import { AuthProvider, AuthContext } from "../contexts/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Navbar from "./Navbar";
import EnhancedFooter from "./enhanced-footer";

// Page Components
import HomePage from "../pages/home-dynamic";
import CategoryPage from "../pages/category-page-dynamic";
import ProductDetailPage from "../pages/product-detail";
import SearchResultsPage from "../pages/search-results-dynamic";
import CartPage from "../pages/cart-page";
import WishlistPage from "../pages/wishlist-page";
import CheckoutPage from "../pages/checkout-page";
import OrderConfirmationPage from "../pages/order-confirmation";
import UserAccountPage from "../pages/user-account";
import OrderHistoryPage from "../pages/order-history";
import ContactPage from "../pages/contact-page";
import AboutPage from "../pages/about-page";
import HelpCenterPage from "../pages/help-center";

// Admin Components
import AdminDashboard from "../pages/admin-dashboard-enhanced";
import EnhancedManageProducts from "./enhanced-manage-products-updated";
import AdminOrderList from "../pages/admin-order-list";
import AdminUserManagement from "../pages/admin-user-management";

// Auth Components
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import ForgotPasswordPage from "../pages/forgot-password";

// Error Components
import NotFoundPage from "../pages/not-found";
import ErrorBoundary from "./error-boundary";

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
    // Redirect non-admin users trying to access admin routes
    return <Navigate to="/" replace />;
  }

  return children;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <EnhancedFooter />
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

const AppRouter = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                  />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/help" element={<HelpCenterPage />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />

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
                    path="/admin/products"
                    element={
                      <ProtectedRoute requireAdmin>
                        <EnhancedManageProducts />
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
                    path="/admin/users"
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
      </Router>
    </ErrorBoundary>
  );
};

export default AppRouter;

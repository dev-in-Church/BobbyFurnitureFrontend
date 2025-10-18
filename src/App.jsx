"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query-client";
import { CartProvider } from "./contexts/cart-context";
import { WishlistProvider } from "./contexts/wishlist-context";
import { AuthProvider, AuthContext } from "./contexts/auth-context";
import ScrollToTop from "./components/scroll-to-top.jsx";
// import { ToastContainer } from "react-toastify";
import { ToastContainer } from "./components/ui/toast";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Navbar from "./components/Navbar"; //fix this disturbing fucking shit
import EnhancedFooter from "./components/enhanced-footer";

// Page Components
import HomeDynamic from "./pages/home-dynamic";
import AllProductsPage from "./pages/AllProductsPage";
import CatalogPage from "./pages/CatalogPage";
import CategoryPage from "./pages/category/[category]";
import ProductDetailPage from "./pages/product-detail";
import SearchResultsPage from "./pages/search-results-dynamic";
import CartPage from "./pages/cart-page";
import WishlistPage from "./pages/wishlist-page";
import CheckoutPage from "./pages/checkout-page";
import OrderConfirmationPage from "./pages/order-confirmation";
import UserAccountPage from "./pages/user-account";
import OrderHistoryPage from "./pages/order-history";
import ContactPage from "./pages/contact-page";
import AboutPage from "./pages/about-page";
import HelpCenterPage from "./pages/help-center";
import AuthSuccess from "./pages/auth-success.jsx";

// Admin Components
import AdminDashboard from "./pages/admin-dashboard-enhanced";
import EnhancedManageProducts from "./components/enhanced-manage-products-updated";
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
import UploadComponent from "./components/UploadComponent";

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

const App = () => {
  return (
    <ErrorBoundary>
      {/* <Router> */}
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomeDynamic />} />
                  {/* <Route path="/category/:category" element={<CategoryPage />} /> */}
                  {/* Category page - dynamic route */}
                  <Route path="/products" element={<AllProductsPage />} />
                  <Route path="/all-products" element={<AllProductsPage />} />
                  <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                  />
                  {/* Search/Catalog page */}
                  <Route path="/catalog" element={<CatalogPage />} />
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
                    path="/admin/orders/:orderId"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminOrderDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/upload-img"
                    element={
                      <ProtectedRoute requireAdmin>
                        <UploadComponent />
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
      </QueryClientProvider>
      {/* </Router> */}
    </ErrorBoundary>
  );
};

export default App;

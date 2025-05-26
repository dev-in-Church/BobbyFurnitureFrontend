// import React from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import CartPage from "./pages/CartPage";
// import CheckoutPage from "./pages/CheckoutPage";
// import HomePage from "./pages/HomePage"; // Assuming you have a HomePage component
// import OrderConfirmationPage from "./pages/OrderConfirmationPage"; // Confirmation after order is placed
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminDashboard from "./pages/AdminDashboard";
// import Login from "./pages/Login";
// import ProductsPage from "./pages/ProductsPage";
// import ManageUsers from "./pages/ManageUsers";
// import EnhancedManageProducts from "./pages/ManageProducts";
// import ProfilePage from "./pages/ProfilePage";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// // import OrderHistory from "./pages/OrderHistory";
// // import AdminOrderList from "./pages/AdminOrderList";
// // import AdminOrderDetails from "./pages/AdminOrderDetails";
// import UploadComponent from "./components/UploadComponent";
// import ContactPage from "./pages/ContactPage";
// import ProductDetails from "./pages/ProductDetails";
// import HelpPage from "./pages/HelpPage";
// import OrdersPage from "./pages/OrdersPage";
// import OrderManagement from "./pages/OrderManagement";
// import Signup from "./pages/SignUp";
// import AboutPage from "./pages/AboutPage";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import NotFoundPage from "./pages/NotFoundPage";
// import { ReturnToTop } from "./components/LoadingReturnTop";
// import WhatsAppButton from "./components/WhatsAppButton";
// // import AllProductsPage from "./pages/AllProductsPage";
// import Wishlist from "./pages/wishlist";
// // import CategoryPage from "./pages/category-page";
// import HelpButton from "./components/help-button";
// import PrivacyPolicy from "./pages/privacy-policy";
// import TermsOfService from "./pages/terms-of-service";
// import ShippingPolicy from "./pages/shipping-policy";
// import ReturnPolicy from "./pages/return-policy";
// import Collection from "./pages/collection";
// import AdsManagement from "./pages/AdsManagement";
// import Category from "./pages/Category";
// import CategoriesPage from "./pages/CategoriesPage";
// import SearchResultsPage from "./pages/SearchPage";
// import HomeDynamic from "./pages/home-dynamic";
// import ProductDetail from "./pages/product-detail";

// const App = () => {
//   return (
//     <div className="">
//       <Navbar />
//       <main>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/products" element={<ProductsPage />} />
//           <Route path="/collection" element={<Collection />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/products/:id" element={<ProductDetail />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-of-service" element={<TermsOfService />} />
//           <Route path="/shipping-policy" element={<ShippingPolicy />} />
//           <Route path="/return-policy" element={<ReturnPolicy />} />
//           {/* <Route path="/category/:categorySlug" element={<CategoryPage />} /> */}
//           <Route path="category/:slug" element={<Category />} />
//           <Route path="/search" element={<SearchResultsPage />} />
//           <Route path="/home" element={<HomeDynamic />} />

//           <Route path="/help" element={<HelpPage />} />
//           <Route path="/upload-img" element={<UploadComponent />} />
//           <Route path="*" element={<NotFoundPage />} />

//           {/* <Route path="/admin/orders" element={<AdminOrderList />} /> */}
//           {/* <Route path="/admin-order-list" element={<OrderManagement />} /> */}
//           {/* <Route path="/admin/orders/orderId" element={<AdminOrderDetails />} /> */}
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/orders" element={<OrdersPage />} />
//           <Route path="/categories" element={<CategoriesPage />} />
//           <Route
//             path="/order-confirmation"
//             element={<OrderConfirmationPage />}
//           />

//           {/* Protected routes */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute role="admin">
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/admin/manage-products"
//             element={
//               <ProtectedRoute role="admin">
//                 <EnhancedManageProducts />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/admin/manage-users"
//             element={
//               <ProtectedRoute role="admin">
//                 <ManageUsers />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/admin-order-list"
//             element={
//               <ProtectedRoute role="admin">
//                 <OrderManagement />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/admin/manage-ads"
//             element={
//               <ProtectedRoute role="admin">
//                 <AdsManagement />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute role="user">
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </main>
//       <Footer />
//       {/* <ReturnToTop /> */}
//       {/* <HelpButton /> */}
//       <WhatsAppButton />
//     </div>
//   );
// };

// export default App;

"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import { WishlistProvider } from "./contexts/wishlist-context";
import { AuthProvider, AuthContext } from "./contexts/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Navbar from "./components/Navbar"; //fix this disturbing fucking shit
import EnhancedFooter from "./components/enhanced-footer";

// Page Components
import HomePage from "./pages/home-dynamic";
import CategoryPage from "./pages/category-page-dynamic";
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

// Admin Components
import AdminDashboard from "./pages/admin-dashboard-enhanced";
import EnhancedManageProducts from "./components/enhanced-manage-products-updated";
import AdminOrderList from "./pages/admin-order-list";
import AdminUserManagement from "./pages/admin-user-management";

// Auth Components
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ForgotPasswordPage from "./pages/forgot-password";

// Error Components
import NotFoundPage from "./pages/not-found";
import ErrorBoundary from "./components/error-boundary";

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
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
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
      {/* </Router> */}
    </ErrorBoundary>
  );
};

export default App;

import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage"; // Assuming you have a HomePage component
import OrderConfirmationPage from "./pages/OrderConfirmationPage"; // Confirmation after order is placed
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProductsPage from "./pages/ProductsPage";
import ManageUsers from "./pages/ManageUsers";
import ManageProducts from "./pages/ManageProducts";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// import OrderHistory from "./pages/OrderHistory";
// import AdminOrderList from "./pages/AdminOrderList";
// import AdminOrderDetails from "./pages/AdminOrderDetails";
import UploadComponent from "./components/UploadComponent";
import ContactPage from "./pages/ContactPage";
import ProductDetails from "./pages/ProductDetails";
import HelpPage from "./pages/HelpPage";
import OrdersPage from "./pages/OrdersPage";
import OrderManagement from "./pages/OrderManagement";
import Signup from "./pages/SignUp";
import AboutPage from "./pages/AboutPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFoundPage from "./pages/NotFoundPage";
import { ReturnToTop } from "./components/LoadingReturnTop";
import WhatsAppButton from "./components/WhatsAppButton";
import AllProductsPage from "./pages/AllProductsPage";
import Wishlist from "./pages/wishlist";
import CategoryPage from "./pages/category-page";
import HelpButton from "./components/help-button";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import ShippingPolicy from "./pages/shipping-policy";
import ReturnPolicy from "./pages/return-policy";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />

          <Route path="/help" element={<HelpPage />} />
          <Route path="/upload-img" element={<UploadComponent />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* <Route path="/admin/orders" element={<AdminOrderList />} /> */}
          {/* <Route path="/admin-order-list" element={<OrderManagement />} /> */}
          {/* <Route path="/admin/orders/orderId" element={<AdminOrderDetails />} /> */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />

          {/* Protected routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage-products"
            element={
              <ProtectedRoute role="admin">
                <ManageProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage-users"
            element={
              <ProtectedRoute role="admin">
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-order-list"
            element={
              <ProtectedRoute role="admin">
                <OrderManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ReturnToTop />
      <HelpButton />
      <WhatsAppButton />
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

/* ================= PUBLIC PAGES ================= */
import HomePage from "./pages/HomePage";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

/* ================= ADMIN PAGES ================= */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminBlogs from "./pages/admin/AdminBlogs";
import SolarPriceAdmin from "./pages/admin/SolarPriceAdmin";
import AdminChangePassword from "./pages/admin/AdminChangePassword";

/* ================= COMPONENTS ================= */
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        {/* ========== ADMIN AUTH ========== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ========== PROTECTED ADMIN ROUTES ========== */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <ProtectedRoute>
              <AdminEnquiries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <AdminContacts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <AdminBlogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/solar-prices"
          element={
            <ProtectedRoute>
              <SolarPriceAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/change-password"
         element={
          <ProtectedRoute>
         <AdminChangePassword />
         </ProtectedRoute>
         } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

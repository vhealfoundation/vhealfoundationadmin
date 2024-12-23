import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./utils/ProtectedRoute";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import AddAbout from "./pages/AddAbout";
import EditAbout from "./pages/EditAbout";
import Donations from "./pages/Donations";
import Section from "./pages/Section";
import AddSection from "./pages/AddSection";
import EditSection from "./pages/EditSection";
import Stories from "./pages/Stories";
import AddStories from "./pages/AddStories";
import EditStories from "./pages/EditStories";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Beneficiaries from "./pages/Beneficiaries";
import AddBeneficiaries from "./pages/AddBeneficiaries";
import EditBeneficiaries from "./pages/EditBeneficiaries";

function App() {
  const location = useLocation();
  const { isAuthenticated } = useKindeAuth();
  console.log(isAuthenticated);
  return (
    <div>
      <AnimatePresence>
        <ScrollToTop />
        <Routes location={location} key={location.pathname}>
          {/* Redirect to login if not authenticated */}
          
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />

          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/beneficiaries" element={<ProtectedRoute element={Beneficiaries} />} />
          <Route path="/beneficiary/new" element={<ProtectedRoute element={AddBeneficiaries} />} />
          <Route path="/beneficiary/:id" element={<ProtectedRoute element={EditBeneficiaries} />} />
          <Route path="/about" element={<ProtectedRoute element={About} />} />
          <Route path="/about/new" element={<ProtectedRoute element={AddAbout} />} />
          <Route path="/about/:id" element={<ProtectedRoute element={EditAbout} />} />
          <Route path="/donations" element={<ProtectedRoute element={Donations} />} />
          <Route path="/gallery" element={<ProtectedRoute element={Gallery} />} />
          <Route path="/sections" element={<ProtectedRoute element={Section} />} />
          <Route path="/sections/new" element={<ProtectedRoute element={AddSection} />} />
          <Route path="/sections/:id" element={<ProtectedRoute element={EditSection} />} />
          <Route path="/stories" element={<ProtectedRoute element={Stories} />} />
          <Route path="/stories/new" element={<ProtectedRoute element={AddStories} />} />
          <Route path="/stories/:id" element={<ProtectedRoute element={EditStories} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

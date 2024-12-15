import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence} from "framer-motion";
import Gallery from "./pages/Gallery";
import ScrollToTop from "./components/ScrollToTop";
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

function App() {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
        <ScrollToTop />
        <Routes location={location} key={location.pathname}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/about" element={<About />} />
          <Route path="/about/new" element={<AddAbout />} />
          <Route path="/about/:id" element={<EditAbout />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sections" element={<Section />} />
          <Route path="/sections/new" element={<AddSection />} />
          <Route path="/sections/:id" element={<EditSection />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/new" element={<AddStories />} />
          <Route path="/stories/:id" element={<EditStories />} />
          </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

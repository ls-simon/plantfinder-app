import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LocationPicker from "./../pages/LocationPicker";
import DCInputPage from "./../pages/DCInputPage";
import PlantPage from "../pages/PlantPage";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LocationPicker />} />
        <Route path="/dcinput" element={<DCInputPage />} />
        <Route path="/plantpage" element={<PlantPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

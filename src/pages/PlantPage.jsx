import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { queryItems } from "../data/dataHandler";

import Footer from "../components/Footer";
import PlantNav from "../components/PlantNav";
import HeaderComponent from "../components/HeaderComponent";

const PlantPage = () => {
  const { state } = useLocation();
  const [items, setItems] = useState([]);
  const setPageData = (queryResult) => {
    setItems(queryResult);
  };

  useEffect(() => {
    const terrain = state.terrain.terrain;
    const dc = state.dc;
    const items = queryItems(terrain, dc);
    setPageData(items);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="min-h-screen text-white flex flex-col bg-3">
          <HeaderComponent />
          <PlantNav items={items} />
          <main className="container mx-auto px-6 pt-16 flex-1 text-center"></main>
          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default PlantPage;

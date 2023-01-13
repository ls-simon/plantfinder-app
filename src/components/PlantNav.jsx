import { useEffect, useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/plantnav.css";
import PlantItem from "./PlantItem";
import MushroomItem from "./MushroomItem";

function PlantNav({ items }) {
  const [selectedTab, setSelectedTab] = useState();
  const [group, setGroup] = useState("");

  useEffect(() => {
    const first = items[0];
    setSelectedTab(first);
  }, [items]);

  useEffect(() => {
    if (selectedTab) {
      setGroup(selectedTab.item.description.group.toString());
    }
  }, [selectedTab]);

  return (
    <div className="plant-tab">
      <div className="plant-tab-window">
        <nav className="plant-nav">
          <ul className="plant-ul plant-tabs">
            {items.map((item) => (
              <li
                key={item.id}
                id="plant-li"
                className={item === selectedTab ? "selected" : ""}
                onClick={() => setSelectedTab(item)}
              >
                {`${item.tab.icon} ${item.tab.label}`}
                {item === selectedTab ? (
                  <motion.div className="underline" layoutId="underline" />
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <main className="plant-main">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={selectedTab ? selectedTab.id : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {group == "svampe" ? (
                <MushroomItem selectedTab={selectedTab} />
              ) : (
                <PlantItem selectedTab={selectedTab} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default PlantNav;

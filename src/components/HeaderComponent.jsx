import React from "react";
import { useNavigate } from "react-router-dom";
function HeaderComponent() {
  let navigateTo = useNavigate();

  const navigateToIndex = () => {
    navigateTo("/");
  };
  return (
    <>
      <h1
        className="hover:opacity-70 duration-150 text-2xl md:text-6xl lg:text-8xl font-black  ml-10 mb-2 mt-10 pf-font"
        onClick={navigateToIndex}
        style={{ fontSize: 40, color: "white" }}
      >
        PlantFinder
      </h1>
    </>
  );
}

export default HeaderComponent;

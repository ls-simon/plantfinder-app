import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderComponent from "../components/HeaderComponent";
import InputWarningModal from "../components/errorHandling/InputWarningModal";
import {
  initWarning,
  terrainNotPickedWarning,
} from "../components/errorHandling/userWarnings";
import imgDesert from "./../images/location-picker/desert.png";
import imgKyst from "./../images/location-picker/kyst.png";
import menuHeader from "./../images/location-picker/menu-header.png";
import imgSnow from "./../images/location-picker/snow.png";
import imgTundra from "./../images/location-picker/tundra.png";
import imgVulcan from "./../images/location-picker/volcan.png";
import imgWoods from "./../images/location-picker/woods.png";

const LocationPicker = () => {
  let navigatoTo = useNavigate();
  const [selectedImg, setSelectedImg] = useState({});
  const [warning, setWarning] = useState(initWarning);
  const images = [
    { img_key: "1", terrain: "woods" },
    { img_key: "2", terrain: "waters" },
    { img_key: "3", terrain: "other" },
    { img_key: "4", terrain: "other" },
    { img_key: "5", terrain: "other" },
    { img_key: "6", terrain: "other" },
  ];

  const handleImgSelect = (e) => {
    const selected = images[parseInt(e.target.id) - 1];
    setSelectedImg(selected);
  };

  const handleSubmit = (e) => {
    attemptSubmit();
  };

  const attemptSubmit = () => {
    if (selectedImg.img_key) {
      navigatoTo("/dcinput", { state: { selectedImg: selectedImg } });
    } else {
      toggleTerrainNotPickedWarning();
    }
  };

  function toggleTerrainNotPickedWarning() {
    setWarning(terrainNotPickedWarning);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="min-h-screen flex flex-col text-white bg-black bg-front">
        <div>
          <HeaderComponent />
        </div>

        <InputWarningModal
          show={warning.showWarning}
          message={warning.description}
          header={warning.header}
        />

        <main className="container mx-auto  align-top text-center">
          <div className="align-top eb-font text-lg md:text-2xl  py-2 px-4 md:py-4 md:px-10  bg-white bg-opacity-10 w-fit rounded-full">
            <div className="align-top container ">
              <img
                alt="menu-header"
                className="menu-header object-center mx-auto flex flex-col"
                style={{ maxWidth: "30%", opacity: "70%" }}
                src={menuHeader}
              />
            </div>
            <section className="overflow-hidden text-gray-700 ">
              <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                  <div className="flex flex-wrap w-1/3">
                    <div className=" p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="terrain-image sm:terrain-image-small  object-center w-full h-full rounded-lg"
                        onClick={handleImgSelect}
                        id="1"
                        style={
                          selectedImg.img_key == images[0].img_key
                            ? { border: "3px solid white" }
                            : {}
                        }
                        src={imgWoods}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap w-1/3">
                    <div className="w-full p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="terrain-image block object-cover object-center  rounded-lg"
                        onClick={handleImgSelect}
                        id="2"
                        style={
                          selectedImg.img_key == images[1].img_key
                            ? { border: "3px solid white" }
                            : {}
                        }
                        src={imgKyst}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap w-1/3">
                    <div className="w-full p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="terrain-image block object-cover object-center  rounded-lg"
                        onClick={handleImgSelect}
                        id="3"
                        style={
                          selectedImg.img_key == images[2].img_key
                            ? { border: "3px solid white" }
                            : {}
                        }
                        src={imgSnow}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap w-1/3">
                    <div className="w-full p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="terrain-image block object-cover object-center rounded-lg"
                        onClick={handleImgSelect}
                        id="4"
                        style={
                          selectedImg.img_key == images[3].img_key
                            ? { border: "3px solid white" }
                            : {}
                        }
                        src={imgTundra}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap w-1/3">
                    <div className="w-full p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="terrain-image block object-cover object-center  rounded-lg"
                        onClick={handleImgSelect}
                        id="5"
                        style={
                          selectedImg.img_key == images[4].img_key
                            ? { border: "3px solid white" }
                            : {}
                        }
                        src={imgDesert}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap w-1/3">
                    <div className="p-1">
                      <img
                        alt="gallery"
                        className="terrain-image block object-cover object-center w-full h-full rounded-lg"
                        onClick={handleImgSelect}
                        id="6"
                        style={
                          selectedImg.img_key == images[5].img_key
                            ? { border: "3px solid white" }
                            : {}
                        }
                        src={imgVulcan}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap w-1/3">
                    <div className="p-1"></div>
                  </div>
                  <div className="flex flex-wrap w-1/3">
                    <div className=" p-1 object-center text-center ml-12">
                      <button
                        onClick={handleSubmit}
                        className="center-btn-terrain  text-white"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          height="3em"
                          width="3em"
                        >
                          <path d="M0 14a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2a2 2 0 00-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5a.5.5 0 010-1z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div></div>
          <Footer />
        </main>
      </div>
    </motion.div>
  );
};

export default LocationPicker;

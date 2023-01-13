import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  initWarning,
  inputBelowMinimumWarning,
  inputEmptyWarning,
} from "../components/errorHandling/userWarnings";

import Footer from "../components/Footer";
import d20svg from "../images/svgs/d20.svg";
import HeaderComponent from "./../components/HeaderComponent";
import InputWarningModal from "./../components/errorHandling/InputWarningModal";
const MIN_DC_VALUE = 11;
const MAX_DC_VALUE = 22;

const DCInputPage = () => {
  const [inputDC, setInputDC] = useState("");
  const [warning, setWarning] = useState(initWarning);
  const { state } = useLocation();
  const terrain = state.selectedImg;
  let navigateTo = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;

    if (inputIsNumberOrEmpty(input)) {
      setInputDC(input);
    }
  };

  function inputIsNumberOrEmpty(input) {
    const isNumber = /^(2[0-8]|[1]?[0-9])$/;
    const isValidInput = inputEmpty() || isNumber.test(parseInt(input));
    return isValidInput;
  }

  const handleSubmit = () => {
    if (isValidInput()) {
      nextPage();
    }
  };

  function isValidInput() {
    if (inputEmpty(inputDC)) {
      setWarning(inputEmptyWarning());
      return false;
    } else if (inputDC < MIN_DC_VALUE) {
      setWarning(inputBelowMinimumWarning());
      setInputDC("");
      return false;
    } else {
      return true;
    }
  }

  function inputEmpty(input) {
    return input == "";
  }

  function nextPage() {
    const pagesUserInputs = {
      state: {
        terrain: terrain,
        dc: inputDC < MAX_DC_VALUE ? inputDC : MAX_DC_VALUE,
      },
    };

    navigateTo("/plantpage", pagesUserInputs);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="min-h-screen flex flex-col text-white bg-1">
        <HeaderComponent />

        {warning.showWarning && (
          <InputWarningModal
            show={warning.showWarning}
            header={warning.header}
            message={warning.message}
          />
        )}
        <main className="container mx-auto align-top mt-2 flex-1 text-center">
          <div className="container-dc eb-font text-lg md:text-2xl lg:text-3xl  md:py-4 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 w-fit mx-auto mb-8 rounded-full">
            <img src={d20svg} width="400" alt="d20 logo"></img>
            <div className="container"></div>
            <input
              value={inputDC}
              onKeyDown={handleKeyDown}
              placeholder="Indtast DC"
              onChange={(e) => handleInputChange(e)}
              type="text"
              id="large-input"
              className="center-dc-input opacity-100  p-4 text-center  rounded-lg  placeholder-black dark:text-black  "
            />
          </div>
          <div className="center-dc-btn">
            <button
              onClick={handleSubmit}
              className="opacity-100 bg-opacity-100 items-center"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="0.8em"
                width="1em"
              >
                <path d="M0 14a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2a2 2 0 00-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5a.5.5 0 010-1z" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-center mb-4">
            <div className="mb-10"></div>
            <div></div>
          </div>

          <Footer />
        </main>
      </div>
    </motion.div>
  );
};

export default DCInputPage;

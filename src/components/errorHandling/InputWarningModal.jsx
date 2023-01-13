import { motion } from "framer-motion";

const InputWarningModal = ({ show, header, message }) => {
  if (!show) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="top-right-alert">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-3 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold mr-4">{header}</strong>
          <span className="block sm:inline">{message}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InputWarningModal;

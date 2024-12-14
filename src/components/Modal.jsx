import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

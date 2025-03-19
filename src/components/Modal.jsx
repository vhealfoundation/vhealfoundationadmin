import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg relative w-full max-w-md max-h-[90vh] flex flex-col">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black z-10"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="overflow-y-auto p-6 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

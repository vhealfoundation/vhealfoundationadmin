import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Are you sure?</h3>
          <button onClick={onCancel}>
            <AiOutlineClose size={20} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <p className="text-gray-600 mt-4">Do you really want to delete this item? This action cannot be undone.</p>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

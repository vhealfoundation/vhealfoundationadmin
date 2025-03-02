import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SlotCard = ({ slot, onEdit, onDelete }) => {
  const { date, time, booked, userDetails, paymentStatus, completed } = slot;

  return (
    <div className="p-6 relative bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Slot Date & Time */}
      <div className="my-4">
        <h3 className="text-xl font-bold text-gray-800">{date}</h3>
        <h4 className="text-gray-600 mt-2">{time}</h4>
      </div>

      {/* Slot Details */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-gray-800">Booked: {booked ? "Yes" : "No"}</p>
        <p className="text-gray-800">Payment: {paymentStatus}</p>
        <p className="text-gray-800">Completed: {completed ? "Yes" : "No"}</p>
      </div>

      {/* User Details (if booked) */}
      {booked && userDetails?.name && (
        <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-14">
          <p className="text-gray-800">User: {userDetails.name}</p>
          <p className="text-gray-800">Email: {userDetails.email}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-6 flex justify-end gap-4">
        <button
          onClick={() => onEdit(slot)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
        <button
          onClick={() => onDelete(slot)}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          <FaTrash className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default SlotCard;

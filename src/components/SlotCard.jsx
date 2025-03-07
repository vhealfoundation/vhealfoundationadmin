import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SlotCard = ({ slot, onEdit, onDelete }) => {
  const { date, slots } = slot;

  // Calculate total slots and booked slots
  const totalSlots = slots.length;
  const bookedSlots = slots.filter((s) => s.booked).length;

  return (
    <div className="w-3/4 p-3 relative bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Slot Date */}
      <div className="mb-2 ">
        <h3 className="text-xl font-bold text-gray-800">{date}</h3>
        <p className="text-gray-600 mt-2">
          Total Slots: {totalSlots} | Booked: {bookedSlots}
        </p>
      </div>

      {/* Slot Timings List */}
      <div className="bg-gray-100 p-3 rounded-lg mb-[59px]">
        {slots.map((slotItem, index) => (
          <React.Fragment key={slotItem._id}>
            <div className="flex justify-between py-2">
              <p className="text-gray-800 font-medium">{slotItem.time}</p>
              <p className={`text-sm font-medium ${slotItem.booked ? "text-red-500" : "text-green-500"}`}>
                {slotItem.booked ? "Booked" : "Available"}
              </p>
            </div>
            {index < slots.length - 1 && (
              <div className="border-b border-gray-300 my-1 w-full"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-3 flex justify-end gap-4">
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

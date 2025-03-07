import React, { useState, useEffect } from "react";
import { MenuItem, Select, Button } from "@mui/material";
import toast from "react-hot-toast";
import { FaPlus, FaTimes } from "react-icons/fa";

const availableSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

const EditSlotCard = ({ slots, onSubmit, onRemove, onCancel }) => {
  // Local state holds updated slots from the server.
  const [newTime, setNewTime] = useState("");
  const [updatedSlots, setUpdatedSlots] = useState([...slots]);

  // Sync with parent updates
  useEffect(() => {
    setUpdatedSlots([...slots]);
  }, [slots]); // Whenever `slots` change, update `updatedSlots`

  const handleAddSlot = () => {
    if (newTime) {
      const trimmedNewTime = newTime.trim();
      const duplicate = updatedSlots.some(
        (slot) => slot.time.trim() === trimmedNewTime
      );

      if (duplicate) {
        toast.error("Slot timing already exists!");
        return;
      }

      // Create new slot
      const newSlot = { _id: "new", time: trimmedNewTime };

      // Update slots list
      setUpdatedSlots((prev) => [...prev, newSlot]);
      setNewTime(""); // Reset selection
    }
  };

  const handleRemoveSlot = (slot) => {
    if (slot._id && slot._id !== "new") {
      onRemove(slot._id);
    }
    setUpdatedSlots((prev) => prev.filter((s) => s._id !== slot._id));
  };

  const handleSave = () => {
    const newSlots = updatedSlots.filter((slot) => slot._id === "new");
    const existingSlots = updatedSlots.filter((slot) => slot._id !== "new");

    onSubmit({ newSlots, existingSlots });

    // Reset local state to reflect saved data
    setUpdatedSlots([...existingSlots, ...newSlots]);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">Manage Slots</h2>
      {/* List Existing Slots */}
      <div>
        {updatedSlots.length === 0 ? (
          <p className="text-gray-500">No slots available.</p>
        ) : (
          updatedSlots.map((slot, index) => (
            <div
              key={slot._id || `new-${index}`}
              className="border p-4 rounded mt-2 flex justify-between items-center"
            >
              <span>{slot.time}</span>
              <Button
                onClick={() => handleRemoveSlot(slot)}
                variant="contained"
                color="error"
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>
      {/* Add New Slot */}
      <div className="mt-4">
        <h3 className="block text-gray-700 text-sm font-medium mb-2">
          Add New Slot
        </h3>
        <Select
          value={newTime}
          onChange={(e) => {
            const selectedTime = e.target.value;
            const trimmedSelectedTime = selectedTime.trim();
            const duplicate = updatedSlots.some(
              (slot) => slot.time.trim() === trimmedSelectedTime
            );
            if (duplicate) {
              toast.error("Slot timing already exists!");
              setNewTime(""); // Reset selection after duplicate error.
              return;
            }
            setNewTime(selectedTime);
          }}
          className="w-1/2 border border-gray-300 rounded-md bg-gray-50"
          displayEmpty
        >
          <MenuItem disabled value="">
            Select Time Slot
          </MenuItem>
          {availableSlots.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
        <button
          type="button"
          onClick={handleAddSlot}
          className="mt-3 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          <FaPlus className="mr-2" />
          Add Slots
        </button>
      </div>
      {/* Cancel & Save Buttons */}
      <div className="flex justify-end space-x-4 mt-12">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSlotCard;

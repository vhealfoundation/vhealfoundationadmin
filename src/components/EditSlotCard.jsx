import React, { useState, useEffect } from "react";
import { MenuItem, Select, Button } from "@mui/material";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const allAvailableSlots = [
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
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [updatedSlots, setUpdatedSlots] = useState([...slots]);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Filter out already booked slots and existing slots from available options
  useEffect(() => {
    const existingTimes = updatedSlots.map(slot => slot.time.trim());
    const filteredSlots = allAvailableSlots.filter(time => !existingTimes.includes(time.trim()));
    setAvailableSlots(filteredSlots);
  }, [updatedSlots]);

  // Sync with parent updates
  useEffect(() => {
    setUpdatedSlots([...slots]);
  }, [slots]); // Whenever `slots` change, update `updatedSlots`

  const handleTimeChange = (event) => {
    setSelectedTimes(event.target.value);
  };

  const handleAddSlot = () => {
    if (selectedTimes.length === 0) return;

    const newSlots = [];

    // Process each selected time
    for (const time of selectedTimes) {
      const trimmedTime = time.trim();
      const duplicate = updatedSlots.some(
        (slot) => slot.time.trim() === trimmedTime
      );

      if (duplicate) {
        toast.error(`Slot timing '${trimmedTime}' already exists!`);
        continue;
      }

      // Create new slot
      newSlots.push({ _id: "new", time: trimmedTime });
    }

    if (newSlots.length > 0) {
      // Update slots list
      setUpdatedSlots((prev) => [...prev, ...newSlots]);

      // Update available slots
      const newTimes = newSlots.map(slot => slot.time);
      setAvailableSlots(prev => prev.filter(time => !newTimes.includes(time)));

      // Reset selection
      setSelectedTimes([]);
    }
  };

  const handleRemoveSlot = (slot) => {
    if (slot._id && slot._id !== "new") {
      onRemove(slot._id);
    }
    setUpdatedSlots((prev) => prev.filter((s) => s._id !== slot._id));

    // Add the removed slot back to available slots if it's not booked
    if (!slot.booked) {
      setAvailableSlots(prev => [...prev, slot.time].sort((a, b) => {
        // Sort by time (assuming format like "9:00 AM - 10:00 AM")
        return allAvailableSlots.indexOf(a) - allAvailableSlots.indexOf(b);
      }));
    }
  };

  const handleSave = () => {
    const newSlots = updatedSlots.filter((slot) => slot._id === "new");
    const existingSlots = updatedSlots.filter((slot) => slot._id !== "new");

    onSubmit({ newSlots, existingSlots });

    // Reset local state to reflect saved data
    setUpdatedSlots([...existingSlots, ...newSlots]);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4 relative">
      <h2 className="text-xl font-semibold mb-4">Manage Slots</h2>
      {/* List Existing Slots */}
      <div className="mb-4">
        <h3 className="block text-gray-700 text-sm font-medium mb-2">Current Slots:</h3>
        <div className="w-full">
          {updatedSlots.length === 0 ? (
            <p className="text-gray-500">No slots available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {updatedSlots.map((slot, index) => (
                <div
                  key={slot._id || `new-${index}`}
                  className="border p-4 rounded flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{slot.time}</span>
                    {slot.booked && (
                      <span className="text-xs text-gray-500">
                        Booked by: {slot.userDetails?.name || "Unknown"}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => handleRemoveSlot(slot)}
                    variant="contained"
                    color="error"
                    disabled={slot.booked}
                    title={slot.booked ? "Cannot remove booked slot" : "Remove slot"}
                  >
                    {slot.booked ? "Booked" : "Remove"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Add New Slot */}
      <div className="mt-4">
        <h3 className="block text-gray-700 text-sm font-medium mb-2">
          Add New Slot
        </h3>
        <Select
          multiple
          value={selectedTimes}
          onChange={handleTimeChange}
          className="w-1/2 border border-gray-300 rounded-md bg-gray-50"
          displayEmpty
        >
          <MenuItem disabled value="">
            Select Time Slots
          </MenuItem>
          {availableSlots.length > 0 ? (
            availableSlots.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              No available time slots
            </MenuItem>
          )}
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
      <div className="flex justify-end space-x-4 mt-12 sticky bottom-0 right-0 bg-white p-2 z-10 border-t border-gray-200 w-full">
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

import React, { useState } from "react";
import { IconButton, MenuItem, Select } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaTimes, FaPlus } from "react-icons/fa";

const AddSlotCard = ({ formData, onFormChange, onSubmit, onCancel, loading }) => {
  const [selectedTimes, setSelectedTimes] = useState([]);

  // Helper function to format date using local date values in YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    // getMonth returns index starting at 0; add 1 and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    onFormChange({ ...formData, date: formatDate(date) });
  };

  const handleTimeChange = (event) => {
    setSelectedTimes(event.target.value);
  };

  const addTimeSlots = () => {
    if (selectedTimes.length === 0) return;

    const newSlots = selectedTimes
      .filter((time) => !formData.slots.some((slot) => slot.time === time)) // Avoid duplicates
      .map((time) => ({
        time,
        booked: false,
        userDetails: { name: "", email: "" },
        paymentStatus: "pending",
        completed: false,
      }));

    onFormChange({ ...formData, slots: [...formData.slots, ...newSlots] });
    setSelectedTimes([]);
  };

  const removeTimeSlot = (index) => {
    const updatedSlots = formData.slots.filter((_, i) => i !== index);
    onFormChange({ ...formData, slots: updatedSlots });
  };

  // Convert formData.date (YYYY-MM-DD) to a local Date object for the Calendar component
  const getLocalDate = (dateString) => {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split("-");
    // Month parameter is 0-indexed in the Date constructor
    return new Date(year, month - 1, day);
  };

  return (
    <div className="mt-12 mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Enter Date & Available Slots</h1>

      {/* Calendar for Selecting Date */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">Select Date:</label>
        <Calendar
          value={getLocalDate(formData.date)}
          onChange={handleDateChange}
          className="border rounded-lg p-2 shadow-sm w-full"
        />
      </div>

      {/* Multi-Select Time Picker */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">Select Available Slots:</label>
        <Select
          multiple
          value={selectedTimes}
          onChange={handleTimeChange}
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
          displayEmpty
        >
          <MenuItem disabled value="">
            Select Time Slots
          </MenuItem>
          {[
            "9:00 AM - 10:00 AM",
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
            "12:00 PM - 1:00 PM",
            "1:00 PM - 2:00 PM",
            "2:00 PM - 3:00 PM",
            "3:00 PM - 4:00 PM",
            "4:00 PM - 5:00 PM",
            "5:00 PM - 6:00 PM",
          ].map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
        <button
          type="button"
          onClick={addTimeSlots}
          className="mt-3 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          <FaPlus className="mr-2" />
          Add Slots
        </button>
      </div>

      {/* List of Selected Time Slots */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">Added Slots:</label>
        <div className="flex flex-wrap gap-2">
          {formData.slots.length === 0 ? (
            <p className="text-gray-500">No slots added</p>
          ) : (
            formData.slots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-md border border-blue-300 shadow-sm"
              >
                <span>{slot.time}</span>
                <IconButton
                  className="ml-2 text-red-600 hover:scale-110"
                  onClick={() => removeTimeSlot(index)}
                >
                  <FaTimes />
                </IconButton>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Action Buttons (Cancel & Save) */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddSlotCard;
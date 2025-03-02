import React, { useState } from "react";
import { MenuItem, Select, Button } from "@mui/material";

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

const EditSlotCard = ({ slots, onUpdate, onRemove, onAdd }) => {
  const [newTime, setNewTime] = useState("");

  const handleSubmit = (e, slot) => {
    e.preventDefault();
    if (slot.newTime) {
      onUpdate({ ...slot, time: slot.newTime });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold">Edit Slots</h2>

      {slots.map((slot) => (
        <div key={slot._id} className="border p-4 rounded mt-2 flex justify-between items-center">
          <form onSubmit={(e) => handleSubmit(e, slot)} className="flex items-center gap-2">
            <Select
              value={slot.newTime || slot.time}
              onChange={(e) => onUpdate({ ...slot, newTime: e.target.value })}
              className="p-2 border rounded"
              displayEmpty
            >
              {availableSlots.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
          <Button onClick={() => onRemove(slot._id)} variant="contained" color="error">
            Remove
          </Button>
        </div>
      ))}

      {/* Add new slot */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Add New Slot</h3>
        <Select
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="p-2 border rounded w-full"
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
        <Button
          onClick={() => {
            if (newTime) {
              onAdd(newTime);
              setNewTime("");
            }
          }}
          variant="contained"
          color="success"
          className="mt-2"
        >
          Add Slot
        </Button>
      </div>
    </div>
  );
};

export default EditSlotCard;

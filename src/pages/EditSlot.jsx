import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import EditSlotCard from "../components/EditSlotCard";
import Layout from "../hoc/Layout";

const EditSlot = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date to YYYY-MM-DD
  const formatDate = (inputDate) => {
    const [day, month, year] = inputDate.split("-");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(date);

  // Fetch slots by date
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("Fetching appointment for date:", formattedDate);

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/appointments/${formattedDate}`
        );

        console.log("Fetched Data:", response.data);

        if (!response.data || !response.data.slot.slots) {
          setError("No slots found for this date");
          setLoading(false);
          return;
        }

        setSlots(response.data.slot.slots);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setError("Error fetching slot details");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [formattedDate]);

  console.log("All Slots:", slots);

  // Handle updating a specific slot
  const handleUpdate = async (updatedSlot) => {
    try {
      console.log("Updating slot:", updatedSlot);

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/slots/${formattedDate}/${updatedSlot._id}`,
        {
          time: updatedSlot.time, // Send only the updated time
        }
      );

      // Update the UI state
      setSlots((prevSlots) =>
        prevSlots.map((s) =>
          s._id === updatedSlot._id ? { ...s, time: updatedSlot.time } : s
        )
      );

      toast.success("Slot updated successfully!");
    } catch (err) {
      toast.error("Failed to update slot");
      console.error(err);
    }
  };

  // Handle removing a slot
  const handleRemove = async (slotId) => {
    try {
      console.log("Removing slot:", slotId);

      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/slots/${formattedDate}/${slotId}`);

      setSlots((prevSlots) => prevSlots.filter((s) => s._id !== slotId));
      toast.success("Slot removed successfully!");
    } catch (err) {
      toast.error("Failed to remove slot");
      console.error(err);
    }
  };

  // Handle adding a new slot
  const handleAdd = async (newTime) => {
    try {
      console.log("Adding new slot:", newTime);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/slots/${formattedDate}`, {
        time: newTime,
      });

      setSlots((prevSlots) => [...prevSlots, response.data]);
      toast.success("New slot added successfully!");
    } catch (err) {
      toast.error("Failed to add slot");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Slots</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <EditSlotCard slots={slots} onUpdate={handleUpdate} onRemove={handleRemove} onAdd={handleAdd} />
      )}
    </div>
  );
};

export default Layout(EditSlot);

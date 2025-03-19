import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import EditSlotCard from "../components/EditSlotCard";
import Layout from "../hoc/Layout";

const EditSlot = () => {
  const { date } = useParams();
  const [slots, setSlots] = useState([]);
  const [removedSlots, setRemovedSlots] = useState([]); // Track removed slot IDs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/appointments/${formattedDate}`
        );
        if (!response.data || !response.data.slot || !response.data.slot.slots) {
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

  // Handle updating slots
  const handleUpdate = async ({ newSlots, existingSlots }) => {
    try {
      for (const slot of existingSlots) {
        if (!slot._id) continue;
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/slots/${formattedDate}/${slot._id}`,
          {
            time: slot.time,
            remove: false,
            userDetails: slot.userDetails,
            paymentStatus: slot.paymentStatus,
            completed: slot.completed,
          }
        );
      }
  
      for (const slot of newSlots) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/slots/${formattedDate}/new`,
          {
            time: slot.time,
            remove: false,
            userDetails: {},
            paymentStatus: "pending",
            completed: false,
          }
        );
      }
  
      for (const slotId of removedSlots) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/slots/${formattedDate}/${slotId}`,
          { remove: true }
        );
      }
  
      // Fetch updated slots after updating
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/appointments/${formattedDate}`
      );
  
      setSlots(response.data.slot.slots);
      setRemovedSlots([]);
      toast.success("Slots updated successfully!");
      navigate("/slots");
    } catch (err) {
      toast.error("Failed to update slots");
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
        <EditSlotCard
          slots={slots}
          onSubmit={handleUpdate}
          onRemove={(slotId) => setRemovedSlots((prev) => [...prev, slotId])}
        />
      )}
    </div>
  );
};

export default Layout(EditSlot);
import { useState, useEffect } from "react";
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
    try {
      const [day, month, year] = inputDate.split("-");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return inputDate; // Return original date if formatting fails
    }
  };

  const formattedDate = formatDate(date);

  // Fetch slots by date
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("Fetching slots for date:", formattedDate);
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/appointments/${formattedDate}`
        );
        console.log("API Response:", response.data);

        if (!response.data || !response.data.slot || !response.data.slot.slots) {
          setError("No slots found for this date");
          setLoading(false);
          return;
        }

        // Handle case where slots might be empty array
        const slotsData = response.data.slot.slots || [];
        console.log("Slots data:", slotsData);

        // Add additional information for display
        const enhancedSlots = slotsData.map(slot => ({
          ...slot,
          // Add any additional properties needed for display
          displayStatus: slot.booked ? 'Booked' : 'Available'
        }));

        setSlots(enhancedSlots);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setError("Error fetching slot details: " + (err.message || 'Unknown error'));
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [formattedDate]);

  // Handle updating slots
  const handleUpdate = async ({ newSlots, existingSlots }) => {
    try {
      // Process existing slots
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

      // Process new slots
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

      // Process removed slots
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
      return true; // Return success to the EditSlotCard component
    } catch (err) {
      toast.error("Failed to update slots: " + (err.message || 'Unknown error'));
      console.error("Error updating slots:", err);
      throw err; // Throw the error to be caught by the EditSlotCard component
    }
  };


  // Handle cancel button click
  const handleCancel = () => {
    navigate("/slots");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Slots for {date}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={handleCancel}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Slots
          </button>
        </div>
      ) : (
        <EditSlotCard
          slots={slots}
          onSubmit={handleUpdate}
          onRemove={(slotId) => setRemovedSlots((prev) => [...prev, slotId])}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Layout(EditSlot);
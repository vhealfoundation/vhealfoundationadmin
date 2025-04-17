import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Layout from "../hoc/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddSlotCard from "../components/AddSlotCard";
import Loader from "../components/Loader";

const AddSlot = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Ensure initial state has correct format (YYYY-MM-DD)
    slots: [],
  });

  const [loading, setLoading] = useState(false);
  const [checkingDate, setCheckingDate] = useState(false);
  const [existingDates, setExistingDates] = useState([]);
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();

  // Fetch all existing appointment dates when component mounts
  useEffect(() => {
    const fetchExistingDates = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/appointments/dates`);
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setExistingDates(response.data.data);

          // Check if current date already has slots
          if (response.data.data.includes(formData.date)) {
            setDateError(`Slots already exist for ${formData.date}. Please edit existing slots or choose another date.`);
          }
        }
      } catch (err) {
        console.error("Error fetching existing dates:", err);
      }
    };

    fetchExistingDates();
  }, []);

  const onFormChange = async (newFormData) => {
    // Check if the date has changed
    if (newFormData.date !== formData.date) {
      setCheckingDate(true);
      setDateError("");

      // Check if the new date already has slots
      if (existingDates.includes(newFormData.date)) {
        setDateError(`Slots already exist for ${newFormData.date}. Please edit existing slots or choose another date.`);
      }

      setCheckingDate(false);
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.slots.length === 0) {
      toast.error("Please add at least one slot!");
      return;
    }

    // Double-check if date already has slots before submitting
    if (dateError) {
      toast.error(dateError);
      return;
    }

    try {
      setLoading(true);

      // Send the formatted data to the backend
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/appointments/dates`, {
        date: formData.date,
        slots: formData.slots,
      });

      setLoading(false);
      toast.success("Slot added successfully!");
      navigate("/slots");
    } catch (err) {
      setLoading(false);
      console.error("Error adding slot:", err);
      toast.error("Failed to add slot");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New Slot</h1>
      {checkingDate ? (
        <div className="mt-8">
          <Loader />
          <p className="text-center mt-4">Checking date availability...</p>
        </div>
      ) : dateError ? (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{dateError}</p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => navigate('/slots')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Back to Slots
            </button>
            <button
              onClick={() => {
                setDateError("");
                setFormData({
                  date: new Date().toISOString().split("T")[0],
                  slots: []
                });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Choose Another Date
            </button>
          </div>
        </div>
      ) : (
        <AddSlotCard
          formData={formData}
          onFormChange={onFormChange}
          onSubmit={handleSubmit}
          loading={loading}
          dateError={dateError}
          onCancel={() => navigate('/slots')}
        />
      )}
    </div>
  );
};

export default Layout(AddSlot);

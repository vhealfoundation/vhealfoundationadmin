import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../hoc/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddSlotCard from "../components/AddSlotCard";

const AddSlot = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Ensure initial state has correct format (YYYY-MM-DD)
    slots: [],
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.slots.length === 0) {
      toast.error("Please add at least one slot!");
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
      navigate("/appointments");
    } catch (err) {
      setLoading(false);
      console.error("Error adding slot:", err);
      toast.error("Failed to add slot");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New Slot</h1>
      <AddSlotCard
        formData={formData}
        onFormChange={onFormChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Layout(AddSlot);

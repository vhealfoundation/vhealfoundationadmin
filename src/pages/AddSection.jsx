import React, { useState } from "react";
import AddSectionCard from "../components/AddSectionCard";
import Layout from "../hoc/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSection = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageSrc: "",
    content: [{ title: "", description: "", image: "" }],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sections`,
        formData
      );
      setLoading(false);
      navigate("/sections"); // Redirect to the Sections page after successful submission
    } catch (err) {
      setLoading(false);
      console.error("Error adding section:", err);
    }
  };

  const handleCancel = () => {
    navigate("/sections"); // Redirect to the Sections page if the user cancels
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New Section</h1>
      <p className="mt-4">Fill out the form to add a new section to your website.</p>

      <AddSectionCard
        formData={formData}
        onFormChange={onFormChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};

export default Layout(AddSection);

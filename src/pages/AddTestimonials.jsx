import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../hoc/Layout";
import AddStoriesCard from "../components/AddStoriesCard";
import axios from "axios";

const AddTestimonials = () => {
  const [newTestimonial, setNewTestimonial] = useState({
    coverimage: "",
    title: "",
    description: "",
    content: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSave = async (testimonialData) => {
    if (!testimonialData.coverimage || !testimonialData.title || testimonialData.content.length === 0) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/testimonials`,
        testimonialData
      );
      
      toast.success("Testimonial saved successfully!");
      navigate("/testimonials");
    } catch (err) {
      console.error("Error saving testimonial:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/testimonials");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New</h1>
      <AddStoriesCard 
        story={newTestimonial} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default Layout(AddTestimonials);
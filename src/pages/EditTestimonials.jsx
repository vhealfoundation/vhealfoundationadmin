import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../hoc/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditStoriesCard from "../components/EditStoriesCard";

const EditTestimonials = () => {
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/testimonials/${id}`);
        setTestimonial(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonial:", error);
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  const handleSave = async (updatedTestimonial) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/testimonials/${id}`,
        updatedTestimonial
      );
      setTestimonial(response.data.data);
      toast.success("Testimonial updated successfully!");
      navigate("/testimonials");
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast.error("Failed to update testimonial");
    }
  };

  const handleCancel = () => {
    navigate("/testimonials");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Accolades</h1>

      {testimonial ? (
        <EditStoriesCard 
          story={testimonial} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      ) : (
        <div>No Accolades found.</div>
      )}
    </div>
  );
};

export default Layout(EditTestimonials);
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import StoryCard from "../components/StoryCard";
import Loader from "../components/Loader";  
import { FaPlus } from "react-icons/fa";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/testimonials`);
        setTestimonials(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/testimonials/${id}`);
      setTestimonials((prevTestimonials) => 
        prevTestimonials.filter((testimonial) => testimonial._id !== id)
      );
      toast.success("Testimonial deleted successfully!");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="p-6">
      {loading && <Loader />}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <button
          onClick={() => navigate("/testimonials/new")} 
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          <FaPlus className="mr-2" />
          Add New Testimonial
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="w-full">
            <StoryCard
              story={testimonial}
              onDelete={handleDelete}
              isTestimonial={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout(Testimonials);
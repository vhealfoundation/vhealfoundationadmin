import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import EditSectionCard from "../components/EditSectionCard"; // Reusing EditSectionCard component
import toast from "react-hot-toast";

const EditAbout = () => {
  const { id } = useParams(); // Get ID from URL params
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To navigate after updating the about card

  useEffect(() => {
    const fetchAboutCard = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/aboutcards/${id}`
        );
        setAbout(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about card:", error);
        setLoading(false);
      }
    };

    fetchAboutCard();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      // Send the updated data to the backend
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/aboutcards/${id}`,
        updatedData
      );

      setAbout(response.data.data); // Update the about card state with the response data
      toast.success("About card updated successfully!");
      navigate("/about");
    } catch (error) {
      console.error("Error updating about card:", error);
    }
  };

  const handleCancel = () => {
    navigate("/about"); // Redirect to the "about" page if cancelled
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit About</h1>
      <div>
        {about && (
          <EditSectionCard
            section={about} 
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Layout(EditAbout);

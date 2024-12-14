// EditAbout.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import EditAboutCard from "../components/EditAboutCard";

const EditAbout = () => {
  const { id } = useParams(); // Get ID from URL params
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To navigate after updating the card

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

  const handleUpdate = (updatedData) => {
    setAbout(updatedData); // Update the state with the new data
    navigate("/about"); // Redirect to the "about" page after update
  };

  const handleCancel = () => {
    navigate("/about"); // Redirect to the "about" page if cancelled
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit About</h1>
      <p className="mt-4">Edit information about your organization.</p>
      <div>
        {about && (
          <EditAboutCard
            about={about}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Layout(EditAbout);

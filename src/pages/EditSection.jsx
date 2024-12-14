// EditSection.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import EditSectionCard from "../components/EditSectionCard";

const EditSection = () => {
  const { id } = useParams(); // Get ID from URL params
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To navigate after updating the section

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/sections/${id}`
        );
        setSection(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching section:", error);
        setLoading(false);
      }
    };

    fetchSection();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      // Send the updated data to the backend
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/sections/${id}`,
        updatedData
      );
      
      setSection(response.data.data); // Update the section state with the response data
      navigate("/sections");
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };
  

  const handleCancel = () => {
    navigate("/sections"); // Redirect to the "sections" page if cancelled
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Section</h1>
      <p className="mt-4">Edit your section information here.</p>
      <div>
        {section && (
          <EditSectionCard
            section={section}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Layout(EditSection);

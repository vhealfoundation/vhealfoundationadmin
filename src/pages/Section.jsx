import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import SectionCard from "../components/SectionCard";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { FaPlus } from "react-icons/fa";

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch sections data on component mount
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/sections`);
        setSections(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching sections data");
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  // Delete a section
  const deleteSection = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/sections/${id}`);
      setSections(sections.filter((section) => section._id !== id));
      toast.success("Section deleted successfully!");
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Sections</h1>
      

      {/* Add New Section Button */}
      <button
        className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={() => navigate("/sections/new")}
      >
       <FaPlus className="mr-2" />
        Add New Section
      </button>
    </div>

      {/* Display loading or sections */}
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <SectionCard
              key={section._id}
              section={section}
              onDelete={(section) => {
                setSelectedSection(section);
                setShowModal(true);
              }}
              onEdit={(section) => {
                navigate(`/sections/${section._id}`);
              }}
            />
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showModal && selectedSection && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onConfirm={() => {
            deleteSection(selectedSection._id); // Pass the selected section's _id to the delete function
            setShowModal(false); // Close the modal after confirming
          }}
          onCancel={() => setShowModal(false)} // Close the modal when cancelled
        />
      )}
    </div>
  );
};

export default Layout(Sections);

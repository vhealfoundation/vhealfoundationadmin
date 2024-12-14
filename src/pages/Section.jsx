import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import SectionCard from "../components/SectionCard";
import Loader from "../components/Loader";
import { AiOutlinePlus } from "react-icons/ai";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

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
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Sections</h1>
      <p className="mt-4">Organize and manage different sections of your website.</p>

      {/* Add New Section Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex items-center"
        onClick={() => navigate("/sections/new")}
      >
        <AiOutlinePlus className="mr-2" />
        Add New Sectione
      </button>

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
                setShowModal(true); // Show confirmation modal
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
            deleteSection(selectedSection._id);
            setShowModal(false); // Close the modal
          }}
          onCancel={() => setShowModal(false)} // Close the modal when cancelled
        />
      )}
    </div>
  );
};

export default Layout(Sections);

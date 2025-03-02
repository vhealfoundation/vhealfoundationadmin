import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import SectionCard from "../components/SectionCard"; // Reusing the same SectionCard component
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { FaPlus } from "react-icons/fa";

const About = () => {
  const [aboutCards, setAboutCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAboutCard, setSelectedAboutCard] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch AboutCard data on component mount
  useEffect(() => {
    const fetchAboutCards = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/aboutcards`);
        setAboutCards(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching AboutCards data");
        setLoading(false);
      }
    };

    fetchAboutCards();
  }, []);

  // Delete an AboutCard
  const deleteAboutCard = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/aboutcards/${id}`);
      setAboutCards(aboutCards.filter((aboutCard) => aboutCard._id !== id));
      toast.success("AboutCard deleted successfully!");
    } catch (err) {
      console.error("Error deleting AboutCard:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">About</h1>

        {/* Add New AboutCard Button */}
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => navigate("/about/new")}
        >
          <FaPlus className="mr-2" />
          Add New AboutCard
        </button>
      </div>

      {/* Display loading or AboutCards */}
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {aboutCards?.map((aboutCard) => (
            <SectionCard
              key={aboutCard._id}
              section={aboutCard} // Reusing SectionCard component for AboutCard
              onDelete={(aboutCard) => {
                setSelectedAboutCard(aboutCard);
                setShowModal(true);
              }}
              onEdit={(aboutCard) => {
                navigate(`/about/${aboutCard._id}`);
              }}
            />
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showModal && selectedAboutCard && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onConfirm={() => {
            deleteAboutCard(selectedAboutCard._id); // Pass the selected AboutCard's _id to the delete function
            setShowModal(false); // Close the modal after confirming
          }}
          onCancel={() => setShowModal(false)} // Close the modal when cancelled
        />
      )}
    </div>
  );
};

export default Layout(About);

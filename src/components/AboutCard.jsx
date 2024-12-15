import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // for navigation
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Import the modal component

const AboutCard = ({ about, onDelete }) => {
  const navigate = useNavigate(); // React Router navigation hook
  const [showModal, setShowModal] = React.useState(false); // State to toggle modal visibility

  const handleEdit = () => {
    navigate(`/about/${about._id}`); // Redirect to the edit pages
  };

  const handleDelete = () => {
    setShowModal(true); // Show the confirmation modal
  };

  return (
    <div className="p-6 relative  bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Main Card Image */}
      <img className="w-full h-48 object-cover rounded-md" src={about.imageSrc} alt={about.title} />

      {/* Card Content */}
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-800">{about.title}</h2>
        <p className="text-gray-600 mt-2">{about.description}</p>

        {/* Content List */}
        <div className="mt-4 mb-14">
          {about.content.map((item) => (
            <div key={item._id} className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex items-center">
                <img className="rounded-md w-20 h-14 object-cover" src={item.image} alt={item.title} />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex justify-end gap-4">
            <button
              onClick={() => navigate(`/about/${about._id}`)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              <FaEdit className="mr-2" />
              Edit
            </button>
            <button
              onClick={() => setShowModal(true)} 
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              <FaTrash className="mr-2" />
              Delete
            </button>
          </div>
        </div>


      </div>

      {/* ConfirmDeleteModal */}
      {showModal && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onConfirm={() => onDelete(about._id)} // Pass the about._id when confirmed
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AboutCard;

import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // for navigation
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Import the modal component

const AboutCard = ({ about, onDelete }) => {
  const navigate = useNavigate(); // React Router navigation hook
  const [showModal, setShowModal] = React.useState(false); // State to toggle modal visibility

  const handleEdit = () => {
    navigate(`/about/${about._id}`); // Redirect to the edit page
  };

  const handleDelete = () => {
    setShowModal(true); // Show the confiramation modal
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Main Card Image */}
      <img className="w-full h-48 object-cover" src={about.imageSrc} alt={about.title} />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{about.title}</h2>
        <p className="text-gray-600 mt-2">{about.description}</p>

        {/* Content List */}
        <div className="mt-4">
          {about.content.map((item) => (
            <div key={item._id} className="mb-4">
              <div className="flex items-center">
                <img className="w-20 h-14 object-cover" src={item.image} alt={item.title} />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleEdit} // Navigate to edit page
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <AiOutlineEdit size={20} className="mr-1" /> Edit
          </button>
          <button
            onClick={handleDelete} // Show the confirmation modal
            className="text-red-500 hover:text-red-700 flex items-center"
          >
            <AiOutlineDelete size={20} className="mr-1" /> Delete
          </button>
        </div>
      </div>

      {/* ConfirmDeleteModal */}
     s
    </div>
  );
};

export default AboutCard;

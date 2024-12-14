import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const GalleryCard = ({ image, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Animation variants for image card
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleImageClick = () => {
    setSelectedImage(image.url); // Set the selected image URL for modal
  };

  return (
<>
<motion.div
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
    >
      <motion.img
        src={image.url}
        alt={image.description || "Gallery Image"}
        className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity duration-300"
        onClick={handleImageClick} // Trigger the modal when clicked
      />


      {/* Delete Icon */}
      <AiFillDelete
        className="absolute top-4 right-4 text-red-500 text-2xl cursor-pointer hover:scale-110"
        onClick={() => setShowModal(true)}
      />

    

  
    </motion.div>

      {showModal && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onConfirm={() => {
            onDelete(image._id); // Call onDelete when confirmed
            setShowModal(false); // Close the modal
          }}
          onCancel={() => setShowModal(false)} // Close the modal when cancelled
        />
      )}
</>
  );
};

export default GalleryCard;

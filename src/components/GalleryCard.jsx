import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Modal from "./Modal";

const GalleryCard = ({ image, category, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCaptionModal, setShowCaptionModal] = useState(false);
  const [caption, setCaption] = useState(image.caption || "");

  // Animation variants for image card
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowCaptionModal(true);
  };

  const handleCaptionSave = async () => {
    // In a real implementation, you would update the caption in the backend
    // For now, we'll just close the modal
    setShowCaptionModal(false);
  };

  return (
    <>
      <motion.div
        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        onClick={handleImageClick}
      >
        <div className="relative">
          <img
            src={image.url}
            alt={image.caption || "Gallery Image"}
            className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity duration-300"
          />
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {category}
          </div>
          
          {/* Caption (if exists) */}
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm">
              {image.caption}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
          >
            <AiFillEdit className="text-lg" />
          </button>
          
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
          >
            <AiFillDelete className="text-lg" />
          </button>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          onConfirm={() => {
            onDelete(category, image._id);
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
          message={`Are you sure you want to delete this image from ${category}?`}
        />
      )}

      {/* Image Preview Modal */}
      {showImageModal && (
        <Modal onClose={() => setShowImageModal(false)}>
          <div className="flex flex-col items-center">
            <img
              src={image.url}
              alt={image.caption || "Gallery Image"}
              className="max-w-full max-h-[70vh] object-contain"
            />
            {image.caption && (
              <p className="mt-4 text-center text-gray-700">{image.caption}</p>
            )}
          </div>
        </Modal>
      )}

      {/* Caption Edit Modal */}
      {showCaptionModal && (
        <Modal onClose={() => setShowCaptionModal(false)}>
          <h2 className="text-xl font-bold mb-4">Edit Image Caption</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Caption:
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter a caption for this image"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowCaptionModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleCaptionSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default GalleryCard;
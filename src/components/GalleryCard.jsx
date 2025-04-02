import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Modal from "./Modal";

const GalleryCard = ({ image, category, onDelete, onUpdateCaption }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCaptionModal, setShowCaptionModal] = useState(false);
  const [caption, setCaption] = useState(image.caption || "");
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

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
    // Reset caption to current image caption when opening modal
    setCaption(image.caption || "");
    setUpdateError(null);
    setShowCaptionModal(true);
  };

  const handleCaptionSave = async () => {
    try {
      setUpdating(true);
      setUpdateError(null);

      // Call the parent component's update function
      const success = await onUpdateCaption(category, image._id, caption);

      if (success) {
        setShowCaptionModal(false);
      } else {
        setUpdateError("Failed to update caption. Please try again.");
      }
    } catch (error) {
      console.error("Error updating caption:", error);
      setUpdateError("An unexpected error occurred. Please try again.");
    } finally {
      setUpdating(false);
    }
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
              className="max-w-full max-h-[70vh] object-cover object-top"
            />
            <div className="mt-4 text-center">
              {image.caption ? (
                <p className="text-gray-700">{image.caption}</p>
              ) : (
                <p className="text-gray-400 italic">No caption</p>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowImageModal(false);
                  setTimeout(() => setShowCaptionModal(true), 100);
                }}
                className="mt-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                Edit Caption
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Caption Edit Modal */}
      {showCaptionModal && (
        <Modal onClose={() => !updating && setShowCaptionModal(false)}>
          <h2 className="text-xl font-bold mb-4">Edit Image Caption</h2>

          {updateError && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {updateError}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Caption:
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={updating}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter a caption for this image"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setShowCaptionModal(false)}
              disabled={updating}
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 ${
                updating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleCaptionSave}
              disabled={updating}
              className={`${
                updating ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded flex items-center`}
            >
              {updating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Caption"
              )}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

// Default props to prevent errors if onUpdateCaption is not provided
GalleryCard.defaultProps = {
  onUpdateCaption: async () => {
    console.error("onUpdateCaption prop is not provided to GalleryCard component");
    return false;
  }
};

export default GalleryCard;
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; 

const StoryCard = ({ story, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      {/* Cover Image */}
      <div className="mb-4">
        <img
          src={story.coverimage}
          alt={story.title}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Story Title and Description */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {story.title}
      </h2>
      <p className="text-gray-600 mb-4">{story.description}</p>

      {/* Story Content */}
      {story.content.map((section) => (
        <div
          key={section._id}
          className="bg-gray-100 p-4 rounded-lg mb-4 flex items-start"
        >
          {/* Content Image */}
          <img
            src={section.image}
            alt={section.title}
            className="w-20 h-20 rounded-lg mr-4 object-cover"
          />

          {/* Content Title and Description */}
          <div>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="text-gray-600">{section.description}</p>
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={() => onEdit(story._id)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
        <button
          onClick={() => onDelete(story._id)}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          <FaTrash className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default StoryCard;

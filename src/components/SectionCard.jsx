import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const SectionCard = ({ section, onEdit, onDelete }) => {
  const { image, alt, heading, subheading, description, features, reverse } = section;

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      {/* Section Image */}
      <img src={image} alt={alt} className="w-full h-40 object-cover rounded-md" />
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">{heading}</h3>
        <h4 className="text-lg text-gray-600">{subheading}</h4>
        <p className="mt-2 text-gray-800">{description}</p>
      </div>

      {/* Features List */}
      <ul className="mt-4 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700">- {feature}</li>
        ))}
      </ul>

      {/* Edit and Delete Icons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => onEdit(section)}
          aria-label="Edit Section"
        >
          <AiFillEdit className="text-xl" />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onDelete(section)}
          aria-label="Delete Section"
        >
          <AiFillDelete className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SectionCard;

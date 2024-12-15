import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";


const SectionCard = ({ section, onEdit, onDelete }) => {
  const { image, heading, subheading, description, features, reverse } = section;

  return (
    <div className="relative  bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Section Image */}
      <img src={image}  className="w-full h-48 object-cover" />

     <div className="px-6 py-3">
     <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-800">{heading}</h3>
        <h4 className="text-gray-600 mt-2">{subheading}</h4>

      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="mt-2 text-gray-800">{description}</p>
      </div>


      {/* Features List */}
      <ul className="bg-gray-100 p-4 rounded-lg space-y-2 mt-4">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700">- {feature}</li>
        ))}
      </ul>

      {/*Reverse */}
      {reverse ? (
        <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-14">
          <p className="mt-2 text-gray-800">Reverse: True</p>
        </div>
      ): (
        <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-14 ">
          <p className="mt-2 text-gray-800">Reverse: False</p>
        </div>
      )}

     </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-6 flex justify-end gap-4">
        <button
          onClick={() => onEdit(section)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
        <button
          onClick={() => onDelete(section)}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          <FaTrash className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default SectionCard;

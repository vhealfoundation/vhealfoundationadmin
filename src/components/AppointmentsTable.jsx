import React, { useState } from "react";

const AppointmentsTable = ({ appointmentsData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointmentsData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(appointmentsData.length / itemsPerPage);

  return (
    <div className="pt-6 overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-4 text-left">S.No</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Time</th>
            <th className="py-3 px-4 text-left">Booked</th>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Payment Status</th>
            <th className="py-3 px-4 text-left">Completed</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((appointment, index) =>
            appointment.slots.map((slot, slotIndex) => (
              <tr key={slot._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-3 px-4">{indexOfFirstItem + slotIndex + 1}</td>
                <td className="py-3 px-4">{appointment.date}</td>
                <td className="py-3 px-4">{slot.time}</td>
                <td className="py-3 px-4">
                  <span
                    className={`py-1 px-3 rounded-full ${slot.booked ? "bg-red-500" : "bg-green-500"} text-white`}
                  >
                    {slot.booked ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {slot.userDetails?.name ? `${slot.userDetails.name} (${slot.userDetails.email})` : "N/A"}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`py-1 px-3 rounded-full ${slot.paymentStatus === "paid" ? "bg-green-500" : "bg-yellow-500"} text-white`}
                  >
                    {slot.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`py-1 px-3 rounded-full ${slot.completed ? "bg-blue-500" : "bg-gray-500"} text-white`}
                  >
                    {slot.completed ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none space-x-2">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              >
                Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-400`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AppointmentsTable;

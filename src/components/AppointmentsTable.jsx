import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import moment from "moment";

const AppointmentsTable = ({ appointmentsData }) => {
  // Use local state to manage appointments data for inline updates.
  const [localAppointments, setLocalAppointments] = useState(appointmentsData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sync local state with prop updates.
  useEffect(() => {
    setLocalAppointments(appointmentsData || []);
  }, [appointmentsData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = localAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(localAppointments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle toggle for updating completed status.
  // Here, we use appointment.time as a placeholder for formattedDate.
  const handleToggleCompleted = async (appointment, newStatus) => {
    try {
      const formattedDate = moment(appointment.date).format("YYYY-MM-DD"); // Ensure correct date format
  
      // API call to update the completed status
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/slots/${formattedDate}/${appointment._id}/completed`,
        { completed: newStatus }
      );
  
      // Update the local state
      const updatedAppointments = localAppointments.map((appt) =>
        appt._id === appointment._id ? { ...appt, completed: newStatus } : appt
      );
      setLocalAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error updating appointment completed status:", error);
    }
  };
  

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
          {currentItems.map((appointment, index) => (
            <tr
              key={appointment._id}
              className={(indexOfFirstItem + index) % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-3 px-4">
                {indexOfFirstItem + index + 1}
              </td>
              <td className="py-3 px-4">
                {moment(appointment.date).format("DD-MM-YYYY")}
              </td>
              <td className="py-3 px-4">
                {appointment.time}
              </td>
              <td className="py-3 px-4">
                <span className={`py-1 px-3 rounded-full ${appointment.booked ? "bg-red-500" : "bg-green-500"} text-white`}>
                  {appointment.booked ? "Yes" : "No"}
                </span>
              </td>
              <td className="py-3 px-4">
                {appointment.userDetails?.name
                  ? `${appointment.userDetails.name} (${appointment.userDetails.email})`
                  : "N/A"}
              </td>
              <td className="py-3 px-4">
                <span className={`py-1 px-3 rounded-full ${appointment.paymentStatus.toLowerCase() === "paid" ? "bg-green-500" : "bg-yellow-500"} text-white`}>
                  {appointment.paymentStatus}
                </span>
              </td>
              <td className="py-3 px-4">
                <Switch
                  checked={appointment.completed}
                  onChange={(event) => handleToggleCompleted(appointment, event.target.checked)}
                  color="primary"
                />
              </td>
            </tr>
          ))}
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
                  className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400`}
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
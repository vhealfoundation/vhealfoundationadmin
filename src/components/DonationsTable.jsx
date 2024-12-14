import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

// Sample data for donations (you can replace it with dynamic data from your API)
const donationsData = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", amount: 500, beneficiary: "Charity A", status: "Paid" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", amount: 300, beneficiary: "Charity B", status: "Pending" },
  { id: 3, name: "Alex Johnson", email: "alex@example.com", phone: "1122334455", amount: 1000, beneficiary: "Charity C", status: "Paid" },
  // Add more data as needed
];

const DonationsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    // Handle deletion logic here (e.g., remove from state or API call)
    console.log("Deleted donation with ID:", id);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = donationsData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(donationsData.length / itemsPerPage);

  return (
    <div className="pt-6 overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-4 text-left">S.No</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Beneficiary</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((donation, index) => (
            <tr key={donation.id} className="border-b border-gray-200">
              <td className="py-3 px-4">{indexOfFirstItem + index + 1}</td>
              <td className="py-3 px-4">{donation.name}</td>
              <td className="py-3 px-4">{donation.email}</td>
              <td className="py-3 px-4">{donation.phone}</td>
              <td className="py-3 px-4">${donation.amount}</td>
              <td className="py-3 px-4">{donation.beneficiary}</td>
              <td className="py-3 px-4">
                <span
                  className={`py-1 px-3 rounded-full ${
                    donation.status === "Paid" ? "bg-green-500" : "bg-yellow-500"
                  } text-white`}
                >
                  {donation.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <button onClick={() => handleDelete(donation.id)} className="text-red-500 hover:text-red-700">
                  <AiOutlineDelete size={20} />
                </button>
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

export default DonationsTable;

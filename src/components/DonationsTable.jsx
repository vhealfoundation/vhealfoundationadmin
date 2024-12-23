import React, { useState } from "react";
// import { AiOutlineDelete } from "react-icons/ai";
// import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


const DonationsTable = ({ donationsData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [showModal, setShowModal] = React.useState(false);
  const itemsPerPage = 5;


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
            {/* <th className="py-3 px-4 text-left">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((donation, index) => (
            <>
              <tr key={donation._id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                <td className="py-3 px-4">{indexOfFirstItem + index + 1}</td>
                <td className="py-3 px-4">{donation?.name}</td>
                <td className="py-3 px-4">{donation?.email}</td>
                <td className="py-3 px-4">{donation?.phone}</td>
                <td className="py-3 px-4">{donation?.amount}</td>
                <td className="py-3 px-4">{donation?.beneficiary.name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`py-1 px-3 rounded-full ${donation.status === "Paid" ? "bg-green-500" : "bg-yellow-500"
                      } text-white`}
                  >
                    {donation.status}
                  </span>
                </td>
                {/* <td className="py-3 px-4">
                  <button onClick={() => setShowModal(true)} className="text-red-500 hover:text-red-700">
                    <AiOutlineDelete size={20} />
                  </button>
                </td> */}
              </tr>
             
              {/* {showModal && (
                <ConfirmDeleteModal
                  isOpen={showModal}
                  onConfirm={() => onDelete(donation._id)}
                  onCancel={() => setShowModal(false)}
                />
              )} */}
            </>
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
                  className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
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

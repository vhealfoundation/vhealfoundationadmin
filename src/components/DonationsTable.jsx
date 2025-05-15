import { useState, useEffect } from "react";
import moment from 'moment';

const DonationsTable = ({ donationsData }) => {
  const [localDonations, setLocalDonations] = useState(donationsData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 rows at a time

  // Sync local state with prop updates and sort by date (newest first).
  useEffect(() => {
    if (donationsData) {
      // Sort donations by date (newest first)
      const sortedDonations = [...donationsData].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setLocalDonations(sortedDonations);
    } else {
      setLocalDonations([]);
    }
  }, [donationsData]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = localDonations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(localDonations.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pt-6 overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-4 text-left">S.No</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Beneficiary</th>
            <th className="py-3 px-4 text-left">Status</th>
            {/* <th className="py-3 px-4 text-left">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((donation, index) => (
            <tr key={donation._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="py-3 px-4">{indexOfFirstItem + index + 1}</td>
              <td className="py-3 px-4">{donation?.name || 'N/A'}</td>
              <td className="py-3 px-4">{donation?.email || 'N/A'}</td>
              <td className="py-3 px-4">{donation?.phone || 'N/A'}</td>
              <td className="py-3 px-4">{moment(donation?.createdAt).format("DD-MM-YYYY")}</td>
              <td className="py-3 px-4">₹{donation?.amount}</td>
              <td className="py-3 px-4">{donation?.beneficiary?.name || 'General'}</td>
              <td className="py-3 px-4">
                <span
                  className={`py-1 px-3 rounded-full ${donation.status === "Paid" ? "bg-green-500" : "bg-yellow-500"} text-white`}
                >
                  {donation.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination and total count */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-700">
          <p>Total Donations: {localDonations.length}</p>
        </div>

        {/* Pagination controls */}
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
            {totalPages <= 5 ? (
              // If 5 or fewer pages, show all page numbers
              Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))
            ) : (
              // If more than 5 pages, show a limited set with ellipsis
              <>
                {/* First page */}
                {currentPage > 2 && (
                  <li>
                    <button
                      onClick={() => paginate(1)}
                      className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400`}
                    >
                      1
                    </button>
                  </li>
                )}

                {/* Ellipsis if needed */}
                {currentPage > 3 && (
                  <li className="flex items-center px-2">...</li>
                )}

                {/* Pages around current page */}
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum;
                  if (currentPage === 1 || currentPage === 2) {
                    pageNum = i + 1;
                  } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }

                  if (pageNum > 0 && pageNum <= totalPages) {
                    return (
                      <li key={pageNum}>
                        <button
                          onClick={() => paginate(pageNum)}
                          className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400`}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}

                {/* Ellipsis if needed */}
                {currentPage < totalPages - 2 && (
                  <li className="flex items-center px-2">...</li>
                )}

                {/* Last page */}
                {currentPage < totalPages - 1 && (
                  <li>
                    <button
                      onClick={() => paginate(totalPages)}
                      className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400`}
                    >
                      {totalPages}
                    </button>
                  </li>
                )}
              </>
            )}
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

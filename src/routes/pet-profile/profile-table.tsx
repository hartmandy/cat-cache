import React, { useState } from "react";
import { TargetIcon } from "@radix-ui/react-icons";

const ProfileTable = ({ visits }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const patientVisit = [
    {
      id: 1,
      visitDate: "2024-05-13 01:00 PM",
      vet: "Benjamin Lee",
      reasonForVisit: "Broken leg",
      notes: "Surgery performed, pain medication administered",
      status: "In Treatment",
    },
    {
      id: 2,
      visitDate: "2024-05-10 07:00 PM",
      vet: "Benjamin Lee",
      reasonForVisit: "Not eating",
      notes: "Blood tests done, awaiting results",
      status: "Completed",
    },
    {
      id: 3,
      visitDate: "2023-05-22 01:00 PM",
      vet: "Benjamin Lee",
      reasonForVisit: "Vomiting",
      notes: "Fluids administered, under observation",
      status: "Completed",
    },
  ];

  const filteredVisits = visits.filter(
    (visit) =>
      visit.visitDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.vet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.reasonForVisit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVisits.length / itemsPerPage);
  const displayedVisits = filteredVisits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-xl lg:text-2xl text-lg text-gray-600 font-light mr-1">
          Patient Visits
        </h2>
        <input
          type="text"
          placeholder="Search visits..."
          className="border border-gray-300 rounded-md p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="min-w-full table-fixed">
        <thead className="bg-slate-100">
          <tr>
            <th className="w-1/12 py-2 px-4 text-left rounded-tl-lg rounded-bl-lg">
              Visit Date
            </th>
            <th className="w-1/12 py-2 px-4 text-left">Vet</th>
            <th className="w-2/12 py-2 px-4 text-left">Reason</th>
            <th className="w-1/12 py-2 px-4 text-left">Notes</th>
            <th className="w-4/12 py-2 px-4 text-left">Status</th>
            {/* <th className="w-1/12 py-2 px-4 text-left rounded-tr-lg rounded-br-lg">
              View
            </th> */}
          </tr>
        </thead>
        <tbody>
          {displayedVisits.map((visit) => (
            <tr key={visit.id}>
              <td className="w-1/6 py-2 px-4">{visit.visitDate}</td>
              <td className="w-1/6 py-2 px-4">{visit.reasonForVisit}</td>
              <td className="w-1/6 py-2 px-4">{visit.notes}</td>
              <td className="w-1/6 py-2 px-4">
                <div
                  className={`inline-flex items-center rounded-full px-2 py-1 font-semibold ${getStatusClassNames(
                    visit.status
                  )}`}
                >
                  <TargetIcon className={`mr-2 w-5 h-5`} />
                  <span className="text-nowrap overflow-ellipsis">
                    {visit.status}
                  </span>
                </div>
              </td>
              {/* <td className="w-1/6 py-2 px-4">
                <Link
                  to={`/patient-profile/${patient.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4 space-x-2">
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`text-gray-700 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:text-gray-900"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          className={`text-gray-700 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:text-gray-900"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileTable;

const getStatusClassNames = (status) => {
  switch (status) {
    case "In Treatment":
      return "text-red-800 bg-red-100";
    case "Stable":
      return "text-green-800 bg-green-100";
    case "Under Observation":
      return "text-yellow-800 bg-yellow-100";
    case "Recovering":
      return "text-orange-800 bg-orange-100";
    default:
      return "text-gray-800 bg-gray-100";
  }
};

const getPetTypeClassNames = (petType) => {
  return petType === "Dog"
    ? "bg-blue-100 text-blue-800"
    : "bg-purple-100 text-purple-800";
};

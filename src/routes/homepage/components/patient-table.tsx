import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TargetIcon } from "@radix-ui/react-icons";

const StatusEnum = {
  JUST_ARRIVED: "Just Arrived",
  IN_TREATMENT: "In Treatment",
  UNDER_OBSERVATION: "Under Observation",
  STABLE: "Stable",
  RECOVERING: "Recovering",
};

const PatientListTable = ({ visits }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const filteredPatients = visits.filter(
    (patient) =>
      patient.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.petType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.petBreed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.ownerContact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const displayedPatients = filteredPatients.slice(
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
          Patients in Our Care
        </h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="border border-gray-300 rounded-md p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="min-w-full table-fixed">
        <thead className="bg-slate-100">
          <tr>
            <th className="w-1/12 py-2 px-4 text-left rounded-tl-lg rounded-bl-lg">
              Pet Name
            </th>
            <th className="w-1/12 py-2 px-4 text-left">Type</th>
            <th className="w-2/12 py-2 px-4 text-left">Breed</th>
            <th className="w-1/12 py-2 px-4 text-left">Owner</th>
            <th className="w-1/12 py-2 px-4 text-left">Contact</th>
            <th className="w-4/12 py-2 px-4 text-left">Status</th>
            <th className="w-1/12 py-2 px-4 text-left rounded-tr-lg rounded-br-lg">
              Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedPatients.map((patient) => (
            <tr key={patient.id}>
              <td className="w-1/6 py-2 px-4">{patient.petName}</td>
              <td className="w-1/6 py-2 px-4">
                <div
                  className={`inline-flex rounded-full px-2 py-1 font-semibold ${getPetTypeClassNames(
                    patient.petType
                  )}`}
                >
                  {patient.petType}
                </div>
              </td>
              <td className="w-1/6 py-2 px-4">
                <div className="inline-flex bg-green-100 text-green-800 rounded-full px-2 py-1 font-semibold">
                  {patient.petBreed}
                </div>
              </td>
              <td className="w-1/6 py-2 px-4">{patient.ownerName}</td>
              <td className="w-1/6 py-2 px-4">{patient.ownerContact}</td>
              <td className="w-1/6 py-2 px-4">
                <div
                  className={`inline-flex items-center rounded-full px-2 py-1 font-semibold ${getStatusClassNames(
                    patient.status
                  )}`}
                >
                  <TargetIcon className={`mr-2 w-5 h-5`} />
                  <span className="text-nowrap overflow-ellipsis">
                    {StatusEnum[patient.status]}
                  </span>
                </div>
              </td>
              <td className="w-1/6 py-2 px-4">
                <Link
                  to={`/patient-profile/${patient.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
              </td>
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

export default PatientListTable;

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

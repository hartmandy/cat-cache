import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TargetIcon } from "@radix-ui/react-icons";

const PatientListTable = ({ visits }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const patients = [
    {
      id: 1,
      petName: "Buddy",
      petType: "Dog",
      petBreed: "Golden Retriever",
      ownerName: "John Doe",
      ownerContact: "555-1234",
      status: "In Treatment",
    },
    {
      id: 2,
      petName: "Mittens",
      petType: "Cat",
      petBreed: "Siamese",
      ownerName: "Jane Smith",
      ownerContact: "555-5678",
      status: "Stable",
    },
    {
      id: 3,
      petName: "Charlie",
      petType: "Dog",
      petBreed: "Labrador",
      ownerName: "Michael Johnson",
      ownerContact: "555-8765",
      status: "Under Observation",
    },
    {
      id: 4,
      petName: "Whiskers",
      petType: "Cat",
      petBreed: "Maine Coon",
      ownerName: "Emily Davis",
      ownerContact: "555-4321",
      status: "Recovering",
    },
    {
      id: 5,
      petName: "Fluffy",
      petType: "Bird",
      petBreed: "Macaw",
      ownerName: "Dale Cooper",
      ownerContact: "555-3948",
      status: "Recovering",
    },
    {
      id: 6,
      petName: "Rex",
      petType: "Dog",
      petBreed: "German Shepherd",
      ownerName: "Sandra Lee",
      ownerContact: "555-2298",
      status: "In Treatment",
    },
    {
      id: 7,
      petName: "Shadow",
      petType: "Cat",
      petBreed: "Persian",
      ownerName: "Sam Green",
      ownerContact: "555-9921",
      status: "Stable",
    },
    {
      id: 8,
      petName: "Peppy",
      petType: "Bird",
      petBreed: "Parakeet",
      ownerName: "Nina Brown",
      ownerContact: "555-1293",
      status: "Under Observation",
    },
    {
      id: 9,
      petName: "Simba",
      petType: "Dog",
      petBreed: "Beagle",
      ownerName: "Mark White",
      ownerContact: "555-3871",
      status: "Recovering",
    },
    {
      id: 10,
      petName: "Snowball",
      petType: "Cat",
      petBreed: "Ragdoll",
      ownerName: "Anna Grey",
      ownerContact: "555-8371",
      status: "In Treatment",
    },
    {
      id: 11,
      petName: "Max",
      petType: "Dog",
      petBreed: "Bulldog",
      ownerName: "Lucas Black",
      ownerContact: "555-4827",
      status: "Stable",
    },
    {
      id: 12,
      petName: "Chirpy",
      petType: "Bird",
      petBreed: "Canary",
      ownerName: "Linda Red",
      ownerContact: "555-9583",
      status: "Under Observation",
    },
    {
      id: 13,
      petName: "Bella",
      petType: "Cat",
      petBreed: "Sphynx",
      ownerName: "Olivia Green",
      ownerContact: "555-2837",
      status: "Recovering",
    },
    {
      id: 14,
      petName: "Oscar",
      petType: "Dog",
      petBreed: "Boxer",
      ownerName: "Harrison White",
      ownerContact: "555-4826",
      status: "In Treatment",
    },
    {
      id: 15,
      petName: "Tweety",
      petType: "Bird",
      petBreed: "Cockatiel",
      ownerName: "Samantha Blue",
      ownerContact: "555-7293",
      status: "Stable",
    },
    {
      id: 16,
      petName: "Ginger",
      petType: "Cat",
      petBreed: "Abyssinian",
      ownerName: "Jack Grey",
      ownerContact: "555-9382",
      status: "Under Observation",
    },
    {
      id: 17,
      petName: "Duke",
      petType: "Dog",
      petBreed: "Doberman",
      ownerName: "Lily Brown",
      ownerContact: "555-8472",
      status: "Recovering",
    },
    {
      id: 18,
      petName: "Polly",
      petType: "Bird",
      petBreed: "Parrot",
      ownerName: "Ella White",
      ownerContact: "555-2938",
      status: "In Treatment",
    },
    {
      id: 19,
      petName: "Toby",
      petType: "Dog",
      petBreed: "Poodle",
      ownerName: "Amelia Blue",
      ownerContact: "555-4738",
      status: "Stable",
    },
    {
      id: 20,
      petName: "Luna",
      petType: "Cat",
      petBreed: "Bengal",
      ownerName: "Chloe Red",
      ownerContact: "555-2847",
      status: "Under Observation",
    },
  ];

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
                    {patient.status}
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TargetIcon } from "@radix-ui/react-icons";

const PatientListTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

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

  const filteredPatients = patients.filter(
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

  const getStatusColor = (status) => {
    switch (status) {
      case "In Treatment":
        return "text-red-500";
      case "Stable":
        return "text-green-500";
      case "Under Observation":
        return "text-yellow-500";
      case "Recovering":
        return "text-orange-400";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-3xl lg:text-4xl text-2xl text-gray-600 font-bold mr-1">
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
      <table className="min-w-full bg-white border border-gray-300 table-fixed">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-left">
              Pet Name
            </th>
            <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-left">
              Pet Type
            </th>
            <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-left">
              Pet Breed
            </th>
            <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-left">
              Owner Name
            </th>
            <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-left">
              Owner Contact
            </th>
            <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-left">
              Status
            </th>
            <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-left">
              Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedPatients.map((patient) => (
            <tr key={patient.id}>
              <td className="w-1/6 py-2 px-4 border-b border-gray-300">
                {patient.petName}
              </td>
              <td className="w-1/6 py-2 px-4 border-b border-gray-300">
                {patient.petType}
              </td>
              <td className="w-1/6 py-2 px-4 border-b border-gray-300">
                {patient.petBreed}
              </td>
              <td className="w-1/6 py-2 px-4 border-b border-gray-300">
                {patient.ownerName}
              </td>
              <td className="w-1/6 py-2 px-4 border-b border-gray-300">
                {patient.ownerContact}
              </td>
              <td className="w-1/6 py-2 px-4 border-b border-gray-300">
                <div className="inline-flex items-center">
                  <TargetIcon
                    className={`mr-2 ${getStatusColor(patient.status)} w-5 h-5`}
                  />
                  <span>{patient.status}</span>
                </div>
              </td>
              <td className="w-1/6 py-2 px-4 border-b border-gray-300">
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
      <div className="flex justify-between items-center mt-4">
        <button
          className={`bg-gray-700 text-white font-bold py-2 px-4 rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-800"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`bg-gray-700 text-white font-bold py-2 px-4 rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-800"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientListTable;

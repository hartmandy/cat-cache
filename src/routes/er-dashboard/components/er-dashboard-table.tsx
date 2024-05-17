import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TargetIcon } from "@radix-ui/react-icons";

const ErDashboardTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");

  const patients = [
    {
      id: 1,
      petName: "Buddy",
      age: "3",
      petType: "Dog",
      petBreed: "Golden Retriever",
      reasonForVisit: "Broken leg",
      vet: "Dr. John Smith",
      intake: "2024-05-16 10:30 AM",
      notes: "Surgery performed, pain medication administered",
      status: "In Treatment",
    },
    {
      id: 2,
      petName: "Mittens",
      age: "2",
      petType: "Cat",
      petBreed: "Siamese",
      reasonForVisit: "Vomiting",
      vet: "Dr. Jane Doe",
      intake: "2024-05-15 09:15 AM",
      notes: "Fluids administered, under observation",
      status: "Stable",
    },
    {
      id: 3,
      petName: "Charlie",
      age: "5",
      petType: "Dog",
      petBreed: "Labrador",
      reasonForVisit: "Limping",
      vet: "Dr. Michael Brown",
      intake: "2024-05-14 11:45 AM",
      notes: "X-rays taken, awaiting results",
      status: "Under Observation",
    },
    {
      id: 4,
      petName: "Whiskers",
      age: "1",
      petType: "Cat",
      petBreed: "Maine Coon",
      reasonForVisit: "Not eating",
      vet: "Dr. Emily Davis",
      intake: "2024-05-13 01:00 PM",
      notes: "Blood tests done, awaiting results",
      status: "Recovering",
    },
    {
      id: 5,
      petName: "Fluffy",
      age: "4",
      petType: "Bird",
      petBreed: "Macaw",
      reasonForVisit: "Injured wing",
      vet: "Dr. Dale Cooper",
      intake: "2024-05-12 02:30 PM",
      notes: "Wing bandaged, pain medication administered",
      status: "Recovering",
    },
    {
      id: 6,
      petName: "Rex",
      age: "6",
      petType: "Dog",
      petBreed: "German Shepherd",
      reasonForVisit: "Seizures",
      vet: "Dr. Sandra Lee",
      intake: "2024-05-11 04:00 PM",
      notes: "Medication prescribed, under observation",
      status: "In Treatment",
    },
    {
      id: 7,
      petName: "Shadow",
      age: "3",
      petType: "Cat",
      petBreed: "Persian",
      reasonForVisit: "Lethargy",
      vet: "Dr. Sam Green",
      intake: "2024-05-10 03:15 PM",
      notes: "Fluids administered, blood tests done",
      status: "Stable",
    },
    {
      id: 8,
      petName: "Peppy",
      age: "2",
      petType: "Bird",
      petBreed: "Parakeet",
      reasonForVisit: "Feather loss",
      vet: "Dr. Nina Brown",
      intake: "2024-05-09 12:30 PM",
      notes: "Diet changed, vitamin supplements given",
      status: "Under Observation",
    },
    {
      id: 9,
      petName: "Simba",
      age: "4",
      petType: "Dog",
      petBreed: "Beagle",
      reasonForVisit: "Ear infection",
      vet: "Dr. Mark White",
      intake: "2024-05-08 10:00 AM",
      notes: "Ear drops prescribed, pain medication given",
      status: "Recovering",
    },
    {
      id: 10,
      petName: "Snowball",
      age: "1",
      petType: "Cat",
      petBreed: "Ragdoll",
      reasonForVisit: "Diarrhea",
      vet: "Dr. Anna Grey",
      intake: "2024-05-07 11:30 AM",
      notes: "Medication prescribed, under observation",
      status: "In Treatment",
    },
    {
      id: 11,
      petName: "Max",
      age: "3",
      petType: "Dog",
      petBreed: "Bulldog",
      reasonForVisit: "Skin infection",
      vet: "Dr. Lucas Black",
      intake: "2024-05-06 09:45 AM",
      notes: "Antibiotics prescribed, skin treated",
      status: "Stable",
    },
    {
      id: 12,
      petName: "Chirpy",
      age: "2",
      petType: "Bird",
      petBreed: "Canary",
      reasonForVisit: "Respiratory issues",
      vet: "Dr. Linda Red",
      intake: "2024-05-05 03:00 PM",
      notes: "Medication administered, under observation",
      status: "Under Observation",
    },
    {
      id: 13,
      petName: "Bella",
      age: "5",
      petType: "Cat",
      petBreed: "Sphynx",
      reasonForVisit: "Eye infection",
      vet: "Dr. Olivia Green",
      intake: "2024-05-04 02:00 PM",
      notes: "Eye drops prescribed, follow-up in 3 days",
      status: "Recovering",
    },
    {
      id: 14,
      petName: "Oscar",
      age: "6",
      petType: "Dog",
      petBreed: "Boxer",
      reasonForVisit: "Coughing",
      vet: "Dr. Harrison White",
      intake: "2024-05-03 04:30 PM",
      notes: "Cough suppressant prescribed, under observation",
      status: "In Treatment",
    },
    {
      id: 15,
      petName: "Tweety",
      age: "1",
      petType: "Bird",
      petBreed: "Cockatiel",
      reasonForVisit: "Broken beak",
      vet: "Dr. Samantha Blue",
      intake: "2024-05-02 01:15 PM",
      notes: "Beak treated, pain medication given",
      status: "Stable",
    },
    {
      id: 16,
      petName: "Ginger",
      age: "2",
      petType: "Cat",
      petBreed: "Abyssinian",
      reasonForVisit: "Fever",
      vet: "Dr. Jack Grey",
      intake: "2024-05-01 12:45 PM",
      notes: "Fever medication administered, fluids given",
      status: "Under Observation",
    },
    {
      id: 17,
      petName: "Duke",
      age: "4",
      petType: "Dog",
      petBreed: "Doberman",
      reasonForVisit: "Allergic reaction",
      vet: "Dr. Lily Brown",
      intake: "2024-04-30 01:00 PM",
      notes: "Antihistamines administered, under observation",
      status: "Recovering",
    },
    {
      id: 18,
      petName: "Polly",
      age: "3",
      petType: "Bird",
      petBreed: "Parrot",
      reasonForVisit: "Loss of appetite",
      vet: "Dr. Ella White",
      intake: "2024-04-29 02:30 PM",
      notes: "Diet adjusted, vitamins administered",
      status: "In Treatment",
    },
    {
      id: 19,
      petName: "Toby",
      age: "2",
      petType: "Dog",
      petBreed: "Poodle",
      reasonForVisit: "Vomiting",
      vet: "Dr. Amelia Blue",
      intake: "2024-04-28 04:15 PM",
      notes: "Fluids administered, anti-nausea medication given",
      status: "Stable",
    },
    {
      id: 20,
      petName: "Luna",
      age: "3",
      petType: "Cat",
      petBreed: "Bengal",
      reasonForVisit: "Lethargy",
      vet: "Dr. Chloe Red",
      intake: "2024-04-27 03:45 PM",
      notes: "Blood tests done, fluids administered",
      status: "Under Observation",
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.petType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.petBreed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.vet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.intake.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          ER Dashboard
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
            <th className="w-1/12 py-2 px-4 border-b border-gray-300 text-left">
              Status
            </th>
            <th className="w-4/12 py-2 px-4 border-b border-gray-300 text-left">
              Patient
            </th>
            <th className="w-2/12 py-2 px-4 border-b border-gray-300 text-left">
              Vet
            </th>
            <th className="w-2/12 py-2 px-4 border-b border-gray-300 text-left">
              Intake
            </th>
            <th className="w-3/12 py-2 px-4 border-b border-gray-300 text-left">
              Notes
            </th>
            <th className="w-1/12 py-2 px-4 border-b border-gray-300 text-left">
              Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedPatients.map((patient, index) => (
            <tr key={index}>
              <td className="w-1/12 py-2 px-4 border-b border-gray-300">
                <TargetIcon
                  className={`mr-2 ${getStatusColor(patient.status)} w-5 h-5`}
                />
              </td>
              <td className="w-4/12 py-2 px-4 border-b border-gray-300">
                <div className="flex flex-col">
                  <span>{patient.petName}</span>
                  <span className="text-sm text-gray-500">
                    Age: {patient.age} | {patient.petType} | {patient.petBreed}
                  </span>
                  <span className="text-sm text-gray-500">
                    {patient.reasonForVisit}
                  </span>
                </div>
              </td>
              <td className="w-2/12 py-2 px-4 border-b border-gray-300">
                {patient.vet}
              </td>
              <td className="w-2/12 py-2 px-4 border-b border-gray-300">
                {patient.intake}
              </td>
              <td className="w-3/12 py-2 px-4 border-b border-gray-300">
                {patient.notes}
              </td>
              <td className="w-1/12 py-2 px-4 border-b border-gray-300">
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

export default ErDashboardTable;

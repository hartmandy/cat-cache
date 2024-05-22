import React from "react";
import { Link } from "react-router-dom";

export interface Patient {
  id: number;
  name: string;
  age: number;
  type: string;
  breed: string;
  ownerName: string;
  ownerContact: string;
}

interface PatientListTableProps {
  patients: Patient[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const getPetTypeClassNames = (petType: string) => {
  return petType === "Dog"
    ? "bg-blue-100 text-blue-800"
    : "bg-purple-100 text-purple-800";
};

const PatientListTable: React.FC<PatientListTableProps> = ({
  patients = [],
  onChange,
  searchQuery,
}) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-xl lg:text-2xl text-lg text-gray-600 font-light mr-1">
          Patient List
        </h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="border border-gray-300 rounded-md p-2"
          defaultValue={searchQuery}
          onChange={onChange}
        />
      </div>
      <table className="min-w-full table-fixed">
        <thead className="bg-slate-100">
          <tr>
            <th className="w-1/6 py-2 px-4 text-left rounded-tl-lg rounded-bl-lg">
              Pet Name
            </th>
            <th className="w-1/6 py-2 px-4 text-left">Pet Type</th>
            <th className="w-1/6 py-2 px-4 text-left">Pet Breed</th>
            <th className="w-1/6 py-2 px-4 text-left">Owner Name</th>
            <th className="w-1/6 py-2 px-4 text-left">Owner Contact</th>
            <th className="w-1/6 py-2 px-4 text-left">Age</th>
            <th className="w-1/6 py-2 px-4 text-left rounded-tr-lg rounded-br-lg">
              Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="w-1/6 py-2 px-4">{patient.name}</td>
              <td className="w-1/6 py-2 px-4">
                <div
                  className={`inline-flex rounded-full px-2 py-1 font-semibold ${getPetTypeClassNames(
                    patient.type
                  )}`}
                >
                  {patient.type}
                </div>
              </td>
              <td className="w-1/6 py-2 px-4">
                <div className="inline-flex bg-green-100 text-green-800 rounded-full px-2 py-1 font-semibold">
                  {patient.breed}
                </div>
              </td>
              <td className="w-1/6 py-2 px-4">{patient.ownerName}</td>
              <td className="w-1/6 py-2 px-4">{patient.ownerContact}</td>
              <td className="w-1/6 py-2 px-4">{patient.age}</td>
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
    </div>
  );
};

export default PatientListTable;

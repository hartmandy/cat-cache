import React from "react";
import { Link } from "react-router-dom";
import { TargetIcon } from "@radix-ui/react-icons";

const StatusEnum = {
  JUST_ARRIVED: "Just Arrived",
  IN_TREATMENT: "In Treatment",
  UNDER_OBSERVATION: "Under Observation",
  STABLE: "Stable",
  RECOVERING: "Recovering",
};

interface Visit {
  id: string;
  petName: string;
  petType: string;
  petBreed: string;
  ownerName: string;
  ownerContact: string;
  status: string;
}

const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumberString;
};

interface PatientListTableProps {
  visits: Visit[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const PatientListTable = ({
  visits = [],
  onChange,
  searchQuery,
}: PatientListTableProps) => {
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
          defaultValue={searchQuery}
          onChange={onChange}
        />
      </div>
      <div className="overflow-hidden">
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-100">
            <tr>
              <th className="w-1/6 py-2 px-4 text-left rounded-tl-lg rounded-bl-lg">
                Pet Name
              </th>
              <th className="w-1/6 py-2 px-4 text-left">Type</th>
              <th className="w-2/6 py-2 px-4 text-left">Breed</th>
              <th className="w-1/6 py-2 px-4 text-left">Contact</th>
              <th className="w-2/6 py-2 px-4 text-left">Status</th>
              <th className="w-1/6 py-2 px-4 text-left rounded-tr-lg rounded-br-lg">
                Profile
              </th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id}>
                <td className="w-1/6 py-2 px-4 text-left">{visit.petName}</td>
                <td className="w-1/6 py-2 px-4 text-left">
                  <div
                    className={`inline-flex rounded-full px-2 py-1 font-semibold ${getPetTypeClassNames(
                      visit.petType
                    )}`}
                  >
                    {visit.petType}
                  </div>
                </td>
                <td className="w-2/6 py-2 px-4 text-left">
                  <div className="inline-flex bg-green-100 text-green-800 rounded-full px-2 py-1 font-semibold">
                    {visit.petBreed}
                  </div>
                </td>
                <td className="w-1/6 py-2 px-4 text-left">
                  <div>{visit.ownerName}</div>
                  <div>{formatPhoneNumber(visit.ownerContact)}</div>
                </td>
                <td className="w-2/6 py-2 px-4 text-left">
                  <div
                    className={`inline-flex items-center rounded-full px-2 py-1 font-semibold ${getStatusClassNames(
                      visit.status
                    )}`}
                  >
                    <TargetIcon className={`mr-2 w-5 h-5`} />
                    <span className="text-nowrap overflow-ellipsis">
                      {StatusEnum[visit.status]}
                    </span>
                  </div>
                </td>
                <td className="w-1/6 py-2 px-4 text-left">
                  <Link
                    to={`/patient-profile/${visit.id}`}
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
    </div>
  );
};

export default PatientListTable;

const getStatusClassNames = (status) => {
  switch (status) {
    case "IN_TREATMENT":
      return "text-red-800 bg-red-100";
    case "STABLE":
      return "text-green-800 bg-green-100";
    case "UNDER_OBSERVATION":
      return "text-yellow-800 bg-yellow-100";
    case "RECOVERING":
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TargetIcon } from "@radix-ui/react-icons";
import CreateStatusModal from "./create-status-modal.tsx";

export interface Patient {
  id: number;
  petName: string;
  petType: string;
  petBreed: string;
  petId: number;
  vetName: string | null;
  createdAt: string;
  latestStatus: string;
  latestStatusNote: string;
}

const StatusEnum = {
  JUST_ARRIVED: "Just Arrived",
  IN_TREATMENT: "In Treatment",
  UNDER_OBSERVATION: "Under Observation",
  STABLE: "Stable",
  RECOVERING: "Recovering",
  COMPLETE: "Complete",
};

interface ErDashboardTableProps {
  patients: Patient[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  refreshData: () => void;
}

const getStatusClassNames = (status: string) => {
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

const ErDashboardTable: React.FC<ErDashboardTableProps> = ({
  patients = [],
  onChange,
  searchQuery,
  refreshData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVisitId, setCurrentVisitId] = useState<number | null>(null);

  const handleStatusClick = (visitId: number) => {
    setCurrentVisitId(visitId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVisitId(null);
  };

  const handleStatusCreated = () => {
    refreshData();
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-xl lg:text-2xl text-lg text-gray-600 font-light mr-1">
          ER Dashboard
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
            <th className="w-2/12 py-2 px-4 text-left rounded-tl-lg rounded-bl-lg">
              Patient
            </th>
            <th className="w-1/12 py-2 px-4 text-left">Status</th>
            <th className="w-2/12 py-2 px-4 text-left">Vet</th>
            <th className="w-2/12 py-2 px-4 text-left">Intake</th>
            <th className="w-5/12 py-2 px-4 text-left">Notes</th>
            <th className="w-1/12 py-2 px-4 text-left rounded-tr-lg rounded-br-lg">
              Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="w-2/12 py-2 px-4">
                <div className="flex flex-col">
                  <span>{patient.petName}</span>
                  <span className="text-sm text-gray-500">
                    {patient.petType} | {patient.petBreed}
                  </span>
                </div>
              </td>
              <td className="w-1/12 py-2 px-4">
                <button
                  className={`inline-flex items-center rounded-full px-2 py-1 font-semibold text-nowrap ${getStatusClassNames(
                    StatusEnum[patient.latestStatus]
                  )}`}
                  onClick={() => handleStatusClick(patient.id)}
                >
                  <TargetIcon className="mr-2 w-5 h-5" />
                  {StatusEnum[patient.latestStatus]}
                </button>
              </td>
              <td className="w-2/12 py-2 px-4">{patient.vetName || "N/A"}</td>
              <td className="w-2/12 py-2 px-4">
                {new Date(patient.createdAt).toLocaleString()}
              </td>
              <td className="w-5/12 py-2 px-4">{patient.latestStatusNote}</td>
              <td className="w-1/12 py-2 px-4">
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
      <CreateStatusModal
        show={isModalOpen}
        onClose={handleCloseModal}
        visitId={currentVisitId}
        onStatusCreated={handleStatusCreated}
      />
    </div>
  );
};

export default ErDashboardTable;

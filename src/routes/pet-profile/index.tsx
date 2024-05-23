import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { getPetById } from "../../data/pet.ts";
import { Patient, Visit } from "../../types.ts";
import { useNavigate } from "react-router-dom";
import NotesModal from "./components/visit-modal.tsx";

const PetProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [currentVisit, setCurrentVisit] = useState<Visit | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimal();
  }, [id]);

  const fetchAnimal = async () => {
    if (id) {
      const animalData = await getPetById(parseInt(id));
      setAnimal(animalData);
      setLoading(false);
    }
  };

  const handleViewClick = (visit: Visit) => {
    setCurrentVisit(visit);
    setShowNotesModal(true);
  };

  const handleNavigate = () => navigate(-1);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!animal) {
    return <div>Animal not found</div>;
  }

  return (
    <div className="relative">
      <div className="items-center flex justify-between p-6">
        <div>
          <button
            onClick={handleNavigate}
            className="text-gray-500 text-sm flex gap-2 pb-2"
          >
            <ArrowLeftIcon /> Go back
          </button>
          <h1 className="md:text-3xl lg:text-4xl text-2xl font-bold text-gray-600">
            {animal.name}
          </h1>
          <div className="text-gray-500 text-sm">
            {animal.type} | {animal.breed}
          </div>
          <div className="text-gray-500 text-sm">
            {animal.owners.map((owner) => (
              <span key={owner.id}>
                {owner.firstName} {owner.lastName} | {owner.phone}
                <br />
              </span>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-slate-200" />

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Visits</h2>
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-100">
            <tr>
              <th className="py-2 px-4 text-left">Reason</th>
              <th className="py-2 px-4 text-left">Vet</th>
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Updated At</th>
              <th className="py-2 px-4 text-left">Completed At</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {animal.visits.map((visit) => (
              <tr key={visit.id}>
                <td className="py-2 px-4">{visit.reason}</td>
                <td className="py-2 px-4">{visit.vetName}</td>
                <td className="py-2 px-4">
                  {new Date(visit.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  {new Date(visit.updatedAt).toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  {visit.isCompletedAt
                    ? new Date(visit.isCompletedAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleViewClick(visit)}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NotesModal
        visit={currentVisit}
        onClose={() => setShowNotesModal(false)}
        onSubmit={fetchAnimal}
        show={showNotesModal}
      />
    </div>
  );
};

export default PetProfile;

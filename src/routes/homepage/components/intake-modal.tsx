import React, { useState, useEffect } from "react";
import Modal from "./modal.tsx";
import debounce from "lodash.debounce";

interface Pet {
  id: number;
  name: string;
}

export default function IntakeModal({ show, onClose, onSubmit }) {
  const [petName, setPetName] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [visitReason, setVisitReason] = useState(""); // New state for visit reason

  const fetchPets = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(`http://127.0.0.1:5000/pets?query=${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error("Failed to fetch pets", error);
    }
  };

  const debouncedFetchPets = debounce(fetchPets, 300);

  useEffect(() => {
    debouncedFetchPets(petName);
  }, [petName]);

  const handlePetSelect = (petId) => {
    setSelectedPetId(petId);
    const selectedPet = pets.find((pet) => pet.id === petId);
    if (!selectedPet) return;
    setPetName(selectedPet.name);
    setPets([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedPetId) {
      alert("Please select a valid pet");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: selectedPetId,
          reason: visitReason, // This can be dynamic based on additional form fields
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      onSubmit();
      console.log("Visit created", data);
      onClose(); // Close modal on successful submission
    } catch (error) {
      console.error("Failed to create visit", error);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Intake Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="petName"
          >
            Pet Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="petName"
            type="text"
            placeholder="Pet Name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <ul>
            {pets.map((pet) => (
              <li key={pet.id} onClick={() => handlePetSelect(pet.id)}>
                {pet.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="visitReason"
          >
            Reason for Visit
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="visitReason"
            placeholder="Describe the reason for the visit"
            value={visitReason}
            onChange={(e) => setVisitReason(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

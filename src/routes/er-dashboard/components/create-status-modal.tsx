import React, { useState } from "react";
import Modal from "../../../components/modal.tsx";
import { createNewStatus } from "../../../data/visits.ts";

const StatusEnum = {
  JUST_ARRIVED: "Just Arrived",
  IN_TREATMENT: "In Treatment",
  UNDER_OBSERVATION: "Under Observation",
  STABLE: "Stable",
  RECOVERING: "Recovering",
  COMPLETE: "Complete",
};

interface CreateStatusModalProps {
  show: boolean;
  onClose: () => void;
  visitId: number | null;
  onStatusCreated: () => void;
}

const CreateStatusModal: React.FC<CreateStatusModalProps> = ({
  show,
  onClose,
  visitId,
  onStatusCreated,
}) => {
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!visitId || !status) {
      alert("Please select a valid status");
      return;
    }
    try {
      await createNewStatus(visitId, status, note);
      onStatusCreated();

      setStatus("");
      setNote("");
      onClose();
    } catch (error) {
      console.error("Failed to create status", error);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Add New Status</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Status</option>
            {Object.keys(StatusEnum).map((statusKey) => (
              <option key={statusKey} value={statusKey}>
                {StatusEnum[statusKey]}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="note"
          >
            Note
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Add any notes here"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateStatusModal;

import React, { useState } from "react";
import { Visit } from "../../../types.ts";
import Modal from "../../../components/modal.tsx";
import Editor from "../../../components/editor.tsx";

interface VisitModalProps {
  visit: Visit | null;
  onClose: () => void;
  onSubmit: () => void;
  show: boolean;
}

const VisitModal: React.FC<VisitModalProps> = ({
  visit,
  onClose,
  show,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState("notes");

  const handleSave = async (newNote) => {
    console.log("Save function called", newNote, visit?.id);

    if (!visit?.id) {
      console.error("No visit ID found");
      return;
    }
    const url = `http://127.0.0.1:5000/update_visit_notes/${visit.id}`;
    const payload = {
      notes: newNote,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error during the fetch operation:", error);
    }
    onSubmit();
  };

  if (!visit) {
    return null;
  }

  return (
    <Modal show={show} onClose={onClose} maxWidth="max-w-3xl">
      <div
        className="p-6 overflow-y-auto h-[calc(100vh-100px)]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Visit Details</h2>
          <p>
            <strong>Reason:</strong> {visit.reason}
          </p>
          <p>
            <strong>Vet Name:</strong> {visit.vetName}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(visit.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(visit.updatedAt).toLocaleString()}
          </p>
          {visit.isCompletedAt && (
            <p>
              <strong>Completed At:</strong>{" "}
              {new Date(visit.isCompletedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex mb-4">
          <button
            className={`px-4 py-2 mr-2 ${
              activeTab === "notes" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "statuses"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("statuses")}
          >
            Status Updates
          </button>
        </div>

        {activeTab === "notes" && (
          <article className="prose mb-6 w-full mr-10">
            <Editor
              isDisabled={Boolean(visit.isCompletedAt)}
              data={visit.notes}
              onChange={(data) => handleSave(data)}
              editorblock="editorjs-container"
            />
          </article>
        )}

        {activeTab === "statuses" && (
          <table className="min-w-full table-fixed">
            <thead className="bg-slate-100">
              <tr>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Note</th>
                <th className="py-2 px-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {visit.statuses.map((status) => (
                <tr key={status.id}>
                  <td className="py-2 px-4">{status.status}</td>
                  <td className="py-2 px-4">{status.note}</td>
                  <td className="py-2 px-4">
                    {new Date(status.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Modal>
  );
};

export default VisitModal;

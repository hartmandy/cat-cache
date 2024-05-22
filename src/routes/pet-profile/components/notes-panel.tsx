import React, { useRef } from "react";
import { Notes, Status } from "../../../types.ts";
import Modal from "../../homepage/components/modal.tsx";
import Editor from "../../../components/editor.tsx";

interface NotesPanelProps {
  notes: Notes | null;
  statuses: Status[];
  onClose: () => void;
  show: boolean;
}

const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  statuses,
  onClose,
  show,
}) => {
  return (
    <Modal show={show} onClose={onClose} maxWidth="max-w-6xl">
      <div
        className="p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        <div className="mb-6 h-[400px] w-[500px] mr-10">
          {notes && (
            <Editor
              data={notes}
              onChange={(test) => console.log(test)}
              editorblock="editorjs-container"
            />
          )}
        </div>
        <button
          //   onClick={handleSave}
          className="text-white bg-blue-500 hover:bg-blue-700 rounded p-2 mb-6"
        >
          Save Notes
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-6">Status Updates</h2>
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-100">
            <tr>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Note</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((status) => (
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
      </div>
    </Modal>
  );
};

export default NotesPanel;

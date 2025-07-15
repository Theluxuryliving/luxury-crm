import { useState } from "react";

export default function RescheduleModal({ onClose, onSave, followup }: any) {
  const [newDate, setNewDate] = useState(followup.date);

  const handleSubmit = () => {
    if (!newDate) return alert("Please select a new date and time.");
    onSave({ ...followup, date: newDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">⏰ Reschedule Follow-up</h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            <strong>Lead:</strong> {followup.lead}
          </p>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

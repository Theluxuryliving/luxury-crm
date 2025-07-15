import { useState } from "react";

export default function AddFollowupModal({ onClose, onSave }: any) {
  const [form, setForm] = useState({
    lead: "",
    type: "Call",
    date: "",
    agent: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.lead && form.date && form.agent) {
      onSave(form);
      onClose();
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">➕ Add Follow-up</h2>

        <div className="space-y-4">
          <input
            name="lead"
            value={form.lead}
            onChange={handleChange}
            placeholder="Lead Name"
            className="w-full p-2 border rounded"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Call</option>
            <option>WhatsApp</option>
            <option>Meeting</option>
          </select>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="agent"
            value={form.agent}
            onChange={handleChange}
            placeholder="Assigned Agent"
            className="w-full p-2 border rounded"
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

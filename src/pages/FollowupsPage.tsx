import { useState } from "react";
import AddFollowupModal from "../components/AddFollowupModal";
import RescheduleModal from "../components/RescheduleModal";

const initialFollowups = [
  {
    id: 1,
    lead: "Ahmed Raza",
    type: "WhatsApp Call",
    date: "2025-07-16T14:00",
    agent: "Maria Khan",
    status: "Pending",
  },
  {
    id: 2,
    lead: "Sarah Malik",
    type: "Meeting",
    date: "2025-07-18T11:30",
    agent: "Ali Raza",
    status: "Done",
  },
];

export default function FollowupsPage() {
  const [followups, setFollowups] = useState(initialFollowups);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [selectedFollowup, setSelectedFollowup] = useState<any>(null);

  const filteredFollowups = followups.filter((item) =>
    item.agent.toLowerCase().includes(search.toLowerCase())
  );

  const addFollowup = (data: any) => {
    const newFollowup = {
      id: Date.now(),
      ...data,
      status: "Pending",
    };
    setFollowups([...followups, newFollowup]);
  };

  const markAsDone = (id: number) => {
    setFollowups((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "Done" } : f))
    );
  };

  const reschedule = (id: number) => {
    const item = followups.find((f) => f.id === id);
    setSelectedFollowup(item);
    setRescheduleModal(true);
  };

  const handleRescheduleSave = (updated: any) => {
    setFollowups((prev) =>
      prev.map((f) => (f.id === updated.id ? updated : f))
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📌 Follow-ups</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Follow-up
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by agent..."
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
              <th className="p-3">Lead</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Agent</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFollowups.map((f) => (
              <tr key={f.id} className="border-t text-sm">
                <td className="p-3">{f.lead}</td>
                <td className="p-3">{f.type}</td>
                <td className="p-3">{new Date(f.date).toLocaleString()}</td>
                <td className="p-3">{f.agent}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      f.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : f.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  {f.status !== "Done" && (
                    <button
                      onClick={() => markAsDone(f.id)}
                      className="text-green-600 hover:underline text-sm"
                    >
                      ✅ Mark Done
                    </button>
                  )}
                  <button
                    onClick={() => reschedule(f.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    ⏰ Reschedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddFollowupModal
          onClose={() => setShowAddModal(false)}
          onSave={addFollowup}
        />
      )}

      {rescheduleModal && selectedFollowup && (
        <RescheduleModal
          followup={selectedFollowup}
          onClose={() => setRescheduleModal(false)}
          onSave={handleRescheduleSave}
        />
      )}
    </div>
  );
}

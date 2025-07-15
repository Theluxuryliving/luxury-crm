import { useParams } from "react-router-dom";
import { useState } from "react";
import SalesFunnel from "../components/SalesFunnel";
import RescheduleModal from "../components/RescheduleModal";

const leadsMock = [
  {
    id: 1,
    name: "Ahmed Raza",
    stage: "Interested",
    followups: [
      {
        id: 101,
        type: "WhatsApp Call",
        date: "2025-07-16T14:00",
        agent: "Maria Khan",
        status: "Pending",
      },
      {
        id: 102,
        type: "Meeting",
        date: "2025-07-18T12:00",
        agent: "Zainab Ali",
        status: "Done",
      },
    ],
  },
];

export default function LeadDetailPage() {
  const { id } = useParams();
  const lead = leadsMock.find((l) => l.id === Number(id));

  const [followups, setFollowups] = useState(lead?.followups || []);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [selectedFollowup, setSelectedFollowup] = useState<any>(null);

  if (!lead) {
    return <div className="p-6 text-red-500 font-bold">Lead not found</div>;
  }

  const markAsDone = (fid: number) => {
    setFollowups((prev) =>
      prev.map((f) =>
        f.id === fid ? { ...f, status: "Done" } : f
      )
    );
  };

  const reschedule = (fid: number) => {
    const item = followups.find((f) => f.id === fid);
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
      <h1 className="text-2xl font-bold mb-4">👤 {lead.name}</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Sales Funnel</h2>
        <SalesFunnel currentStage={lead.stage} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Follow-ups</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
                <th className="p-3">Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {followups.map((f) => (
                <tr key={f.id} className="border-t text-sm">
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
      </div>

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

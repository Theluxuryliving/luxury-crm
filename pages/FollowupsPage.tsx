// src/pages/FollowupsPage.tsx
import { useEffect, useState } from "react";
import { format } from "date-fns";
import RescheduleModal from "../components/RescheduleModal";
import AddFollowupModal from "../components/AddFollowupModal";

interface Followup {
  id: string;
  note: string;
  date: string;
  status: string;
  agent: string;
  lead: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function FollowupsPage() {
  const [followups, setFollowups] = useState<Followup[]>([]);
  const [filtered, setFiltered] = useState<Followup[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Followup | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  useEffect(() => {
    fetch("/api/followups")
      .then(res => res.json())
      .then(data => {
        setFollowups(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      followups.filter(f =>
        f.lead.name.toLowerCase().includes(term) ||
        f.agent?.toLowerCase().includes(term)
      )
    );
  }, [search, followups]);

  const markAsDone = async (id: string) => {
    await fetch(`/api/followups`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "done" }),
    });
    const updated = followups.map(f => (f.id === id ? { ...f, status: "done" } : f));
    setFollowups(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📌 Follow-Ups</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          ➕ Add Follow-Up
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search by lead or agent"
        className="mb-4 w-full border rounded p-2"
      />

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Lead</th>
            <th className="p-2">Agent</th>
            <th className="p-2">Note</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(f => (
            <tr key={f.id} className="border-t">
              <td className="p-2">{f.lead.name}</td>
              <td className="p-2">{f.agent}</td>
              <td className="p-2">{f.note}</td>
              <td className="p-2">{format(new Date(f.date), "dd MMM yyyy")}</td>
              <td className="p-2 capitalize">
                {f.status === "done" ? "✅ Done" : f.status === "missed" ? "❌ Missed" : "🕐 Pending"}
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => markAsDone(f.id)}
                  className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                >
                  Mark Done
                </button>
                <button
                  onClick={() => {
                    setSelected(f);
                    setShowReschedule(true);
                  }}
                  className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                >
                  Reschedule
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && <AddFollowupModal show={showAdd} setShow={setShowAdd} />}
      {showReschedule && selected && (
        <RescheduleModal followup={selected} setShow={setShowReschedule} />
      )}
    </div>
  );
}

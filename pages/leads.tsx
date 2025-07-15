// pages/leads.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: string;
  createdAt: string;
}

const stageColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  followup: "bg-purple-100 text-purple-800",
  closed: "bg-green-100 text-green-800",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch("/api/getLeads");
      const data = await res.json();
      setLeads(data);
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    const filtered = leads.filter((lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLeads(filtered);
  }, [search, leads]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1"
        />
      </div>

      <div className="overflow-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Stage</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.phone}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.source}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs rounded ${stageColors[lead.stage] || "bg-gray-200 text-gray-700"}`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

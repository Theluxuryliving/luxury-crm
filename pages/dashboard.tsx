// pages/dashboard.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

interface Lead {
  id: string;
  name: string;
  stage: string;
  source: string;
  createdAt: string;
}

const stages = ["new", "contacted", "followup", "closed"];

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sourceFilter, setSourceFilter] = useState("All");
  const [daysFilter, setDaysFilter] = useState("7");

  useEffect(() => {
    fetch("/api/getLeads")
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const created = new Date(lead.createdAt);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(daysFilter));

    const dateMatch = created >= daysAgo;
    const sourceMatch = sourceFilter === "All" || lead.source === sourceFilter;

    return dateMatch && sourceMatch;
  });

  const stageCount = stages.map((stage) => ({
    stage,
    count: filteredLeads.filter((lead) => lead.stage === stage).length,
  }));

  const totalLeads = filteredLeads.length;
  const recentLeads = [...filteredLeads]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label className="text-sm mr-2">Source:</label>
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="border p-1 rounded">
            <option>All</option>
            {[...new Set(leads.map(l => l.source))].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm mr-2">Last:</label>
          <select value={daysFilter} onChange={(e) => setDaysFilter(e.target.value)} className="border p-1 rounded">
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stageCount.map(({ stage, count }) => (
          <Link key={stage} href={`/leads?stage=${stage}`} passHref>
            <div className="cursor-pointer bg-white p-4 shadow rounded hover:bg-yellow-50">
              <p className="text-sm text-gray-500 capitalize">{stage}</p>
              <p className="text-xl font-bold">{count}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Funnel Chart */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Lead Funnel</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={stageCount}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Leads</h2>
        <ul>
          {recentLeads.map((lead) => (
            <li key={lead.id} className="py-2 border-b">
              <p className="font-medium">{lead.name}</p>
              <p className="text-sm text-gray-600">{lead.stage} | {lead.source}</p>
              <p className="text-xs text-gray-400">{new Date(lead.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

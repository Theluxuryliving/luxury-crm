import { useEffect, useState } from "react";

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const fetchLeads = async () => {
    const res = await fetch("/api/getLeads");
    const data = await res.json();
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead: any) =>
    filter === "all" ? true : lead.stage === filter
  );

  const sortedLeads = [...filteredLeads].sort((a: any, b: any) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All Stages</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="follow-up">Follow-up</option>
          <option value="closed">Closed</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded">
          <option value="createdAt">Newest First</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Stage</th>
            <th className="p-2 border">Created</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead: any) => (

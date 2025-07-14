// src/components/LeadsTable.tsx
import { useEffect, useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  areaInterestedIn: string;
  planInterestedIn: string;
  propertyType: string;
  projectInterestedIn: string;
  budget: string;
  planOnPurchasing: string;
  leadSource: string;
  created_at: string;
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch("/api/getLeads");
      const data = await res.json();
      setLeads(data.leads || []);
    };

    fetchLeads();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">All Leads</h3>
      <div className="overflow-auto max-h-[70vh] border rounded shadow">
        <table className="w-full text-sm table-auto">
          <thead className="bg-gray-100 text-left sticky top-0 z-10">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">City</th>
              <th className="p-2">Country</th>
              <th className="p-2">Area</th>
              <th className="p-2">Plan</th>
              <th className="p-2">Type</th>
              <th className="p-2">Project</th>
              <th className="p-2">Budget</th>
              <th className="p-2">When Buying</th>
              <th className="p-2">Source</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t">
                <td className="p-2">{lead.name}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.phone}</td>
                <td className="p-2">{lead.city}</td>
                <td className="p-2">{lead.country}</td>
                <td className="p-2">{lead.areaInterestedIn}</td>
                <td className="p-2">{lead.planInterestedIn}</td>
                <td className="p-2">{lead.propertyType}</td>
                <td className="p-2">{lead.projectInterestedIn}</td>
                <td className="p-2">{lead.budget}</td>
                <td className="p-2">{lead.planOnPurchasing}</td>
                <td className="p-2">{lead.leadSource}</td>
                <td className="p-2">{new Date(lead.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

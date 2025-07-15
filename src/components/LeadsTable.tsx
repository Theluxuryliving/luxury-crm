import React, { useEffect, useState } from "react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  area_interested_in: string;
  plan_interested_in: string;
  property_type: string;
  project_interested_in: string;
  budget: number;
  plan_on_purchasing: string;
  lead_source: string;
  agent: string;
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/getLeads');
      const json = await res.json();
      setLeads(json.leads);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  if (loading) return <p>Loading leads...</p>;

  return (
    <div className="mt-6 overflow-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            {["Name","Email","Phone","City","Country","Area","Plan","Type","Project","Budget","Purchase Plan","Source","Agent"].map(h => (
              <th key={h} className="px-4 py-2 text-left text-sm font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id} className="border-t">
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.email}</td>
              <td className="px-4 py-2">{lead.phone}</td>
              <td className="px-4 py-2">{lead.city}</td>
              <td className="px-4 py-2">{lead.country}</td>
              <td className="px-4 py-2">{lead.area_interested_in}</td>
              <td className="px-4 py-2">{lead.plan_interested_in}</td>
              <td className="px-4 py-2">{lead.property_type}</td>
              <td className="px-4 py-2">{lead.project_interested_in}</td>
              <td className="px-4 py-2">{lead.budget}M</td>
              <td className="px-4 py-2">{lead.plan_on_purchasing}</td>
              <td className="px-4 py-2">{lead.lead_source}</td>
              <td className="px-4 py-2">{lead.agent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

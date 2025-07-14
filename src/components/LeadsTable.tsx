import { useEffect, useState } from "react";

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
  budget: string;
  plan_on_purchasing: string;
  lead_source: string;
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getLeads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leads:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading leads...</p>;

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Country</th>
            <th className="p-2 border">Area</th>
            <th className="p-2 border">Plan</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Project</th>
            <th className="p-2 border">Budget</th>
            <th className="p-2 border">Purchase Plan</th>
            <th className="p-2 border">Source</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="p-2 border">{lead.name}</td>
              <td className="p-2 border">{lead.email}</td>
              <td className="p-2 border">{lead.phone}</td>
              <td className="p-2 border">{lead.city}</td>
              <td className="p-2 border">{lead.country}</td>
              <td className="p-2 border">{lead.area_interested_in}</td>
              <td className="p-2 border">{lead.plan_interested_in}</td>
              <td className="p-2 border">{lead.property_type}</td>
              <td className="p-2 border">{lead.project_interested_in}</td>
              <td className="p-2 border">{lead.budget}</td>
              <td className="p-2 border">{lead.plan_on_purchasing}</td>
              <td className="p-2 border">{lead.lead_source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

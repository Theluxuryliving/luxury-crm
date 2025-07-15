import { useEffect, useState } from 'react';

export default function LeadsTable() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 font-medium text-gray-700">Name</th>
            <th className="px-6 py-3 font-medium text-gray-700">Stage</th>
            <th className="px-6 py-3 font-medium text-gray-700">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-6 py-4">{lead.name}</td>
              <td className="px-6 py-4">{lead.stage}</td>
              <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

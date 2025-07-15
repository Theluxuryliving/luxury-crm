import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Luxury CRM</h2>
      <nav className="space-y-4">
        <Link to="/Dashboard" className="block hover:text-gray-300">📊 Dashboard</Link>
        <Link to="/leads" className="block hover:text-gray-300">👥 Leads</Link>
        <Link to="/followups" className="block hover:text-gray-300">📌 Follow-ups</Link>
        <Link to="/Calendar" className="block hover:text-gray-300">📅 Calendar</Link>
        <Link to="/projects" className="block hover:text-gray-300">🏗️ Projects</Link>
        <Link to="/Inventory" className="block hover:text-gray-300">📦 Inventory</Link>
        <Link to="/deals" className="block hover:text-gray-300">🤝 Deals</Link>
        <Link to="/documents" className="block hover:text-gray-300">📁 Documents</Link>
        <Link to="/affiliates" className="block hover:text-gray-300">Affiliates</Link>
        <Link to="/settings" className="block hover:text-gray-300">Settings</Link>
      </nav>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Luxury CRM</h2>
      <nav className="flex flex-col space-y-4 text-left">
        <Link to="/Dashboard" className="hover:text-gray-300 break-words">📊 Dashboard</Link>
        <Link to="/leads" className="hover:text-gray-300 break-words">👥 Leads</Link>
        <Link to="/followups" className="hover:text-gray-300 break-words">📌 Follow-ups</Link>
        <Link to="/Calendar" className="hover:text-gray-300 break-words">📅 Calendar</Link>
        <Link to="/projects" className="hover:text-gray-300 break-words">🏗️ Projects</Link>
        <Link to="/Inventory" className="hover:text-gray-300 break-words">📦 Inventory</Link>
        <Link to="/deals" className="hover:text-gray-300 break-words">💼 Deals</Link>
        <Link to="/documents" className="hover:text-gray-300 break-words">📁 Documents</Link>
        <Link to="/affiliates" className="hover:text-gray-300 break-words">🌐 Affiliates</Link>
        <Link to="/settings" className="hover:text-gray-300 break-words">⚙️ Settings</Link>
      </nav>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-4">
      <h1 className="text-yellow-400 text-2xl font-semibold mb-6">🏢 Luxury CRM</h1>
      <nav className="space-y-4">
        <Link to="/leads" className="block hover:text-yellow-400">Leads</Link>
        <Link to="/deals" className="block hover:text-yellow-400">Deals</Link>
        <Link to="/follow-ups" className="block hover:text-yellow-400">Follow-Ups</Link>
        <Link to="/projects" className="block hover:text-yellow-400">Projects & Inventory</Link>
        <Link to="/document-vault" className="block hover:text-yellow-400">Document Vault</Link>
        <Link to="/affiliates" className="block hover:text-yellow-400">Affiliates</Link>
        <Link to="/settings" className="block hover:text-yellow-400">Settings</Link>
      </nav>
    </div>
  );
}

import { useState } from "react";
import AddLeadModal from "../components/AddLeadModal";
import LeadsTable from "../components/LeadsTable"; // If you're using it

export default function LeadsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Leads</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Add Lead
      </button>
      <AddLeadModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <LeadsTable />
    </div>
  );
}

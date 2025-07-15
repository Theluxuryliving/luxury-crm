// src/components/ImportLeadModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import * as XLSX from "xlsx";

interface Lead {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  area: string;
  plan: string;
  propertyType: string;
  project: string;
  budget: number;
  purchasePlan: string;
  source: string;
}

interface ImportLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportLeadModal({ isOpen, onClose }: ImportLeadModalProps) {
  const [fileLeads, setFileLeads] = useState<Lead[]>([]);
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetLeads, setSheetLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Convert Google Sheets URL → CSV URL
  const getCsvUrl = (url: string) => {
    try {
      const id = url.match(/\/d\/([a-zA-Z0-9-_]+)/)![1];
      return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
    } catch {
      return "";
    }
  };

  const handleExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const raw = XLSX.utils.sheet_to_json<Partial<Lead>>(ws);
    setFileLeads(raw as Lead[]);
  };

  const handleFetchSheet = async () => {
    setLoading(true);
    setError("");
    try {
      const csvUrl = getCsvUrl(sheetUrl);
      const resp = await fetch(csvUrl);
      if (!resp.ok) throw new Error("Fetch failed");
      const text = await resp.text();
      const arr = XLSX.utils.sheet_to_json<Partial<Lead>>(XLSX.read(text, { type: 'string' }).Sheets[wb.SheetNames[0]]);
      setSheetLeads(arr as Lead[]);
    } catch (e) {
      setError("Invalid URL or fetch failed");
    }
    setLoading(false);
  };

  const handleSubmit = async (leads: Lead[]) => {
    try {
      const res = await fetch("/api/addLead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leads),
      });
      if (!res.ok) throw new Error("Failed to import");
      alert(`✅ Imported ${leads.length} leads!`);
      onClose();
      setFileLeads([]);
      setSheetLeads([]);
    } catch (e) {
      alert("❌ Import failed");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200" leave="ease-in duration-150"
            enterFrom="opacity-0" enterTo="opacity-100"
            leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="inline-block w-full max-w-xl bg-white rounded-lg shadow-lg p-6 z-10">
              <Dialog.Title className="text-lg font-medium mb-4">Import Leads</Dialog.Title>

              {/* Excel Upload */}
              <div className="mb-4">
                <label className="block font-medium">Upload Excel (.xlsx):</label>
                <input type="file" accept=".xlsx" onChange={handleExcel} />
                {fileLeads.length > 0 && (
                  <div className="mt-2">
                    <p>{fileLeads.length} rows loaded from Excel.</p>
                    <button
                      onClick={() => handleSubmit(fileLeads)}
                      className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                    >
                      Import Excel Leads
                    </button>
                  </div>
                )}
              </div>

              {/* Google Sheets */}
              <div className="mb-4">
                <label className="block font-medium">Google Sheet URL:</label>
                <input
                  type="text"
                  value={sheetUrl}
                  onChange={e => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/..."
                  className="w-full border px-2 py-1 rounded"
                />
                <button
                  onClick={handleFetchSheet}
                  disabled={loading}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {loading ? "Fetching..." : "Fetch Leads"}
                </button>
                {error && <p className="text-red-600 mt-1">{error}</p>}
                {sheetLeads.length > 0 && (
                  <div className="mt-2">
                    <p>{sheetLeads.length} rows fetched from sheet.</p>
                    <button
                      onClick={() => handleSubmit(sheetLeads)}
                      className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                    >
                      Import Sheet Leads
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 text-right">
                <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Close</button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

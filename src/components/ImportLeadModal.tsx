// src/components/ImportLeadModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

interface ImportLeadModalProps {
  setShow: (val: boolean) => void;
  show: boolean;
}

export default function ImportLeadModal({ setShow, show }: ImportLeadModalProps) {
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Excel file upload (.xlsx)
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      await uploadLeads(jsonData);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to read Excel file.");
    }
  };

  // ✅ Handle Google Sheets CSV fetch
  const fetchGoogleSheet = async () => {
    if (!googleSheetUrl.includes("export?format=csv")) {
      alert("⚠️ Invalid URL. It should end with 'export?format=csv'");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(googleSheetUrl);
      const csv = await res.text();
      const parsed = Papa.parse(csv, { header: true });

      if (parsed.errors.length > 0) throw parsed.errors[0];
      await uploadLeads(parsed.data as any[]);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch or parse Google Sheet.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Upload leads to your backend API
  const uploadLeads = async (leads: any[]) => {
    try {
      const res = await fetch("/api/addLeadBulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leads }),
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("✅ Leads uploaded successfully!");
      setShow(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload leads.");
    }
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setShow(false)}>
        <div className="flex min-h-screen items-center justify-center px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-left">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Import Leads
              </Dialog.Title>

              <div className="space-y-4">
                {/* 📁 Excel Upload */}
                <label className="block">
                  <span className="text-gray-700">Upload Excel File (.xlsx)</span>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelUpload}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  />
                </label>

                {/* 🌐 Google Sheets URL */}
                <label className="block">
                  <span className="text-gray-700">Google Sheet (CSV Export Link)</span>
                  <input
                    type="text"
                    value={googleSheetUrl}
                    onChange={(e) => setGoogleSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv"
                    className="mt-1 block w-full border rounded px-3 py-2"
                  />
                  <button
                    onClick={fetchGoogleSheet}
                    disabled={loading}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? "Fetching..." : "Fetch Leads"}
                  </button>
                </label>
              </div>

              {/* 🔚 Modal Footer */}
              <div className="mt-6 text-right">
                <button
                  onClick={() => setShow(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

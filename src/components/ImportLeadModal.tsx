// src/components/ImportLeadModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import * as XLSX from "xlsx";

interface ImportLeadModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ImportLeadModal({ isOpen, setIsOpen }: ImportLeadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedLeads, setParsedLeads] = useState<any[]>([]);

  const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("📥 Parsed Leads:", jsonData);
      setParsedLeads(jsonData as any[]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmitLeads = async () => {
    try {
      const res = await fetch("/api/addLead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedLeads),
      });

      if (!res.ok) throw new Error("Failed to upload leads");
      alert("✅ Leads uploaded successfully!");
      setIsOpen(false);
      setParsedLeads([]);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("❌ Error uploading leads.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsOpen(false)}>
        <div className="flex min-h-screen items-center justify-center px-4 text-center">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg text-left">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">Import Leads</Dialog.Title>

              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleExcelImport}
                  className="w-full border p-2 rounded"
                />

                {parsedLeads.length > 0 && (
                  <div className="bg-gray-100 p-3 rounded max-h-64 overflow-y-auto">
                    <p className="font-semibold mb-2">Preview:</p>
                    <ul className="text-sm space-y-1">
                      {parsedLeads.slice(0, 5).map((lead, i) => (
                        <li key={i} className="truncate">• {JSON.stringify(lead)}</li>
                      ))}
                      {parsedLeads.length > 5 && <li>...and {parsedLeads.length - 5} more</li>}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleSubmitLeads} disabled={parsedLeads.length === 0} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Upload Leads</button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

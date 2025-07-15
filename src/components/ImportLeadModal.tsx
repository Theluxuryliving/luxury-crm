import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import * as XLSX from "xlsx";

interface ImportLeadModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ImportLeadModal({ isOpen, setIsOpen }: ImportLeadModalProps) {
  const cancelButtonRef = useRef(null);
  const [leads, setLeads] = useState<any[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);
    setLeads(json);
  };

  const handleImport = async () => {
    try {
      const res = await fetch("/api/addLead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leads),
      });
      if (res.ok) {
        alert("Leads imported successfully");
        setIsOpen(false);
      } else {
        alert("Import failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsOpen(false)} initialFocus={cancelButtonRef}>
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
            <Dialog.Panel className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
              <Dialog.Title as="h3" className="text-lg font-medium text-gray-900 mb-4">
                Import Leads from Excel
              </Dialog.Title>

              <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />
              
              {leads.length > 0 && (
                <div className="overflow-auto max-h-64 border p-2 mb-4 text-left text-sm">
                  <table className="w-full">
                    <thead>
                      <tr>
                        {Object.keys(leads[0]).map((key) => (
                          <th key={key} className="border px-2 py-1">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="border px-2 py-1">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  ref={cancelButtonRef}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={leads.length === 0}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Import
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

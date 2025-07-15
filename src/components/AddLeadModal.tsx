import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";

interface AddLeadModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const cities = ["Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Other"];
const countries = [
  "🇵🇰 Pakistan", "🇦🇪 UAE", "🇸🇦 Saudi Arabia", "🇶🇦 Qatar", "🇧🇭 Bahrain",
  "🇴🇲 Oman", "🇰🇼 Kuwait", "🇬🇧 UK", "🇺🇸 USA", "🇦🇺 Australia", "🇪🇺 Europe",
  "🇯🇵 Japan", "🇨🇳 China", "🇰🇷 South Korea", "OT Others"
];
const lahoreAreas = [
  "Bahria", "DHA", "Etihad Town", "RUDA", "Raiwind Road", "Pine Avenue", "Lake City",
  "Park Lane", "Central Park", "Gulberg", "Walled City", "Gawalmandi", "Faisal Town", "Johar Town",
  "Wapda Town", "Valencia Town", "Canal Road", "LDA Avenue", "Multan road", "Thokar Niaz Baig",
  "Mughalpura", "Shalamar Garden", "Cantt", "CBD", "Walton", "NSIT"
];
const plans = ["Offplan", "Ready to Move", "Tenant", "To Let", "To Sell"];
const propertyTypes = [
  "Apartment", "Townhouse", "Residential Plot", "Commercial Plot",
  "Shop", "Penthouse", "Villa", "Farmhouse", "Agricultural Land"
];
const purchasePlans = ["Immediately", "3 Months", "6 Months", "1 Year"];
const sources = [
  "Facebook", "Instagram", "YouTube", "X", "Google", "Event", "Reference", "Cold Call"
];

export default function AddLeadModal({ isOpen, setIsOpen }: AddLeadModalProps) {
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: "", email: "", phone: "", city: "", country: "🇵🇰 Pakistan",
    area: "", plan: "", propertyType: "", project: "", budget: 10,
    purchasePlan: "", source: "", stage: "new" // ✅ default stage
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.source) {
      alert("❌ Name, Phone, and Source are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/addLead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
  const errorText = await res.text();
  throw new Error(`❌ API error: ${res.status} ${res.statusText} — ${errorText}`);
}


      alert("✅ Lead submitted successfully!");
      setIsOpen(false);
      setFormData({
        name: "", email: "", phone: "", city: "", country: "🇵🇰 Pakistan",
        area: "", plan: "", propertyType: "", project: "", budget: 10,
        purchasePlan: "", source: "", stage: "new"
      });
    } catch (error) {
      alert("❌ Error submitting lead");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsOpen(false)} initialFocus={cancelButtonRef}>
          <div className="flex min-h-screen items-center justify-center px-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg text-left align-middle">
                <Dialog.Title as="h3" className="text-lg font-medium text-gray-900 mb-4">Add New Lead</Dialog.Title>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />

                  <select name="country" value={formData.country} onChange={handleChange} className="border p-2 rounded">
                    {countries.map(c => <option key={c}>{c}</option>)}
                  </select>

                  {formData.country === "🇵🇰 Pakistan" ? (
                    <select name="city" value={formData.city} onChange={handleChange} className="border p-2 rounded">
                      {cities.map(c => <option key={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input name="city" value={formData.city} onChange={handleChange} placeholder="Enter City" className="border p-2 rounded" />
                  )}

                  <select name="area" value={formData.area} onChange={handleChange} className="border p-2 rounded">
                    <option value="">Select Area</option>
                    {lahoreAreas.map(area => <option key={area}>{area}</option>)}
                  </select>

                  <select name="plan" value={formData.plan} onChange={handleChange} className="border p-2 rounded">
                    {plans.map(p => <option key={p}>{p}</option>)}
                  </select>

                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="border p-2 rounded">
                    {propertyTypes.map(p => <option key={p}>{p}</option>)}
                  </select>

                  <input name="project" value={formData.project} onChange={handleChange} placeholder="Project Interested In" className="border p-2 rounded" />

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Budget (in Millions): {formData.budget}</label>
                    <input type="range" name="budget" min="1" max="500" value={formData.budget} onChange={handleChange} className="w-full" />
                  </div>

                  <select name="purchasePlan" value={formData.purchasePlan} onChange={handleChange} className="border p-2 rounded">
                    {purchasePlans.map(p => <option key={p}>{p}</option>)}
                  </select>

                  <select name="source" value={formData.source} onChange={handleChange} className="border p-2 rounded">
                    {sources.map(s => <option key={s}>{s}</option>)}
                  </select>

                  {/* Optional Stage Dropdown (uncomment if needed)
                  <select name="stage" value={formData.stage} onChange={handleChange} className="border p-2 rounded">
                    {["new", "contacted", "follow-up", "closed"].map(stage => <option key={stage}>{stage}</option>)}
                  </select>
                  */}

                  <div className="col-span-2 flex justify-between mt-4">
                    <button type="button" onClick={() => setShowImportModal(true)} className="px-4 py-2 bg-gray-300 rounded">📥 Import</button>
                    <div className="space-x-2">
                      <button type="button" ref={cancelButtonRef} onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Import Modal */}
      <Transition appear show={showImportModal} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setShowImportModal(false)}>
          <div className="flex min-h-screen items-center justify-center px-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-left">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">Import Leads</Dialog.Title>
                <div className="space-y-4">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Import from Excel</button>
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Import from Google Sheets</button>
                </div>
                <div className="mt-6 text-right">
                  <button onClick={() => setShowImportModal(false)} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";

interface AddLeadModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AddLeadModal({ isOpen, setIsOpen }: AddLeadModalProps) {
  const cancelButtonRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    areaInterested: "",
    planInterested: "",
    propertyType: "",
    projectInterested: "",
    budget: "",
    purchaseTimeline: "",
    leadSource: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/addLead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Lead added!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          country: "",
          areaInterested: "",
          planInterested: "",
          propertyType: "",
          projectInterested: "",
          budget: "",
          purchaseTimeline: "",
          leadSource: "",
        });
        setIsOpen(false);
      } else {
        alert("Failed to add lead");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting lead");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setIsOpen(false)}
        initialFocus={cancelButtonRef}
      >
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
            <Dialog.Panel className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg text-left align-middle z-[100]">
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">Add New Lead</Dialog.Title>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded" />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2 rounded" />
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 rounded" />
                <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="border p-2 rounded" />
                <input name="areaInterested" placeholder="Area Interested In" value={formData.areaInterested} onChange={handleChange} className="border p-2 rounded" />
                <input name="planInterested" placeholder="Plan Interested In" value={formData.planInterested} onChange={handleChange} className="border p-2 rounded" />
                <input name="propertyType" placeholder="Property Type" value={formData.propertyType} onChange={handleChange} className="border p-2 rounded" />
                <input name="projectInterested" placeholder="Project Interested In" value={formData.projectInterested} onChange={handleChange} className="border p-2 rounded" />
                <input name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange} className="border p-2 rounded" />
                <input name="purchaseTimeline" placeholder="Plan on Purchasing" value={formData.purchaseTimeline} onChange={handleChange} className="border p-2 rounded" />
                <input name="leadSource" placeholder="Lead Source" value={formData.leadSource} onChange={handleChange} className="border p-2 rounded" />

                <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

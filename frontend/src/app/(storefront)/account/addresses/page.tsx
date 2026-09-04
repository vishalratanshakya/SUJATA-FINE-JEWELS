"use client";

import { useState } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { MapPin, Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      title: "HOME",
      isDefault: true,
      name: "Aanya Sharma",
      line1: "12, Green Avenue, South Extension",
      line2: "New Delhi - 110049, Delhi",
      country: "India",
      phone: "+91 98765 43210",
    },
    {
      id: "addr-2",
      title: "WORK",
      isDefault: false,
      name: "Aanya Sharma",
      line1: "Plot 45, Cyber City, Phase III",
      line2: "Gurugram - 122002, Haryana",
      country: "India",
      phone: "+91 98765 43210",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "HOME",
    name: "",
    line1: "",
    line2: "",
    phone: "",
    isDefault: false,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ title: "HOME", name: "", line1: "", line2: "", phone: "", isDefault: false });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: (typeof addresses)[0]) => {
    setEditingId(addr.id);
    setForm({
      title: addr.title,
      name: addr.name,
      line1: addr.line1,
      line2: addr.line2,
      phone: addr.phone,
      isDefault: addr.isDefault,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.line1) {
      toast.error("Please fill in required fields");
      return;
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, ...form }
            : form.isDefault
            ? { ...a, isDefault: false }
            : a
        )
      );
      toast.success("Address updated successfully!");
    } else {
      const newAddr = {
        id: `addr-${Date.now()}`,
        ...form,
        country: "India",
      };
      setAddresses((prev) =>
        form.isDefault
          ? prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
          : [...prev, newAddr]
      );
      toast.success("New address added successfully!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      toast.success("Address deleted");
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast.success("Default address updated!");
  };

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2EDE4] pb-6">
          <div>
            <h1 className="font-serif text-3xl text-[#2C2825]">Saved Addresses</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
              Manage your delivery addresses.
            </p>
          </div>
          <Link
            href="/account/addresses/add"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-xs self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>ADD NEW ADDRESS</span>
          </Link>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-6 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] relative space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">
                      {addr.title}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-[#B38E5D]/10 text-[#B38E5D] border border-[#B38E5D]/30 px-2 py-0.5 rounded">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEdit(addr)}
                      className="text-[#8C8275] hover:text-[#2C2825]"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-rose-500 hover:text-rose-700"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="font-serif text-lg font-medium text-[#2C2825]">{addr.name}</p>
                <p className="text-xs text-[#6B6357] leading-relaxed">
                  {addr.line1}<br />
                  {addr.line2}<br />
                  {addr.country}<br />
                  <span className="font-mono mt-1 inline-block">Phone: {addr.phone}</span>
                </p>
              </div>

              {!addr.isDefault && (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="mt-4 text-[11px] font-bold uppercase tracking-wider text-[#B38E5D] hover:underline self-start"
                >
                  SET AS DEFAULT
                </button>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 border border-[#EAE4D9] shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#F2EDE4] pb-4">
              <h3 className="font-serif text-2xl text-[#2C2825]">
                {editingId ? "Edit Address" : "Add New Address"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8C8275] hover:text-[#2C2825]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Address Title</label>
                <select
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825] bg-white"
                >
                  <option value="HOME">HOME</option>
                  <option value="WORK">WORK</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Aanya Sharma"
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Address Line 1</label>
                <input
                  type="text"
                  value={form.line1}
                  onChange={(e) => setForm({ ...form, line1: e.target.value })}
                  placeholder="House/Flat No., Street, Area"
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Address Line 2</label>
                <input
                  type="text"
                  value={form.line2}
                  onChange={(e) => setForm({ ...form, line2: e.target.value })}
                  placeholder="City, State, Pincode"
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  id="set-def"
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="h-4 w-4 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825]"
                />
                <label htmlFor="set-def" className="text-xs font-medium text-[#6B6357]">
                  Set as default address
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-gray-50"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#2C2825] hover:bg-[#B38E5D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  SAVE ADDRESS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AccountLayoutWrapper>
  );
}

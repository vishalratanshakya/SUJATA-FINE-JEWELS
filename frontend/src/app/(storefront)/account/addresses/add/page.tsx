"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AddAddressPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "HOME",
    name: "",
    line1: "",
    line2: "",
    phone: "",
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.line1) {
      toast.error("Please fill in required address fields");
      return;
    }
    toast.success("New address added successfully!");
    router.push("/account/addresses");
  };

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F2EDE4] pb-6">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl text-[#2C2825]">Add New Address</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase">
              Enter your shipping &amp; delivery information below.
            </p>
          </div>
          <Link
            href="/account/addresses"
            className="inline-flex items-center space-x-2 px-4 py-2 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:text-[#2C2825] hover:bg-[#FAF8F5] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO ADDRESSES</span>
          </Link>
        </div>

        {/* Add Address Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                Address Tag / Title
              </label>
              <select
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825] bg-white font-medium text-[#2C2825]"
              >
                <option value="HOME">HOME</option>
                <option value="WORK">WORK</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                Recipient Full Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Aanya Sharma"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
              Address Line 1 (House/Flat No., Street, Area) *
            </label>
            <input
              type="text"
              value={form.line1}
              onChange={(e) => setForm({ ...form, line1: e.target.value })}
              placeholder="e.g. 12, Green Avenue, South Extension"
              className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                Address Line 2 (City, State, Pincode)
              </label>
              <input
                type="text"
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
                placeholder="e.g. New Delhi - 110049, Delhi"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                Contact Phone Number
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              id="set-default-check"
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="h-4 w-4 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825]"
            />
            <label htmlFor="set-default-check" className="text-xs font-semibold text-[#6B6357] cursor-pointer">
              Set as default shipping address
            </label>
          </div>

          <div className="flex space-x-4 pt-4 border-t border-[#F2EDE4]">
            <Link
              href="/account/addresses"
              className="px-6 py-3.5 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-gray-50 transition-colors"
            >
              CANCEL
            </Link>
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#2C2825] hover:bg-[#B38E5D] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-xs flex items-center space-x-2 cursor-pointer"
            >
              <Check size={16} />
              <span>SAVE ADDRESS</span>
            </button>
          </div>
        </form>

      </div>
    </AccountLayoutWrapper>
  );
}

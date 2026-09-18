"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export default function EditAddressPage() {
  const router = useRouter();
  const params = useParams();
  const addressId = params.id as string;

  const [form, setForm] = useState({
    title: "HOME",
    name: "",
    line1: "",
    line2: "",
    phone: "",
    city: "",
    state: "",
    postalCode: "",
    isDefault: false,
  });

  useEffect(() => {
    // Fetch address details
    const fetchAddress = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendUrl}/api/addresses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const address = data.data.find((a: any) => a._id === addressId);
          if (address) {
            setForm({
              title: address.label || "HOME",
              name: address.fullName,
              line1: address.addressLine1,
              line2: address.addressLine2,
              phone: address.phone,
              city: address.city || "",
              state: address.state || "",
              postalCode: address.postalCode || "",
              isDefault: address.isDefault,
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAddress();
  }, [addressId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.line1) {
      toast.error("Please fill in required fields");
      return;
    }

    const payload = {
      label: form.title,
      fullName: form.name,
      addressLine1: form.line1,
      addressLine2: form.line2,
      phone: form.phone,
      city: form.city || "Default City",
      state: form.state || "Default State",
      postalCode: form.postalCode || "000000",
      country: "India",
      isDefault: form.isDefault
    };

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      
      const res = await fetch(`${backendUrl}/api/addresses/${addressId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        toast.success("Address updated successfully!");
        router.push("/account/addresses");
      } else {
        toast.error("Failed to update address");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        <div className="flex items-center space-x-4 border-b border-[#F2EDE4] pb-6">
          <Link href="/account/addresses" className="w-10 h-10 rounded-full border border-[#EAE4D9] flex items-center justify-center text-[#8C8275] hover:bg-[#FAF8F5] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-serif text-3xl text-[#2C2825]">Edit Address</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
              Update your delivery details
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto py-4">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Address Title</label>
              <select
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825] bg-white"
              >
                <option value="HOME">HOME</option>
                <option value="WORK">WORK</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Recipient Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Aanya Sharma"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Address Line 1</label>
              <input
                type="text"
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
                placeholder="House/Flat No., Street, Area"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Address Line 2</label>
              <input
                type="text"
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
                placeholder="City, State, Pincode"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
              />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input
                id="set-def"
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                className="h-5 w-5 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825]"
              />
              <label htmlFor="set-def" className="text-sm font-medium text-[#6B6357]">
                Set as default address
              </label>
            </div>

            <div className="flex space-x-4 pt-6 border-t border-[#F2EDE4]">
              <button
                type="button"
                onClick={() => router.push("/account/addresses")}
                className="flex-1 py-3.5 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-[#FAF8F5] transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-[#2C2825] hover:bg-[#B38E5D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                SAVE CHANGES
              </button>
            </div>
          </form>
        </div>

      </div>
    </AccountLayoutWrapper>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { MapPin, Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);


  const fetchAddresses = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Map backend fields to frontend for compatibility
        const mapped = data.data.map((a: any) => ({
          id: a._id,
          title: a.label || "HOME",
          name: a.fullName,
          line1: a.addressLine1,
          line2: a.addressLine2,
          city: a.city,
          state: a.state,
          postalCode: a.postalCode,
          phone: a.phone,
          country: a.country || "India",
          isDefault: a.isDefault
        }));
        setAddresses(mapped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);


  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendUrl}/api/addresses/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          toast.success("Address deleted");
          fetchAddresses();
        }
      } catch (err) {
        toast.error("Failed to delete address");
      }
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/api/addresses/${id}/default`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Default address updated!");
        fetchAddresses();
      }
    } catch (err) {
      toast.error("Failed to update default address");
    }
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
                    <Link
                      href={`/account/addresses/${addr.id}`}
                      className="text-[#8C8275] hover:text-[#2C2825]"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </Link>
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


    </AccountLayoutWrapper>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { ArrowLeft, Navigation, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export default function EditAddressPage() {
  const router = useRouter();
  const params = useParams();
  const addressId = params.id as string;

  const [form, setForm] = useState({
    title: "HOME",
    name: "",
    phone: "",
    house: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const [isLocating, setIsLocating] = useState(false);

  const fetchLiveLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          if (data && data.address) {
            setForm((prev) => ({
              ...prev,
              house: data.address.house_number || data.address.building || prev.house,
              street: data.address.road || data.address.suburb || data.address.neighbourhood || prev.street,
              city: data.address.city || data.address.town || data.address.state_district || prev.city,
              state: data.address.state || prev.state,
              pincode: data.address.postcode || prev.pincode,
            }));
            toast.success("Location fetched successfully!");
          } else {
            toast.error("Could not resolve address from location");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          toast.error("Failed to fetch address details");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast.error("Unable to retrieve your location. Please check browser permissions.");
        setIsLocating(false);
      }
    );
  };

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
            
            // Reconstruct fields from old schema if needed, otherwise use direct
            // Since old schema didn't have house, street explicitly, we'll try to map if possible or leave blank
            const parts = address.addressLine1 ? address.addressLine1.split(", ") : [];
            const house = parts[0] || "";
            const street = parts.slice(1).join(", ") || "";
            
            setForm({
              title: address.label || "HOME",
              name: address.fullName || "",
              phone: address.phone || "",
              house: house,
              street: street,
              landmark: address.addressLine2 || "",
              city: address.city || "",
              state: address.state || "",
              pincode: address.postalCode || "",
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

    // Validation
    if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      toast.error("Full Name must contain only letters.");
      return;
    }
    
    if (!/^\d{10}$/.test(form.phone.trim().replace(/\s+/g, '').replace(/^\+91/, ''))) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!form.house || !form.street || !form.city || !form.state || !form.pincode) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    const payload = {
      label: form.title,
      fullName: form.name,
      addressLine1: `${form.house}, ${form.street}`,
      addressLine2: form.landmark,
      phone: form.phone,
      city: form.city,
      state: form.state,
      postalCode: form.pincode,
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
        
        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 space-y-4">
          <Link
            href="/account/addresses"
            className="inline-flex items-center space-x-2 px-4 py-2 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:text-[#2C2825] hover:bg-[#FAF8F5] transition-colors self-start"
          >
            <ArrowLeft size={14} />
            <span>BACK TO ADDRESSES</span>
          </Link>
          <div className="space-y-1">
            <h1 className="font-serif text-3xl text-[#2C2825]">Edit Address</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase">
              Update your delivery information below.
            </p>
          </div>
        </div>

        {/* Edit Address Form */}
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825]">
                Address Type
              </label>
              <button
                type="button"
                onClick={fetchLiveLocation}
                disabled={isLocating}
                className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-full disabled:opacity-50"
              >
                {isLocating ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                <span>{isLocating ? "Locating..." : "Use Live Location"}</span>
              </button>
            </div>
            
            <div className="flex space-x-3">
              {["HOME", "WORK", "OTHER"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({ ...form, title: type })}
                  className={`px-6 py-2.5 rounded-xl border text-xs font-bold tracking-wider transition-all ${
                    form.title === type
                      ? "bg-[#2C2825] border-[#2C2825] text-white shadow-sm"
                      : "bg-white border-[#E2DDD3] text-[#6B6357] hover:border-[#2C2825] hover:text-[#2C2825]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                Full Name *
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

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                Mobile Number *
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="10-digit mobile number"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
              House/Flat/Building Number *
            </label>
            <input
              type="text"
              value={form.house}
              onChange={(e) => setForm({ ...form, house: e.target.value })}
              placeholder="e.g. Flat No. 12B"
              className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
              Street/Area *
            </label>
            <input
              type="text"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              placeholder="e.g. Green Avenue, South Extension"
              className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
              Landmark (Optional)
            </label>
            <input
              type="text"
              value={form.landmark}
              onChange={(e) => setForm({ ...form, landmark: e.target.value })}
              placeholder="e.g. Opposite Metro Station"
              className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                City *
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. New Delhi"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                State *
              </label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="e.g. Delhi"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">
                PIN Code *
              </label>
              <input
                type="text"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                placeholder="e.g. 110049"
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
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
            <button
              type="button"
              onClick={() => router.push("/account/addresses")}
              className="flex-1 sm:flex-none px-6 py-3.5 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none px-8 py-3.5 bg-[#2C2825] hover:bg-[#B38E5D] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>SAVE CHANGES</span>
            </button>
          </div>
        </form>

      </div>
    </AccountLayoutWrapper>
  );
}

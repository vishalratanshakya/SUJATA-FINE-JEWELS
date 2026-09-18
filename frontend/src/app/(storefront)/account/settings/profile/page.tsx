"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      
      const res = await fetch(`${backendUrl}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });
      
      if (res.ok) {
        const data = await res.json();
        updateUser(data.user);
        toast.success("Profile details updated successfully!");
        router.push("/account");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 space-y-3">
          <Link href="/account" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8C8275] hover:text-[#2C2825] transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Account</span>
          </Link>
          <h1 className="font-serif text-3xl text-[#2C2825]">Edit Profile Information</h1>
          <p className="text-xs text-[#8C8275] tracking-wider uppercase">
            Update your personal details.
          </p>
        </div>

        <div className="max-w-xl">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Email Address</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Phone Number</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/account")}
                className="flex-1 py-3.5 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-gray-50 transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-[#B38E5D] hover:bg-[#997746] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
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

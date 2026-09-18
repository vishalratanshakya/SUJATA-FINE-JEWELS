"use client";

import { useState } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { ArrowLeft, Lock } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [passForm, setPassForm] = useState({ current: "", newPass: "", confirm: "" });

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.newPass !== passForm.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    toast.success("Password changed successfully!");
    router.push("/account/settings");
  };

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        <div className="flex items-center space-x-4 border-b border-[#F2EDE4] pb-6">
          <Link href="/account/settings" className="w-10 h-10 rounded-full border border-[#EAE4D9] flex items-center justify-center text-[#8C8275] hover:bg-[#FAF8F5] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-serif text-3xl text-[#2C2825]">Change Password</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
              Update your account password securely
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto py-4">
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Current Password</label>
              <input
                type="password"
                value={passForm.current}
                onChange={(e) => setPassForm({ ...passForm, current: e.target.value })}
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">New Password</label>
              <input
                type="password"
                value={passForm.newPass}
                onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })}
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passForm.confirm}
                onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
                className="w-full border border-[#E2DDD3] rounded-xl p-3.5 text-sm focus:outline-none focus:border-[#2C2825]"
                required
              />
            </div>

            <div className="flex space-x-4 pt-6 border-t border-[#F2EDE4]">
              <button
                type="button"
                onClick={() => router.push("/account/settings")}
                className="flex-1 py-3.5 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-[#FAF8F5] transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-[#2C2825] hover:bg-[#B38E5D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                UPDATE PASSWORD
              </button>
            </div>
          </form>
        </div>

      </div>
    </AccountLayoutWrapper>
  );
}

"use client";

import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteAccountPage() {
  const router = useRouter();

  const handleDeleteAccount = () => {
    toast.error("Account deletion request submitted.");
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
            <h1 className="font-serif text-3xl text-[#2C2825]">Delete Account</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
              Permanently remove your account and personal data
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto py-12 text-center space-y-8">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-sm border border-rose-100">
            <AlertTriangle size={40} />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-3xl text-rose-900">Delete Your Account?</h3>
            <p className="text-sm text-[#6B6357] leading-relaxed max-w-md mx-auto">
              This action is permanent and cannot be undone. All your saved addresses, order history, and wishlist items will be permanently erased.
            </p>
          </div>

          <div className="flex space-x-4 pt-8">
            <button
              onClick={() => router.push("/account/settings")}
              className="flex-1 py-4 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-[#FAF8F5] transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>

      </div>
    </AccountLayoutWrapper>
  );
}

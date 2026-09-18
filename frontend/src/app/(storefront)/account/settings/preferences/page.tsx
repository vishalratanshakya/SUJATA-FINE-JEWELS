"use client";

import { useState } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { ArrowLeft, Bell } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NotificationPreferencesPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState({ orders: true, delivery: true, offers: true, newsletter: false });

  const handleSave = () => {
    toast.success("Notification preferences saved!");
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
            <h1 className="font-serif text-3xl text-[#2C2825]">Notification Preferences</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase mt-1">
              Manage communication and alert preferences
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto py-4 space-y-6">
          <div className="space-y-4">
            {[
              { key: "orders", label: "Order Updates", desc: "Receive email/SMS when order status changes" },
              { key: "delivery", label: "Delivery Alerts", desc: "Real-time dispatch and delivery tracking" },
              { key: "offers", label: "Special Offers", desc: "Exclusive VIP discount alerts & vault sales" },
              { key: "newsletter", label: "New Collection Alerts", desc: "Monthly magazine & new launch digests" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-5 rounded-xl border border-[#EAE4D9] bg-[#FAF8F5]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#2C2825]">{item.label}</p>
                  <p className="text-xs text-[#8C8275] mt-1">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={(prefs as any)[item.key]}
                  onChange={(e) =>
                    setPrefs({ ...prefs, [item.key]: e.target.checked })
                  }
                  className="h-5 w-5 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825] cursor-pointer"
                />
              </div>
            ))}
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
              onClick={handleSave}
              className="flex-1 py-3.5 bg-[#2C2825] hover:bg-[#B38E5D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
            >
              SAVE PREFERENCES
            </button>
          </div>
        </div>

      </div>
    </AccountLayoutWrapper>
  );
}

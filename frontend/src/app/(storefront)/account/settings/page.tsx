"use client";

import { useState } from "react";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import {
  User,
  Lock,
  Bell,
  Shield,
  Trash2,
  ChevronRight,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function AccountSettingsPage() {
  // Modal states
  const [activeModal, setActiveModal] = useState<"profile" | "password" | "preferences" | "delete" | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState({ name: "Aanya Sharma", email: "aanya.sharma@email.com", phone: "+91 98765 43210" });
  const [passForm, setPassForm] = useState({ current: "", newPass: "", confirm: "" });
  const [prefs, setPrefs] = useState({ orders: true, delivery: true, offers: true, newsletter: false });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal(null);
    toast.success("Personal information updated!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.newPass !== passForm.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    setActiveModal(null);
    toast.success("Password changed successfully!");
  };

  const handleDeleteAccount = () => {
    setActiveModal(null);
    toast.error("Account deletion request submitted.");
  };

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 space-y-1">
          <h1 className="font-serif text-3xl text-[#2C2825]">Account Settings</h1>
          <p className="text-xs text-[#8C8275] tracking-wider uppercase">
            Manage your account preferences and security.
          </p>
        </div>

        {/* Setting Rows */}
        <div className="space-y-4 pt-2">
          
          {/* Row 1: Personal Info */}
          <button
            onClick={() => setActiveModal("profile")}
            className="w-full p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] hover:border-[#2C2825] transition-colors flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE4D9] flex items-center justify-center text-[#B38E5D]">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2C2825]">Personal Information</h3>
                <p className="text-xs text-[#8C8275]">Change your name, email, and phone number</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#8C8275]" />
          </button>

          {/* Row 2: Change Password */}
          <button
            onClick={() => setActiveModal("password")}
            className="w-full p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] hover:border-[#2C2825] transition-colors flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE4D9] flex items-center justify-center text-[#B38E5D]">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2C2825]">Change Password</h3>
                <p className="text-xs text-[#8C8275]">Update your account password securely</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#8C8275]" />
          </button>

          {/* Row 3: Preferences */}
          <button
            onClick={() => setActiveModal("preferences")}
            className="w-full p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] hover:border-[#2C2825] transition-colors flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE4D9] flex items-center justify-center text-[#B38E5D]">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2C2825]">
                  Email &amp; Notification Preferences
                </h3>
                <p className="text-xs text-[#8C8275]">Manage communication and alert preferences</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#8C8275]" />
          </button>

          {/* Row 4: Delete Account */}
          <button
            onClick={() => setActiveModal("delete")}
            className="w-full p-5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 transition-colors flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-600">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-700">Delete Account</h3>
                <p className="text-xs text-rose-500">Permanently remove your account and personal data</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-rose-400" />
          </button>

        </div>

      </div>

      {/* PERSONAL INFO MODAL */}
      {activeModal === "profile" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 border border-[#EAE4D9] shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#F2EDE4] pb-4">
              <h3 className="font-serif text-2xl text-[#2C2825]">Personal Information</h3>
              <button onClick={() => setActiveModal(null)} className="text-[#8C8275] hover:text-[#2C2825]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Phone Number</label>
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
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-gray-50"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#B38E5D] hover:bg-[#997746] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {activeModal === "password" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 border border-[#EAE4D9] shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#F2EDE4] pb-4">
              <h3 className="font-serif text-2xl text-[#2C2825]">Change Password</h3>
              <button onClick={() => setActiveModal(null)} className="text-[#8C8275] hover:text-[#2C2825]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Current Password</label>
                <input
                  type="password"
                  value={passForm.current}
                  onChange={(e) => setPassForm({ ...passForm, current: e.target.value })}
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">New Password</label>
                <input
                  type="password"
                  value={passForm.newPass}
                  onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })}
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2825] mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passForm.confirm}
                  onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
                  className="w-full border border-[#E2DDD3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2C2825]"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-gray-50"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#2C2825] hover:bg-[#B38E5D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  UPDATE PASSWORD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREFERENCES MODAL */}
      {activeModal === "preferences" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 border border-[#EAE4D9] shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#F2EDE4] pb-4">
              <h3 className="font-serif text-2xl text-[#2C2825]">Notification Preferences</h3>
              <button onClick={() => setActiveModal(null)} className="text-[#8C8275] hover:text-[#2C2825]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: "orders", label: "Order Updates", desc: "Receive email/SMS when order status changes" },
                { key: "delivery", label: "Delivery Alerts", desc: "Real-time dispatch and delivery tracking" },
                { key: "offers", label: "Special Offers", desc: "Exclusive VIP discount alerts & vault sales" },
                { key: "newsletter", label: "New Collection Alerts", desc: "Monthly magazine & new launch digests" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl border border-[#EAE4D9]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">{item.label}</p>
                    <p className="text-[11px] text-[#8C8275]">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={(prefs as any)[item.key]}
                    onChange={(e) =>
                      setPrefs({ ...prefs, [item.key]: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-[#E2DDD3] text-[#2C2825] focus:ring-[#2C2825]"
                  />
                </div>
              ))}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    toast.success("Notification preferences saved!");
                  }}
                  className="w-full py-3 bg-[#2C2825] hover:bg-[#B38E5D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  SAVE PREFERENCES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {activeModal === "delete" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 border border-rose-200 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-rose-900">Delete Your Account?</h3>
              <p className="text-xs text-[#6B6357] leading-relaxed">
                This action is permanent and cannot be undone. All your saved addresses, order history, and wishlist items will be permanently erased.
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex-1 py-3 border border-[#E2DDD3] rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6357] hover:bg-gray-50"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                DELETE ACCOUNT
              </button>
            </div>
          </div>
        </div>
      )}

    </AccountLayoutWrapper>
  );
}

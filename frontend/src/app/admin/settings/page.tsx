"use client";

import { useState } from "react";
import { Check, ShieldCheck, Store, Lock, Mail, Phone, MapPin, Globe, CreditCard, DollarSign } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStore } from "@/store/useStore";

export default function AdminSettingsPage() {
  const storeSettings = useStore((s) => s.storeSettings);
  const updateStoreSettings = useStore((s) => s.updateStoreSettings);

  const [form, setForm] = useState({ ...storeSettings });
  const [adminAuth, setAdminAuth] = useState({
    adminName: "Administrator",
    adminEmail: "admin@sujatafinejewels.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(form);
    toast.success("Store configuration & contact info updated!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminAuth.currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (adminAuth.newPassword !== adminAuth.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    toast.success("Admin credentials updated successfully!");
    setAdminAuth(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Store & Admin Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure brand contact channels, shipping thresholds, tax GST specifications, and admin credentials</p>
      </div>

      {/* Store Settings Form */}
      <form onSubmit={handleSaveStoreSettings} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 text-gray-900 font-semibold text-base">
          <Store size={18} className="text-amber-800" />
          <span>Brand & Contact Information</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Store Brand Name</label>
            <input
              type="text"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Concierge Email</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Support Phone Hotline</label>
            <input
              type="text"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">GST Registration Number</label>
            <input
              type="text"
              value={form.gstNumber}
              onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm font-mono focus:outline-none focus:border-charcoal"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Flagship Atelier Address</label>
            <input
              type="text"
              value={form.flagshipAddress}
              onChange={(e) => setForm({ ...form, flagshipAddress: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">Free Shipping Minimum Threshold (₹)</label>
              <input
                type="number"
                value={form.freeShippingThreshold}
                onChange={(e) => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })}
                className="mt-1 border border-gray-200 rounded px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-charcoal"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Check size={16} />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>

      {/* Admin Security & Password Change */}
      <form onSubmit={handleUpdatePassword} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 text-gray-900 font-semibold text-base">
          <Lock size={18} className="text-gray-700" />
          <span>Admin Credentials & Security</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Admin Profile Name</label>
            <input
              type="text"
              value={adminAuth.adminName}
              onChange={(e) => setAdminAuth({ ...adminAuth, adminName: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Admin Login Email</label>
            <input
              type="email"
              value={adminAuth.adminEmail}
              onChange={(e) => setAdminAuth({ ...adminAuth, adminEmail: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={adminAuth.currentPassword}
              onChange={(e) => setAdminAuth({ ...adminAuth, currentPassword: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={adminAuth.newPassword}
              onChange={(e) => setAdminAuth({ ...adminAuth, newPassword: e.target.value })}
              className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 pt-4">
          <button
            type="submit"
            className="px-5 py-2.5 bg-gray-800 text-white text-xs font-medium rounded hover:bg-black transition-colors flex items-center space-x-2"
          >
            <ShieldCheck size={16} />
            <span>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  );
}

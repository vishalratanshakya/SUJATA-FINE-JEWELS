"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ContactSettingsPage() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
    hours: "",
    whatsappLink: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/contact-info")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setForm({
            phone: data.data.phone || "",
            email: data.data.email || "",
            address: data.data.address || "",
            hours: data.data.hours || "",
            whatsappLink: data.data.whatsappLink || "",
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load contact info");
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        toast.success("Contact info updated successfully!");
      } else {
        toast.error("Failed to update contact info");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading contact info...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contact Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone & VIP Contact</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="+91 98765 43210 (24/7 Available)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="concierge@sujatafinejewels.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Flagship Vault Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            rows={3}
            placeholder="42, Heritage Enclave, Outer Circle, Connaught Place, New Delhi - 110001"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Boutique Visiting Hours</label>
          <textarea
            value={form.hours}
            onChange={(e) => setForm({ ...form, hours: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            rows={3}
            placeholder="Mon - Sat: 11:00 AM - 8:30 PM\nSunday: By Private VIP Appointment"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Link</label>
          <input
            type="text"
            value={form.whatsappLink}
            onChange={(e) => setForm({ ...form, whatsappLink: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="https://wa.me/919876543210"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-charcoal text-white rounded-lg hover:bg-black disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Save Contact Info"}
          </button>
        </div>
      </form>
    </div>
  );
}

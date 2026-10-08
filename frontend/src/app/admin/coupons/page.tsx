"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Plus, Trash2, Edit2, Tag } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const defaultForm = {
  code: "",
  description: "",
  discountType: "percentage" as "percentage" | "flat",
  discountValue: 0,
  minOrderAmount: 0,
  maxDiscount: "",
  expiresAt: "",
  usageLimit: "",
  isActive: true,
};

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") || localStorage.getItem("token") : "";

  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${API}/api/coupons/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.data || []);
      }
    } catch { toast.error("Failed to fetch coupons"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      ...form,
      discountValue: Number(form.discountValue),
      minOrderAmount: Number(form.minOrderAmount),
      maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
      usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
      expiresAt: form.expiresAt || undefined,
    };
    try {
      const url = editId ? `${API}/api/coupons/${editId}` : `${API}/api/coupons`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(editId ? "Coupon updated!" : "Coupon created!");
        setShowForm(false); setEditId(null); setForm(defaultForm); fetchCoupons();
      } else { toast.error(data.message || "Failed to save coupon"); }
    } catch { toast.error("An error occurred"); }
  };

  const handleEdit = (coupon: any) => {
    setEditId(coupon._id);
    setForm({
      code: coupon.code, description: coupon.description || "",
      discountType: coupon.discountType, discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount || 0, maxDiscount: coupon.maxDiscount || "",
      expiresAt: coupon.expiresAt ? coupon.expiresAt.split("T")[0] : "",
      usageLimit: coupon.usageLimit || "", isActive: coupon.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    const res = await fetch(`${API}/api/coupons/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) { toast.success("Deleted"); fetchCoupons(); } else toast.error("Failed");
  };

  const toggleActive = async (coupon: any) => {
    const res = await fetch(`${API}/api/coupons/${coupon._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isActive: !coupon.isActive }),
    });
    if (res.ok) { fetchCoupons(); toast.success("Status updated"); }
  };

  const inp = "w-full border border-[#E2DDD3] rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#B38E5D]";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2C2825]">Coupon Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage discount coupons for customers</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(defaultForm); }}
          className="flex items-center space-x-2 bg-[#2C2825] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#B38E5D] transition-colors">
          <Plus size={16} /> <span>Add Coupon</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#EAE4D9] rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2C2825] mb-4">{editId ? "Edit Coupon" : "Create Coupon"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6357] mb-1">Coupon Code *</label>
              <input className={inp} required value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="e.g. SAVE20" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6357] mb-1">Description</label>
              <input className={inp} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="e.g. 20% off on all orders" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6357] mb-1">Discount Type *</label>
              <select className={inp} value={form.discountType} onChange={e => setForm({...form, discountType: e.target.value as any})}>
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6357] mb-1">Discount Value * {form.discountType === "percentage" ? "(%)" : "(₹)"}</label>
              <input type="number" className={inp} required min={1} value={form.discountValue}
                onChange={e => setForm({...form, discountValue: Number(e.target.value)})} placeholder={form.discountType === "percentage" ? "20" : "500"} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6357] mb-1">Min Order Amount (₹)</label>
              <input type="number" className={inp} min={0} value={form.minOrderAmount}
                onChange={e => setForm({...form, minOrderAmount: Number(e.target.value)})} placeholder="0" />
            </div>
            {form.discountType === "percentage" && (
              <div>
                <label className="block text-xs font-bold uppercase text-[#6B6357] mb-1">Max Discount Cap (₹)</label>
                <input type="number" className={inp} min={0} value={form.maxDiscount}
                  onChange={e => setForm({...form, maxDiscount: e.target.value})} placeholder="Optional" />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6357] mb-1">Expiry Date</label>
              <input type="date" className={inp} value={form.expiresAt} onChange={e => setForm({...form, expiresAt: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6357] mb-1">Usage Limit</label>
              <input type="number" className={inp} min={1} value={form.usageLimit}
                onChange={e => setForm({...form, usageLimit: e.target.value})} placeholder="Unlimited" />
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <input type="checkbox" id="isActive" checked={form.isActive}
                onChange={e => setForm({...form, isActive: e.target.checked})} className="h-4 w-4 accent-[#2C2825]" />
              <label htmlFor="isActive" className="text-sm text-[#2C2825] font-medium">Active</label>
            </div>
            <div className="sm:col-span-2 flex space-x-3 pt-2">
              <button type="submit" className="bg-[#2C2825] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#B38E5D] transition-colors">
                {editId ? "Save Changes" : "Create Coupon"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }}
                className="border border-[#E2DDD3] px-6 py-2.5 rounded-lg text-sm text-[#6B6357] hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : coupons.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Tag size={40} className="mx-auto mb-3 opacity-30" />
          <p>No coupons yet. Create your first coupon!</p>
        </div>
      ) : (
        <div className="bg-white border border-[#EAE4D9] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#FAF8F5] border-b border-[#EAE4D9]">
              <tr>
                {["Code", "Discount", "Min Order", "Used", "Expires", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[#6B6357] font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EDE4]">
              {coupons.map(c => (
                <tr key={c._id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono font-bold text-[#2C2825] bg-[#F2EDE4] px-2 py-1 rounded text-xs">{c.code}</span>
                    {c.description && <p className="text-xs text-gray-400 mt-0.5">{c.description}</p>}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#B38E5D]">
                    {c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue.toLocaleString()}`}
                    {c.maxDiscount && <span className="text-xs text-gray-400 ml-1">(max ₹{c.maxDiscount.toLocaleString()})</span>}
                  </td>
                  <td className="px-4 py-3 text-[#6B6357]">{c.minOrderAmount > 0 ? `₹${c.minOrderAmount.toLocaleString()}` : "—"}</td>
                  <td className="px-4 py-3 text-[#6B6357]">{c.usedCount}{c.usageLimit ? `/${c.usageLimit}` : ""}</td>
                  <td className="px-4 py-3 text-[#6B6357]">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString("en-IN") : "—"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(c)} className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.isActive ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                      {c.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <button onClick={() => handleEdit(c)} className="p-1.5 rounded hover:bg-gray-100 text-[#6B6357]"><Edit2 size={13} /></button>
                      <button onClick={() => handleDelete(c._id)} className="p-1.5 rounded hover:bg-red-50 text-red-400"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

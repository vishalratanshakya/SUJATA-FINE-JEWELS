"use client";

import { useState } from "react";
import { useStore, Coupon } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { Plus, Trash2, Edit2, Check, X, Tag, ToggleLeft, ToggleRight, AlertCircle } from "lucide-react";

const EMPTY_FORM = {
  code: "",
  type: "percentage" as "percentage" | "fixed",
  value: "",
  minOrderAmount: "",
  expiryDate: "",
  usageLimit: "",
  active: true,
};

export default function AdminCouponsPage() {
  const coupons = useStore((s) => s.coupons);
  const addCoupon = useStore((s) => s.addCoupon);
  const updateCoupon = useStore((s) => s.updateCoupon);
  const deleteCoupon = useStore((s) => s.deleteCoupon);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const resetForm = () => {
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
    setEditingId(null);
  };

  const validate = () => {
    if (!form.code.trim()) { toast.error("Coupon code is required"); return false; }
    if (!form.value || Number(form.value) <= 0) { toast.error("Discount value must be greater than 0"); return false; }
    if (form.type === "percentage" && Number(form.value) > 100) { toast.error("Percentage cannot exceed 100%"); return false; }
    if (!form.expiryDate) { toast.error("Expiry date is required"); return false; }
    if (!form.usageLimit || Number(form.usageLimit) <= 0) { toast.error("Usage limit must be at least 1"); return false; }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (editingId) {
      updateCoupon(editingId, {
        code: form.code.toUpperCase().trim(),
        type: form.type,
        value: Number(form.value),
        minOrderAmount: Number(form.minOrderAmount) || 0,
        expiryDate: form.expiryDate,
        usageLimit: Number(form.usageLimit),
        active: form.active,
      });
      toast.success("Coupon updated!");
    } else {
      addCoupon({
        code: form.code.toUpperCase().trim(),
        type: form.type,
        value: Number(form.value),
        minOrderAmount: Number(form.minOrderAmount) || 0,
        expiryDate: form.expiryDate,
        usageLimit: Number(form.usageLimit),
        active: form.active,
      });
      toast.success("Coupon created!");
    }
    resetForm();
  };

  const openEdit = (c: Coupon) => {
    setEditingId(c.id);
    setForm({
      code: c.code,
      type: c.type,
      value: String(c.value),
      minOrderAmount: String(c.minOrderAmount),
      expiryDate: c.expiryDate,
      usageLimit: String(c.usageLimit),
      active: c.active,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteCoupon(id);
    toast.success("Coupon deleted");
    setDeleteConfirm(null);
  };

  const isExpired = (dateStr: string) => new Date(dateStr) < new Date();

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">Coupons &amp; Discount Codes</h1>
        {!showForm && (
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center space-x-2 bg-charcoal text-white px-4 py-2 text-sm rounded hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            <span>Add Coupon</span>
          </button>
        )}
      </div>

      {/* ── Create / Edit Form ── */}
      {showForm && (
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              {editingId ? "Edit Coupon" : "New Coupon"}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Coupon Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="e.g. SAVE20"
                className="w-full border border-gray-200 rounded p-2 text-sm font-mono uppercase focus:outline-none focus:border-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Discount Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as "percentage" | "fixed" })}
                className="w-full border border-gray-200 rounded p-2 text-sm bg-white focus:outline-none focus:border-charcoal"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Discount Value <span className="text-red-500">*</span>
                <span className="ml-1 text-gray-400">({form.type === "percentage" ? "%" : "₹"})</span>
              </label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                min="1"
                max={form.type === "percentage" ? "100" : undefined}
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Minimum Order Amount (₹)</label>
              <input
                type="number"
                value={form.minOrderAmount}
                onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })}
                min="0"
                placeholder="0 = no minimum"
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Expiry Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Usage Limit <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.usageLimit}
                onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
                min="1"
                placeholder="e.g. 100"
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <button
                type="button"
                onClick={() => setForm({ ...form, active: !form.active })}
                className={`text-2xl ${form.active ? 'text-green-600' : 'text-gray-300'}`}
              >
                {form.active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
              <span className="text-sm text-gray-700">{form.active ? "Active" : "Inactive"}</span>
            </label>
          </div>

          <div className="flex space-x-3 pt-2 border-t border-gray-100">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-5 py-2 bg-charcoal text-white text-sm rounded hover:bg-gray-800 transition-colors"
            >
              <Check size={14} />
              <span>{editingId ? "Save Changes" : "Create Coupon"}</span>
            </button>
            <button
              onClick={resetForm}
              className="px-5 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Coupon List ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
          <Tag size={16} className="text-gray-500" />
          <h2 className="text-base font-medium text-gray-800">
            All Coupons <span className="text-gray-400 font-normal">({coupons.length})</span>
          </h2>
        </div>

        {coupons.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-2">
            <Tag size={32} className="mx-auto opacity-40" />
            <p className="text-sm">No coupons yet. Create your first one above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-5 py-3">Code</th>
                  <th className="px-5 py-3">Discount</th>
                  <th className="px-5 py-3">Min. Order</th>
                  <th className="px-5 py-3">Usage</th>
                  <th className="px-5 py-3">Expiry</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-mono font-semibold text-gray-900">{c.code}</td>
                    <td className="px-5 py-4 text-gray-700">
                      {c.type === "percentage" ? `${c.value}% off` : `₹${c.value.toLocaleString()} off`}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {c.minOrderAmount > 0 ? `₹${c.minOrderAmount.toLocaleString()}` : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {c.usageCount} / {c.usageLimit}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center space-x-1 ${isExpired(c.expiryDate) ? 'text-red-500' : 'text-gray-500'}`}>
                        {isExpired(c.expiryDate) && <AlertCircle size={12} />}
                        <span>{c.expiryDate}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => updateCoupon(c.id, { active: !c.active })}
                        className={`flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full ${
                          c.active && !isExpired(c.expiryDate)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {c.active && !isExpired(c.expiryDate)
                          ? <><ToggleRight size={12} /><span>Active</span></>
                          : isExpired(c.expiryDate)
                          ? <><AlertCircle size={12} /><span>Expired</span></>
                          : <><ToggleLeft size={12} /><span>Inactive</span></>
                        }
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 size={15} />
                      </button>
                      {deleteConfirm === c.id ? (
                        <span className="inline-flex items-center space-x-1">
                          <button onClick={() => handleDelete(c.id)} className="text-xs text-red-600 font-medium hover:underline">Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-400 hover:underline">Cancel</button>
                        </span>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(c.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

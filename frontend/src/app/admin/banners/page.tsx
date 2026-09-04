"use client";

import { useState, useRef } from "react";
import { useStore, HeroBanner } from "@/store/useStore";
import { toast } from "react-hot-toast";
import {
  Upload, ArrowUp, ArrowDown, Eye, EyeOff,
  Edit2, Check, X, Image as ImageIcon, Megaphone,
  ExternalLink, ToggleLeft, ToggleRight,
} from "lucide-react";

export default function AdminBannersPage() {
  const heroBanners = useStore((s) => s.heroBanners);
  const updateHeroBanner = useStore((s) => s.updateHeroBanner);
  const reorderHeroBanners = useStore((s) => s.reorderHeroBanners);
  const announcementBar = useStore((s) => s.announcementBar);
  const updateAnnouncementBar = useStore((s) => s.updateAnnouncementBar);

  // ── Editing state ──
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<HeroBanner>>({});

  // ── Image upload ──
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  // ── Announcement bar editing ──
  const [editingAnn, setEditingAnn] = useState(false);
  const [annForm, setAnnForm] = useState(announcementBar);

  const openEdit = (banner: HeroBanner) => {
    setEditingId(banner.id);
    setEditForm({ ...banner });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editingId) return;
    if (!editForm.heading?.trim()) { toast.error("Heading is required"); return; }
    updateHeroBanner(editingId, editForm);
    toast.success("Banner updated!");
    cancelEdit();
  };

  const handleImageUpload = (bannerId: number) => {
    setUploadingId(bannerId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingId) return;
    const objectUrl = URL.createObjectURL(file);
    updateHeroBanner(uploadingId, { image: objectUrl });
    toast.success("Banner image updated!");
    setUploadingId(null);
    e.target.value = "";
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newBanners = [...heroBanners];
    [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
    reorderHeroBanners(newBanners);
  };

  const moveDown = (index: number) => {
    if (index === heroBanners.length - 1) return;
    const newBanners = [...heroBanners];
    [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
    reorderHeroBanners(newBanners);
  };

  const toggleActive = (banner: HeroBanner) => {
    updateHeroBanner(banner.id, { active: !banner.active });
    toast.success(banner.active ? "Banner hidden" : "Banner shown");
  };

  const saveAnnouncement = () => {
    updateAnnouncementBar(annForm);
    toast.success("Announcement bar updated!");
    setEditingAnn(false);
  };

  return (
    <div className="max-w-5xl space-y-10">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">Banners & Announcements</h1>
      </div>

      {/* ── Announcement Bar ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Megaphone size={18} className="text-gray-500" />
            <h2 className="text-lg font-medium text-gray-800">Announcement Bar</h2>
            <span className="text-xs text-gray-400">(shown above the navbar)</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateAnnouncementBar({ active: !announcementBar.active })}
              className={`flex items-center space-x-1 text-sm ${announcementBar.active ? "text-green-600" : "text-gray-400"}`}
            >
              {announcementBar.active
                ? <><ToggleRight size={20} /><span>Live</span></>
                : <><ToggleLeft size={20} /><span>Off</span></>}
            </button>
            {!editingAnn && (
              <button
                onClick={() => { setAnnForm(announcementBar); setEditingAnn(true); }}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-200 rounded hover:border-charcoal transition-colors"
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Preview */}
        {announcementBar.active && !editingAnn && (
          <div
            className="rounded py-2 px-4 text-sm text-center"
            style={{ backgroundColor: announcementBar.bgColor, color: announcementBar.textColor }}
          >
            {announcementBar.message}
            {announcementBar.linkText && (
              <span className="ml-2 underline">{announcementBar.linkText}</span>
            )}
          </div>
        )}

        {/* Edit Form */}
        {editingAnn && (
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Message</label>
              <input
                type="text"
                value={annForm.message}
                onChange={(e) => setAnnForm({ ...annForm, message: e.target.value })}
                className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Link Text</label>
                <input
                  type="text"
                  value={annForm.linkText}
                  onChange={(e) => setAnnForm({ ...annForm, linkText: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Link URL</label>
                <input
                  type="text"
                  value={annForm.linkUrl}
                  onChange={(e) => setAnnForm({ ...annForm, linkUrl: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={annForm.bgColor}
                    onChange={(e) => setAnnForm({ ...annForm, bgColor: e.target.value })}
                    className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={annForm.bgColor}
                    onChange={(e) => setAnnForm({ ...annForm, bgColor: e.target.value })}
                    className="flex-1 border border-gray-200 rounded p-2 text-sm font-mono focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Text Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={annForm.textColor}
                    onChange={(e) => setAnnForm({ ...annForm, textColor: e.target.value })}
                    className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={annForm.textColor}
                    onChange={(e) => setAnnForm({ ...annForm, textColor: e.target.value })}
                    className="flex-1 border border-gray-200 rounded p-2 text-sm font-mono focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>
            </div>
            {/* Preview */}
            <div
              className="rounded py-2 px-4 text-sm text-center"
              style={{ backgroundColor: annForm.bgColor, color: annForm.textColor }}
            >
              {annForm.message}
              {annForm.linkText && <span className="ml-2 underline">{annForm.linkText}</span>}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={saveAnnouncement}
                className="flex items-center space-x-1 px-4 py-2 bg-charcoal text-white text-sm rounded hover:bg-gray-800 transition-colors"
              >
                <Check size={14} /><span>Save</span>
              </button>
              <button
                onClick={() => setEditingAnn(false)}
                className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={14} /><span>Cancel</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Hero Banners ── */}
      <div className="bg-white rounded shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ImageIcon size={18} className="text-gray-500" />
            <h2 className="text-lg font-medium text-gray-800">Hero Banners</h2>
            <span className="text-xs text-gray-400">({heroBanners.filter(b => b.active).length} of {heroBanners.length} active)</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs text-blue-600 hover:underline"
          >
            <ExternalLink size={12} /><span>View Storefront</span>
          </a>
        </div>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

        <div className="divide-y divide-gray-100">
          {heroBanners.map((banner, index) => (
            <div key={banner.id} className={`p-6 ${!banner.active ? 'opacity-50' : ''}`}>
              {editingId === banner.id ? (
                /* ── Edit Mode ── */
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-gray-700">Slide {index + 1}</span>
                    <div className="flex space-x-2">
                      <button onClick={saveEdit} className="flex items-center space-x-1 px-3 py-1.5 bg-charcoal text-white text-xs rounded hover:bg-gray-800">
                        <Check size={12} /><span>Save</span>
                      </button>
                      <button onClick={cancelEdit} className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 text-xs rounded hover:border-gray-400">
                        <X size={12} /><span>Cancel</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Eyebrow Text</label>
                      <input
                        type="text"
                        value={editForm.eyebrow ?? ''}
                        onChange={(e) => setEditForm({ ...editForm, eyebrow: e.target.value })}
                        className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Heading <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={editForm.heading ?? ''}
                        onChange={(e) => setEditForm({ ...editForm, heading: e.target.value })}
                        className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-600 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={editForm.description ?? ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={editForm.cta ?? ''}
                        onChange={(e) => setEditForm({ ...editForm, cta: e.target.value })}
                        className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">CTA URL</label>
                      <input
                        type="text"
                        value={editForm.ctaUrl ?? ''}
                        onChange={(e) => setEditForm({ ...editForm, ctaUrl: e.target.value })}
                        className="w-full border border-gray-200 rounded p-2 text-sm font-mono focus:outline-none focus:border-charcoal"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* ── View Mode ── */
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-full md:w-36 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={banner.image} alt={banner.heading} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleImageUpload(banner.id)}
                      className="absolute inset-0 bg-black/0 hover:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Upload size={16} className="text-white" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-widest text-champagne uppercase mb-1">{banner.eyebrow}</p>
                    <p className="font-medium text-gray-800 truncate">{banner.heading}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{banner.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-600">{banner.ctaUrl}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEdit(banner)}
                      title="Edit banner"
                      className="p-1.5 text-gray-400 hover:text-blue-600 border border-gray-200 rounded hover:border-blue-300 transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => toggleActive(banner)}
                      title={banner.active ? "Hide banner" : "Show banner"}
                      className={`p-1.5 border rounded transition-colors ${banner.active ? 'text-green-600 border-green-200 hover:border-green-400' : 'text-gray-400 border-gray-200 hover:border-gray-400'}`}
                    >
                      {banner.active ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      title="Move up"
                      className="p-1.5 text-gray-400 hover:text-gray-700 border border-gray-200 rounded hover:border-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === heroBanners.length - 1}
                      title="Move down"
                      className="p-1.5 text-gray-400 hover:text-gray-700 border border-gray-200 rounded hover:border-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  {/* Slide Number */}
                  <div className="hidden md:flex flex-col items-center justify-center w-8 text-xs text-gray-400 font-medium">
                    <span>{index + 1}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

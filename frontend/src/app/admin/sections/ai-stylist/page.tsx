"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Sparkles, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStore, AiStylistItem } from "@/store/useStore";

export default function AdminAiStylistPage() {
  const aiItems = useStore((s) => s.aiStylistItems);
  const addAiStylist = useStore((s) => s.addAiStylist);
  const updateAiStylist = useStore((s) => s.updateAiStylist);
  const deleteAiStylist = useStore((s) => s.deleteAiStylist);

  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<AiStylistItem | null>(null);

  const [formState, setFormState] = useState({
    heading: "FIND YOUR PERFECT PIECE",
    description: "Let our AI stylist understand your personal style and preferences to recommend handcrafted fine jewellery tailored for you.",
    buttonText: "Get Personalised Recommendations",
    quizUrl: "/quiz",
    active: true
  });

  const handleOpenCreate = () => {
    setFormState({
      heading: "FIND YOUR PERFECT PIECE",
      description: "Let our AI stylist understand your style preferences.",
      buttonText: "Get Recommendations",
      quizUrl: "/quiz",
      active: true
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const handleOpenEdit = (item: AiStylistItem) => {
    setFormState({
      heading: item.heading || "",
      description: item.description,
      buttonText: item.buttonText || "",
      quizUrl: item.quizUrl || "",
      active: item.active
    });
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addAiStylist({ ...formState });
      toast.success("AI Stylist callout section created!");
    } else if (editingItem) {
      updateAiStylist(editingItem.id, { ...formState });
      toast.success("AI Stylist callout section updated!");
    }
    setIsCreating(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    deleteAiStylist(id);
    toast.success("AI Stylist callout deleted.");
  };

  const handleToggleActive = (item: AiStylistItem) => {
    updateAiStylist(item.id, { active: !item.active });
    toast.success(item.active ? "AI Stylist section hidden" : "AI Stylist section activated on homepage");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <Sparkles className="text-purple-600" size={24} />
            <span>AI Stylist Section Manager</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage AI recommendation banners, quiz prompts, and call-to-action buttons</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create AI Stylist Banner</span>
        </button>
      </div>

      {/* Main List & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table / List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Created Banners ({aiItems.length})</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {aiItems.length === 0 ? (
              <div className="p-12 text-center text-gray-400 space-y-3">
                <Sparkles size={36} className="mx-auto text-gray-300" />
                <p className="text-sm font-medium text-gray-600">No AI Stylist Banners created yet.</p>
                <p className="text-xs text-gray-400">Click "+ Create AI Stylist Banner" above to publish your first banner.</p>
              </div>
            ) : (
              aiItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900 text-sm">{item.heading}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                    <span className="text-[11px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono">CTA: {item.buttonText}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                        item.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {item.active ? <Eye size={13} /> : <EyeOff size={13} />}
                      <span>{item.active ? "Active" : "Inactive"}</span>
                    </button>
                    <button onClick={() => handleOpenEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-600">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Preview Card */}
        <div>
          <div className="bg-purple-950 text-white p-6 rounded-lg shadow-sm border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between text-xs text-purple-300 uppercase tracking-widest font-semibold">
              <span className="flex items-center space-x-1">
                <Sparkles size={14} className="text-purple-400" />
                <span>Live Preview Card</span>
              </span>
            </div>

            {aiItems.filter(i => i.active).length === 0 ? (
              <div className="p-8 text-center text-purple-200/40 text-xs italic border border-dashed border-white/10 rounded">
                Section hidden on homepage (No active AI banners).
              </div>
            ) : (
              (() => {
                const activeItem = aiItems.find(i => i.active) || aiItems[0];
                return (
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg text-white font-medium">{activeItem.heading}</h3>
                    <p className="text-xs text-purple-100/80 leading-relaxed">{activeItem.description}</p>
                    <button className="w-full py-2.5 bg-champagne text-charcoal font-medium text-xs rounded hover:bg-amber-200 transition-colors">
                      {activeItem.buttonText} &rarr;
                    </button>
                  </div>
                );
              })()
            )}
          </div>
        </div>

      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingItem) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingItem(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <form 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave} 
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-6 cursor-default"
          >
            <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
              {isCreating ? "Create AI Stylist Banner" : "Edit AI Stylist Banner"}
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Heading</label>
                <input
                  type="text"
                  required
                  value={formState.heading}
                  onChange={(e) => setFormState({ ...formState, heading: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Description Paragraph</label>
                <textarea
                  rows={3}
                  required
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    required
                    value={formState.buttonText}
                    onChange={(e) => setFormState({ ...formState, buttonText: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Quiz Target URL</label>
                  <input
                    type="text"
                    value={formState.quizUrl}
                    onChange={(e) => setFormState({ ...formState, quizUrl: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2.5 text-sm font-mono focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2.5 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formState.active}
                  onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4"
                />
                <span className="font-medium text-gray-800">Active on Homepage</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingItem(null); }}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                Save AI Stylist Banner
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

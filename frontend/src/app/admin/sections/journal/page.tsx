"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, BookOpen, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStore, JournalArticleItem } from "@/store/useStore";

export default function AdminJournalSectionPage() {
  const articles = useStore((s) => s.journalArticles);
  const addJournalArticle = useStore((s) => s.addJournalArticle);
  const updateJournalArticle = useStore((s) => s.updateJournalArticle);
  const deleteJournalArticle = useStore((s) => s.deleteJournalArticle);

  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<JournalArticleItem | null>(null);

  const [formState, setFormState] = useState({
    title: "",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: "4 min read",
    excerpt: "",
    image: "/images/products/necklaces/necklace_placeholder.jpg",
    linkUrl: "/journal/article",
    active: true
  });

  const handleOpenCreate = () => {
    setFormState({
      title: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "4 min read",
      excerpt: "",
      image: "/images/products/necklaces/necklace_placeholder.jpg",
      linkUrl: "/journal/article",
      active: true
    });
    setIsCreating(true);
    setEditingArticle(null);
  };

  const handleOpenEdit = (article: JournalArticleItem) => {
    setFormState({
      title: article.title,
      date: article.date,
      readTime: article.readTime,
      excerpt: article.excerpt,
      image: article.image,
      linkUrl: article.linkUrl || "",
      active: article.active
    });
    setEditingArticle(article);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) {
      toast.error("Please enter an article title");
      return;
    }

    if (isCreating) {
      addJournalArticle({ ...formState });
      toast.success("Journal article created!");
    } else if (editingArticle) {
      updateJournalArticle(editingArticle.id, { ...formState });
      toast.success("Journal article updated!");
    }
    setIsCreating(false);
    setEditingArticle(null);
  };

  const handleDelete = (id: string) => {
    deleteJournalArticle(id);
    toast.success("Journal article deleted.");
  };

  const handleToggleActive = (article: JournalArticleItem) => {
    updateJournalArticle(article.id, { active: !article.active });
    toast.success(article.active ? "Article hidden" : "Article published on homepage");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <BookOpen className="text-emerald-600" size={24} />
            <span>From the Journal (Editorial Articles) Manager</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Publish luxury journal articles, trend guides, and diamond care tips</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Article</span>
        </button>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center text-gray-400 space-y-3 rounded-lg border border-gray-100">
            <BookOpen size={36} className="mx-auto text-gray-300" />
            <p className="text-sm font-medium text-gray-600">No Journal Articles published yet.</p>
            <p className="text-xs text-gray-400">Click "+ Create Article" above to publish your first editorial card.</p>
          </div>
        ) : (
          articles.map((art) => (
            <div key={art.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-44 bg-gray-100 relative overflow-hidden">
                  <Image src={art.image} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center space-x-2 text-[11px] text-gray-400 font-mono">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-serif text-base text-gray-900 font-medium line-clamp-2">{art.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{art.excerpt}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(art)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition-colors ${
                    art.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {art.active ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span>{art.active ? "Active" : "Inactive"}</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleOpenEdit(art)} className="p-1.5 text-gray-400 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(art.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingArticle) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingArticle(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <form 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave} 
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-6 cursor-default"
          >
            <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
              {isCreating ? "Create Editorial Article" : "Edit Article"}
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Understanding Gold Purity: 14K vs 18K vs 24K"
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={formState.readTime}
                    onChange={(e) => setFormState({ ...formState, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Excerpt Summary</label>
                <textarea
                  rows={3}
                  value={formState.excerpt}
                  onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })}
                  placeholder="Brief summary snippet..."
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <label className="flex items-center space-x-2.5 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formState.active}
                  onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4"
                />
                <span className="font-medium text-gray-800">Publish Article on Homepage</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingArticle(null); }}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                Save Article
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

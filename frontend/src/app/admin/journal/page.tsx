"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Eye, BookOpen, CheckCircle, Clock } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminJournalPage() {
  const [articles, setArticles] = useState([
    { id: "1", title: "The Art of Choosing Solitaire Engagement Rings", category: "Guide", author: "Sujata Team", date: "2026-08-15", published: true },
    { id: "2", title: "Caring for 18K Gold & Unheated Sapphires", category: "Care Guide", author: "Jewel Master", date: "2026-08-01", published: true },
    { id: "3", title: "Bridal Jewellery Trends for Autumn 2026", category: "Trends", author: "Fashion Desk", date: "2026-07-20", published: false },
  ]);

  const togglePublish = (id: string) => {
    setArticles(articles.map(a => a.id === id ? { ...a, published: !a.published } : a));
    toast.success("Publication status updated!");
  };

  const handleDelete = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
    toast.success("Journal article deleted");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">From the Journal</h1>
          <p className="text-sm text-gray-500 mt-1">Manage editorial stories, jewellery buying guides, and brand updates</p>
        </div>
        <Link 
          href="/admin/journal/create"
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Article</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3.5">Article Title</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Author</th>
              <th className="px-6 py-3.5">Published Date</th>
              <th className="px-6 py-3.5 text-center">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{article.title}</td>
                <td className="px-6 py-4 text-xs text-gray-600 font-medium">{article.category}</td>
                <td className="px-6 py-4 text-xs text-gray-500">{article.author}</td>
                <td className="px-6 py-4 text-xs text-gray-500">{article.date}</td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => togglePublish(article.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                      article.published ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/admin/journal/${article.id}/edit`} className="p-1.5 text-gray-400 hover:text-charcoal inline-flex">
                    <Edit2 size={16} />
                  </Link>
                  <button onClick={() => handleDelete(article.id)} className="p-1.5 text-gray-400 hover:text-rose-600 inline-flex">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

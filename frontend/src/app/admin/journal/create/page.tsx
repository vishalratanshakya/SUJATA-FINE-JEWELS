"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "react-hot-toast";

import { ImageUpload } from "@/components/admin/ImageUpload";

export default function CreateJournalPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Guide");
  const [author, setAuthor] = useState("Sujata Editorial");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please fill in required fields");
      return;
    }

    toast.success(`Article "${title}" created successfully!`);
    router.push("/admin/journal");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <Link href="/admin/journal" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2 mb-2">
          <ArrowLeft size={16} />
          <span>Back to Journal Articles</span>
        </Link>
        <h1 className="text-2xl font-serif text-gray-900">Create Journal Story</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Story Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unveiling the Rare Pink Diamond Collection"
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal bg-white"
              >
                <option value="Guide">Jewellery Guide</option>
                <option value="Care Guide">Care Guidelines</option>
                <option value="Trends">Fashion Trends</option>
                <option value="Behind the Scenes">Behind the Craft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Author Name</label>
              <input 
                type="text" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
              />
            </div>
          </div>

          <ImageUpload
            label="Cover Image"
            value={image}
            onChange={(url) => setImage(url)}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Short Summary / Excerpt</label>
            <textarea 
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Article Body *</label>
            <textarea 
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write story content..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal font-sans text-xs leading-relaxed"
              required
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
          <Link href="/admin/journal" className="px-5 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900">
            Cancel
          </Link>
          <button type="submit" className="bg-charcoal text-white text-xs font-medium px-6 py-2.5 rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2">
            <Save size={16} />
            <span>Publish Article</span>
          </button>
        </div>
      </form>
    </div>
  );
}

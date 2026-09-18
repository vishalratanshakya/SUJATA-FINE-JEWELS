"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "react-hot-toast";

import { ImageUpload } from "@/components/admin/ImageUpload";

export default function EditJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const articleId = resolvedParams.id;
  const router = useRouter();

  const [title, setTitle] = useState("The Art of Choosing Solitaire Engagement Rings");
  const [category, setCategory] = useState("Guide");
  const [author, setAuthor] = useState("Sujata Editorial");
  const [image, setImage] = useState("/images/journal/solitaire-guide.jpg");
  const [content, setContent] = useState("Detailed story body content...");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Journal article updated successfully!");
    router.push("/admin/journal");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <Link href="/admin/journal" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2 mb-2">
          <ArrowLeft size={16} />
          <span>Back to Journal Articles</span>
        </Link>
        <h1 className="text-2xl font-serif text-gray-900">Edit Journal Story</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Story Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
              required
            />
          </div>

          <ImageUpload
            label="Cover Image"
            value={image}
            onChange={(url) => setImage(url)}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Article Body</label>
            <textarea 
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal text-xs"
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
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

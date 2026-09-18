"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStore } from "@/store/useStore";

import { ImageUpload } from "@/components/admin/ImageUpload";

export default function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const collectionId = resolvedParams.id;
  const router = useRouter();

  const collections = useStore((s) => s.collections);
  const updateCollection = useStore((s) => s.updateCollection);

  const collection = collections.find((c) => c.id === collectionId);

  const [name, setName] = useState(collection?.name || "");
  const [tagline, setTagline] = useState(collection?.tagline || "");
  const [description, setDescription] = useState(collection?.description || "");
  const [image, setImage] = useState(collection?.image || "");

  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setTagline(collection.tagline || "");
      setDescription(collection.description || "");
      setImage(collection.image || "");
    }
  }, [collection]);

  if (!collection) {
    return (
      <div className="space-y-6">
        <Link href="/admin/collections" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2">
          <ArrowLeft size={16} />
          <span>Back to Collections</span>
        </Link>
        <div className="bg-white p-12 text-center rounded-lg border border-gray-100">
          <h2 className="text-xl font-serif text-gray-900">Collection Not Found</h2>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCollection(collection.id, {
      name,
      tagline,
      description,
      image,
    });

    toast.success(`Collection "${name}" updated successfully!`);
    router.push("/admin/collections");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <Link href="/admin/collections" className="text-xs font-medium text-gray-500 hover:text-charcoal inline-flex items-center space-x-2 mb-2">
          <ArrowLeft size={16} />
          <span>Back to Collections</span>
        </Link>
        <h1 className="text-2xl font-serif text-gray-900">Edit Collection: {collection.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Collection Name *</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Tagline</label>
            <input 
              type="text" 
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Description</label>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <ImageUpload
            label="Collection Hero Image"
            value={image}
            onChange={(url) => setImage(url)}
          />
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
          <Link href="/admin/collections" className="px-5 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900">
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

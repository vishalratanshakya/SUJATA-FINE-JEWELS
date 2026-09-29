"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Camera, Film } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function AdminBehindTheCraftPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingStory, setEditingStory] = useState<any | null>(null);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    displayOrder: 0,
    isActive: true,
    linkedProducts: [] as string[],
  });

  const fetchData = async () => {
    try {
      const [resCol, resProd] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/craft-stories`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`)
      ]);
      const colData = await resCol.json();
      const prodData = await resProd.json();
      
      if (colData.success) setStories(colData.data);
      if (prodData.success) setProducts(prodData.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setFormState({
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      displayOrder: 0,
      isActive: true,
      linkedProducts: [],
    });
    setIsCreating(true);
    setEditingStory(null);
  };

  const handleOpenEdit = (story: any) => {
    setFormState({
      title: story.title,
      description: story.description,
      videoUrl: story.videoUrl,
      thumbnailUrl: story.thumbnailUrl,
      displayOrder: story.displayOrder || 0,
      isActive: story.isActive !== undefined ? story.isActive : true,
      linkedProducts: story.linkedProducts || [],
    });
    setEditingStory(story);
    setIsCreating(false);
  };

  const handleProductToggle = (productId: string) => {
    setFormState((prev) => {
      const exists = prev.linkedProducts.includes(productId);
      return {
        ...prev,
        linkedProducts: exists ? prev.linkedProducts.filter(id => id !== productId) : [...prev.linkedProducts, productId]
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.videoUrl.trim() || !formState.thumbnailUrl) {
      toast.error("Please fill all required fields (Title, Video URL, Thumbnail)");
      return;
    }

    try {
      const method = editingStory ? "PUT" : "POST";
      const url = editingStory 
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/craft-stories/${editingStory._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/craft-stories`;

      const token = localStorage.getItem("token");
      
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(formState)
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success(`Story ${editingStory ? "updated" : "created"}!`);
        setIsCreating(false);
        setEditingStory(null);
        fetchData();
      } else {
        toast.error(data.error || "Failed to save story");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/craft-stories/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Story deleted.");
        fetchData();
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <Film className="text-indigo-600" size={24} />
            <span>Behind the Craft</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage videos and stories highlighting the jewelry making process</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Story</span>
        </button>
      </div>

      {/* List of Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center text-gray-400 space-y-3 rounded-lg border border-gray-100">
            <Film size={36} className="mx-auto text-gray-300" />
            <p className="text-sm font-medium text-gray-600">No Craft Stories created yet.</p>
          </div>
        ) : (
          stories.map((story) => (
            <div key={story._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  <Image src={story.thumbnailUrl} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/40">
                      <Film size={20} className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded ${story.isActive ? "bg-emerald-500/80 text-white" : "bg-gray-500/80 text-white"} backdrop-blur-md`}>
                      {story.isActive ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg text-gray-900 font-medium">{story.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{story.description}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1 pt-2 border-t border-gray-100 truncate">
                    {story.videoUrl}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end space-x-2">
                <button onClick={() => handleOpenEdit(story)} className="p-1.5 text-gray-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(story._id, story.title)} className="p-1.5 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingStory) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingStory(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer overflow-y-auto"
        >
          <div className="my-8 flex items-center justify-center min-h-screen">
            <form 
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSave} 
              className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl space-y-6 cursor-default"
            >
              <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
                {isCreating ? "Create Craft Story" : `Edit "${editingStory?.title}"`}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      placeholder="e.g. Masterful Polki Setting"
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Video URL (MP4, YouTube, Vimeo) *</label>
                    <input
                      type="text"
                      required
                      value={formState.videoUrl}
                      onChange={(e) => setFormState({ ...formState, videoUrl: e.target.value })}
                      placeholder="e.g. https://www.youtube.com/watch?v=..."
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formState.isActive}
                        onChange={(e) => setFormState({...formState, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-charcoal focus:ring-charcoal" 
                      />
                      <span className="font-medium text-gray-800">Published (Visible)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <ImageUpload
                      label="Video Thumbnail *"
                      value={formState.thumbnailUrl}
                      onChange={(url) => setFormState({ ...formState, thumbnailUrl: url })}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Select Featured Products (Optional)</label>
                    <div className="h-40 overflow-y-auto border border-gray-200 rounded p-2 space-y-1 bg-gray-50">
                      {products.map(p => (
                        <label key={p.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
                          <input 
                            type="checkbox"
                            checked={formState.linkedProducts.includes(p.id)}
                            onChange={() => handleProductToggle(p.id)}
                            className="rounded border-gray-300"
                          />
                          <span className="truncate">{p.name} ({p.sku || p.id.slice(0,6)})</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{formState.linkedProducts.length} selected</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingStory(null); }}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                  Save Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

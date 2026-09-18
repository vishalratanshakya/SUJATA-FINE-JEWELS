"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Camera, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStore, CommunityPostItem } from "@/store/useStore";

export default function AdminCommunitySectionPage() {
  const posts = useStore((s) => s.communityPosts);
  const products = useStore((s) => s.products);
  const addCommunityPost = useStore((s) => s.addCommunityPost);
  const updateCommunityPost = useStore((s) => s.updateCommunityPost);
  const deleteCommunityPost = useStore((s) => s.deleteCommunityPost);

  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<CommunityPostItem | null>(null);

  const [formState, setFormState] = useState({
    handle: "@priya_sharma",
    caption: "Shining bright with my custom Sujata Fine Jewels bridal ring! ✨",
    image: "/images/products/rings/ring_placeholder.jpg",
    productTagged: products[0]?.name || "Solitaire Diamond Ring",
    active: true
  });

  const handleOpenCreate = () => {
    setFormState({
      handle: "@customer_handle",
      caption: "Loved wearing this piece!",
      image: "/images/products/rings/ring_placeholder.jpg",
      productTagged: products[0]?.name || "Solitaire Ring",
      active: true
    });
    setIsCreating(true);
    setEditingPost(null);
  };

  const handleOpenEdit = (post: CommunityPostItem) => {
    setFormState({
      handle: post.handle,
      caption: post.caption,
      image: post.image,
      productTagged: post.productTagged || "",
      active: post.active
    });
    setEditingPost(post);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addCommunityPost({ ...formState });
      toast.success("Community post created!");
    } else if (editingPost) {
      updateCommunityPost(editingPost.id, { ...formState });
      toast.success("Community post updated!");
    }
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleDelete = (id: string) => {
    deleteCommunityPost(id);
    toast.success("Community post deleted.");
  };

  const handleToggleActive = (post: CommunityPostItem) => {
    updateCommunityPost(post.id, { active: !post.active });
    toast.success(post.active ? "Post hidden" : "Post published on community feed");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <Camera className="text-pink-600" size={24} />
            <span>Worn by Our Community Manager</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Curate real customer photos and social media showcases (@sujatafinejewels)</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Social Post</span>
        </button>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {posts.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center text-gray-400 space-y-3 rounded-lg border border-gray-100">
            <Camera size={36} className="mx-auto text-gray-300" />
            <p className="text-sm font-medium text-gray-600">No Community Posts added yet.</p>
            <p className="text-xs text-gray-400">Click "+ Add Social Post" above to add your first customer social photo.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <Image src={post.image} alt={post.handle} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 space-y-1 text-xs">
                  <p className="font-bold text-amber-800 truncate">{post.handle}</p>
                  <p className="text-[11px] text-gray-500 line-clamp-2">{post.caption}</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(post)}
                  className={`p-1 rounded text-xs font-semibold ${
                    post.active ? "text-emerald-700" : "text-gray-400"
                  }`}
                  title={post.active ? "Hide from homepage" : "Show on homepage"}
                >
                  {post.active ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <div className="flex items-center space-x-1">
                  <button onClick={() => handleOpenEdit(post)} className="p-1 text-gray-400 hover:text-blue-600">
                    <Edit size={14} />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingPost) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingPost(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <form 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave} 
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-6 cursor-default"
          >
            <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
              {isCreating ? "Add Social Post" : "Edit Social Post"}
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Customer Instagram Handle</label>
                <input
                  type="text"
                  required
                  value={formState.handle}
                  onChange={(e) => setFormState({ ...formState, handle: e.target.value })}
                  placeholder="e.g. @ananya_v"
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Photo Image URL</label>
                <input
                  type="text"
                  required
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Caption / Quote</label>
                <textarea
                  rows={2}
                  value={formState.caption}
                  onChange={(e) => setFormState({ ...formState, caption: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Product Tagged</label>
                <input
                  type="text"
                  value={formState.productTagged}
                  onChange={(e) => setFormState({ ...formState, productTagged: e.target.value })}
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
                <span className="font-medium text-gray-800">Publish on Social Gallery</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingPost(null); }}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                Save Social Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

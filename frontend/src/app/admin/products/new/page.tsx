import { Upload, Box, Video } from "lucide-react";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-gray-800">Add New Product</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
          <button className="bg-charcoal text-white px-6 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
            Save Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-medium text-gray-800">Basic Details</h2>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Product Name</label>
              <input type="text" className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:border-charcoal" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Description</label>
              <textarea rows={4} className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:border-charcoal" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Price (₹)</label>
                <input type="number" className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:border-charcoal" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">SKU</label>
                <input type="text" className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:border-charcoal" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-medium text-gray-800">Media & Assets</h2>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Images</label>
              <div className="text-xs text-gray-500 mb-3 space-y-1">
                <p><strong>Image 1</strong> &rarr; Default product image (Primary View)</p>
                <p><strong>Image 2</strong> &rarr; Desktop hover image (Secondary View)</p>
                <p>Images 3+ remain available for the product detail gallery.</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:border-charcoal transition-colors cursor-pointer bg-gray-50">
                <Upload size={24} className="mb-2" />
                <span className="text-sm">Click to upload or drag and drop</span>
                <span className="text-xs mt-1">High resolution PNG, JPG up to 10MB</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2 flex items-center space-x-2">
                  <Box size={16} /> <span>3D Model (.gltf / .glb)</span>
                </label>
                <div className="border border-gray-200 rounded p-4 flex flex-col items-center justify-center text-gray-500 hover:border-charcoal transition-colors cursor-pointer bg-gray-50">
                  <span className="text-sm">Upload 3D Asset</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2 flex items-center space-x-2">
                  <Video size={16} /> <span>'See It Worn' Video (.mp4)</span>
                </label>
                <div className="border border-gray-200 rounded p-4 flex flex-col items-center justify-center text-gray-500 hover:border-charcoal transition-colors cursor-pointer bg-gray-50">
                  <span className="text-sm">Upload Video</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-medium text-gray-800">Display Options</h2>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4" />
              <span className="text-sm font-medium text-gray-800">Show in 3D Perspective Carousel (Homepage)</span>
            </label>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Category</label>
              <select className="w-full border border-gray-200 rounded p-2 focus:outline-none focus:border-charcoal">
                <option>Rings</option>
                <option>Necklaces</option>
                <option>Earrings</option>
                <option>Bracelets</option>
                <option>Bangles</option>
                <option>Pendants</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Metal Options</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Yellow Gold</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>Rose Gold</span></label>
                <label className="flex items-center space-x-2"><input type="checkbox" /> <span>White Gold</span></label>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

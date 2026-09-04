import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductCard } from "@/components/product/ProductCard";
import { FEATURED_PRODUCTS } from "@/data/mockData";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Basic title formatting
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

  return (
    <div className="bg-ivory pt-24 pb-20 min-h-screen">
      
      {/* Category Banner / Header */}
      <div className="text-center py-16 px-4 border-b border-charcoal/5 mb-8 bg-pearl">
        <span className="text-[10px] tracking-[0.3em] uppercase text-charcoal/50 mb-4 block">Collection</span>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 uppercase">{formattedCategory}</h1>
        <p className="text-sm text-charcoal/60 max-w-lg mx-auto">
          Discover our curated selection of {formattedCategory.toLowerCase()}, crafted to elevate your everyday elegance.
        </p>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-charcoal/5">
              <span className="text-xs tracking-widest text-charcoal/50 uppercase">Showing Results</span>
              <div className="flex items-center space-x-4">
                <button className="lg:hidden text-xs tracking-widest text-charcoal uppercase underline underline-offset-4">Filters</button>
                <select className="bg-transparent text-xs tracking-widest uppercase text-charcoal border-none focus:ring-0 outline-none cursor-pointer">
                  <option>Sort By: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...FEATURED_PRODUCTS].map((product, i) => (
                <ProductCard key={`${product.id}-${i}`} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

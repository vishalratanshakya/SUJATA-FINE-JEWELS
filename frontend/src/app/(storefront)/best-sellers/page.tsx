import { FEATURED_PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/components/product/ProductCard";

export default function BestSellersPage() {
  // Sort by rating or just reverse the array for mockup
  const bestSellers = [...FEATURED_PRODUCTS].reverse();

  return (
    <div className="bg-ivory pt-32 pb-20 min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 text-center">BEST SELLERS</h1>
        <p className="text-center text-charcoal/60 mb-12 uppercase tracking-widest text-xs">Our most beloved pieces</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

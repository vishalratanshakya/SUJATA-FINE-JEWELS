import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/data/navigation";
import { FEATURED_PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { notFound } from "next/navigation";

export default async function CollectionPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug || "";
  
  const collection = COLLECTIONS?.find(c => c.slug === slug);
  
  if (!collection) {
    // If not in mock data, just show a generic page for now to prevent 404s
    return (
      <div className="bg-ivory pt-32 pb-20 min-h-screen">
        <div className="text-center py-12 px-4 border-b border-charcoal/5 mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 capitalize">{slug.replace(/-/g, ' ')} Collection</h1>
          <p className="text-sm text-charcoal/60 max-w-lg mx-auto">
            Explore the exclusive pieces from our {slug.replace(/-/g, ' ')} collection.
          </p>
        </div>
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_PRODUCTS.slice(0, 4).map((product, i) => (
              <ProductCard key={`${product.id}-${i}`} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory pt-24 pb-20 min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[40vh] md:h-[60vh] mb-16">
        <Image 
          src={collection.image || '/images/products/rings/ring_placeholder.jpg'} 
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">{collection.name}</h1>
          <p className="text-white/90 max-w-xl mx-auto text-sm md:text-base">
            Discover the breathtaking artistry and timeless elegance of the {collection.name}.
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_PRODUCTS.map((product, i) => (
            <ProductCard key={`${product.id}-${i}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

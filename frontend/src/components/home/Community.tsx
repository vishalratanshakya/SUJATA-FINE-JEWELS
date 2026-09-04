import Image from "next/image";
import Link from "next/link";

const COMMUNITY_IMAGES = [
  "/images/products/rings/ring_placeholder.jpg",
  "/images/products/rings/ring_placeholder.jpg",
  "/images/products/rings/ring_placeholder.jpg",
  "/images/products/rings/ring_placeholder.jpg",
  "/images/products/rings/ring_placeholder.jpg",
];

export function Community() {
  return (
    <section className="py-24 bg-ivory border-t border-charcoal/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif text-2xl md:text-4xl text-charcoal mb-2">
              WORN BY OUR COMMUNITY
            </h2>
            <p className="text-[10px] md:text-xs text-charcoal/50">Tag us @sujatafinejewels to get featured</p>
          </div>
          <Link 
            href="/gallery" 
            className="flex-shrink-0 inline-flex items-center space-x-2 md:space-x-4 border border-charcoal/20 hover:border-charcoal hover:bg-charcoal hover:text-ivory px-4 md:px-8 py-2 md:py-3 transition-all duration-300 text-[10px] md:text-xs font-medium tracking-widest uppercase text-charcoal"
          >
            <span>View Gallery</span>
            <span className="w-6 h-[1px] bg-current inline-block transition-colors" />
          </Link>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 md:mx-0 md:px-0">
          {COMMUNITY_IMAGES.map((src, index) => (
            <div key={index} className="relative aspect-square w-[calc(50vw-24px)] md:w-auto flex-shrink-0 snap-center overflow-hidden group cursor-pointer bg-charcoal/5">
              <Image
                src={src}
                alt="Community image"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

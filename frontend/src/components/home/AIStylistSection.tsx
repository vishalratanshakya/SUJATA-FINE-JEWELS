import Image from "next/image";
import Link from "next/link";

export function AIStylistSection() {
  return (
    <section className="py-24 bg-pearl relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="bg-ivory rounded-2xl p-8 md:p-16 shadow-sm border border-charcoal/5 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative overflow-hidden">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/3 relative z-10 text-center lg:text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              FIND YOUR<br />PERFECT PIECE
            </h2>
            <div className="w-12 h-[1px] bg-champagne mx-auto lg:mx-0 mb-6" />
            <p className="text-sm text-charcoal/70 mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed">
              Let our AI stylist understand your style and preferences to recommend pieces just for you.
            </p>
            <Link 
              href="/ai-stylist"
              className="inline-block bg-charcoal text-ivory px-8 py-4 text-xs tracking-widest uppercase hover:bg-champagne hover:text-white transition-colors"
            >
              Get Recommendations
            </Link>
          </div>

          {/* Right Interface Mockup */}
          <div className="w-full lg:w-2/3 relative z-10">
            <div className="flex flex-col items-center relative z-20 md:pr-48">
              <div className="flex items-center space-x-2 mb-8">
                <span className="text-champagne text-xl">✨</span>
                <h3 className="text-lg font-medium text-charcoal">What are you looking for?</h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 max-w-xl">
                {["Everyday Wear", "Gift for Someone", "Wedding & Engagement", "Luxury Investment", "Personal Style"].map((option) => (
                  <button 
                    key={option}
                    className="px-6 py-3 border border-charcoal/10 rounded-full text-sm text-charcoal hover:border-champagne hover:text-champagne transition-colors bg-white/50 hover:bg-white"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Decorative Ring Image floating right */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 pointer-events-none hidden md:block opacity-80 mix-blend-multiply">
               <Image
                 src="/images/products/rings/ring_placeholder.jpg"
                 alt="Decorative Ring"
                 fill
                 className="object-contain"
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

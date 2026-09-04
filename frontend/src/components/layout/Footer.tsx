import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-ivory/80 pt-20 pb-10 px-4 md:px-8 text-sm">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex flex-col text-white mb-6">
            <span className="font-serif text-3xl md:text-4xl tracking-wider leading-none">SUJATA</span>
            <span className="text-xs md:text-sm tracking-[0.4em] font-light mt-2 text-champagne">FINE JEWELS</span>
          </Link>
          <p className="font-serif italic text-lg text-ivory/60 max-w-sm">
            Timeless Brilliance, Crafted Forever.
          </p>
          
          <div className="flex space-x-5 mt-8">
            <a href="#" className="hover:text-champagne transition-colors"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-champagne transition-colors"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-champagne transition-colors"><FaYoutube size={20} /></a>
            <a href="#" className="hover:text-champagne transition-colors"><FaTwitter size={20} /></a>
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="text-white uppercase tracking-widest text-xs font-semibold mb-6">Shop</h4>
          <ul className="space-y-4">
            {["Rings", "Necklaces", "Earrings", "Bracelets", "Pendants", "Collections"].map((item) => (
              <li key={item}>
                <Link href={`/shop/${item.toLowerCase()}`} className="hover:text-champagne transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-widest text-xs font-semibold mb-6">Customer Care</h4>
          <ul className="space-y-4">
            {["FAQs", "Shipping & Delivery", "Returns & Refunds", "Track Order", "Contact Us", "Care Guide", "Size Guide"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-champagne transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-widest text-xs font-semibold mb-6">Newsletter</h4>
          <p className="mb-4 text-xs leading-relaxed">
            Be the first to know about new collections and exclusive offers.
          </p>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-b border-ivory/30 pb-2 px-1 text-ivory placeholder:text-ivory/50 focus:outline-none focus:border-champagne transition-colors"
            />
            <button type="submit" className="self-start text-xs uppercase tracking-widest text-champagne hover:text-white transition-colors py-2">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-[1920px] mx-auto border-t border-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-ivory/50">
        <p>&copy; {new Date().getFullYear()} SUJATA FINE JEWELS. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy-policy" className="hover:text-ivory transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-ivory transition-colors">Terms & Conditions</Link>
          <Link href="/refund-policy" className="hover:text-ivory transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}

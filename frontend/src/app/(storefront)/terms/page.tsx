import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20 px-4 md:px-8 max-w-[900px] mx-auto space-y-8 text-charcoal">
      <div className="border-b border-charcoal/10 pb-6 space-y-2">
        <h1 className="font-serif text-4xl">Terms &amp; Conditions</h1>
        <p className="text-xs text-charcoal/60 uppercase tracking-widest">Last updated: May 2026</p>
      </div>

      <div className="space-y-6 text-xs text-charcoal/80 leading-relaxed bg-white p-8 rounded-2xl border border-charcoal/10 shadow-xs">
        <section className="space-y-2">
          <h3 className="font-serif text-lg text-charcoal">1. Authenticity &amp; Certification</h3>
          <p>Every piece sold by SUJATA Fine Jewels comes with a unique Certificate of Authenticity specifying gold purity (18K) and diamond quality parameters.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg text-charcoal">2. Delivery &amp; Transit Insurance</h3>
          <p>Orders are shipped through express courier partners with 100% transit insurance until signature confirmation upon receipt.</p>
        </section>
      </div>
    </div>
  );
}

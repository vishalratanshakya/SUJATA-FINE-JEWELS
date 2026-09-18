import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20 px-4 md:px-8 max-w-[900px] mx-auto space-y-8 text-charcoal">
      <div className="border-b border-charcoal/10 pb-6 space-y-2">
        <h1 className="font-serif text-4xl">Privacy Policy</h1>
        <p className="text-xs text-charcoal/60 uppercase tracking-widest">Last updated: May 2026</p>
      </div>

      <div className="space-y-6 text-xs text-charcoal/80 leading-relaxed bg-white p-8 rounded-2xl border border-charcoal/10 shadow-xs">
        <section className="space-y-2">
          <h3 className="font-serif text-lg text-charcoal">1. Information Collection</h3>
          <p>We collect personal information necessary to fulfill orders, issue Certificates of Authenticity, and maintain concierge customer care.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg text-charcoal">2. Data Security &amp; Encryption</h3>
          <p>All sensitive transactions, identity records, and order history are stored using industry-standard SSL encryption and strict data access controls.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg text-charcoal">3. Certificate Verification Data</h3>
          <p>Digital Certificates of Authenticity generated for purchased jewellery are tied strictly to verified user accounts for fraud prevention.</p>
        </section>
      </div>
    </div>
  );
}

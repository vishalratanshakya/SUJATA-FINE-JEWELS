"use client";

import Link from "next/link";
import { HelpCircle, ChevronDown, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are all diamonds and gold in SUJATA Fine Jewels certified?",
      a: "Yes. All our diamonds are 100% natural and certified by leading international gemological institutes (IGI / GIA). All gold pieces feature official BIS Hallmarking.",
    },
    {
      q: "How can I access my Certificate of Authenticity?",
      a: "Log into your account, navigate to My Orders → View Order or My Jewellery, and click 'View Certificate' or 'Download PDF'.",
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer a 15-Day Exchange Policy for unworn jewellery items in original packaging along with certificate documents.",
    },
    {
      q: "Do you provide custom bespoke jewellery design?",
      a: "Yes! You can contact our Concierge team or book a consultation at our flagship boutique to design custom engagement rings, bridal sets, or heirloom pieces.",
    },
    {
      q: "Is shipping insured?",
      a: "Every shipment from SUJATA Fine Jewels is fully insured against damage or loss during transit until delivered into your hands.",
    },
  ];

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20 px-4 md:px-8 max-w-[1000px] mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h1 className="font-serif text-4xl text-charcoal">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="text-xs text-charcoal/60 uppercase tracking-widest">
          Find answers to common questions about our jewellery, certificates, and orders.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-charcoal/10 shadow-xs space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-charcoal/10 pb-4">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between text-left py-2 font-serif text-lg text-charcoal hover:text-champagne transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${openIndex === idx ? "rotate-180 text-champagne" : "text-charcoal/50"}`}
              />
            </button>
            {openIndex === idx && (
              <p className="text-xs text-charcoal/70 leading-relaxed pt-2 pl-1">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center space-y-3 pt-4">
        <p className="text-xs text-charcoal/60">Still have questions?</p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-charcoal hover:bg-champagne text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
        >
          Contact Our Concierge
        </Link>
      </div>
    </div>
  );
}

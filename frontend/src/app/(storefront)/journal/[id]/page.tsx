import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const BLOG_POSTS = [
  {
    id: "post-1",
    title: "The 2024 Guide to Engagement Ring Trends",
    content: "When it comes to engagement rings in 2024, couples are increasingly looking for unique designs that tell their personal story. While the classic solitaire remains a timeless choice, we're seeing a significant rise in vintage-inspired details, hidden halos, and non-traditional stones.\n\nThis year is all about personalization. From intricate milgrain detailing to unexpected diamond shapes like the elongated cushion or radiant cut, the modern engagement ring is as unique as the love story it represents. Rose gold continues to hold strong, offering a romantic warmth that flatters all skin tones, while platinum makes a strong comeback for those seeking ultimate durability and a cool, modern aesthetic.\n\nWhether you're drawn to the bold statement of a three-stone ring or the delicate romance of a nature-inspired setting, the perfect ring is out there waiting for you.",
    date: "Oct 12, 2024",
    image: "/images/products/rings/ring_placeholder.jpg"
  },
  {
    id: "post-2",
    title: "How to Care for Your Diamond Jewelry",
    content: "Diamonds may be the hardest natural substance on earth, but they still require proper care to maintain their signature brilliance. Everyday exposure to lotions, perfumes, and natural skin oils can quickly dull your diamond's sparkle by creating a film over the stone.\n\nTo keep your diamonds looking their best, we recommend a simple weekly cleaning routine. Soak your jewelry in a gentle degreasing solution (like warm water with a few drops of mild dish soap) for 20-40 minutes. Gently brush the stone with a soft, clean toothbrush, paying special attention to the back of the diamond where dirt tends to accumulate. Rinse thoroughly and pat dry with a soft, lint-free cloth.\n\nRemember to schedule professional cleanings and prong checks every six months to ensure your precious stones remain secure and brilliant for generations to come.",
    date: "Sep 28, 2024",
    image: "/images/products/necklaces/necklace_placeholder.jpg"
  },
  {
    id: "post-3",
    title: "Understanding Gold Purity: 14K vs 18K vs 24K",
    content: "When shopping for fine jewelry, one of the most common questions we encounter is about gold purity. Understanding the difference between 14K, 18K, and 24K gold is crucial in selecting a piece that fits your lifestyle and aesthetic preferences.\n\nPure gold, or 24K gold, is incredibly soft and malleable. While its vibrant yellow color is stunning, it's generally too soft for everyday jewelry, as it can easily scratch or bend. To increase durability, gold is alloyed with other metals like copper, silver, or palladium.\n\n18K gold (75% pure gold) offers a rich color and is less likely to trigger metal allergies, making it a popular choice for fine jewelry and engagement rings. 14K gold (58.3% pure gold) provides excellent durability and resistance to wear and tear, making it ideal for pieces you plan to wear every day.",
    date: "Sep 15, 2024",
    image: "/images/products/bracelets/bracelet_placeholder.jpg"
  }
];

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find(p => p.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-ivory pt-32 pb-20 px-4 md:px-8 max-w-[1920px] mx-auto">
      <div className="max-w-3xl mx-auto">
        <Link href="/journal" className="inline-flex items-center space-x-2 text-sm text-charcoal/60 hover:text-champagne transition-colors mb-8">
          <ArrowLeft size={16} />
          <span>Back to Journal</span>
        </Link>
        
        <header className="mb-12">
          <span className="text-sm text-charcoal/50 uppercase tracking-widest block mb-4">{post.date}</span>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-8">
            {post.title}
          </h1>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-pearl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              priority
            />
          </div>
        </header>

        <div className="prose prose-lg prose-charcoal max-w-none font-sans text-charcoal/80 leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

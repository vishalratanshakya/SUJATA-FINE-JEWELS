import Link from "next/link";
import Image from "next/image";

const BLOG_POSTS = [
  {
    id: "post-1",
    title: "The 2024 Guide to Engagement Ring Trends",
    excerpt: "Discover the most sought-after styles for the upcoming year, from vintage-inspired halos to modern minimal solitaires.",
    date: "Oct 12, 2024",
    image: "/images/products/rings/ring_placeholder.jpg"
  },
  {
    id: "post-2",
    title: "How to Care for Your Diamond Jewelry",
    excerpt: "Expert tips on maintaining the brilliance and sparkle of your precious diamonds for generations to come.",
    date: "Sep 28, 2024",
    image: "/images/products/necklaces/necklace_placeholder.jpg"
  },
  {
    id: "post-3",
    title: "Understanding Gold Purity: 14K vs 18K vs 24K",
    excerpt: "A comprehensive guide to help you choose the right gold purity for your lifestyle and preferences.",
    date: "Sep 15, 2024",
    image: "/images/products/bracelets/bracelet_placeholder.jpg"
  }
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20 px-4 md:px-8 max-w-[1920px] mx-auto">
      <div className="text-center py-12 px-4 border-b border-charcoal/5 mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">The Journal</h1>
        <p className="text-sm text-charcoal/60 max-w-lg mx-auto">
          Explore our latest articles, guides, and trends in the world of fine jewelry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <Link href={`/journal/${post.id}`} key={post.id} className="group flex flex-col bg-white rounded-md overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-pearl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs text-charcoal/50 uppercase tracking-widest mb-3">{post.date}</span>
              <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-champagne transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-charcoal/70 mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              <div className="text-xs font-medium text-charcoal uppercase tracking-widest group-hover:text-champagne transition-colors mt-auto">
                Read Article
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

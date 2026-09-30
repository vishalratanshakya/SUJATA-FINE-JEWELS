"use client";

import { use } from "react";
import { ProductListingTemplate } from "@/components/shop/ProductListingTemplate";

export default function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = use(props.params);
  const category = params.category || "";
  
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') : "Catalogue";

  const bannerImage = category.toLowerCase().trim() === 'necklaces' 
      ? '/images/products/necklaces/necklace_placeholder.jpg'
      : category.toLowerCase().trim() === 'earrings'
      ? '/images/products/earrings/earrings_placeholder.jpg'
      : category.toLowerCase().trim() === 'bracelets'
      ? '/images/products/bracelets/bracelet_placeholder.jpg'
      : category.toLowerCase().trim() === 'bangles'
      ? '/images/products/bangles/bangle_placeholder.jpg'
      : category.toLowerCase().trim() === 'pendants'
      ? '/images/products/pendants/pendant_placeholder.jpg'
      : '/images/products/rings/ring_placeholder.jpg';

  return (
    <ProductListingTemplate
      title={formattedCategory}
      description={`Discover our curated selection of ${formattedCategory.toLowerCase()}, crafted to elevate your everyday elegance.`}
      bannerImage={bannerImage}
      categoryFilter={category}
      filterType="all"
    />
  );
}

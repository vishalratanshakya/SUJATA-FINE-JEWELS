"use client";

import { ProductListingTemplate } from "@/components/shop/ProductListingTemplate";

export default function ShopPage() {
  return (
    <ProductListingTemplate
      title="SHOP ALL"
      eyebrow="THE FINEST. FOR FOREVER."
      description="Explore our complete collection of exquisite, handcrafted fine jewellery. Timeless designs crafted for every moment."
      filterType="all"
      bannerImage="/images/products/rings/ring_placeholder.jpg"
    />
  );
}

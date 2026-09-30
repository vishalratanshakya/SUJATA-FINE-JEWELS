export const dynamic = 'force-dynamic';
import { ProductListingTemplate } from "@/components/shop/ProductListingTemplate";
import { getProducts } from "@/lib/getProducts";

export default async function CataloguePage() {
  const initialProducts = await getProducts();

  return (
    <ProductListingTemplate
      title="CATALOGUE"
      eyebrow="THE FINEST. FOR FOREVER."
      description="Explore our complete collection of exquisite, handcrafted fine jewellery. Timeless designs crafted for every moment."
      filterType="all"
      bannerImage="/images/products/rings/ring_placeholder.jpg"
      initialProducts={initialProducts}
    />
  );
}

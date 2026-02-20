import { PRODUCTS } from "@/constants/products";
import CategoryClient from "@/components/CategoryClient";
import LuxuryFooter from "@/components/LuxuryFooter";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Filter products by category slug
  const filteredProducts = PRODUCTS.filter(
    (product) => product.category.toLowerCase() === slug.toLowerCase()
  );

  // Determine if this is the makeup category for Editorial Luxury layout
  const isMakeupCategory = slug.toLowerCase() === 'makeup';

  return (
    <main className={isMakeupCategory ? "bg-[#FAF9F6] min-h-screen" : "bg-white min-h-screen"}>
      <CategoryClient 
        products={filteredProducts} 
        categoryName={slug}
        layoutType={isMakeupCategory ? 'editorial-luxury' : 'default'}
      />
      <LuxuryFooter />
    </main>
  );
}

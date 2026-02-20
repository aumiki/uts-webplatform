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

  return (
    <main className="bg-white min-h-screen">
      <CategoryClient 
        products={filteredProducts} 
        categoryName={slug} 
      />
      <LuxuryFooter />
    </main>
  );
}

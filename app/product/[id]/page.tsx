import Image from "next/image";
import { fetchProductById } from "../../../lib/api";
import AddToCartButton from "../../../components/AddToCartButton";
import FavoriteButton from "../../../components/FavoriteButton";
import LuxuryFooter from "@/components/LuxuryFooter";
import { PRODUCTS } from "@/constants/products";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let product;
  const localProduct = PRODUCTS.find(p => p.id === parseInt(id));

  if (localProduct) {
    // Map local mock data to match the structure expected by the UI
    product = {
      ...localProduct,
      thumbnail: localProduct.image,
      stock: 10,
      category: localProduct.category
    };
  } else {
    try {
      product = await fetchProductById(id);
    } catch (error) {
      return (
        <div className="container mx-auto px-6 py-40 text-center min-h-screen">
          <h1 className="text-4xl font-serif text-luxe-black">Product Not Found</h1>
          <p className="mt-4 text-luxe-black/50">The piece you are looking for is currently unavailable.</p>
        </div>
      );
    }
  }

  return (
    <main className="bg-white">
      <div className="container mx-auto px-6 py-40 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Product Image - Single Image Only */}
          <div className="bg-luxe-cream aspect-square relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name || product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-12">
              <span className="text-luxe-gold uppercase tracking-[0.4em] text-[10px] font-semibold mb-4 block">
                {product.category?.toUpperCase()}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif text-luxe-black mb-6 leading-tight italic">
                {product.title || product.name}
              </h1>
              <p className="text-2xl font-light text-luxe-black tracking-tighter">
                ${product.price}
              </p>
            </div>

            <div className="w-16 h-[1px] bg-luxe-gold mb-12"></div>

            <p className="text-luxe-black/60 font-light leading-relaxed mb-12 text-lg max-w-xl">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:flex-1">
                <AddToCartButton product={product} />
              </div>
              <div className="w-full sm:w-auto border border-luxe-black/10 p-5 hover:border-luxe-gold transition-colors">
                <FavoriteButton product={product} />
              </div>
            </div>

            <div className="mt-20 pt-12 border-t border-luxe-black/5">
              <div className="grid grid-cols-2 gap-12 text-[10px] uppercase tracking-ultra text-luxe-black/40">
                <div>
                  <span className="block font-bold text-luxe-black mb-2 tracking-widest">Maison</span>
                  {product.brand || "Maison Luxe"}
                </div>
                <div>
                  <span className="block font-bold text-luxe-black mb-2 tracking-widest">Availability</span>
                  {(product.stock ?? 1) > 0 ? "Exclusively Available" : "Sold Out"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LuxuryFooter />
    </main>
  );
}


"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarClient from "@/components/NavbarClient";
import LuxuryFooter from "@/components/LuxuryFooter";
import { useCart } from "@/context/CartContext";

type MakeupProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: "Lips" | "Face" | "Eyes" | "Tools";
  imageUrl: string;
  hoverImageUrl: string;
  isNew?: boolean;
  rating?: number;
  skinType?: string;
  badge?: "New Arrival" | "Best Seller";
  isFeatured?: boolean;
};

// ============================================
// FACE CATEGORY PRODUCTS DATA
// ============================================
const faceProducts: MakeupProduct[] = [
    {
    id: 201,
    name: "Luminous Silk Foundation",
    price: 76,
    description: "A lightweight liquid foundation for a natural, glowing finish.",
    category: "Face",
    imageUrl: "https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=800&q=80",
    skinType: "All Skin Types",
    badge: "New Arrival",
    isFeatured: true,
    rating: 5
  },
  {
    id: 202,
    name: "Velvet Setting Powder",
    price: 54,
    description: "Fine-milled powder to lock in makeup with a soft-focus effect.",
    category: "Face",
    imageUrl: "https://plus.unsplash.com/premium_photo-1673892639871-bc5d325fcd64?w=600&auto=format&fit=crop&q=60",
    hoverImageUrl: "https://plus.unsplash.com/premium_photo-1673892639871-bc5d325fcd64?w=600&auto=format&fit=crop&q=60",
    skinType: "Oily to Combination",
    badge: "Best Seller",
    rating: 4
  },
  {
    id: 203,
    name: "Radiant Concealer",
    price: 42,
    description: "Creamy, full-coverage concealer that brightens the under-eye area.",
    category: "Face",
    imageUrl: "https://images.unsplash.com/photo-1557195678-2c4e8a179146?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80",
    skinType: "All Skin Types",
    badge: "New Arrival",
    rating: 5
  },
  {
    id: 204,
    name: "Soft Rose Blush",
    price: 48,
    description: "A silky-smooth powder blush that provides a healthy flush of color.",
    category: "Face",
    imageUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    skinType: "All Skin Types",
    rating: 4
  }
];

const makeupProducts: MakeupProduct[] = [
  // Face Products (updated)
  ...faceProducts,
  // Lips
  {
    id: 1,
    name: "Velvet Matte Lipstick",
    price: 48,
    description: "Rich pigment with a soft-focus matte finish for evening statements.",
    category: "Lips",
    imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=1000&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80",
    isNew: true,
    rating: 5
  },
  {
    id: 3,
    name: "Waterproof Mascara",
    price: 39,
    description: "Humidity-proof definition with buildable volume and clean separation.",
    category: "Eyes",
    imageUrl: "https://images.unsplash.com/photo-1670832209136-fad04d9920f9?w=600&auto=format&fit=crop&q=60",
    hoverImageUrl: "https://images.unsplash.com/photo-1670832209136-fad04d9920f9?w=600&auto=format&fit=crop&q=60",
    rating: 5
  },
  {
    id: 4,
    name: "Couture Eyeshadow Quad",
    price: 64,
    description: "Four coordinated shades with silk-matte and reflective foil textures.",
    category: "Eyes",
    imageUrl: "https://images.unsplash.com/photo-1768983224486-b4dcd179b4a5?w=600&auto=format&fit=crop&q=60",
    hoverImageUrl: "https://images.unsplash.com/photo-1768983224486-b4dcd179b4a5?w=600&auto=format&fit=crop&q=60",
    isNew: true,
    rating: 4
  },
  {
    id: 7,
    name: "Precision Brow Pencil",
    price: 34,
    description: "Ultra-fine tip for natural definition and all-day smudge resistance.",
    category: "Eyes",
    imageUrl: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=1000&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=1000&q=80",
    rating: 5
  },
  {
    id: 8,
    name: "Professional Powder Brush",
    price: 72,
    description: "Hand-shaped bristles deliver seamless diffusion and polished finish.",
    category: "Tools",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80",
    isNew: true,
    rating: 4
  }
];

// Shop the Look products
const shopTheLookProducts = [
  { id: 1, name: "Le Rouge Lipstick", shade: "Ruby Red" },
  { id: 2, name: "Velvet Foundation", shade: "Beige 30" },
  { id: 3, name: "Luminous Highlight", shade: "Champagne" },
  { id: 4, name: "Precision Liner", shade: "Espresso" }
];

const subCategories = ["Face", "Eyes", "Lips", "Tools"];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= rating ? "text-[#C5A059]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Product Card Component - Without Quick View
function ProductCard({ 
  product, 
  onHover, 
  onLeave,
  onAddToBag,
  index,
  isLargeCard = false
}: { 
  product: MakeupProduct;
  onHover: (id: number) => void;
  onLeave: () => void;
  onAddToBag: (product: MakeupProduct) => void;
  index: number;
  isLargeCard?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={onLeave}
      className={`group flex h-full flex-col ${isLargeCard ? 'md:col-span-2' : ''}`}
    >
      {/* Product Image - Larger for Featured products */}
      <div className={`relative overflow-hidden bg-[#f1ebe5] ${isLargeCard ? 'aspect-[16/9] md:aspect-[16/10]' : 'aspect-[3/4]'}`}>
        <motion.div
          animate={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>

        {/* Hover Image */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={product.hoverImageUrl}
              alt={`${product.name} hover`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Badges - New Arrival / Best Seller */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-[#4c202a] px-3 py-1 text-[9px] font-sans uppercase tracking-[0.15em] text-white">
              {product.badge}
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-[#C5A059] px-3 py-1 text-[9px] font-sans uppercase tracking-[0.15em] text-white">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7b7f]">{product.category}</p>
          {product.rating && <StarRating rating={product.rating} />}
        </div>
        <h2 className="mt-2 font-serif text-xl leading-tight text-[#20171a]">{product.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#62565a] line-clamp-2">{product.description}</p>

        {product.skinType && (
          <p className="mt-2 text-xs tracking-wide text-[#8f7b7f]">
            Skin Type: <span className="text-[#62565a]">{product.skinType}</span>
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm tracking-[0.08em] text-[#3f3136]">
            {priceFormatter.format(product.price)}
          </span>
          {/* Add to Bag - Only visible on hover */}
          <button
            type="button"
            onClick={() => onAddToBag(product)}
            className="rounded-full border border-[#2c2326] px-5 py-2 text-[10px] uppercase tracking-[0.14em] text-[#2c2326] transition hover:bg-[#2c2326] hover:text-[#f8f4ef] opacity-0 group-hover:opacity-100"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function MakeupCategoryPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return makeupProducts;
    return makeupProducts.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToBag = (product: MakeupProduct) => {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      thumbnail: product.imageUrl
    });
  };

  // Render products with Shop the Look in the middle
  const renderProducts = () => {
    const elements: React.ReactNode[] = [];
    const productsToRender = filteredProducts;
    
    productsToRender.forEach((product, index) => {
      // Check if this is a featured product (Foundation) - use large card layout
      const isLargeCard = product.isFeatured === true;
      
      elements.push(
        <ProductCard
          key={product.id}
          product={product}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onAddToBag={handleAddToBag}
          index={index}
          isLargeCard={isLargeCard}
        />
      );

      // Insert Shop the Look section after 4th product
      if (index === 3 && productsToRender.length > 4) {
        elements.push(
          <motion.section
            key="shop-look"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="col-span-1 my-8 md:col-span-2 lg:col-span-3"
          >
            <div className="grid grid-cols-1 overflow-hidden bg-white lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative aspect-[1/1] lg:aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80"
                  alt="Shop the Look - Model"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="font-serif text-2xl italic text-white md:text-3xl">
                    The Classic Red Lip
                  </span>
                  <p className="mt-2 text-sm text-white/80">Timeless elegance for every occasion</p>
                </div>
              </div>

              {/* Products List Side */}
              <div className="flex flex-col justify-center bg-[#FAF9F6] p-8 lg:p-16">
                <h3 className="mb-8 font-serif text-2xl tracking-[0.1em] text-[#22171b] md:text-3xl">
                  Shop the Look
                </h3>
                <ul className="space-y-6">
                  {shopTheLookProducts.map((item, idx) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group flex cursor-pointer items-center justify-between border-b border-[#e9e2da] pb-4"
                    >
                      <div>
                        <span className="text-xs uppercase tracking-[0.15em] text-[#8f7b7f]">
                          Product {idx + 1}
                        </span>
                        <p className="mt-1 font-serif text-lg text-[#22171b] group-hover:text-[#C5A059] transition-colors">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-[#62565a]">{item.shade}</p>
                      </div>
                      <span className="text-sm tracking-[0.08em] text-[#3f3136]">
                        ${(30 + idx * 20).toFixed(0)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <button className="mt-10 w-full bg-[#22171b] py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#C5A059]">
                  Shop All Products
                </button>
              </div>
            </div>
          </motion.section>
        );
      }
    });

    return elements;
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#FAF9F6] text-[#181318]"
    >
<NavbarClient />

      <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-28 md:px-10 lg:px-14">
        
        {/* ============================================
            1. HERO HEADER - Editorial Luxury Style
            ============================================ */}
        <section className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.2em] text-[#7a6b6f]">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="transition hover:text-[#4c202a]">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-[#a59095]">/</li>
                <li className="text-[#4c202a]">Makeup</li>
              </ol>
            </nav>

            <h1 className="font-serif text-4xl leading-tight tracking-[0.15em] text-[#22171b] md:text-6xl lg:text-7xl">
              THE ART OF<br />MAKEUP
            </h1>
            <p className="mt-8 max-w-md font-serif text-lg italic leading-relaxed text-[#5d5054]">
              Redefining elegance through the power of color and light
            </p>
            <div className="mt-10 h-[1px] w-24 bg-[#C5A059]"></div>
          </motion.div>

          {/* Right: Featured Product with Floating Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatType: "reverse"
              }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
                alt="Featured Makeup Product"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Featured Label */}
              <div className="absolute bottom-8 left-8">
                <span className="bg-[#C5A059] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white">
                  Featured
                </span>
                <h3 className="mt-3 font-serif text-2xl text-white">Forever Skin Glow</h3>
                <p className="mt-1 text-sm text-white/80">$85.00</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ============================================
            2. FILTER & SORT - Minimalist Style
            ============================================ */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 border-b border-[#e9e2da] pb-6"
        >
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <button
              onClick={() => setActiveCategory("All")}
              className={`relative pb-3 text-xs uppercase tracking-[0.25em] transition ${
                activeCategory === "All" ? "text-[#22171b]" : "text-[#8f7b7f] hover:text-[#22171b]"
              }`}
            >
              All
              {activeCategory === "All" && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A059]"
                />
              )}
            </button>
            {subCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative pb-3 text-xs uppercase tracking-[0.25em] transition ${
                  activeCategory === category ? "text-[#22171b]" : "text-[#8f7b7f] hover:text-[#22171b]"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A059]"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.section>

        {/* ============================================
            3. PREMIUM PRODUCT GRID
            ============================================ */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {renderProducts()}
        </section>
      </div>

      <LuxuryFooter />
    </motion.main>
  );
}

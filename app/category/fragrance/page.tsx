"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LuxuryFooter from "@/components/LuxuryFooter";
import { useCart } from "@/context/CartContext";

type FragranceProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: "Eau de Parfum" | "Eau de Toilette" | "Perfume Oil" | "Sets";
  imageUrl: string;
  hoverImageUrl: string;
  isNew?: boolean;
  rating?: number;
  notes?: string;
  badge?: "New Arrival" | "Best Seller" | "Limited Edition";
  isFeatured?: boolean;
};

// ============================================
// FRAGRANCE PRODUCTS DATA
// ============================================
const fragranceProducts: FragranceProduct[] = [
  {
    id: 301,
    name: "Pure Poison Eau de Parfum",
    price: 210,
    description: "A modern, seductive fragrance for the mysterious woman.",
    category: "Eau de Parfum",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    notes: "Jasmine, Orange, Amber",
    badge: "Best Seller",
    isFeatured: true,
    rating: 5
  },
  {
    id: 302,
    name: "Miss Radiance",
    price: 185,
    description: "A floral bouquet that celebrates the beauty of fresh blossoms.",
    category: "Eau de Parfum",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&w=800&q=80",
    notes: "Rose, Peony, White Musk",
    rating: 4
  },
  {
    id: 303,
    name: "Santal 33",
    price: 280,
    description: "A Woody fragrance for women who embrace their inner strength.",
    category: "Eau de Parfum",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    notes: "Sandalwood, Cedar, Violet",
    badge: "Limited Edition",
    rating: 5
  },
  {
    id: 304,
    name: "Blooming Bouquet",
    price: 165,
    description: "A fresh, floral fragrance that captures the essence of spring.",
    category: "Eau de Toilette",
    imageUrl: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    notes: "Green Apple, Rose, Jasmine",
    isNew: true,
    rating: 4
  },
  {
    id: 305,
    name: "Midnight Rose",
    price: 245,
    description: "An enigmatic fragrance for evening wear.",
    category: "Eau de Parfum",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    notes: "Black Rose, Raspberry, Patchouli",
    rating: 5
  },
  {
    id: 306,
    name: "Signature Collection Set",
    price: 450,
    description: "A luxurious set featuring our most beloved fragrances.",
    category: "Sets",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    hoverImageUrl: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&w=800&q=80",
    notes: "Various",
    badge: "Best Seller",
    isFeatured: true,
    rating: 5
  }
];

const subCategories = ["All", "Eau de Parfum", "Eau de Toilette", "Perfume Oil", "Sets"];

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

// Product Card Component
function ProductCard({ 
  product, 
  onHover, 
  onLeave,
  onAddToBag,
  index,
  isLargeCard = false
}: { 
  product: FragranceProduct;
  onHover: (id: number) => void;
  onLeave: () => void;
  onAddToBag: (product: FragranceProduct) => void;
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
      {/* Product Image */}
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

        {/* Badges */}
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

        {product.notes && (
          <p className="mt-2 text-xs tracking-wide text-[#8f7b7f]">
            Notes: <span className="text-[#62565a]">{product.notes}</span>
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm tracking-[0.08em] text-[#3f3136]">
            {priceFormatter.format(product.price)}
          </span>
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

export default function FragranceCategoryPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return fragranceProducts;
    return fragranceProducts.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToBag = (product: FragranceProduct) => {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      thumbnail: product.imageUrl
    });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#FAF9F6] text-[#181318]"
    >
      <Navbar />

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
                <li className="text-[#4c202a]">Fragrance</li>
              </ol>
            </nav>

            <h1 className="font-serif text-4xl leading-tight tracking-[0.15em] text-[#22171b] md:text-6xl lg:text-7xl">
              THE ART OF<br />FRAGRANCE
            </h1>
            
            {/* Description Text - Elegant & Poetic */}
            <p className="mt-8 font-sans text-base leading-relaxed tracking-[0.2em] text-[#22171b]/80 text-center">
              Discover an olfactory journey of elegance. Rare scents captured in timeless bottles.
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
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80"
                alt="Featured Fragrance Product"
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
                <h3 className="mt-3 font-serif text-2xl text-white">Pure Poison</h3>
                <p className="mt-1 text-sm text-white/80">$210.00</p>
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
          {filteredProducts.map((product, index) => {
            const isLargeCard = product.isFeatured === true;
            return (
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
          })}
        </section>
      </div>

      <LuxuryFooter />
    </motion.main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/constants/products";

export default function CategoryClient({ 
  products, 
  categoryName,
  layoutType
}: { 
  products: Product[], 
  categoryName: string,
  layoutType?: string
}) {
  const isEditorial = layoutType === 'editorial-luxury';
  return (
    <div className={`${isEditorial ? "max-w-[1400px] mx-auto px-6 py-32" : "container mx-auto px-6 py-32"}`}>
      {/* Category Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center mb-24"
      >
        <span className="text-luxe-gold uppercase tracking-[0.4em] text-[10px] font-semibold mb-4">The Collection</span>
        <h1 className="text-5xl md:text-7xl font-serif text-luxe-black text-center capitalize">
          {categoryName}
        </h1>
        <div className="w-16 h-[1px] bg-luxe-gold mt-8"></div>
      </motion.div>

      {/* Product Grid or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.15,
                ease: [0.21, 0.45, 0.32, 0.9] 
              }}
              className="group"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-luxe-cream mb-10 shadow-sm group-hover:shadow-xl transition-shadow duration-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover ${!isEditorial ? 'group-hover:opacity-100' : 'transition-opacity duration-1000 group-hover:opacity-0'}`}
                  />
                  <img
                    src={product.hoverImage}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover ${!isEditorial ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-transform'}`}
                  />
                  {/* Subtle Gold Overlay on Hover */}
                  <div className={`absolute inset-0 bg-luxe-gold/5 ${!isEditorial ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-700'}`}></div>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-luxe-black/30 mb-3 block">
                    {product.brand}
                  </span>
                  <h3 className="text-2xl font-serif text-luxe-black mb-3 group-hover:text-luxe-gold transition-colors duration-500 italic">
                    {product.name}
                  </h3>
                  <div className="w-8 h-[1px] bg-luxe-black/10 mb-4 group-hover:w-16 group-hover:bg-luxe-gold transition-all duration-500"></div>
                  <p className="text-sm font-light tracking-tighter text-luxe-black/80">
                    ${product.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center justify-center py-60 border-t border-b border-luxe-black/5"
        >
          <div className="relative mb-12">
            <h2 className="text-4xl md:text-6xl font-serif text-luxe-black/10 italic tracking-widest">
              Collection Coming Soon
            </h2>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
               <span className="text-[10px] uppercase tracking-[0.6em] text-luxe-black font-semibold bg-white px-4">In Preparation</span>
            </div>
          </div>
          <p className="text-xs font-light tracking-[0.2em] text-luxe-black/40 max-w-sm text-center leading-relaxed">
            Our creative directors are curating a selection of exceptional pieces. 
            Sign up to be notified of the official unveiling.
          </p>
          <Link href="/" className="mt-16 group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-luxe-black font-bold">
            <span className="border-b border-luxe-black pb-1 group-hover:text-luxe-gold group-hover:border-luxe-gold transition-all">Back to Maison</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

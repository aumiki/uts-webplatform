"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "L'Or De Vie",
    category: "The Serum",
    price: "450",
    image: "https://plus.unsplash.com/premium_photo-1661630971367-15853002aee8?w=600&auto=format&fit=crop&q=60",
    hoverImage: "https://plus.unsplash.com/premium_photo-1661630971367-15853002aee8?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Rouge Velvet",
    category: "Lip Color",
    price: "65",
    image: "https://images.unsplash.com/photo-1555050455-f96634b5cba6?w=600&auto=format&fit=crop&q=60",
    hoverImage: "https://images.unsplash.com/photo-1555050455-f96634b5cba6?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Pure Poison",
    category: "Eau de Parfum",
    price: "210",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Prestige La Crème",
    category: "Restorative Cream",
    price: "380",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?auto=format&fit=crop&q=80&w=800"
  }
];

export default function FeaturedCollection() {
  return (
    <section id="collection" className="bg-white section-spacing px-6 md:px-24">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
             <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.4em] text-[10px] font-semibold mb-6 block"
            >
              The Selection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif text-black leading-tight"
            >
              Curated Masterpieces <br /> of <span className="italic font-light">Beauty.</span>
            </motion.h2>
          </div>
          <Link href="/" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium hover:text-gold transition-colors">
            View All Creations <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`
                ${index === 0 ? "md:col-span-7" : ""}
                ${index === 1 ? "md:col-span-5 md:pt-32" : ""}
                ${index === 2 ? "md:col-span-5 md:pt-24" : ""}
                ${index === 3 ? "md:col-span-7 md:pt-32" : ""}
                group
              `}
            >
              <Link 
                href={
                  index === 0 ? "/category/skincare" : 
                  index === 1 ? "/category/makeup" : 
                  index === 2 ? "/category/fragrance" : 
                  "/category/skincare"
                } 
                className="block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-luxury-gray mb-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"></div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-black/40 mb-2 block">{product.category}</span>
                    <h3 className="text-xl font-serif text-black group-hover:text-gold transition-colors">{product.name}</h3>
                  </div>
                  <span className="text-sm font-light tracking-tighter">${product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

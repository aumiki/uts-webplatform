"use client";

import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="bg-luxury-black text-white section-spacing overflow-hidden">
      <div className="container mx-auto px-6 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative z-10 aspect-[3/4] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000" 
                alt="Brand Heritage" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute -bottom-12 -right-12 lg:-right-24 z-20 w-2/3 aspect-square overflow-hidden border-[12px] border-luxury-black"
            >
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-black uppercase tracking-[0.5em] text-[10px] font-semibold mb-8 block">Our Heritage</span>
              <h2 className="text-black md:text-7xl font-serif mb-10 leading-[1.1] tracking-tight">
                A Legacy of <br /> <span className="italic font-light">Timeless Elegance.</span>
              </h2>
              <div className="space-y-8 text-black/60 font-light leading-relaxed text-lg max-w-xl">
                <p>
                  Since 1924, Maison Luxe has stood at the pinnacle of cosmetic excellence. 
                  Founded in the heart of Paris, our house has consistently pushed the boundaries 
                  of beauty, blending ancestral savoir-faire with cutting-edge floral science.
                </p>
                <p>
                  Every creation is a tribute to the grace of the modern individual. We don't 
                  just create products; we compose olfactory poems and visual masterpieces 
                  that celebrate the art of living.
                </p>
              </div>
              
              <div className="mt-16 pt-16 border-t border-white/10 flex gap-12">
                <div>
                  <span className="block text-3xl font-serif text-black mb-2">100+</span>
                  <span className="text-[10px] uppercase tracking-widest text-black/40">Years of Savoir-Faire</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif text-black mb-2">Paris</span>
                  <span className="text-[10px] uppercase tracking-widest text-black/40">Original Atelier</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

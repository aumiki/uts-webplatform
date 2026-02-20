"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import LuxeButton from "./LuxeButton";

export default function LuxuryHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Cosmetic"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="text-white/70 uppercase tracking-[0.5em] text-[10px] md:text-xs font-medium mb-6 block">
            The Essence of Perfection
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight tracking-tight">
            RADIANCE <br /> <span className="italic font-light">Redefined.</span>
          </h1>
          <p className="text-white/60 text-sm md:text-lg max-w-2xl mx-auto mb-12 font-sans font-light tracking-wide leading-relaxed">
            Experience the alchemy of science and luxury. A timeless collection 
            crafted for the most discerning individuals.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <LuxeButton className="!border-white !text-white hover:!border-black">
              Discover Collection
            </LuxeButton>
            <Link 
              href="/" 
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors py-4 px-8 border border-transparent"
            >
              The Film
            </Link>
          </div>
        </motion.div>
      </div>


      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-white/30 text-[8px] uppercase tracking-[0.4em] rotate-90 mb-8">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
}

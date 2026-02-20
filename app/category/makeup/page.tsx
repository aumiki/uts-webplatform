"use client";

import { Fragment, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LuxuryFooter from "@/components/LuxuryFooter";
import { PRODUCTS, type Product } from "@/constants/products";

type SubCategory = "Face" | "Eyes" | "Lips" | "Brushes";

const SUBCATEGORIES: SubCategory[] = ["Face", "Eyes", "Lips", "Brushes"];

const subCategoryKeywords: Record<SubCategory, string[]> = {
  Face: ["foundation", "powder", "blush", "concealer", "glow", "skin"],
  Eyes: ["eye", "eyeshadow", "mascara", "liner", "brow", "lash", "diorshow", "curl"],
  Lips: ["lip", "lipstick", "rouge", "tint", "gloss"],
  Brushes: ["brush", "blender", "applicator"]
};

function getSubCategory(product: Product): SubCategory {
  const haystack = `${product.name} ${product.description}`.toLowerCase();

  for (const category of SUBCATEGORIES) {
    if (subCategoryKeywords[category].some((keyword) => haystack.includes(keyword))) {
      return category;
    }
  }

  return "Face";
}

export default function MakeupCategoryPage() {
  const [activeCategory, setActiveCategory] = useState<SubCategory>("Face");

  const makeupProducts = useMemo(
    () => PRODUCTS.filter((product) => product.category === "makeup"),
    []
  );

  const filteredProducts = useMemo(
    () => makeupProducts.filter((product) => getSubCategory(product) === activeCategory),
    [activeCategory, makeupProducts]
  );

  const featuredProduct = filteredProducts[0] ?? makeupProducts[0];
  const lookProducts = makeupProducts.filter((product) => [201, 202, 205].includes(product.id));
  const insertIndex = Math.max(1, Math.floor(filteredProducts.length / 2));

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen bg-[#FAF9F6] text-[#151217]"
    >
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-28 md:px-10 lg:px-14">
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.38em] text-[#7a6166]">Makeup House</p>
            <h1 className="font-serif text-5xl uppercase leading-[0.98] tracking-[0.06em] md:text-7xl lg:text-8xl">
              THE ART OF MAKEUP
            </h1>
            <p className="mt-6 max-w-2xl text-base italic text-[#5f4f53] md:text-lg">
              Redefining elegance through the power of color and light.
            </p>

            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="mt-10"
              aria-label="Makeup subcategories"
            >
              <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm uppercase tracking-[0.16em] md:text-[0.92rem]">
                {SUBCATEGORIES.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <li key={category} className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`pb-2 transition-colors ${
                          isActive ? "text-[#5A0F1D]" : "text-[#5c5356] hover:text-[#5A0F1D]"
                        }`}
                      >
                        {category}
                      </button>
                      <span
                        aria-hidden
                        className={`absolute bottom-0 left-0 h-[1px] transition-all ${
                          isActive ? "w-full bg-[#D4AF37]" : "w-0 bg-transparent"
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [-0.8, 0.6, -0.8] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
              className="relative ml-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[2rem] shadow-[0_32px_65px_rgba(43,20,26,0.16)]"
            >
              <Image
                src={featuredProduct?.image ?? "https://images.unsplash.com/photo-1586773860418-d3b9a8ec81a2?auto=format&fit=crop&q=80&w=800"}
                alt={featuredProduct?.name ?? "Featured makeup product"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-6 py-7 text-white">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#f6e4e1]">Featured Product</p>
                <p className="mt-2 font-serif text-2xl">{featuredProduct?.name}</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <Fragment key={product.id}>
              {index === insertIndex && (
                <motion.article
                  key="shop-the-look"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7 }}
                  className="sm:col-span-2 lg:col-span-3"
                >
                  <div className="grid overflow-hidden rounded-[2rem] bg-[#f5f0ec] md:grid-cols-2">
                    <div className="relative min-h-[24rem]">
                      <Image
                        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200"
                        alt="Shop the Look makeup portrait"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center px-7 py-10 md:px-12 md:py-14">
                      <p className="text-xs uppercase tracking-[0.36em] text-[#7f6369]">Makeup Look</p>
                      <h2 className="mt-4 font-serif text-4xl leading-tight text-[#22171a] md:text-5xl">Shop the Look</h2>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#5c4c50] md:text-base">
                        Signature tones for luminous skin, sculpted eyes, and a velvet statement lip.
                      </p>
                      <ul className="mt-7 space-y-3">
                        {lookProducts.map((lookProduct) => (
                          <li key={lookProduct.id}>
                            <Link
                              href={`/product/${lookProduct.id}`}
                              className="text-base text-[#4a1b24] underline-offset-4 transition hover:text-[#8a3a4d] hover:underline"
                            >
                              {lookProduct.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              )}

              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.04 }}
                className="group"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="mb-6 rounded-full bg-white/25 px-7 py-2 text-sm uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                        Quick View
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl text-[#1b1519]">{product.name}</h3>
                    <span className="rounded-full bg-[#f6e4e8] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#6b1420]">
                      New Arrival
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64575b]">${product.price}</span>
                    <span className="text-[10px] tracking-[0.2em] text-[#B76E79]">{"\u2605\u2605\u2605\u2605\u2605"}</span>
                  </div>
                </div>
              </motion.article>
            </Fragment>
          ))}
        </section>
      </div>

      <LuxuryFooter />
    </motion.main>
  );
}



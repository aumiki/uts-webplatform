"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, User, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Handle background transition on scroll
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.nav
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)", borderBottomColor: "rgba(26, 26, 26, 0)" }}
      animate={{ 
        backgroundColor: isScrolled ? "#FFFFFF" : "rgba(255, 255, 255, 0)",
        borderBottomColor: isScrolled ? "rgba(26, 26, 26, 0.05)" : "rgba(26, 26, 26, 0)"
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed w-full top-0 z-[100] px-10 py-6 border-b transition-colors"
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-3 items-center">
        
        {/* Left: Main Navigation */}
        <div className="flex gap-10 text-[10px] uppercase tracking-ultra font-medium text-luxe-black">
          {["skincare", "makeup", "fragrance", "shades"].map((category) => (
            <Link key={category} href={`/category/${category}`} className="relative group overflow-hidden">
              <span className="group-hover:text-luxe-gold transition-colors duration-300 capitalize">
                {category}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-luxe-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            </Link>
          ))}
        </div>

        {/* Center: Logo */}
        <div className="text-center">
          <Link href="/" className="text-3xl font-serif tracking-[0.5em] text-luxe-black font-bold">
            MAISON<span className="font-light">LUXE</span>
          </Link>
        </div>

        {/* Right: Utility Icons */}
        <div className="flex gap-8 justify-end items-center text-luxe-black">
          <button className="group">
            <Search size={18} strokeWidth={1.5} className="group-hover:text-luxe-gold transition-colors" />
          </button>
          <button className="group">
            <User size={18} strokeWidth={1.5} className="group-hover:text-luxe-gold transition-colors" />
          </button>
          <Link href="/cart" className="relative group">
            <ShoppingBag size={18} strokeWidth={1.5} className="group-hover:text-luxe-gold transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 text-[8px] bg-luxe-black text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </motion.nav>
  );
}
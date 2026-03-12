"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import UserProfileDropdown from "./UserProfileDropdown";

export default function Navbar() {
  const { cart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)", borderBottomColor: "rgba(197, 160, 89, 0)" }}
      animate={{ 
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0)",
        borderBottomColor: isScrolled ? "rgba(197, 160, 89, 0.1)" : "rgba(197, 160, 89, 0)"
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed w-full top-0 z-[100] px-10 py-5 border-b backdrop-blur-md transition-colors"
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-3 items-center">
        
        {/* Left: Main Navigation */}
        <div className="flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-luxe-black">
          {["skincare", "makeup", "fragrance", "shades"].map((category) => (
            <Link key={category} href={`/category/${category}`} className="relative group overflow-hidden py-1">
              <span className="group-hover:text-luxe-gold transition-colors duration-300 capitalize">
                {category}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-luxe-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            </Link>
          ))}
        </div>

        {/* Center: Logo */}
        <div className="text-center">
          <Link href="/" className="text-4xl font-serif tracking-[0.35em] text-luxe-black font-bold">
            MAISON<span className="font-light">LUXE</span>
          </Link>
        </div>

        {/* Right: Utility Icons */}
        <div className="flex gap-6 justify-end items-center text-luxe-black">
          <button className="group p-2">
            <Search size={20} strokeWidth={1.5} className="group-hover:text-luxe-gold transition-colors" />
          </button>
          
          <div className="relative group">
            {!authLoading && !user ? (
              <Link 
                href="/login" 
                className="flex items-center gap-1 p-2 rounded-lg hover:bg-luxe-gold/10 transition-colors"
              >
                <User size={20} strokeWidth={1.5} className="group-hover:text-luxe-gold transition-colors" />
              </Link>
            ) : (
              <>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 p-2 rounded-lg hover:bg-luxe-gold/10 transition-colors relative"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-luxe-gold/30 to-amber-300 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase flex-shrink-0">
                    {user?.fullName.split(' ').slice(0,2).map(n => n[0]).join('')}
                  </div>
                  <User size={18} strokeWidth={1.8} className="group-hover:text-luxe-gold transition-colors" />
                  <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                <UserProfileDropdown 
                  isOpen={showDropdown} 
                  onClose={() => setShowDropdown(false)}
                  userFullName={user?.fullName || ''}
                />
              </>
            )}
          </div>
          
          <Link href="/cart" className="relative group p-2">
            <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:text-luxe-gold transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 text-[8px] bg-luxe-black text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </motion.nav>
  );
}
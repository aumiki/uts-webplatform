"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, ShoppingBag, ChevronDown, Package, LogOut } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";


export default function Navbar() {
  const { cart } = useCart();
  const { user, loading: authLoading, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname === '/products';


  const { scrollY } = useScroll();

  // Handle background transition on scroll
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const adminBg = isScrolled ? "rgba(14, 13, 11, 0.95)" : "rgba(14, 13, 11, 0.9)";
  const adminBorder = isScrolled ? "#c9a96e" : "rgba(201, 169, 110, 0.3)";
  const adminText = '#f5efe6';
  const normalBg = isScrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0)";
  const normalBorder = isScrolled ? "rgba(197, 160, 89, 0.1)" : "rgba(197, 160, 89, 0)";
  const normalText = 'var(--luxe-black)';

  return (
    <motion.nav
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)", borderBottomColor: "rgba(197, 160, 89, 0)" }}
      animate={{ 
        backgroundColor: isAdminPage ? adminBg : normalBg,
        borderBottomColor: isAdminPage ? adminBorder : normalBorder
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed w-full top-0 z-[100] px-10 py-5 border-b backdrop-blur-md transition-colors"
      style={{
        color: isAdminPage ? adminText : normalText
      }}
    >
      <div className="max-w-[1800px] mx-auto grid grid-cols-3 items-center">
        
        {/* Left: Main Navigation */}
        <div className="flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
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
          <Link href="/" className="text-4xl font-serif tracking-[0.35em] font-bold">
            MAISON<span className="font-light">LUXE</span>
          </Link>
        </div>

        {/* Right: Utility Icons */}
        <div className="flex gap-4 justify-end items-center">

          

          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 p-2 rounded-lg hover:bg-luxe-gold/10 transition-colors relative group"
              disabled={authLoading}
            >
              <User size={20} strokeWidth={1.5} className="group-hover:text-luxe-gold transition-colors" />
              {user && <span className="text-xs font-medium">{user.fullName.split(' ')[0]}</span>}
            </button>
            {isDropdownOpen && (
              <div className={`absolute top-full right-0 mt-2 w-56 py-3 px-4 z-[101] rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-200 ${
                isAdminPage 
                  ? 'bg-[#0e0d0b]/95 border-[#c9a96e]/30 text-[#f5efe6]' 
                  : 'bg-white/95 border-gray-200/50 text-gray-900'
              }`}>
                {!authLoading ? (
                  user ? (
                    <>
                      <div className="font-serif text-sm font-semibold mb-3 pb-2 border-b border-luxe-gold/30">
                        {user.fullName}
                      </div>
                      <Link 
                        href="/products" 
                        className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-luxe-gold/20 transition-colors block mb-1"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Package size={16} />
                        Manage Products
                      </Link>
                      <button
                        onClick={async () => {
                          await logout();
                          setIsDropdownOpen(false);
                          router.push('/login');
                        }}
                        className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-rose-500/10 transition-colors text-rose-600 hover:text-rose-500"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-luxe-gold/10 transition-colors block mb-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={16} />
                        Sign In
                      </Link>
                      <Link 
                        href="/register"
                        className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-luxe-gold/10 transition-colors block"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={16} />
                        Create Account
                      </Link>
                    </>
                  )
                ) : (
                  <div className="py-4 text-xs text-gray-500 text-center">Loading...</div>
                )}
              </div>
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


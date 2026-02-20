"use client";

import { motion } from "framer-motion";
import React from "react";

interface LuxeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function LuxeButton({ 
  children, 
  onClick, 
  className = "", 
  type = "button" 
}: LuxeButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)", color: "#1A1A1A" }}
      whileHover={{ 
        backgroundColor: "#1A1A1A", 
        color: "#FFFFFF",
        transition: { duration: 0.4, ease: "easeInOut" } 
      }}
      className={`
        relative border border-luxe-black px-12 py-4 
        text-[10px] uppercase tracking-ultra font-semibold 
        rounded-none cursor-pointer overflow-hidden
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

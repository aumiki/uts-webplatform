"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }: any) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-foreground text-cream uppercase tracking-[0.2em] text-sm font-semibold py-5 px-8 hover:bg-soft-pink hover:text-white transition-all duration-300 shadow-lg shadow-soft-pink/5"
    >
      Add to Shopping Bag
    </button>
  );
}
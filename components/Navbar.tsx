"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";

export default function Navbar() {
  const { cart } = useCart();
  const { favorites } = useFavorite();

  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-foreground text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-accent transition duration-300 font-serif">
          GlamourGlow
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white hover:text-accent transition duration-300 font-sans">
            Home
          </Link>

          <Link href="/cart" className="text-white hover:text-accent transition duration-300 font-sans">
            Cart ({totalCartItems})
          </Link>

          <Link href="/favorites" className="text-white hover:text-accent transition duration-300 font-sans">
            Favorites ({favorites.length})
          </Link>
        </div>
      </div>
    </nav>
  );
}
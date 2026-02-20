"use client";

import Link from "next/link";
import { useFavorite } from "../../context/FavoriteContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorite();

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="flex flex-col items-center mb-16">
        <span className="text-soft-pink uppercase tracking-[0.2em] text-xs font-semibold mb-2">Saved for later</span>
        <h1 className="text-4xl font-serif text-foreground text-center">Your Wishlist</h1>
        <div className="w-12 h-[1px] bg-soft-pink mt-6"></div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-24 bg-white/50 border border-soft-pink/10 rounded-sm">
          <p className="text-text-secondary font-light mb-8">Your wishlist is currently empty.</p>
          <Link 
            href="/" 
            className="text-xs uppercase tracking-widest border border-foreground px-8 py-3 hover:bg-foreground hover:text-white transition-all"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {favorites.map((product) => (
            <div key={product.id} className="group relative">
               <div className="aspect-[4/5] overflow-hidden mb-4 relative">
                  <img
                    src={product.thumbnail || "https://via.placeholder.com/400x500?text=Cosmetic"}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm">
                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="text-soft-pink hover:text-red-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
               </div>
               <div className="text-center">
                  <h3 className="text-lg font-serif text-foreground mb-1">
                    <Link href={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="text-foreground font-light tracking-tighter">${product.price}</p>
                  <Link 
                    href={`/product/${product.id}`}
                    className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] font-semibold border-b border-soft-pink pb-1 hover:text-soft-pink transition-colors"
                  >
                    View Details
                  </Link>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
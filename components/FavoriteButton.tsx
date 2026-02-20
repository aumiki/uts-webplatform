"use client";

import { useFavorite } from "../context/FavoriteContext";

export default function FavoriteButton({ product }: any) {
  const { favorites, addFavorite, removeFavorite } = useFavorite();

  const isFavorited = favorites.find((item) => item.id === product.id);

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite();
      }}
      className={`transition-colors duration-300 ${
        isFavorited ? "text-soft-pink" : "text-foreground/30 hover:text-soft-pink"
      }`}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorited ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
}
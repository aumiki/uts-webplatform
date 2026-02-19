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
      onClick={toggleFavorite}
      style={{
        marginLeft: "10px",
        padding: "8px",
        backgroundColor: isFavorited ? "red" : "gray",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {isFavorited ? "❤️ Favorited" : "🤍 Add to Favorite"}
    </button>
  );
}
"use client";

import Link from "next/link";
import { useFavorite } from "../../context/FavoriteContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorite();

  return (
    <div style={{ padding: "20px" }}>
      <h1>❤️ Favorite Products</h1>

      {favorites.length === 0 ? (
        <p>No favorite items yet.</p>
      ) : (
        favorites.map((product) => (
          <div
            key={product.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <Link href={`/product/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p>${product.price}</p>

            <button
              onClick={() => removeFavorite(product.id)}
              style={{
                padding: "6px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
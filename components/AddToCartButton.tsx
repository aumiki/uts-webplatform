"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }: any) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      style={{
        marginTop: "15px",
        padding: "10px 16px",
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Add to Cart
    </button>
  );
}
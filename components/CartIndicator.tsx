"use client";

import { useCart } from "../context/CartContext";

export default function CartIndicator() {
  const { cart } = useCart();

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "#eee",
        color: "#111",
        fontWeight: "bold",
      }}
    >
      🛒 Cart Items: {cart.length}
    </div>
  );
}

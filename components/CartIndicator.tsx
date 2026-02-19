"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartIndicator() {
  const { cart } = useCart();

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      <Link href="/cart" style={{ color: "white", textDecoration: "none" }}>
        🛒 Cart Items: {cart.length}
      </Link>
    </div>
  );
}

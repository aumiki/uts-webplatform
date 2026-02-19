"use client";

import { useCart } from "../../context/CartContext";

export default function CartPage() {
const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>Cart is empty.</p>}

      {cart.map((item) => (
        <div key={item.id}>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>

            <button onClick={() => decreaseQty(item.id)}>-</button>
            <button onClick={() => increaseQty(item.id)}>+</button>

            <button onClick={() => removeFromCart(item.id)}>
            Remove
            </button>
        </div>
        ))}


      {cart.length > 0 && (
        <h2 style={{ marginTop: "20px" }}>
          Total: ${total.toFixed(2)}
        </h2>
      )}
    </div>
  );
}
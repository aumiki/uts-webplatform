"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image"; // Assuming Next.js Image component for optimization
import Link from "next/link"; // For "Continue Shopping" link

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Placeholder for shipping cost
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold mb-8 text-center text-foreground font-serif">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-text-secondary mb-4">Your cart is currently empty. Time to find some glam!</p>
          <Link href="/" className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground font-serif">Items</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border-b border-secondary-color py-4 last:border-b-0">
                <div className="w-24 h-24 mr-4 flex-shrink-0">
                  <Image
                    src={item.thumbnail || "https://via.placeholder.com/100x100?text=Cosmetic"} // Placeholder image
                    alt={item.title}
                    width={96}
                    height={96}
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-text-secondary text-sm">${item.price.toFixed(2)} each</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-secondary-color text-foreground hover:bg-primary hover:text-white transition duration-300 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="mx-3 text-lg font-medium text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-secondary-color text-foreground hover:bg-primary hover:text-white transition duration-300 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-accent">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-primary hover:text-red-700 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 bg-white rounded-lg shadow-xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-foreground font-serif">Order Summary</h2>
            <div className="space-y-4 text-foreground">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-secondary-color pt-4 mt-4">
                <span>Total:</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-accent hover:bg-opacity-90 text-white font-semibold text-lg py-3 rounded-md mt-8 transition duration-300 ease-in-out uppercase tracking-wider">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
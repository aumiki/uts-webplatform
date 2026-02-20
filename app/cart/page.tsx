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
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="flex flex-col items-center mb-16">
        <span className="text-soft-pink uppercase tracking-[0.2em] text-xs font-semibold mb-2">Checkout</span>
        <h1 className="text-4xl font-serif text-foreground text-center">Your Shopping Bag</h1>
        <div className="w-12 h-[1px] bg-soft-pink mt-6"></div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-24 bg-white/50 border border-soft-pink/10 rounded-sm">
          <p className="text-text-secondary font-light mb-8">Your shopping bag is currently empty.</p>
          <Link 
            href="/" 
            className="text-xs uppercase tracking-widest border border-foreground px-8 py-3 hover:bg-foreground hover:text-white transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items List */}
          <div className="lg:w-2/3 space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-8 group pb-8 border-b border-soft-pink/10">
                <div className="w-32 h-40 flex-shrink-0 bg-white border border-soft-pink/5 overflow-hidden">
                  <Image
                    src={item.thumbnail || "https://via.placeholder.com/200x300?text=Cosmetic"}
                    alt={item.title}
                    width={128}
                    height={160}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-serif text-foreground mb-1">
                        <Link href={`/product/${item.id}`}>{item.title}</Link>
                      </h3>
                      <p className="text-xs text-text-secondary uppercase tracking-widest">
                        Unit Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-foreground/30 hover:text-red-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-soft-pink/20 px-2 py-1">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-soft-pink transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-soft-pink transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xl font-light text-foreground tracking-tighter">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-soft-pink/10 p-10 sticky top-32">
              <h2 className="text-2xl font-serif mb-8 text-foreground">Summary</h2>
              <div className="space-y-4 text-sm uppercase tracking-widest">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span className="italic">Complimentary</span>
                </div>
                <div className="pt-8 mt-8 border-t border-soft-pink/10 flex justify-between items-end">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-3xl font-light text-foreground tracking-tighter">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-foreground text-cream uppercase tracking-[0.2em] text-xs font-semibold py-5 mt-10 hover:bg-soft-pink hover:text-white transition-all duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "../context/CartContext";
import CartIndicator from "../components/CartIndicator";
import { FavoriteProvider } from "../context/FavoriteContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <FavoriteProvider>

            <CartIndicator />

            {/* NAVBAR */}
            <div
              style={{
                padding: "12px",
                backgroundColor: "#111",
                display: "flex",
                gap: "20px",
              }}
            >
              <Link href="/" style={{ color: "white" }}>
                Home
              </Link>

              <Link href="/cart" style={{ color: "white" }}>
                Cart
              </Link>

              <Link href="/favorites" style={{ color: "white" }}>
                Favorites
              </Link>
            </div>

            {children}

          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
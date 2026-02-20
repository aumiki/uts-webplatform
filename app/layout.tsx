import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartIndicator from "../components/CartIndicator";
import { FavoriteProvider } from "../context/FavoriteContext";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <FavoriteProvider>
            <Navbar />

            <main className="flex-grow">
              {children}
            </main>

            <CartIndicator />

          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
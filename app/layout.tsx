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
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <FavoriteProvider>
            <Navbar />

            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>

            <CartIndicator />

          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
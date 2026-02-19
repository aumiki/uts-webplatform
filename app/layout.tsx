import "./globals.css";
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
              {children}
          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}

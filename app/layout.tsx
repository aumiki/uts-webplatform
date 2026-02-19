import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartIndicator from "../components/CartIndicator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <CartProvider>
        <CartIndicator />
        {children}
      </CartProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { FavoriteProvider } from "../context/FavoriteContext";
import { AuthProvider } from "../context/AuthContext";
import AuthHideWrapper from "../components/AuthHideWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <FavoriteProvider>
              <AuthHideWrapper />

              <main className="flex-grow">
                {children}
              </main>
            </FavoriteProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

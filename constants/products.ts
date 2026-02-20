export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  category: string;
  description: string;
  brand: string;
}

export const PRODUCTS: Product[] = [
  // Skincare
  {
    id: 101,
    name: "L'Or de Vie Le Sérum",
    price: 450,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800",
    category: "skincare",
    brand: "MAISON LUXE",
    description: "The masterpiece of Dior skincare, L'Or de Vie Le Sérum is the ultimate elixir for skin longevity."
  },
  {
    id: 102,
    name: "Prestige La Crème",
    price: 380,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?auto=format&fit=crop&q=80&w=800",
    category: "skincare",
    brand: "MAISON LUXE",
    description: "A luxury cream that delivers intensive repair and visible rejuvenation."
  },
  // Makeup
  {
    id: 201,
    name: "Rouge Velvet Lipstick",
    price: 65,
    image: "https://images.unsplash.com/photo-1586773860418-d3b9a8ec81a2?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1591360236630-4eb9b346394c?auto=format&fit=crop&q=80&w=800",
    category: "makeup",
    brand: "MAISON LUXE",
    description: "Iconic long-wear lipstick with a couture velvet finish."
  },
  {
    id: 202,
    name: "Forever Skin Glow",
    price: 85,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1617325247661-675c445ad193?auto=format&fit=crop&q=80&w=800",
    category: "makeup",
    brand: "MAISON LUXE",
    description: "A clean foundation for a high-perfection radiant finish."
  },
  // Fragrance
  {
    id: 301,
    name: "Pure Poison Eau de Parfum",
    price: 210,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    category: "fragrance",
    brand: "MAISON LUXE",
    description: "A modern, seductive fragrance for the mysterious woman."
  },
  {
    id: 302,
    name: "Miss Radiance",
    price: 185,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=800",
    category: "fragrance",
    brand: "MAISON LUXE",
    description: "A floral bouquet that celebrates the beauty of fresh blossoms."
  }
];

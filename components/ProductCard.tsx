import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    brand?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-sm overflow-hidden transition-all duration-300 border border-soft-pink/10 hover:shadow-xl hover:shadow-soft-pink/10">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img
          src={product.thumbnail || "https://via.placeholder.com/400x500?text=Cosmetic"}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </Link>
      
      <div className="p-5 flex flex-col items-center text-center">
        <span className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">
          {product.brand || "Exclusive"}
        </span>
        <h3 className="text-lg font-serif text-foreground mb-2 group-hover:text-soft-pink transition-colors truncate w-full">
          <Link href={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="text-foreground font-light text-xl mb-4 tracking-tighter">
          ${product.price}
        </p>
        
        <div className="flex items-center gap-3 w-full">
          <Link 
            href={`/product/${product.id}`}
            className="flex-1 text-xs uppercase tracking-widest border border-foreground/10 py-3 hover:bg-foreground hover:text-white transition-all"
          >
            View
          </Link>
          <div className="border border-foreground/10 p-2">
            <FavoriteButton product={product as any} />
          </div>
        </div>
      </div>
    </div>
  );
}

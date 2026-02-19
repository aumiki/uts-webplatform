import Link from "next/link";
import { fetchProductsPaginated } from "../lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const data = await fetchProductsPaginated(limit, skip);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative bg-primary py-32 px-6 rounded-xl shadow-xl mb-12 text-center overflow-hidden">
        {/* Subtle background pattern or overlay for luxury */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-75"></div> {/* Assuming primary-dark would be a darker primary, if not, use a variant of primary or an explicit dark color */}
        <div className="relative z-10 text-white">
          <h1 className="text-6xl font-extrabold mb-4 font-serif leading-tight">Discover Your Radiance</h1>
          <p className="text-2xl mb-10 font-light max-w-2xl mx-auto">Elevate your beauty ritual with our exquisite collection of premium cosmetics.</p>
          <Link href="/products" className="inline-block bg-accent hover:bg-opacity-90 text-white font-semibold text-lg py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out uppercase tracking-wider">
            Explore Collection
          </Link>
        </div>
      </section>

      <h2 className="text-4xl font-semibold mb-10 text-center text-foreground font-serif">Our Exquisite Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.products.map((product: any) => (
          <div key={product.id} className="bg-white rounded-lg shadow-xl overflow-hidden border border-secondary-color transform hover:scale-105 transition duration-300 ease-in-out">
            <Link href={`/product/${product.id}`}>
              {/* Product Image */}
              <img
                src={product.thumbnail || "https://via.placeholder.com/300x200?text=Cosmetic"} // Use product thumbnail or a placeholder
                alt={product.title}
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-foreground mb-2 font-serif truncate">{product.title}</h3>
                <p className="text-accent font-bold text-2xl mb-4">${product.price}</p>
                {/* <p className="text-sm text-text-secondary mt-2 line-clamp-2">{product.description}</p> */}
                <button className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-md transition duration-300 ease-in-out">
                  View Details
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16 space-x-6">
        {page > 1 && (
          <Link href={`/?page=${page - 1}`}>
            <button className="bg-primary hover:bg-opacity-90 text-white font-semibold text-lg py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out">
              Previous Page
            </button>
          </Link>
        )}
        <Link href={`/?page=${page + 1}`}>
          <button className="bg-primary hover:bg-opacity-90 text-white font-semibold text-lg py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out">
              Next Page
            </button>
          </Link>
      </div>
    </div>
  );
}


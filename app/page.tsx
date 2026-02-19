import Link from "next/link";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const data = await fetchProducts();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Catalog (SSG)</h1>

      {data.products.map((product: any) => (
        <div key={product.id} style={{ marginBottom: "15px" }}>
          <Link href={`/product/${product.id}`}>
            <h3>{product.title}</h3>
          </Link>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

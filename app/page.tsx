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
    <div style={{ padding: "20px" }}>
      <h1>Product Catalog (SSG with Pagination)</h1>

      {data.products.map((product: any) => (
        <div key={product.id} style={{ marginBottom: "15px" }}>
          <Link href={`/product/${product.id}`}>
            <h3>{product.title}</h3>
          </Link>
          <p>${product.price}</p>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        {page > 1 && (
          <Link href={`/?page=${page - 1}`}>
            <button>Previous</button>
          </Link>
        )}
        <Link href={`/?page=${page + 1}`}>
          <button style={{ marginLeft: "10px" }}>Next</button>
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "force-cache", // ini bikin jadi SSG
  });

  return res.json();
}

export default async function Home() {
  const data = await getProducts();

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

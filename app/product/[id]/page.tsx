import { fetchProductById } from "../../../lib/api";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await fetchProductById(id);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Detail (SSR)</h1>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.thumbnail} width="200" />
    </div>
  );
}

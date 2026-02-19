import Image from "next/image";
import { fetchProductById } from "../../../lib/api";
import AddToCartButton from "../../../components/AddToCartButton";

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
      <AddToCartButton product={product} />

        <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
/>
    </div>
  );
}

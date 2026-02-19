interface Props {
  params: { id: string };
}

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store", // ini bikin jadi SSR
  });

  return res.json();
}

export default async function ProductDetail({ params }: Props) {
  const product = await getProduct(params.id);

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

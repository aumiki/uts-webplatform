const BASE_URL = "https://dummyjson.com";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: "no-store", // SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
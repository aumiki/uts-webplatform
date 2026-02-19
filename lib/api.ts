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
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function fetchProductsPaginated(limit = 10, skip = 0) {
  const res = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

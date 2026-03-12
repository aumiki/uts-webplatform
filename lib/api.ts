const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const PUBLIC_BASE_URL = "https://dummyjson.com";

async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 && typeof window !== 'undefined') {
    // Try refresh then retry
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000); // Prevent infinite loop
    
    try {
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
        signal: controller.signal,
      });
      
      if (refreshRes.ok) {
        const newToken = localStorage.getItem('accessToken');
        const retryHeaders: HeadersInit = {
          'Content-Type': 'application/json',
          ...(newToken && { Authorization: `Bearer ${newToken}` }),
          ...options.headers,
        };
        return fetch(url, { ...options, headers: retryHeaders });
      }
    } catch {}
  }

  return res;
}

export async function fetchProducts() {
  const res = await fetch(`${PUBLIC_BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${PUBLIC_BASE_URL}/products/${id}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function fetchProductsPaginated(limit = 10, skip = 0) {
  const res = await fetch(
    `${PUBLIC_BASE_URL}/products?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

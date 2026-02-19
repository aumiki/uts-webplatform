"use client";

import { useState, useEffect } from "react";

export default function SearchPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  // Filter real-time
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Search (CSR)</h1>

      {/* Input Search */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "300px",
        }}
      />

      {loading && <p>Loading...</p>}

      {!loading &&
        filteredProducts.map((product) => (
          <div key={product.id} style={{ marginBottom: "15px" }}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
    </div>
  );
}

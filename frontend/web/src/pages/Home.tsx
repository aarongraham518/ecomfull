import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/api"; // Adjust path as needed

const Home = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <ul>
        {products.map((product: any) => (
          <li key={product._id}>
            <strong>{product.name}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

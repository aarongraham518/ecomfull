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

  function handleCardPress(category: any) {
    console.log('Card pressed:', category);
  }
  
  function handleHeartPress(event: any) {
    event.stopPropagation(); 
    console.log('Heart icon pressed');
  }
  return (
    <div style={{ padding: "20px" }}>
      <ul>
        {products.map((product: any) => (
          <div className="card" onClick={() => handleCardPress(product._id)}>
          <div className="image-container">
            <img src={product.imageUrl} alt="Product" className="product-image" />
            <button className="heart-icon" onClick={handleHeartPress}>
              <i className="fa fa-heart-o" style={{ color: 'white', fontSize: 18 }}></i>
            </button>
          </div>
          <div className="product-name">{product.name}</div>
          <div className="product-description">Description goes here</div>
          <div className="product-price">${product.price}</div>
        </div>
        
        ))}
      </ul>
    </div>
  );
};

export default Home;

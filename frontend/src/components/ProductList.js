import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/cosmetic-products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const deleteProduct = (id) => {
    fetch(`http://localhost:8080/cosmetic-products/${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="product-list">
      <h1>Cosmetic Products</h1>
      <Link to="/products/edit/new" className="add-btn">
        Add Product
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <strong>{product.name}</strong>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
            <div className="actions">
              <Link to={`/products/edit/${product.id}`} className="edit-btn">
                Edit
              </Link>
              <button onClick={() => deleteProduct(product.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

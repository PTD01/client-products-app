import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    if (id !== "new") {
      fetch(`http://localhost:8080/cosmetic-products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  const saveProduct = () => {
    const method = id === "new" ? "POST" : "PUT";
    const url = id === "new"
      ? "http://localhost:8080/cosmetic-products"
      : `http://localhost:8080/cosmetic-products/${id}`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then(() => navigate("/products"))
      .catch((error) => console.error("Error saving product:", error));
  };

  return (
    <div className="product-edit">
      <h1>{id === "new" ? "Add Product" : "Edit Product"}</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
      </div>
      <div className="form-actions">
        <button onClick={saveProduct} className="save-btn">
          Save
        </button>
        <button onClick={() => navigate("/products")} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProductEdit;

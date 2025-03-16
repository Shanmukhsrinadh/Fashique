import React, { useState } from "react";
import products from "./products";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Function to filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Product List</h1>

      {/* Buttons for category selection */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        <button
          className={`btn ${
            selectedCategory === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            selectedCategory === "men" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setSelectedCategory("men")}
        >
          Men
        </button>
        <button
          className={`btn ${
            selectedCategory === "women" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setSelectedCategory("women")}
        >
          Women
        </button>
        <button
          className={`btn ${
            selectedCategory === "kids" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setSelectedCategory("kids")}
        >
          Kids
        </button>
      </div>

      {/* Display filtered products */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Subcategory: {product.subcategory}</p>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
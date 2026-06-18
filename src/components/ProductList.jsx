import React from "react";

const ProductList = ({ title, products, onQuickView }) => {
  return (
    <div className="deals-slider-section">
      <div className="deals-header">
        <h2>{title}</h2>
        <span style={{ fontSize: "0.85rem", color: "var(--color-secondary)", cursor: "pointer", fontWeight: "600" }}>
          See all deals
        </span>
      </div>
      
      <div className="deals-row">
        {products.map((product) => (
          <div 
            key={`deal-${product.id}`} 
            className="deal-item"
            onClick={() => onQuickView(product)}
          >
            <div className="deal-img-container">
              <img 
                src={product.image} 
                alt={product.title} 
                className="deal-img" 
              />
            </div>
            <span className="deal-title">{product.title}</span>
            <span className="deal-price">${product.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

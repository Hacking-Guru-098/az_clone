import React from "react";
import { renderStars } from "./ProductGrid";

const QuickView = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target.className === "quick-view-overlay") {
      onClose();
    }
  };

  return (
    <div className="quick-view-overlay" onClick={handleBackdropClick}>
      <div className="quick-view-content">
        <button className="qv-close-btn" onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="qv-left">
          <img src={product.image} alt={product.title} className="qv-img" />
        </div>

        <div className="qv-right">
          <span className="qv-category">{product.category}</span>
          <h2 className="qv-title">{product.title}</h2>
          
          <div className="qv-rating" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {renderStars(product.rating)}
            <span style={{ fontSize: "0.85rem", color: "var(--color-secondary)", fontWeight: "500" }}>
              {product.rating} rating ({product.reviewsCount} customer reviews)
            </span>
          </div>

          <div className="qv-divider"></div>

          <div className="qv-price-container">
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-light)" }}>Price:</span>
            <span className="qv-price">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span style={{ fontSize: "0.95rem", textDecoration: "line-through", color: "var(--text-light)", marginLeft: "5px" }}>
                List Price: ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="qv-desc">{product.description}</p>

          {product.specs && product.specs.length > 0 && (
            <>
              <h4 className="qv-specs-title">About this item:</h4>
              <ul className="qv-specs-list">
                {product.specs.map((spec, index) => (
                  <li key={`spec-${index}`}>{spec}</li>
                ))}
              </ul>
            </>
          )}

          <button
            className="add-to-cart-btn"
            onClick={() => {
              onAddToCart(product);
              onClose(); // auto-close after adding to cart
            }}
            style={{ padding: "12px 20px", fontSize: "0.95rem" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickView;

import React from "react";

// Helper function to render stars
export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="stars">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
      {hasHalfStar && <span key="half">½</span>}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <span key={`empty-${i}`} style={{ opacity: 0.25 }}>★</span>
        ))}
    </div>
  );
};

const ProductGrid = ({ products, onAddToCart, onQuickView }) => {
  return (
    <div className="product-grid">
      {products.map((product) => {
        // Splitting price into integer and decimal for Amazon-style styling
        const priceStr = product.price.toFixed(2);
        const [priceWhole, priceFraction] = priceStr.split(".");

        return (
          <div key={product.id} className="product-card">
            {product.badge && (
              <span className="product-badge">{product.badge}</span>
            )}
            
            <div className="product-card-img-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="product-card-img"
              />
              <button 
                className="quick-view-trigger"
                onClick={() => onQuickView(product)}
              >
                Quick View
              </button>
            </div>

            <div className="product-card-info">
              <span className="product-card-category">{product.category}</span>
              <h3 className="product-card-title">{product.title}</h3>
              
              <div className="rating-container">
                {renderStars(product.rating)}
                <span className="rating-count">({product.reviewsCount})</span>
              </div>

              <div className="price-container">
                <span className="price-currency">$</span>
                <span className="price-main">{priceWhole}</span>
                <span className="price-fraction">{priceFraction}</span>
                
                {product.oldPrice && (
                  <span className="price-old">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>

              <button
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;

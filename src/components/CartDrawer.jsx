import React from "react";

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    alert(`Checkout simulated! Proceeding with payment for ${totalItems} items ($${subtotal.toFixed(2)}).`);
  };

  return (
    <>
      <div 
        className={`cart-drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h2>Shopping Cart ({totalItems})</h2>
          <button className="cart-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <p>Your Amazon Cart is empty.</p>
              <button 
                onClick={onClose}
                style={{
                  color: "var(--color-secondary)",
                  fontWeight: "600",
                  textDecoration: "underline"
                }}
              >
                Shop deals now
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`cart-${item.id}`} className="cart-item">
                <div className="cart-item-img-container">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                </div>
                
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.title}</h4>
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="cart-remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

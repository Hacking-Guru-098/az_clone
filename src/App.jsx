import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SubNav from "./components/SubNav";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import QuickView from "./components/QuickView";
import Footer from "./components/Footer";
import { mockProducts } from "./data/products";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [theme, setTheme] = useState("light");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Synchronize theme state with the body class
  useEffect(() => {
    const root = document.body;
    if (theme === "dark") {
      root.classList.add("dark-theme");
    } else {
      root.classList.remove("dark-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    // Open the cart drawer automatically for feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleBannerClick = (category) => {
    setSelectedCategory(category);
    // Smooth scroll down to main content
    const contentElement = document.getElementById("main-content-section");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  // Filter products based on search query and category
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate total cart items count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Group products for standard landing page layouts
  const bestSellers = mockProducts.filter((p) => p.isBestSeller);
  const regularProducts = mockProducts.filter((p) => !p.isBestSeller);

  // Determine if a search filter is active
  const isFilterActive = searchQuery !== "" || selectedCategory !== "all";

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <SubNav />

      {/* Hero Banner (hidden when filtering results) */}
      {!isFilterActive && <Banner onBannerClick={handleBannerClick} />}

      <main className="main-content" id="main-content-section">
        {isFilterActive ? (
          <>
            <div className="search-results-info">
              <div>
                <h2>
                  Showing results for "{searchQuery || selectedCategory}"
                </h2>
                <p style={{ color: "var(--text-light)", fontSize: "0.85rem", marginTop: "4px" }}>
                  Found {filteredProducts.length} items matching your criteria
                </p>
              </div>
              <button className="clear-search-btn" onClick={handleClearSearch}>
                Clear filters
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div 
                style={{ 
                  textAlign: "center", 
                  padding: "60px 20px", 
                  background: "var(--bg-card)",
                  borderRadius: "var(--card-border-radius)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-light)", marginBottom: "15px" }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <h3>No results found</h3>
                <p style={{ color: "var(--text-light)", marginTop: "8px" }}>
                  Try checking your spelling or search terms, or clear filters to view all products.
                </p>
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onQuickView={setSelectedProduct}
              />
            )}
          </>
        ) : (
          <>
            {/* 4-Column Product Grid (Featured/Deals) */}
            <div style={{ marginBottom: "15px" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "15px" }}>
                Trending Products & Categories
              </h2>
            </div>
            
            <ProductGrid
              products={mockProducts.slice(0, 8)}
              onAddToCart={handleAddToCart}
              onQuickView={setSelectedProduct}
            />

            {/* Horizontal Best Sellers List */}
            <ProductList
              title="Best Sellers on Amazon Clone"
              products={bestSellers}
              onQuickView={setSelectedProduct}
            />

            {/* Another 4-Column Grid for more products */}
            <div style={{ margin: "25px 0 15px" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: "700" }}>
                More items to explore
              </h2>
            </div>
            
            <ProductGrid
              products={mockProducts.slice(8)}
              onAddToCart={handleAddToCart}
              onQuickView={setSelectedProduct}
            />
          </>
        )}
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Quick View Modal */}
      <QuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;

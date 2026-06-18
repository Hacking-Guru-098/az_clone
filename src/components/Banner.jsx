import React, { useState, useEffect } from "react";
import { mockBanners } from "../data/products";

const Banner = ({ onBannerClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 6000); // cycle slide every 6 seconds

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? mockBanners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === mockBanners.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="banner-slider">
      <button className="banner-nav prev" onClick={handlePrev} aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button className="banner-nav next" onClick={handleNext} aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {mockBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={`banner-slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="banner-content">
            <h1 className="banner-title">{banner.title}</h1>
            <p className="banner-subtitle">{banner.subtitle}</p>
            <button 
              className="banner-btn"
              onClick={() => onBannerClick(banner.category)}
            >
              {banner.btnText}
            </button>
          </div>
        </div>
      ))}
      
      <div className="banner-overlay"></div>
    </div>
  );
};

export default Banner;

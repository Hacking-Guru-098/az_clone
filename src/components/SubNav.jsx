import React from "react";

const SubNav = () => {
  return (
    <div className="subnav">
      <div className="subnav-left">
        <div className="subnav-item menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          All
        </div>
        <div className="subnav-item">Today's Deals</div>
        <div className="subnav-item">Customer Service</div>
        <div className="subnav-item">Registry</div>
        <div className="subnav-item">Gift Cards</div>
        <div className="subnav-item">Sell</div>
      </div>
      
      <div className="subnav-right">
        Amazon Prime Day Coming Soon – Save Up To 40%
      </div>
    </div>
  );
};

export default SubNav;

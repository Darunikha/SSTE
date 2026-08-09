import React from 'react';

const StatItem = ({ number, label }) => {
  return (
    <div className="trust-item">
      <span className="trust-number">{number}</span>
      <span className="trust-label">{label}</span>
    </div>
  );
};

export default StatItem;

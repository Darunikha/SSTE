import React from 'react';

const StatItem = ({ icon = '✓', number, label }) => {
  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatItem;

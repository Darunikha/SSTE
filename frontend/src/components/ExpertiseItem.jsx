import React from 'react';

const ExpertiseItem = ({ index, title, description }) => {
  return (
    <>
      <span className="expertise-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className="expertise-copy">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </>
  );
};

export default ExpertiseItem;

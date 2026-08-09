import React from 'react';

const ServiceCard = ({ index, title, description }) => {
  return (
    <>
      <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="service-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="service-arrow" aria-hidden="true">&rarr;</span>
    </>
  );
};

export default ServiceCard;

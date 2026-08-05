import React from 'react';

const FaqItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <h4>{question}</h4>
      <p>{answer}</p>
    </div>
  );
};

export default FaqItem;

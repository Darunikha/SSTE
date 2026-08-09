import React from 'react';

const FaqItem = ({ id, question, answer, isActive, onToggle }) => {
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div className="faq-item" data-open={isActive}>
      <h3>
        <button
          id={buttonId}
          className="faq-question"
          aria-expanded={isActive}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{question}</span>
          <span className="faq-icon" aria-hidden="true">+</span>
        </button>
      </h3>
      <div className="faq-answer-wrap">
        <div
          className="faq-answer-inner"
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
        >
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;

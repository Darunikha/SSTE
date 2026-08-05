import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`} style={{ marginBottom: '16px' }}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '12px', fontWeight: 'bold' }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;

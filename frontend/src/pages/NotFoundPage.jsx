import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
        minHeight: '60vh',
      }}
    >
      <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '16px' }}>404</h1>
      <h2 style={{ marginBottom: '16px', color: 'var(--dark)' }}>Page Not Found</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px', maxWidth: '450px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary" style={{ background: 'var(--primary)', color: 'var(--white)' }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

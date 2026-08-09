import React from 'react';

const Hero = ({ onGetStartedClick, onLearnMoreClick }) => {
  return (
    <section className="hero">
      <div className="hero-texture" aria-hidden="true" />
      <div className="container hero-inner">
        <span className="eyebrow">Coimbatore, Tamil Nadu &middot; Textile Machinery Engineering</span>
        <h1>Precision Engineering. Performance That Never Stops.</h1>
        <p className="hero-lead">
          Sri Sastha Textile Engineering delivers dependable spare parts, electronic servicing, and industrial
          automation solutions that keep textile machinery running at peak performance.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onGetStartedClick}>
            Request a Quote <span className="btn-arrow">&rarr;</span>
          </button>
          <button className="btn btn-outline" onClick={onLearnMoreClick}>
            Explore Our Expertise
          </button>
        </div>
        <ul className="hero-meta">
          <li>Coimbatore, Tamil Nadu</li>
          <li>Textile Machinery Engineering</li>
          <li>24/7 Technical Support</li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;

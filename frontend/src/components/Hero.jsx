import React from 'react';

const Hero = ({ onGetStartedClick, onLearnMoreClick }) => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div>
          <h1>Precision Engineering Solutions On Time, Every Time.</h1>
          <p>
            Sri Sastha Textile Engineering delivers dependable spare parts, electronic servicing, and industrial automation solutions to keep your machinery running at peak performance.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={onGetStartedClick}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={onLearnMoreClick}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

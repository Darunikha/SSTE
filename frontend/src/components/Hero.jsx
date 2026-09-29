import React from 'react';

const HEADLINE = 'Precision Engineering. Performance That Never Stops.'.split(' ');

const Hero = ({ onGetStartedClick, onLearnMoreClick }) => {
  return (
    <section className="hero">
      <div className="hero-texture" aria-hidden="true" />
      <span className="hero-orb hero-orb-a" aria-hidden="true" />
      <span className="hero-orb hero-orb-b" aria-hidden="true" />
      <div className="container hero-inner">
        <span className="eyebrow hero-fade" style={{ '--d': '0ms' }}>
          <span className="pulse-dot" aria-hidden="true" />
          Coimbatore, Tamil Nadu &middot; Textile Machinery Engineering
        </span>
        <h1 aria-label={HEADLINE.join(' ')}>
          {HEADLINE.map((word, i) => (
            <span className="word-mask" key={`${word}-${i}`} aria-hidden="true">
              <span className="word" style={{ '--i': i }}>{word}&nbsp;</span>
            </span>
          ))}
        </h1>
        <p className="hero-lead hero-fade" style={{ '--d': '700ms' }}>
          Sri Sastha Textile Engineering delivers dependable spare parts, electronic servicing, and industrial
          automation solutions that keep textile machinery running at peak performance.
        </p>
        <div className="hero-actions hero-fade" style={{ '--d': '850ms' }}>
          <button className="btn btn-primary" onClick={onGetStartedClick}>
            Request a Quote <span className="btn-arrow">&rarr;</span>
          </button>
          <button className="btn btn-outline" onClick={onLearnMoreClick}>
            Explore Our Expertise
          </button>
        </div>
        <ul className="hero-meta hero-fade" style={{ '--d': '1000ms' }}>
          <li>Coimbatore, Tamil Nadu</li>
          <li>Textile Machinery Engineering</li>
          <li>24/7 Technical Support</li>
        </ul>
        <button className="scroll-cue hero-fade" style={{ '--d': '1200ms' }} onClick={onLearnMoreClick} aria-label="Scroll down">
          <span />
        </button>
      </div>
    </section>
  );
};

export default Hero;

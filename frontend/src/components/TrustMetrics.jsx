import React from 'react';
import StatItem from './StatItem';
import Reveal from './Reveal';

const TrustMetrics = ({ stats }) => {
  if (!stats.length) return null;

  return (
    <section className="trust-strip" aria-label="Company credentials">
      <div className="container">
        <Reveal className="trust-grid" as="div">
          {stats.map((item, idx) => (
            <StatItem key={item._id || idx} number={item.number} label={item.label} />
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default TrustMetrics;

import React from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const SYSTEMS = ['Rieter', 'Trützschler', 'Lakshmi', 'Savio'];

const IndustriesBand = () => {
  return (
    <section id="industries" className="section section-alt">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="03 / Industries"
            title="Technical Expertise Across the Textile Manufacturing Ecosystem."
            lead="Experience supporting systems from leading textile machinery manufacturers, including:"
          />
        </Reveal>
        <Reveal as="ul" className="industries-grid">
          {SYSTEMS.map((name) => (
            <li key={name} className="industry-chip">
              {name}
            </li>
          ))}
        </Reveal>
        <p className="industries-note">
          …and other textile machinery systems commonly used across compact spinning and processing lines.
        </p>
      </div>
    </section>
  );
};

export default IndustriesBand;

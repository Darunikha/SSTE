import React from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const SYSTEMS = ['Rieter', 'Trützschler', 'Lakshmi', 'Savio'];
const LOOP = [...SYSTEMS, ...SYSTEMS, ...SYSTEMS, ...SYSTEMS];

const IndustriesBand = () => {
  return (
    <section id="industries" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="03 / Industries"
            title="Technical Expertise Across the Textile Manufacturing Ecosystem."
            lead="Experience supporting systems from leading textile machinery manufacturers, including:"
          />
        </Reveal>
      </div>
      <div className="industries-marquee">
        <ul className="industries-track">
          {LOOP.map((name, i) => (
            <li key={`${name}-${i}`} className="industry-chip" aria-hidden={i >= SYSTEMS.length}>
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <p className="industries-note">
          …and other textile machinery systems commonly used across compact spinning and processing lines.
        </p>
      </div>
    </section>
  );
};

export default IndustriesBand;

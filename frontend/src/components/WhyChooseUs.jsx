import React from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const REASONS = [
  {
    title: 'Deep Textile Machinery Experience',
    description: 'Years of hands-on experience across compact spinning and textile processing equipment.',
  },
  {
    title: 'Rapid Technical Response',
    description: 'Fast diagnosis and dispatch so a breakdown does not become an extended production loss.',
  },
  {
    title: 'Reliable Spare Parts Support',
    description: 'Commonly needed components kept in stock, with specialized parts sourced through our supplier network.',
  },
  {
    title: 'Electronics & Automation Expertise',
    description: 'PCB repairs, VFD servicing and control-panel diagnostics handled in-house.',
  },
  {
    title: 'Preventive Maintenance',
    description: 'Maintenance programs designed around your production schedule to reduce unplanned downtime.',
  },
  {
    title: 'Long-Term Customer Support',
    description: 'We work as a technical partner, not a one-time vendor, for the life of your machinery.',
  },
];

const WhyChooseUs = () => {
  return (
    <>
      <SectionHeading eyebrow="Why Sri Sastha" title="A Technical Partner You Can Rely On." level={3} />
      <Reveal as="div" className="why-us-grid stagger">
        {REASONS.map((reason, idx) => (
          <div key={reason.title} className="why-us-item">
            <span className="why-us-index">{String(idx + 1).padStart(2, '0')}</span>
            <h4>{reason.title}</h4>
            <p>{reason.description}</p>
          </div>
        ))}
      </Reveal>
    </>
  );
};

export default WhyChooseUs;

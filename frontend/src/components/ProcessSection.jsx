import React from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const STEPS = [
  { title: 'Tell Us What Happened' },
  { title: 'Technical Diagnosis' },
  { title: 'Repair / Replacement' },
  { title: 'Testing & Validation' },
  { title: 'Back to Production' },
];

const ProcessSection = () => {
  return (
    <>
      <SectionHeading eyebrow="Process" title="From Breakdown to Back in Production." level={3} />
      <Reveal as="ol" className="process-timeline">
        {STEPS.map((step, idx) => (
          <li key={step.title} className="process-step">
            <span className="process-index">{idx + 1}</span>
            <h4>{step.title}</h4>
          </li>
        ))}
      </Reveal>
    </>
  );
};

export default ProcessSection;

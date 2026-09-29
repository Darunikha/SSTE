import React from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const STEPS = [
  { title: 'Tell Us What Happened', detail: 'Call, message or send a quote request with the machine model and the fault you are seeing.' },
  { title: 'Technical Diagnosis', detail: 'Our engineers trace the issue on-site or on the bench: boards, drives, sensors or mechanics.' },
  { title: 'Repair / Replacement', detail: 'Component-level repair where possible, genuine or compatible spares where needed.' },
  { title: 'Testing & Validation', detail: 'Every unit is load-tested and validated against machine parameters before it leaves us.' },
  { title: 'Back to Production', detail: 'Fitted, commissioned and handed back, with follow-up support if anything looks off.' },
];

const ProcessSection = () => {
  return (
    <>
      <SectionHeading eyebrow="Process" title="From Breakdown to Back in Production." level={3} />
      <Reveal as="ol" className="process-timeline stagger">
        {STEPS.map((step, idx) => (
          <li key={step.title} className="process-step">
            <span className="process-index">{idx + 1}</span>
            <h4>{step.title}</h4>
            <p>{step.detail}</p>
          </li>
        ))}
      </Reveal>
    </>
  );
};

export default ProcessSection;

import React from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const REVIEWS = [
  {
    quote:
      'Sri Sastha diagnosed our spinning frame fault within hours and had the replacement parts on-site the same day. That kind of response keeps our line running.',
    name: 'Production Manager',
    role: 'Compact Spinning Unit, Coimbatore',
  },
  {
    quote:
      'Their electronics team rebuilt our VFD drive when the OEM quoted a six-week lead time. We were back in production in two days.',
    name: 'Maintenance Head',
    role: 'Textile Processing Plant, Tamil Nadu',
  },
  {
    quote:
      "We've moved our preventive maintenance program to Sri Sastha. Fewer breakdowns, and someone always picks up the phone.",
    name: 'Plant Engineer',
    role: 'Spinning Mill, Coimbatore',
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="05 / Reviews"
          title="What Textile Manufacturers Say About Us."
          lead="Sample feedback illustrating the kind of engagements we handle every week."
        />
        <Reveal as="div" className="reviews-grid">
          {REVIEWS.map((review) => (
            <div key={review.name} className="review-card">
              <span className="review-mark" aria-hidden="true">&ldquo;</span>
              <p className="review-quote">{review.quote}</p>
              <div className="review-author">
                <span className="review-name">{review.name}</span>
                <span className="review-role">{review.role}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default ReviewsSection;

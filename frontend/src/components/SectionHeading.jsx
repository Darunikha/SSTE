import React from 'react';

const SectionHeading = ({ eyebrow, title, lead, level = 2 }) => {
  const Tag = `h${level}`;

  return (
    <div className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className={`section-title ${level > 2 ? 'is-h3' : ''}`.trim()}>{title}</Tag>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
};

export default SectionHeading;

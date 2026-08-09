import React from 'react';

const getInitials = (text) =>
  (text || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

const TeamCard = ({ role, specialty }) => {
  return (
    <div className="team-card">
      <div className="team-monogram" aria-hidden="true">
        {getInitials(role)}
      </div>
      <h4>{role}</h4>
      <p>{specialty}</p>
    </div>
  );
};

export default TeamCard;

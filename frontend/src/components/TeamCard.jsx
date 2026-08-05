import React from 'react';

const TeamCard = ({ icon = '👨‍🔧', role, specialty }) => {
  return (
    <div className="team-card">
      <div className="team-image">{icon}</div>
      <div className="team-info">
        <h4>{role}</h4>
        <p>{specialty}</p>
      </div>
    </div>
  );
};

export default TeamCard;

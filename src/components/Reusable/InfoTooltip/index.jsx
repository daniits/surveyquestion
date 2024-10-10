import React from 'react';

const InfoTooltip = ({ text }) => (
  <div className="info-tooltip">
    <button className="info-button">i</button>
    <span className="tooltip-text">{text}</span>
  </div>
);

export default InfoTooltip

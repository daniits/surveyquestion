import React from 'react';
import './style.css';

const InfoTooltip = ({ text }) => (
  <div className="info-tooltip-container info-tooltip">
    <p className="info-button">i</p>
    <div className="tooltip-text">{text}</div>
  </div>
);

export default InfoTooltip;

import React from 'react';

const CircleLegendIcon = legend => (
  <span>
    <svg width="13" height="13" fill={legend.color}>
      <circle cx="6.5" cy="6.5" r="6.5" />
    </svg>
  </span>
);

export default CircleLegendIcon;
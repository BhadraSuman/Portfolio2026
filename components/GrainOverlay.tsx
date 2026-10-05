'use client';

import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden opacity-[0.04] mix-blend-multiply">
      <svg className="w-full h-full opacity-100">
        <filter id="paper-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain-filter)" />
      </svg>
    </div>
  );
};

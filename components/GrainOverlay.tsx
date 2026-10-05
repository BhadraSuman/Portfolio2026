'use client';

import React, { useEffect, useState } from 'react';

export const GrainOverlay: React.FC = () => {
  const [patternUrl, setPatternUrl] = useState<string>('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(200, 200);
    const data = imgData.data;

    // Soft, fine micro-grain paper noise algorithm
    for (let i = 0; i < data.length; i += 4) {
      const v = 200 + Math.floor(Math.random() * 55); // Warm paper tint range
      data[i] = v;     // R
      data[i + 1] = v; // G
      data[i + 2] = v; // B
      data[i + 3] = Math.floor(Math.random() * 14); // Ultra-soft 5% max alpha
    }

    ctx.putImageData(imgData, 0, 0);
    setPatternUrl(canvas.toDataURL());
  }, []);

  if (!patternUrl) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 w-full h-full opacity-20 mix-blend-multiply"
      style={{
        backgroundImage: `url(${patternUrl})`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

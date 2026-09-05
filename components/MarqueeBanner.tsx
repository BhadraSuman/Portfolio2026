'use client';

import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    'QUICKSHELF.IN (RETAIL POS & IOT)',
    'GO (GOLANG) & CONCURRENCY',
    'FULL STACK DEVELOPER',
    'REVERSE TUNNEL PROXY ENGINE',
    'CLOUD ENGINEER (AZURE & GCP)',
    'MERN STACK & TYPESCRIPT',
    'REAL-TIME AI WEBRTC AGENTS',
  ];

  return (
    <div className="w-full py-6 border-y border-black/[0.06] bg-[#f3f2ef] overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 4 }).map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center gap-8 px-4">
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="font-mono-tag text-xs font-bold tracking-widest text-[#1a1a1a]/80 uppercase">
                  {item}
                </span>
                <span className="text-[#e85a3b] text-sm">✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

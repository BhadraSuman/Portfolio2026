'use client';

import React from 'react';
import { Sparkles, Cpu, Cloud, Terminal, ShieldCheck, Zap } from 'lucide-react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    { text: 'QUICKSHELF.IN (RETAIL POS & IOT)', tag: 'FEATURED SAAS', isHighlight: true, icon: Zap },
    { text: 'GO 1.26 & HIGH CONCURRENCY', tag: 'CORE TECH', isHighlight: false, icon: Cpu },
    { text: 'FULL STACK & CLOUD ARCHITECTURE', tag: 'SPECIALIZATION', isHighlight: false, icon: Cloud },
    { text: 'REVERSE TUNNEL PROXY ENGINE', tag: 'NETWORKING', isHighlight: true, icon: Terminal },
    { text: 'AZURE & GCP DEPLOYMENTS', tag: 'CLOUD INFRA', isHighlight: false, icon: ShieldCheck },
    { text: 'NEXT.JS 16 & REACT 19', tag: 'FRONTEND', isHighlight: false, icon: Sparkles },
    { text: 'REAL-TIME WEBRTC AI AGENTS', tag: 'AI LABS', isHighlight: true, icon: Zap },
  ];

  return (
    <div className="w-full py-5 border-y border-black/[0.08] bg-[#f3f2ef]/80 backdrop-blur-sm overflow-hidden select-none relative group">
      {/* Edge gradient masks for seamless fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#faf9f7] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#faf9f7] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee">
        {Array.from({ length: 4 }).map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center gap-6 px-3">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-black/[0.06] shadow-sm hover:border-[#e85a3b]/40 transition-colors">
                    <Icon className={`w-3.5 h-3.5 ${item.isHighlight ? 'text-[#e85a3b]' : 'text-[#6b7280]'}`} />
                    <span className="font-mono-tag text-xs font-bold text-[#1a1a1a] tracking-wider uppercase">
                      {item.text}
                    </span>
                    <span className="ml-1 text-[9px] font-mono-tag font-bold px-1.5 py-0.5 rounded bg-[#f3f2ef] text-[#e85a3b]">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-[#e85a3b] text-xs font-serif-title italic">✦</span>
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};


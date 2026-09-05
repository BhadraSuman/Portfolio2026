'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t-2 border-[#e85a3b]/20 bg-[#faf9f7] pt-12 pb-24 text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10 overflow-hidden">
        <h2 className="font-serif-title text-5xl sm:text-7xl md:text-8xl text-[#1a1a1a] tracking-tight uppercase select-none opacity-95">
          SUMAN BHADRA
        </h2>
      </div>

      <div className="border-t border-black/[0.04] pt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono-tag text-xs text-[#6b7280]">
            © 2026 · Full Stack Developer & Cloud Engineer · Kolkata, India
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono-tag font-bold text-[#6b7280] hover:text-[#e85a3b] transition cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

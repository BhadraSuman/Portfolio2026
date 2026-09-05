'use client';

import React, { useState, useEffect } from 'react';
import { Command, Sparkles, Code2 } from 'lucide-react';

interface NavbarProps {
  onOpenCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer"
          data-cursor="Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-base font-heading">
              Alex Rivera
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
              Creative Developer
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
          <a
            href="#hero"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
          >
            Hero & Options
          </a>
          <a
            href="#about"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
          >
            About & Skills
          </a>
          <a
            href="#projects"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCommand}
            data-cursor="Search"
            className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-200/80 transition cursor-pointer"
          >
            <Command className="w-3.5 h-3.5 text-slate-500" />
            <span>Cmd + K</span>
          </button>

          <a
            href="#contact"
            data-cursor="Hire Me"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </header>
  );
};

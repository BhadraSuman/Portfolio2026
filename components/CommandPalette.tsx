'use client';

import React, { useEffect, useState } from 'react';
import { Search, X, ExternalLink, ArrowRight, FolderGit2, Sparkles, UserCheck, Code2, Briefcase, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const items = [
    {
      type: 'Navigation',
      label: 'Jump to Featured Projects',
      sublabel: 'FrameFlow, Quickshelf, Reverse Tunnel & UtsavPatra',
      icon: FolderGit2,
      action: () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      type: 'Navigation',
      label: 'Jump to Experience Timeline',
      sublabel: 'Full Stack & Cloud Engineer experience',
      icon: Briefcase,
      action: () => {
        const el = document.getElementById('experience');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      type: 'Navigation',
      label: 'Jump to Technical Skills',
      sublabel: 'Go, Node.js, Next.js 16, Supabase, Azure & GCP',
      icon: Code2,
      action: () => {
        const el = document.getElementById('skills');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      type: 'Navigation',
      label: 'Jump to Contact & Links',
      sublabel: 'Connect with Suman via Email or Socials',
      icon: Mail,
      action: () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      type: 'Live SaaS',
      label: 'FrameFlow — Photo Proofing SaaS',
      sublabel: 'AWS S3, BullMQ, Caddy HTTP/3 & Node.js',
      icon: ExternalLink,
      action: () => {
        window.open('https://frameflow.quickshelf.online', '_blank');
        setIsOpen(false);
      },
    },
    {
      type: 'Live SaaS',
      label: 'Quickshelf — Retail Tech Platform',
      sublabel: 'Next.js 16, Supabase RLS & Hardware IoT POS',
      icon: ExternalLink,
      action: () => {
        window.open('https://quickshelf.in', '_blank');
        setIsOpen(false);
      },
    },
    {
      type: 'Live Tool',
      label: 'Reverse Tunnel (Ngrok Alternative)',
      sublabel: 'Golang 1.26, WebSockets, MCP Server & GCP',
      icon: ExternalLink,
      action: () => {
        window.open('https://dashboard.quickshelf.online/', '_blank');
        setIsOpen(false);
      },
    },
    {
      type: 'Live SaaS',
      label: 'UtsavPatra — Wedding Invitations',
      sublabel: '14 Culturally-Aware Templates & Web Audio API',
      icon: ExternalLink,
      action: () => {
        window.open('https://utsavpatra.vercel.app/', '_blank');
        setIsOpen(false);
      },
    },
    {
      type: 'Social',
      label: 'LinkedIn Profile',
      sublabel: 'https://www.linkedin.com/in/bhadrasuman',
      icon: UserCheck,
      action: () => {
        window.open('https://www.linkedin.com/in/bhadrasuman', '_blank');
        setIsOpen(false);
      },
    },
    {
      type: 'Social',
      label: 'GitHub Repositories',
      sublabel: 'https://github.com/BhadraSuman',
      icon: Sparkles,
      action: () => {
        window.open('https://github.com/BhadraSuman', '_blank');
        setIsOpen(false);
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.sublabel.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Trigger Button in Fixed Header / Floating Bar */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 right-5 z-[999] hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-white/80 hover:bg-white backdrop-blur-md border border-black/[0.08] shadow-sm rounded-full text-xs font-mono-tag font-bold text-[#1a1a1a]/80 hover:text-[#e85a3b] transition-all cursor-pointer group"
      >
        <Search className="w-3.5 h-3.5 text-[#e85a3b]" />
        <span>SEARCH</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-sans bg-[#f3f2ef] rounded border border-black/10 text-[#1a1a1a]/60 group-hover:border-[#e85a3b]/40">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[10000] bg-[#1a1a1a]/50 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col"
            >
              {/* Search Header */}
              <div className="flex items-center px-5 py-4 border-b border-black/[0.06] bg-[#faf9f7]">
                <Search className="w-4 h-4 text-[#e85a3b] mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Type a command, project name, or navigation target..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none text-[#1a1a1a] placeholder-[#6b7280] font-medium"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[#6b7280] hover:text-[#1a1a1a] rounded-lg hover:bg-black/5 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-2 max-h-[60vh] overflow-y-auto divide-y divide-black/[0.03]">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl hover:bg-[#f3f2ef] text-left transition group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className="p-2 rounded-xl bg-white border border-black/[0.06] group-hover:border-[#e85a3b]/30 group-hover:text-[#e85a3b] text-[#1a1a1a] shadow-2xs transition shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-bold text-[#1a1a1a] group-hover:text-[#e85a3b] transition truncate">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-[#6b7280] truncate">
                              {item.sublabel}
                            </div>
                          </div>
                        </div>

                        <span className="text-[9px] font-mono-tag font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/5 text-[#1a1a1a]/60 shrink-0">
                          {item.type}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-xs text-[#6b7280] font-medium">
                    No matching commands or projects found
                  </div>
                )}
              </div>

              {/* Footer Bar */}
              <div className="bg-[#faf9f7] px-5 py-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#6b7280] font-mono-tag">
                <span className="flex items-center gap-1">
                  <span>Press</span>
                  <kbd className="px-1.5 py-0.5 bg-white border border-black/10 rounded text-[#1a1a1a] font-mono font-semibold">ESC</kbd>
                  <span>to exit</span>
                </span>
                <span className="font-bold text-[#1a1a1a]">SUMAN BHADRA • PORTFOLIO</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

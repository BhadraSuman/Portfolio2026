'use client';

import React, { useEffect, useState } from 'react';
import { Search, X, Eye, Waves, Flame, Binary, ArrowRight } from 'lucide-react';
import { PhotoEffect } from './HeroPhotoCanvas';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: PhotoEffect) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectMode }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    {
      type: 'Hero Photo Effect',
      label: 'Glass Torch Magnifier',
      icon: Eye,
      action: () => {
        onSelectMode('glass-torch');
        onClose();
      },
    },
    {
      type: 'Hero Photo Effect',
      label: 'Liquid Ripple Wave',
      icon: Waves,
      action: () => {
        onSelectMode('liquid-ripple');
        onClose();
      },
    },
    {
      type: 'Hero Photo Effect',
      label: 'Thermal Infrared Heatmap',
      icon: Flame,
      action: () => {
        onSelectMode('thermal-heat');
        onClose();
      },
    },
    {
      type: 'Hero Photo Effect',
      label: 'Live ASCII Matrix Code',
      icon: Binary,
      action: () => {
        onSelectMode('ascii-matrix');
        onClose();
      },
    },
    {
      type: 'Navigation',
      label: 'Jump to Projects Showcase',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      },
    },
    {
      type: 'Navigation',
      label: 'Jump to About & Skills',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#about';
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3.5 text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-slate-50">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-indigo-50/80 text-left transition group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-600 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-950">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 group-hover:text-indigo-500">
                    {item.type}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">
              No matching commands found
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>Use <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">Esc</kbd> to exit</span>
          <span>Next.js Interactive Portfolio</span>
        </div>
      </div>
    </div>
  );
};

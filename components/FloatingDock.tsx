'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase, User, Wrench, Mail, Send, Github } from 'lucide-react';

interface DockItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
}

const dockItems: DockItem[] = [
  { label: 'Work', href: '#projects', icon: Briefcase },
  { label: 'About', href: '#about', icon: User },
  { label: 'Services', href: '#services', icon: Wrench },
  { label: 'Contact', href: '#contact', icon: Mail },
  { label: 'Telegram', href: 'https://t.me', icon: Send, isExternal: true },
  { label: 'GitHub', href: 'https://github.com', icon: Github, isExternal: true },
];

export const FloatingDock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-auto">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass-dock px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl border border-black/[0.08]"
      >
        {dockItems.map((item, i) => (
          <React.Fragment key={item.label}>
            {i === 4 && <div className="w-px h-5 bg-black/10 mx-1" />}
            <DockIcon mouseX={mouseX} item={item} />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

function DockIcon({ mouseX, item }: { mouseX: any; item: DockItem }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [40, 56, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 14 });

  const Icon = item.icon;

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.isExternal ? '_blank' : '_self'}
      rel={item.isExternal ? 'noopener noreferrer' : ''}
      style={{ width, height: width }}
      className="relative rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-[#1a1a1a]/70 hover:text-[#e85a3b] transition-colors group cursor-pointer"
    >
      <Icon className="w-5 h-5" />

      {/* Tooltip Badge */}
      <span className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1a1a1a] text-white text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded-md pointer-events-none shadow-md whitespace-nowrap">
        {item.label}
      </span>
    </motion.a>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPointer, setIsPointer] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target) {
        const cursorData = target.closest('[data-cursor]');
        if (cursorData) {
          const text = cursorData.getAttribute('data-cursor') || '';
          setCursorText(text);
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }

        const isInteractive = target.closest('a, button, input, [role="button"]');
        setIsPointer(!!isInteractive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovered ? 36 : isPointer ? 24 : 16),
          y: mousePosition.y - (isHovered ? 36 : isPointer ? 24 : 16),
          width: isHovered ? 72 : isPointer ? 48 : 32,
          height: isHovered ? 72 : isPointer ? 48 : 32,
          scale: isPointer ? 1.15 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.5 }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-300 flex items-center justify-center ${
            isHovered
              ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-500/30 text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm'
              : isPointer
              ? 'border-2 border-indigo-600 bg-indigo-50/40'
              : 'border border-slate-400/60 bg-white/20 backdrop-blur-[1px]'
          }`}
        >
          {isHovered && <span className="px-1 text-center select-none">{cursorText}</span>}
        </div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-2 h-2 rounded-full bg-indigo-600"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />
    </>
  );
};

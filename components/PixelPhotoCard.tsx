'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Sliders, Upload, RefreshCw } from 'lucide-react';

interface ImageRevealCardProps {
  colorImageSrc?: string;
  sketchImageSrc?: string;
  defaultRadius?: number;
}

export const PixelPhotoCard: React.FC<ImageRevealCardProps> = ({
  colorImageSrc = '/suman.jpg',
  sketchImageSrc,
  defaultRadius = 90,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [revealRadius, setRevealRadius] = useState<number>(defaultRadius);
  const [feathering, setFeathering] = useState<number>(70); // 70% edge feather transition
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Animation frame reference to prevent layout thrashing
  const animFrameRef = useRef<number | null>(null);
  const targetPosRef = useRef({ x: -500, y: -500 });
  const currentPosRef = useRef({ x: -500, y: -500 });

  const activeColorImage = customPhoto || colorImageSrc;

  // Handle custom photo upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 60FPS Lerp Animation Loop using requestAnimationFrame
  const updateMaskPosition = useCallback(() => {
    if (!containerRef.current) return;

    // Smooth linear interpolation (lerp) for buttery 60fps tracking
    currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.2;
    currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.2;

    const el = containerRef.current;
    el.style.setProperty('--mouse-x', `${currentPosRef.current.x}px`);
    el.style.setProperty('--mouse-y', `${currentPosRef.current.y}px`);

    animFrameRef.current = requestAnimationFrame(updateMaskPosition);
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(updateMaskPosition);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateMaskPosition]);

  // Pointer Movement Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handlePointerMove(e);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Smoothly animate cursor out of view when pointer leaves
    targetPosRef.current = { x: -500, y: -500 };
  };

  // Dynamic CSS radial gradient mask style
  // Adjust 'revealRadius' for size and 'feathering' for edge softness
  const maskStyle = isHovered
    ? {
        WebkitMaskImage: `radial-gradient(circle ${revealRadius}px at var(--mouse-x, -500px) var(--mouse-y, -500px), transparent 0%, rgba(0, 0, 0, 0.4) ${feathering}%, black 100%)`,
        maskImage: `radial-gradient(circle ${revealRadius}px at var(--mouse-x, -500px) var(--mouse-y, -500px), transparent 0%, rgba(0, 0, 0, 0.4) ${feathering}%, black 100%)`,
      }
    : {
        WebkitMaskImage: 'none',
        maskImage: 'none',
      };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* 1. Layering Container */}
      <div className="relative group">
        {/* Glow Aura Backdrop */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-[#e85a3b] via-amber-500 to-rose-500 rounded-[2.5rem] blur-xl opacity-25 group-hover:opacity-50 transition duration-500" />

        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-[2rem] bg-[#faf9f7] overflow-hidden shadow-2xl border-4 border-white cursor-crosshair select-none transition-transform duration-300 group-hover:scale-[1.01]"
        >
          {/* BOTTOM LAYER: Full-Color Vibrant Portrait (Suman Bhadra) */}
          <img
            src={activeColorImage}
            alt="Suman Bhadra Full Color"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl pointer-events-none"
          />

          {/* TOP LAYER: Grayscale / Pencil Sketch Filtered Version */}
          {/* Masked away dynamically at cursor position via CSS mask-image */}
          <div
            style={maskStyle}
            className="absolute inset-0 w-full h-full pointer-events-none transition-[mask-image,-webkit-mask-image] duration-150"
          >
            <img
              src={sketchImageSrc || activeColorImage}
              alt="Suman Bhadra Pencil Sketch"
              className="w-full h-full object-cover rounded-2xl grayscale contrast-125 brightness-105"
            />
            {/* Fine Pencil Texture Crosshatching Overlay */}
            <div className="absolute inset-0 bg-grid-dots opacity-30 mix-blend-overlay pointer-events-none" />
          </div>

          {/* Hover Helper Badge */}
          {!isHovered && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1a1a1a]/90 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg animate-bounce pointer-events-none z-20">
              <Sparkles className="w-3.5 h-3.5 text-[#e85a3b]" />
              <span>Hover mouse over sketch!</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Controls Drawer */}
      <div className="w-full mt-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-black/[0.08] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1a1a1a] uppercase tracking-wider font-mono-tag">
            <Sliders className="w-4 h-4 text-[#e85a3b]" />
            <span>Eraser Mask Controls</span>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-[#e85a3b] font-semibold cursor-pointer hover:underline transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Sliders for Reveal Radius & Edge Feathering */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-[#6b7280] font-medium font-mono-tag">
              {/* How to adjust radius: Change revealRadius value below */}
              <span>Reveal Radius</span>
              <span className="font-mono text-[#e85a3b] font-bold">{revealRadius}px</span>
            </div>
            <input
              type="range"
              min="40"
              max="160"
              value={revealRadius}
              onChange={(e) => setRevealRadius(Number(e.target.value))}
              className="w-full accent-[#e85a3b] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-[#6b7280] font-medium font-mono-tag">
              {/* How to adjust edge feathering softness: Change feathering % */}
              <span>Edge Feathering</span>
              <span className="font-mono text-[#e85a3b] font-bold">{feathering}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="90"
              value={feathering}
              onChange={(e) => setFeathering(Number(e.target.value))}
              className="w-full accent-[#e85a3b] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {customPhoto && (
          <button
            onClick={() => setCustomPhoto(null)}
            className="self-end text-[11px] text-[#6b7280] hover:text-rose-600 flex items-center gap-1 mt-1 font-medium transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Suman&apos;s photo</span>
          </button>
        )}
      </div>
    </div>
  );
};

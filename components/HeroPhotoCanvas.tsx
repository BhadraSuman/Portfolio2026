'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Sliders, Upload, RefreshCw, Eye, Waves, Flame, Binary } from 'lucide-react';

export type PhotoEffect = 'glass-torch' | 'liquid-ripple' | 'thermal-heat' | 'ascii-matrix';

interface HeroPhotoCanvasProps {
  currentEffect: PhotoEffect;
  onEffectChange: (effect: PhotoEffect) => void;
}

export const HeroPhotoCanvas: React.FC<HeroPhotoCanvasProps> = ({ currentEffect, onEffectChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [lensRadius, setLensRadius] = useState<number>(90);
  const [pixelSize, setPixelSize] = useState<number>(14);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Procedural default photo generator with rich details
  const createDefaultAvatarDataUrl = (): string => {
    if (typeof window === 'undefined') return '';
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 400;
    tempCanvas.height = 400;
    const ctx = tempCanvas.getContext('2d')!;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 400, 400);
    bgGrad.addColorStop(0, '#4f46e5'); // Indigo
    bgGrad.addColorStop(0.5, '#7c3aed'); // Violet
    bgGrad.addColorStop(1, '#db2777'); // Pink
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 400, 400);

    // Decorative geometric patterns
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 8;
    for (let r = 50; r <= 180; r += 30) {
      ctx.beginPath();
      ctx.arc(200, 200, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Stylized Face / Portrait Silhouette
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(200, 170, 70, 0, Math.PI * 2);
    ctx.fill();

    // Hair / Cap
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(200, 150, 72, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fill();

    // Modern Visor / Glasses
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(140, 155, 120, 36, 12);
    } else {
      ctx.rect(140, 155, 120, 36);
    }
    ctx.fill();

    // Cyan / Purple Lens Reflection
    ctx.fillStyle = '#06b6d4';
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(146, 161, 50, 24, 8);
      ctx.roundRect(204, 161, 50, 24, 8);
    } else {
      ctx.rect(146, 161, 50, 24);
      ctx.rect(204, 161, 50, 24);
    }
    ctx.fill();

    // Smile
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(200, 195, 26, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Shoulders
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(200, 340, 130, 85, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4f46e5';
    ctx.beginPath();
    ctx.ellipse(200, 345, 55, 75, 0, 0, Math.PI * 2);
    ctx.fill();

    return tempCanvas.toDataURL();
  };

  const [activeImageUri, setActiveImageUri] = useState<string>('');

  useEffect(() => {
    setActiveImageUri(imageSrc || createDefaultAvatarDataUrl());
  }, [imageSrc]);

  const mouseRef = useRef({ x: 200, y: 200, targetX: 200, targetY: 200 });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Main Canvas Render Loop
  useEffect(() => {
    if (!activeImageUri) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let waveTime = 0;

    const img = new Image();
    img.src = activeImageUri;

    img.onload = () => {
      const width = 400;
      const height = 400;
      canvas.width = width;
      canvas.height = height;

      // Offscreen Pixelated Low-Res Canvas
      const lowResCanvas = document.createElement('canvas');
      const lowResCtx = lowResCanvas.getContext('2d')!;
      const gridW = Math.max(8, Math.floor(width / pixelSize));
      const gridH = Math.max(8, Math.floor(height / pixelSize));
      lowResCanvas.width = gridW;
      lowResCanvas.height = gridH;
      lowResCtx.drawImage(img, 0, 0, gridW, gridH);

      // Offscreen High-Res Canvas
      const highResCanvas = document.createElement('canvas');
      highResCanvas.width = width;
      highResCanvas.height = height;
      const highResCtx = highResCanvas.getContext('2d')!;
      highResCtx.drawImage(img, 0, 0, width, height);

      const render = () => {
        waveTime += 0.05;

        // Smooth mouse spring interpolation
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.18;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.18;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        ctx.clearRect(0, 0, width, height);

        // ALWAYS draw pixelated image as base background
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(lowResCanvas, 0, 0, gridW, gridH, 0, 0, width, height);

        if (isHovered) {
          if (currentEffect === 'glass-torch') {
            // --- EFFECT 1: Sleek Glass Torch Magnifier ---
            ctx.save();
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius, 0, Math.PI * 2);
            ctx.clip();

            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(highResCanvas, 0, 0);
            ctx.restore();

            // Outer ring border with glass refraction glint
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 3.5;
            ctx.stroke();

            // Glass glare arc reflection
            ctx.beginPath();
            ctx.arc(mx - lensRadius * 0.35, my - lensRadius * 0.35, lensRadius * 0.5, -Math.PI * 0.7, -Math.PI * 0.2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Outer glow ring
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius + 6, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();

          } else if (currentEffect === 'liquid-ripple') {
            // --- EFFECT 2: Fluid Liquid Wave Ripple Lens ---
            ctx.save();
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius, 0, Math.PI * 2);
            ctx.clip();

            // Draw high-res image with liquid wave distortion
            ctx.imageSmoothingEnabled = true;
            const waveX = Math.sin(waveTime * 2) * 5;
            const waveY = Math.cos(waveTime * 2) * 5;
            ctx.drawImage(highResCanvas, waveX, waveY, width, height);

            // Draw concentric liquid wave rings
            for (let i = 1; i <= 3; i++) {
              const r = (waveTime * 30 + i * 25) % lensRadius;
              ctx.beginPath();
              ctx.arc(mx, my, r, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.6 - r / lensRadius})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }

            ctx.restore();

            // Liquid rim border
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 3;
            ctx.stroke();

          } else if (currentEffect === 'thermal-heat') {
            // --- EFFECT 3: Thermal Infrared Heatmap Lens ---
            ctx.save();
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius, 0, Math.PI * 2);
            ctx.clip();

            // Draw high res image with color heat filter
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(highResCanvas, 0, 0);

            // Thermal color overlay blend mode
            const heatGrad = ctx.createRadialGradient(mx, my, 5, mx, my, lensRadius);
            heatGrad.addColorStop(0, 'rgba(239, 68, 68, 0.7)'); // Hot Red
            heatGrad.addColorStop(0.4, 'rgba(234, 179, 8, 0.6)'); // Yellow
            heatGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.5)'); // Green
            heatGrad.addColorStop(1, 'rgba(59, 130, 246, 0.4)'); // Cool Blue
            ctx.fillStyle = heatGrad;
            ctx.globalCompositeOperation = 'color';
            ctx.fillRect(mx - lensRadius, my - lensRadius, lensRadius * 2, lensRadius * 2);
            ctx.globalCompositeOperation = 'source-over';

            ctx.restore();

            // Fiery ring border
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 3;
            ctx.stroke();

          } else if (currentEffect === 'ascii-matrix') {
            // --- EFFECT 4: Live ASCII Text Code Lens ---
            ctx.save();
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius, 0, Math.PI * 2);
            ctx.clip();

            // Dark matrix background inside lens
            ctx.fillStyle = '#090d16';
            ctx.fillRect(mx - lensRadius, my - lensRadius, lensRadius * 2, lensRadius * 2);

            // Draw dynamic glowing ASCII text matrix
            const chars = ['@', '#', '$', '%', '&', '*', '1', '0', 'X', 'A', '7', 'Y'];
            ctx.font = '11px monospace';
            ctx.fillStyle = '#10b981'; // Matrix Emerald Green

            const step = 14;
            const startX = Math.floor((mx - lensRadius) / step) * step;
            const endX = mx + lensRadius;
            const startY = Math.floor((my - lensRadius) / step) * step;
            const endY = my + lensRadius;

            for (let x = startX; x <= endX; x += step) {
              for (let y = startY; y <= endY; y += step) {
                const dist = Math.hypot(x - mx, y - my);
                if (dist <= lensRadius) {
                  const charIdx = Math.floor(Math.sin(x * 0.1 + y * 0.1 + waveTime * 2) * 6 + 6) % chars.length;
                  ctx.fillText(chars[charIdx], x, y);
                }
              }
            }

            ctx.restore();

            // Emerald cyber ring border
            ctx.beginPath();
            ctx.arc(mx, my, lensRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.stroke();
          }
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeImageUri, currentEffect, lensRadius, pixelSize, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current.targetX = (x / rect.width) * 400;
    mouseRef.current.targetY = (y / rect.height) * 400;
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Effect Selection Switcher Bar */}
      <div className="w-full bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-1">
        <button
          onClick={() => onEffectChange('glass-torch')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            currentEffect === 'glass-torch'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Glass Torch</span>
        </button>

        <button
          onClick={() => onEffectChange('liquid-ripple')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            currentEffect === 'liquid-ripple'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Waves className="w-3.5 h-3.5" />
          <span>Liquid Ripple</span>
        </button>

        <button
          onClick={() => onEffectChange('thermal-heat')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            currentEffect === 'thermal-heat'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Thermal Heat</span>
        </button>

        <button
          onClick={() => onEffectChange('ascii-matrix')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            currentEffect === 'ascii-matrix'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Binary className="w-3.5 h-3.5" />
          <span>ASCII Matrix</span>
        </button>
      </div>

      {/* Main Interactive Frame */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-3xl bg-white overflow-hidden shadow-2xl border-4 border-white cursor-crosshair flex items-center justify-center select-none"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover rounded-2xl"
          />

          {!isHovered && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg animate-bounce pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Hover mouse over pixel photo!</span>
            </div>
          )}
        </div>
      </div>

      {/* Effect Control Sliders & Custom Photo Uploader */}
      <div className="w-full mt-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>Adjust Effect & Upload Photo</span>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold cursor-pointer hover:text-indigo-800 transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Your Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>Hover Radius</span>
              <span className="font-mono text-indigo-600">{lensRadius}px</span>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              value={lensRadius}
              onChange={(e) => setLensRadius(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>Pixel Coarseness</span>
              <span className="font-mono text-indigo-600">{pixelSize}px</span>
            </div>
            <input
              type="range"
              min="6"
              max="30"
              value={pixelSize}
              onChange={(e) => setPixelSize(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {imageSrc && (
          <button
            onClick={() => setImageSrc(null)}
            className="self-end text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-1 mt-1 font-medium transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to default photo</span>
          </button>
        )}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { FloatingDock } from '@/components/FloatingDock';
import { MarqueeBanner } from '@/components/MarqueeBanner';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ArrowDown, Terminal, Cloud, Cpu } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a] relative selection:bg-[#e85a3b]/20 selection:text-[#e85a3b]">
      {/* Floating Bottom Mac-Style Dock Navigation */}
      <FloatingDock />

      {/* Hero Section */}
      <section id="hero" className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e85a3b]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Hero Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-sm text-xs font-mono-tag font-bold text-[#1a1a1a] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#e85a3b] animate-pulse" />
          <span>FULL STACK DEVELOPER & CLOUD ENGINEER</span>
        </div>

        {/* PROMINENT EDITORIAL NAME HEADLINE */}
        <h1 className="font-serif-title text-6xl sm:text-8xl md:text-9xl text-[#1a1a1a] tracking-tight max-w-5xl leading-[0.9] mb-4 uppercase">
          SUMAN BHADRA
        </h1>

        <p className="font-serif-title text-2xl sm:text-4xl text-[#e85a3b] italic mb-8 max-w-3xl">
          Architecting High-Concurrency Go, MERN & Cloud Infrastructure
        </p>

        <p className="text-[#6b7280] text-base sm:text-lg max-w-2xl font-normal leading-relaxed mb-10">
          1.5+ years experience building production MERN applications, high-concurrency Go reverse proxies, operating cloud infrastructure on Azure & GCP, and building retail IoT SaaS.
        </p>

        {/* Key Highlight Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl border border-black/[0.06] text-xs font-semibold text-[#1a1a1a] shadow-sm">
            <Cpu className="w-4 h-4 text-[#e85a3b]" />
            <span>Go (Golang) & Microservices</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl border border-black/[0.06] text-xs font-semibold text-[#1a1a1a] shadow-sm">
            <Cloud className="w-4 h-4 text-[#e85a3b]" />
            <span>Microsoft Azure & GCP</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl border border-black/[0.06] text-xs font-semibold text-[#1a1a1a] shadow-sm">
            <Terminal className="w-4 h-4 text-[#e85a3b]" />
            <span>Next.js 16 & Supabase</span>
          </span>
        </div>

        {/* Scroll CTA */}
        <a
          href="#experience"
          className="inline-flex items-center gap-2 text-xs font-mono-tag font-bold text-[#6b7280] hover:text-[#e85a3b] transition group cursor-pointer"
        >
          <span>EXPLORE SUMAN&apos;S EXPERIENCE & PROJECTS</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </section>

      {/* Kinetic Marquee Ticker */}
      <MarqueeBanner />

      {/* Professional Experience Timeline */}
      <ExperienceSection />

      {/* Featured Projects Showcase (Quickshelf.in, Reverse Tunnel, AI Interview Agent, Kaprilux) */}
      <ProjectsSection />

      {/* Skills & Technical Expertise */}
      <SkillsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

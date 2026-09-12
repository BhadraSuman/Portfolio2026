'use client';

import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, ExternalLink, Activity, GitCommit, Sparkles } from 'lucide-react';

export function GitHubContributions() {
  // Theme matching warm light mode (#faf9f7) with vibrant green contribution blocks
  const customTheme = {
    light: [
      '#f3f2ef', // Level 0: background neutral light gray
      '#86efac', // Level 1: soft mint green
      '#4ade80', // Level 2: vibrant green
      '#22c55e', // Level 3: emerald green
      '#15803d', // Level 4: deep forest green
    ],
  };

  return (
    <section id="github" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e85a3b]/10 text-[#e85a3b] text-xs font-mono-tag font-bold uppercase mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Open Source & Commit Activity</span>
          </div>
          <h2 className="font-serif-title text-4xl sm:text-5xl text-[#1a1a1a] tracking-tight">
            GITHUB CONTRIBUTIONS
          </h2>
        </div>

        <a
          href="https://github.com/BhadraSuman"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] text-white rounded-xl text-xs font-semibold hover:bg-[#e85a3b] transition-colors shadow-sm self-start md:self-auto"
        >
          <Github className="w-4 h-4" />
          <span>@BhadraSuman on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
        </a>
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#22c55e]/5 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Top Info Bar inside card */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-black/[0.06] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f3f2ef] flex items-center justify-center text-[#1a1a1a]">
              <GitCommit className="w-5 h-5 text-[#22c55e]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a1a] flex items-center gap-2">
                Contribution Matrix
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-[#22c55e]/10 text-[#15803d]">
                  <Sparkles className="w-3 h-3" /> Live GitHub Stream
                </span>
              </h3>
              <p className="text-xs text-[#6b7280]">
                Daily code commits, pull requests, and open-source updates over the past year
              </p>
            </div>
          </div>
        </div>

        {/* Calendar Grid Container (Horizontal scroll on small screens) */}
        <div className="overflow-x-auto pb-2 pt-1 flex justify-center sm:justify-start lg:justify-center relative z-10 scrollbar-thin">
          <div className="min-w-[750px] flex justify-center">
            <GitHubCalendar
              username="BhadraSuman"
              colorScheme="light"
              theme={customTheme}
              blockSize={13}
              blockMargin={4}
              fontSize={12}
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

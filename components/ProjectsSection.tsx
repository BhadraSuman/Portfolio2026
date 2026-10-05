'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, CheckCircle2, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  type: 'production' | 'lab';
  description: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  demoUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'FrameFlow — Photo Proofing & Studio Portal',
    category: 'Full-Stack Node.js & AWS',
    type: 'production',
    description: 'End-to-end photo selection portal featuring luxury client proofing galleries and studio management dashboard for wedding and event photographers.',
    highlights: [
      'Direct-to-S3 Uploads: Browser streams photos straight to AWS S3 via presigned URLs, avoiding RAM exhaustion during 2,000+ photo batch uploads.',
      'Background Image Crunching: Decoupled Sharp + Redis/BullMQ worker auto-generates responsive WebP thumbnails and previews in milliseconds.',
      'Zero-Lockin Storage: Custom storage driver running on AWS S3, easily swappable to Cloudflare R2 ($0 egress bandwidth fees) with a single .env change.',
      'Secure Client Proofing: 4-digit PIN-protected galleries, mobile-friendly hearting/selection tracking, and 1-click ZIP exports.',
      'Production-Ready Infra: Multi-container Docker Compose on AWS EC2, automated SSL via Caddy (HTTP/3), and GitHub Actions CI/CD pipeline.',
    ],
    tags: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis & BullMQ', 'Sharp', 'AWS S3 & EC2', 'Docker', 'Caddy HTTP/3'],
    gradient: 'from-purple-600 via-[#e85a3b] to-indigo-700',
    demoUrl: 'https://frameflow.quickshelf.online',
    githubUrl: 'https://github.com/BhadraSuman/FrameFlow',
  },
  {
    id: 2,
    title: 'Quickshelf — Retail Tech Platform',
    category: 'Next.js 16 & Supabase Retail SaaS',
    type: 'production',
    description: 'Integrated retail software & ESL hardware platform (Billing POS, Inventory Management, Electronic Shelf Labels, Loyalty & CRM Analytics) for supermarkets and retail chains.',
    highlights: [
      'Built with Next.js 16 App Router, React 19, and Tailwind CSS 4 with custom CSS variable design tokens.',
      'Implemented Supabase-backed serverless lead capture engine with strict Row Level Security (RLS) policies and rate-limiting triggers.',
      'Architected digital Electronic Shelf Label (ESL) hardware integration & multi-store retail billing pipelines.',
    ],
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Supabase RLS', 'Retail POS', 'ESL Hardware IoT'],
    gradient: 'from-[#e85a3b] via-amber-500 to-[#1a1a1a]',
    demoUrl: 'https://quickshelf.in',
  },
  {
    id: 3,
    title: 'Boat Rental & Booking Marketplace',
    category: 'Full-Stack MERN Marketplace',
    type: 'production',
    description: 'Live production boat rental & booking platform serving real marketplace users with real-time location mapping and affiliate tracking.',
    highlights: [
      'Maintained production server infrastructure and delivered 15+ full-stack features on MERN stack.',
      'Integrated Stripe payment gateway achieving 99%+ transaction success rate.',
      'Built Socket.IO real-time availability, Google Maps API location search, and Tracknow affiliate tracking.',
    ],
    tags: ['MERN Stack', 'TypeScript', 'Socket.IO', 'Google Maps API', 'Stripe', 'Tracknow'],
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    demoUrl: 'https://kaprilux.com',
  },
  {
    id: 4,
    title: 'UtsavPatra — Digital Wedding Invitations',
    category: 'Culturally-Aware Wedding SaaS',
    type: 'lab',
    description: 'Digital wedding invitation SaaS for Indian couples featuring 14 distinct regional templates (1920s Gazette, Bollywood, Vivah Express train ticket, Madhubani folk art), personalized guest links, and live tryout customizer.',
    highlights: [
      '14 Regional Culturally-Aware Templates: Built 14 distinct regional themes (1920s Gazette newspaper, Bollywood movie poster, Vivah Express train ticket, Madhubani folk art, Phulkari embroidery, etc.).',
      'Personalized Guest Experience & Shagun: Dynamic guest links greeting guests by name, native script + English toggle, and integrated UPI Digital Shagun gifting.',
      'Live Tryout Customizer & Host Dashboard: Real-time interactive preview studio for couples to customize themes and manage all 12 ceremony events (Haldi → Reception).',
      'Web Audio Soundscapes & High-Res Print Mode: Browser-synthesized authentic folk audio without copyright issues, and print mode for 1920s Gazette broadsheet vintage newspapers.',
      'High-Performance Architecture: Next.js 15 App Router, React 19, and Framer Motion optimized for mobile Web Vitals with zero compromise on culture.',
    ],
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'UPI Integration', 'Framer Motion', 'Vercel'],
    gradient: 'from-amber-600 via-rose-600 to-[#e85a3b]',
    demoUrl: 'https://utsavpatra.vercel.app/',
  },
  {
    id: 5,
    title: 'Reverse Tunnel (Ngrok Alternative)',
    category: 'Golang & High-Concurrency Systems',
    type: 'lab',
    description: 'Self-hosted, high-performance reverse proxy and tunneling platform in Go and Next.js 15 that securely exposes local development servers to public HTTPS subdomains.',
    highlights: [
      'Built a self-hosted, high-performance reverse proxy and tunneling platform (ngrok alternative) in Go and Next.js 15 that securely exposes local development servers (localhost) to public HTTPS subdomains.',
      'Designed a custom WebSocket control plane with keep-alive heartbeats, exponential backoff reconnection, and strict account namespace isolation (username-subdomain).',
      'Engineered a real-time Traffic Inspector & 1-Click Webhook Replay engine backed by MongoDB TTL auto-expiring logs for debugging third-party webhooks (Stripe/GitHub).',
      'Implemented a native Model Context Protocol (MCP) JSON-RPC 2.0 server over stdin/stdout, allowing AI coding assistants (Claude Code, Cursor) to programmatically query network traffic and trigger replays.',
      'Enforced security & version controls including SHA-256 API key digest hashing, HTTP Basic Auth password protection (--auth), and semver CLI auto-upgrades.',
    ],
    tags: ['Go (Golang)', 'Next.js 15', 'TypeScript', 'MongoDB', 'WebSockets', 'MCP JSON-RPC', 'Docker', 'GCP', 'Cloudflare'],
    gradient: 'from-cyan-500 via-[#e85a3b] to-violet-600',
    demoUrl: 'https://dashboard.quickshelf.online/',
    githubUrl: 'https://github.com/bhadrasuman/reverse-tunnel',
  },
  {
    id: 6,
    title: 'AI Interview Agent',
    category: 'AI & Real-Time WebRTC',
    type: 'lab',
    description: 'Real-time AI-driven interview platform with low-latency WebRTC streaming, AI candidate scoring, and automated credit payments.',
    highlights: [
      'Orchestrated real-time AI interviews using LiveKit for low-latency audio/video streaming.',
      'Developed admin dashboards for candidate scheduling, pipelines, analytics, and AI scoring.',
      'Integrated Razorpay checkout to secure payment flows for interview credit purchases.',
    ],
    tags: ['React.js', 'LiveKit WebRTC', 'Node.js', 'Razorpay', 'AI Pipelines'],
    gradient: 'from-amber-500 via-[#e85a3b] to-rose-600',
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'production' | 'lab'>('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'production') return project.type === 'production';
    if (filter === 'lab') return project.type === 'lab';
    return true;
  });

  const productionCount = projects.filter((p) => p.type === 'production').length;
  const labCount = projects.filter((p) => p.type === 'lab').length;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-black/[0.06]">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="font-mono-tag text-xs font-bold text-[#e85a3b] uppercase tracking-widest mb-3">
          CURATED PORTFOLIO
        </span>
        <h2 className="font-serif-title text-4xl sm:text-6xl text-[#1a1a1a] tracking-tight mb-4">
          Featured Engineering Work
        </h2>
        <p className="text-[#6b7280] text-base max-w-2xl font-normal leading-relaxed mb-8">
          Architecting commercial production SaaS platforms alongside specialized system design & open-source engineering labs.
        </p>

        {/* Category Pill Filter Tabs */}
        <div className="inline-flex items-center p-1.5 bg-white border border-black/[0.08] rounded-2xl shadow-sm gap-1 max-w-full overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-mono-tag font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'bg-[#1a1a1a] text-white shadow-sm'
                : 'text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f3f2ef]'
            }`}
          >
            All Projects ({projects.length})
          </button>

          <button
            onClick={() => setFilter('production')}
            className={`px-4 py-2 text-xs font-mono-tag font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              filter === 'production'
                ? 'bg-[#1a1a1a] text-white shadow-sm'
                : 'text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f3f2ef]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Production SaaS ({productionCount})</span>
          </button>

          <button
            onClick={() => setFilter('lab')}
            className={`px-4 py-2 text-xs font-mono-tag font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              filter === 'lab'
                ? 'bg-[#1a1a1a] text-white shadow-sm'
                : 'text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f3f2ef]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            <span>Engineering Labs ({labCount})</span>
          </button>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={() => setActiveProject(project)}
            className="group bg-white rounded-3xl border border-black/[0.08] shadow-sm hover:shadow-2xl hover:border-[#e85a3b]/40 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
          >
            <div className={`h-52 w-full bg-gradient-to-tr ${project.gradient} p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 z-10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-mono-tag font-bold text-[#1a1a1a] uppercase tracking-wider shadow-sm whitespace-nowrap">
                    {project.category}
                  </span>
                  {project.type === 'production' ? (
                    <span className="px-2.5 py-1 bg-emerald-500/90 text-white text-[10px] font-mono-tag font-bold rounded-full whitespace-nowrap shrink-0 flex items-center gap-1 border border-white/20 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>Commercial SaaS</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-purple-600/90 text-white text-[10px] font-mono-tag font-bold rounded-full whitespace-nowrap shrink-0 flex items-center gap-1 border border-white/20 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-200" />
                      <span>Open Source Lab</span>
                    </span>
                  )}
                </div>

                {project.demoUrl && (
                  <span className="px-2 py-1 bg-black/30 backdrop-blur-sm text-white text-[10px] font-mono-tag font-bold rounded-full whitespace-nowrap shrink-0 flex items-center gap-1 border border-white/20">
                    <span>Live</span>
                    <span className="text-xs">↗</span>
                  </span>
                )}
              </div>

              <div className="z-10">
                <h3 className="font-serif-title text-2xl sm:text-3xl text-white tracking-tight drop-shadow-md leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <p className="text-[#6b7280] text-xs leading-relaxed mb-6">
                {project.description}
              </p>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-[#f3f2ef] group-hover:bg-[#e85a3b]/10 group-hover:text-[#e85a3b] text-[11px] font-medium text-[#1a1a1a]/70 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs font-mono-tag font-bold text-[#1a1a1a] group-hover:text-[#e85a3b] transition-colors">
                  <span className="flex items-center gap-1">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {activeProject && (
        <div
          className="fixed inset-0 z-[10000] bg-[#1a1a1a]/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-black/[0.08] relative overflow-y-auto max-h-[90vh]"
          >
            {/* Mobile & Desktop Top-Right Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-transform active:scale-95 cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`min-h-[140px] -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 bg-gradient-to-r ${activeProject.gradient} p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

              <div className="z-10 mb-4 flex items-center gap-2">
                <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur-md text-[#1a1a1a] text-[10px] font-mono-tag font-bold rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                  {activeProject.category}
                </span>
                {activeProject.type === 'production' ? (
                  <span className="inline-block px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-mono-tag font-bold rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                    Commercial SaaS
                  </span>
                ) : (
                  <span className="inline-block px-2.5 py-1 bg-purple-600 text-white text-[10px] font-mono-tag font-bold rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                    Engineering Lab
                  </span>
                )}
              </div>

              <div className="z-10 pr-12">
                <h3 className="font-serif-title text-2xl sm:text-4xl text-white tracking-tight drop-shadow-md leading-tight">
                  {activeProject.title}
                </h3>
              </div>
            </div>

            <p className="text-[#6b7280] text-xs leading-relaxed mb-4">
              {activeProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono-tag font-bold text-[#1a1a1a] uppercase tracking-wider mb-2">Key Accomplishments:</h4>
              <ul className="flex flex-col gap-2">
                {activeProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#1a1a1a]/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e85a3b] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-mono-tag font-bold text-[#1a1a1a] uppercase tracking-wider mb-2">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((t) => (
                  <span key={t} className="px-3 py-1 bg-[#f3f2ef] text-[#e85a3b] text-xs font-semibold rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 pt-4 border-t border-black/[0.04]">
              <button
                onClick={() => setActiveProject(null)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#6b7280] hover:bg-[#f3f2ef] rounded-xl transition text-center"
              >
                Close Preview
              </button>
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1a1a1a] text-white text-xs font-semibold rounded-xl hover:bg-[#e85a3b] shadow-md transition"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {activeProject.demoUrl && (
                <a
                  href={activeProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#e85a3b] text-white text-xs font-semibold rounded-xl hover:bg-[#d4482a] shadow-md transition"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

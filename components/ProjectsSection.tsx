'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
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
    title: 'Quickshelf — Retail Tech Platform',
    category: 'Next.js 16 & Supabase Retail SaaS',
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
    id: 2,
    title: 'Reverse Tunnel (Ngrok Alternative)',
    category: 'Golang & High-Concurrency Systems',
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
    id: 3,
    title: 'AI Interview Agent',
    category: 'AI & Real-Time WebRTC',
    description: 'Real-time AI-driven interview platform with low-latency WebRTC streaming, AI candidate scoring, and automated credit payments.',
    highlights: [
      'Orchestrated real-time AI interviews using LiveKit for low-latency audio/video streaming.',
      'Developed admin dashboards for candidate scheduling, pipelines, analytics, and AI scoring.',
      'Integrated Razorpay checkout to secure payment flows for interview credit purchases.',
    ],
    tags: ['React.js', 'LiveKit WebRTC', 'Node.js', 'Razorpay', 'AI Pipelines'],
    gradient: 'from-amber-500 via-[#e85a3b] to-rose-600',
  },
  {
    id: 4,
    title: 'Boat Rental & Booking Marketplace',
    category: 'Full-Stack MERN Marketplace',
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
];

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-black/[0.06]">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="font-mono-tag text-xs font-bold text-[#e85a3b] uppercase tracking-widest mb-3">
          PRODUCTION PROJECTS
        </span>
        <h2 className="font-serif-title text-4xl sm:text-6xl text-[#1a1a1a] tracking-tight mb-4">
          Featured Engineering Work
        </h2>
        <p className="text-[#6b7280] text-base max-w-2xl font-normal leading-relaxed">
          Next.js 16 & Supabase retail platforms, high-concurrency Go reverse proxies, MERN marketplaces, and AI WebRTC systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={() => setActiveProject(project)}
            className="group bg-white rounded-3xl border border-black/[0.08] shadow-sm hover:shadow-2xl hover:border-[#e85a3b]/40 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
          >
            <div className={`h-52 w-full bg-gradient-to-tr ${project.gradient} p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

              <div className="flex justify-between items-start z-10">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-mono-tag font-bold text-[#1a1a1a] uppercase tracking-wider shadow-sm">
                  {project.category}
                </span>
                {project.demoUrl && (
                  <span className="px-2.5 py-1 bg-black/20 text-white text-[11px] font-mono-tag rounded-full">
                    Live Platform ↗
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
      </div>

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
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-black/[0.08] relative overflow-hidden"
          >
            <div className={`h-40 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 bg-gradient-to-r ${activeProject.gradient} p-6 flex items-end justify-between`}>
              <h3 className="font-serif-title text-3xl text-white">{activeProject.title}</h3>
              <span className="bg-white/90 text-[#1a1a1a] text-xs font-mono-tag font-bold px-3 py-1 rounded-full">
                {activeProject.category}
              </span>
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

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/[0.04]">
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-2 text-xs font-semibold text-[#6b7280] hover:bg-[#f3f2ef] rounded-xl transition"
              >
                Close Preview
              </button>
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a1a] text-white text-xs font-semibold rounded-xl hover:bg-[#e85a3b] shadow-md transition"
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
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#e85a3b] text-white text-xs font-semibold rounded-xl hover:bg-[#d4482a] shadow-md transition"
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

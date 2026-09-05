'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Cloud, Database, ShieldCheck, Terminal } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      title: 'Backend & High-Concurrency',
      icon: Cpu,
      skills: ['Go (Golang)', 'Go Concurrency & Channels', 'Node.js', 'Express.js', 'REST API Design', 'Socket.IO', 'WebSockets', 'JWT Authentication', 'Microservices'],
    },
    {
      title: 'Cloud Infrastructure & DevOps',
      icon: Cloud,
      skills: ['Microsoft Azure', 'Azure Monitor', 'Log Analytics / KQL', 'Google Cloud Platform (GCP)', 'Docker', 'Nginx', 'Linux', 'CI/CD', 'DNS Management'],
    },
    {
      title: 'Databases & Performance',
      icon: Database,
      skills: ['MongoDB', 'MySQL', 'Redis', 'Mongoose', 'Query Optimisation & Indexing'],
    },
    {
      title: 'Frontend & UI Engineering',
      icon: Code2,
      skills: ['React.js', 'Next.js 15 App Router', 'TypeScript', 'Tailwind CSS', 'Responsive UI Development'],
    },
    {
      title: 'Integrations & Tools',
      icon: Terminal,
      skills: ['Stripe Gateway', 'Razorpay', 'LiveKit WebRTC', 'Google Maps API', 'Tracknow Affiliate', 'Postman', 'Git & GitHub', 'Cobra CLI'],
    },
    {
      title: 'Engineering Practices',
      icon: ShieldCheck,
      skills: ['Incident Response', 'Root Cause Analysis (RCA)', 'SOP & Runbook Documentation', 'Performance Tuning', 'Agile Methodology'],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="font-mono-tag text-xs font-bold text-[#e85a3b] uppercase tracking-widest mb-3">
          TECHNICAL EXPERTISE
        </span>
        <h2 className="font-serif-title text-4xl sm:text-6xl text-[#1a1a1a] tracking-tight mb-4">
          Skills & Technical Stack
        </h2>
        <p className="text-[#6b7280] text-base max-w-2xl font-normal leading-relaxed">
          Delivered high-concurrency Go tunneling engines, 50+ RESTful APIs across 8+ production projects, and operated cloud infrastructure on Azure & GCP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white p-8 rounded-3xl border border-black/[0.06] shadow-sm hover:shadow-xl hover:border-[#e85a3b]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f3f2ef] text-[#e85a3b] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-title text-2xl text-[#1a1a1a] mb-4">
                  {cat.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#f3f2ef] text-[#1a1a1a] text-xs font-semibold rounded-xl border border-black/[0.04] hover:border-[#e85a3b] hover:text-[#e85a3b] transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

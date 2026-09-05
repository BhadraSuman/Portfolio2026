'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    company: 'AcrossTek',
    role: 'Junior Engineer',
    location: 'Remote',
    period: 'Dec 2025 - Present',
    highlights: [
      'Monitor and troubleshoot distributed cloud infrastructure across 20+ Azure resources, authoring 30+ KQL queries in Azure Monitor & Log Analytics to reduce mean time to detection by ~25%.',
      'Executed rapid incident response for production environments, resolving 40+ incidents and delivering RCA reports cutting recurring issues by ~30%; authored 10+ SOPs reducing resolution time by ~35%.',
      'Spearheaded full-stack development for the Kaprilux boat rental platform, shipping 15+ features on the MERN stack for a live production user base.',
      'Integrated Stripe payment gateway and end-to-end booking system, achieving 99%+ transaction success rate and improving average API response time by ~30%.',
      'Built affiliate marketing tracking with Tracknow, automating commission attribution for partner-driven bookings.',
    ],
  },
  {
    company: 'Hansraj Ventures Pvt Ltd',
    role: 'Full Stack Developer',
    location: 'Kolkata, WB',
    period: 'Aug 2025 - Nov 2025',
    highlights: [
      'Managed backend infrastructure end-to-end: server provisioning, Nginx reverse proxy for 5+ production apps, SSL setup, and domain management.',
      'Provisioned and maintained virtual machines on GCP, right-sizing compute resources to reduce monthly infrastructure costs by ~15%.',
      'Led design and integration of RESTful APIs across 5 concurrent projects, standardising error handling and authentication patterns.',
      'Debugged and resolved critical production issues, improving API response time by 20% and reducing server error rates by 30%.',
    ],
  },
  {
    company: 'Hansraj Ventures Pvt Ltd',
    role: 'Node.js Developer Intern',
    location: 'Kolkata, WB',
    period: 'Feb 2025 - Jul 2025',
    highlights: [
      'Built and optimised 3 core backend services using Node.js, Express.js, and MongoDB.',
      'Created and integrated 50+ RESTful API endpoints with input validation, JWT authentication, and structured error responses.',
      'Debugged server-side issues and refactored inefficient database queries to improve reliability.',
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-black/[0.06]">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="font-mono-tag text-xs font-bold text-[#e85a3b] uppercase tracking-widest mb-3">
          CAREER TIMELINE
        </span>
        <h2 className="font-serif-title text-4xl sm:text-6xl text-[#1a1a1a] tracking-tight mb-4">
          Professional Experience
        </h2>
        <p className="text-[#6b7280] text-base max-w-2xl font-normal leading-relaxed">
          Building production MERN applications, operating cloud infrastructure on Azure & GCP, and maintaining 99%+ uptime.
        </p>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white p-8 rounded-3xl border border-black/[0.08] shadow-sm hover:shadow-xl hover:border-[#e85a3b]/40 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-black/[0.04]">
              <div>
                <span className="font-mono-tag text-xs font-bold text-[#e85a3b] uppercase tracking-wider">
                  {exp.company}
                </span>
                <h3 className="font-serif-title text-3xl text-[#1a1a1a] mt-0.5">
                  {exp.role}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tag text-[#6b7280]">
                <span className="flex items-center gap-1 bg-[#f3f2ef] px-3 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-[#e85a3b]" />
                  <span>{exp.period}</span>
                </span>
                <span className="flex items-center gap-1 bg-[#f3f2ef] px-3 py-1 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-[#e85a3b]" />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {exp.highlights.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3 text-xs text-[#1a1a1a]/80 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#e85a3b] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

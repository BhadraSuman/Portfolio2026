'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'bhadrasuma04@gmail.com';
  const phone = '+91 6291898703';
  const location = 'Kolkata, West Bengal, India';

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
    setCopied(true);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#e85a3b', '#f59e0b', '#ec4899', '#38bdf8'],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);

    confetti({
      particleCount: 130,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#e85a3b', '#f59e0b', '#10b981'],
    });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-black/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-mono-tag font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Open to Opportunities</span>
          </div>

          <h2 className="font-serif-title text-4xl sm:text-6xl text-[#1a1a1a] tracking-tight mb-6 text-left">
            Let’s Build Something Amazing Together
          </h2>

          <p className="text-[#6b7280] text-base leading-relaxed mb-8 text-left max-w-md">
            Full Stack & Cloud Engineer looking for high-impact roles. Feel free to copy my contact info or send a direct note below!
          </p>

          {/* Contact Details Cards */}
          <div className="w-full flex flex-col gap-3 mb-8">
            <div className="bg-white p-4 rounded-2xl border border-black/[0.08] shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-3 rounded-xl bg-[#f3f2ef] text-[#e85a3b]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-[10px] uppercase font-mono-tag tracking-wider font-bold text-[#6b7280]">Email</span>
                  <span className="text-sm font-mono font-bold text-[#1a1a1a] truncate">{email}</span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1a1a1a] hover:bg-[#e85a3b] text-white text-xs font-semibold shadow-md transition-all duration-200 shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/[0.08] shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#f3f2ef] text-[#e85a3b]">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono-tag tracking-wider font-bold text-[#6b7280]">Phone</span>
                  <span className="text-sm font-mono font-bold text-[#1a1a1a]">{phone}</span>
                </div>
              </div>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="px-3.5 py-2 rounded-xl bg-[#f3f2ef] hover:bg-slate-200 text-[#1a1a1a] text-xs font-mono-tag font-bold transition"
              >
                Call
              </a>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/[0.08] shadow-sm flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#f3f2ef] text-[#e85a3b]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono-tag tracking-wider font-bold text-[#6b7280]">Location</span>
                <span className="text-sm font-mono font-bold text-[#1a1a1a]">{location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-black/[0.08] shadow-xl relative overflow-hidden">
          {formSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif-title text-3xl text-[#1a1a1a] mb-2">Message Received!</h3>
              <p className="text-xs text-[#6b7280] max-w-xs mb-6">
                Thank you Suman will get back to you shortly!
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="px-4 py-2 bg-[#f3f2ef] hover:bg-slate-200 text-[#1a1a1a] text-xs font-semibold rounded-xl transition"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a] mb-2">
                <MessageSquare className="w-4 h-4 text-[#e85a3b]" />
                <span>Send a Message to Suman</span>
              </div>

              <div>
                <label className="block text-xs font-mono-tag font-bold text-[#1a1a1a] mb-1.5 text-left">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#faf9f7] text-sm outline-none focus:border-[#e85a3b] focus:ring-2 focus:ring-[#e85a3b]/10 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tag font-bold text-[#1a1a1a] mb-1.5 text-left">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#faf9f7] text-sm outline-none focus:border-[#e85a3b] focus:ring-2 focus:ring-[#e85a3b]/10 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tag font-bold text-[#1a1a1a] mb-1.5 text-left">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi Suman, I'd like to discuss a role/project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/[0.08] bg-[#faf9f7] text-sm outline-none focus:border-[#e85a3b] focus:ring-2 focus:ring-[#e85a3b]/10 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 bg-[#e85a3b] hover:bg-[#d4482a] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

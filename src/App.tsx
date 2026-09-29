import React from 'react';
import { AdminSettings } from '../../types';

interface HeroProps {
  settings: AdminSettings;
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#070A14]">
      {/* Glow Backgrounds */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-600/25 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-600/25 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl text-[11px] tracking-widest font-medium text-white/70 mb-8 shadow-sm">
        <span>🔥</span> AI POWERED AGENCY • 500+ CLIENTS
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl lg:text-[82px] font-black leading-[0.95] tracking-tight max-w-4xl">
        <span className="text-white">We Build </span>
        <span className="bg-gradient-to-r from-[#A78BFA] via-[#8B8DFF] to-[#22D3EE] bg-clip-text text-transparent">Websites</span>
        <span className="text-white block mt-2">That Bring Orders</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-[15px] md:text-[16px] text-white/50 max-w-2xl leading-relaxed">
        Premium AI Automations, Landing Pages & Worksheet System. High-converting designs that actually get you clients.
      </p>

      {/* CTA Button */}
      <button
        onClick={onOrderClick}
        className="mt-8 group bg-white text-black px-8 py-3.5 rounded-full font-bold text-[14px] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2"
      >
        Get Your Website <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {/* Stats Card - Like your screenshot */}
      <div className="mt-16 w-full max-w-[680px] grid grid-cols-3 gap-4 p-2 rounded-[24px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl">
        <div className="py-4 rounded-[16px] bg-white/[0.03] border border-white/[0.05]">
          <div className="text-2xl font-black text-white">500+</div>
          <div className="text-[11px] text-white/40 mt-1 tracking-wide">Projects</div>
        </div>
        <div className="py-4 rounded-[16px] bg-white/[0.03] border border-white/[0.05]">
          <div className="text-2xl font-black text-white">4.9★</div>
          <div className="text-[11px] text-white/40 mt-1 tracking-wide">Rating</div>
        </div>
        <div className="py-4 rounded-[16px] bg-white/[0.03] border border-white/[0.05]">
          <div className="text-2xl font-black text-white">24/7</div>
          <div className="text-[11px] text-white/40 mt-1 tracking-wide">Support</div>
        </div>
      </div>
    </section>
  );
};

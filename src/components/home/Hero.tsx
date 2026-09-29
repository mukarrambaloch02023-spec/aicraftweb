import React from 'react';

export const Hero = ({ onOrderClick }: any) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#070A14]">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-600/25 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-600/25 rounded-full blur-[120px] animate-pulse"></div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-white/70 mb-8">
        AI POWERED AGENCY
      </div>

      <h1 className="text-5xl md:text-7xl font-black leading-[0.95] max-w-4xl">
        <span className="text-white">We Build </span>
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Websites</span>
        <span className="text-white block mt-2">That Bring Orders</span>
      </h1>

      <p className="mt-6 text-[15px] text-white/50 max-w-2xl">
        Premium AI Automations & High-converting designs.
      </p>

      <button
        onClick={onOrderClick}
        className="mt-8 bg-white text-black px-8 py-3.5 rounded-full font-bold text-[14px] hover:scale-105 transition-all"
      >
        Get Your Website →
      </button>
    </section>
  );
};

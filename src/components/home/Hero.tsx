import React from 'react';

export const Hero = ({ onOrderClick }: any) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#070A14]">

      {/* Animated Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-cyan-600/30 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
       .anim-1 { animation: slideUp 0.8s ease-out forwards; }
       .anim-2 { animation: slideUp 0.8s ease-out 0.2s forwards; opacity:0; }
       .anim-3 { animation: slideUp 0.8s ease-out 0.4s forwards; opacity:0; }
       .anim-4 { animation: slideUp 0.8s ease-out 0.6s forwards; opacity:0; }
      `}</style>

      {/* Badge */}
      <div className="anim-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-white/70 mb-8 backdrop-blur-xl">
        🔥 AI POWERED AGENCY • 500+ CLIENTS
      </div>

      {/* Heading */}
      <h1 className="anim-2 text-5xl md:text-7xl lg:text-[84px] font-black leading-[0.95] max-w-4xl">
        <span className="text-white">We Build </span>
        <span className="bg-gradient-to-r from-[#A78BFA] via-[#8B8DFF] to-[#22D3EE] bg-clip-text text-transparent">Websites</span>
        <span className="text-white block mt-2">That Bring Orders</span>
      </h1>

      {/* Subtitle */}
      <p className="anim-3 mt-6 text-[15px] md:text-[16px] text-white/50 max-w-2xl leading-relaxed">
        Premium AI Automations, Landing Pages & Worksheet System. High-converting designs that actually get you clients.
      </p>

      {/* Button with shine animation */}
      <button
        onClick={onOrderClick}
        className="anim-4 mt-8 relative overflow-hidden group bg-white text-black px-8 py-3.5 rounded-full font-bold text-[14px] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-[1.05] active:scale-[0.97] transition-all"
      >
        <span className="relative z-10 flex items-center gap-2">
          Get Your Website <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
      </button>


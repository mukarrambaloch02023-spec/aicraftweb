import React from 'react';

export const Hero = ({ onOrderClick }: any) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#070A14]">

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        @keyframes btnGlow {
          0% { box-shadow: 0 0 20px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 40px rgba(139,92,246,0.5), 0 0 60px rgba(6,182,212,0.3); }
          100% { box-shadow: 0 0 20px rgba(255,255,255,0.2); }
        }
      `}</style>

      {/* Moving Glows */}
      <div style={{animation: 'float1 6s ease-in-out infinite'}} className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-[120px]"></div>
      <div style={{animation: 'float2 6s ease-in-out infinite'}} className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-cyan-600/30 rounded-full blur-[120px]"></div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-white/70 mb-8 backdrop-blur-xl">
        ✨ AI POWERED AGENCY
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
        style={{animation: 'btnGlow 2.5s ease-in-out infinite'}}
        className="mt-8 group relative bg-white text-black px-10 py-4 rounded-full font-bold text-[15px] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <span className="flex items-center gap-2">
          Get Your Website
          <span className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300">🚀</span>
        </span>
      </button>

      <p className="mt-4 text-[11px] text-white/30">Hover on button to see magic ✨</p>
    </section>
  );
};

import React from 'react';

export const Hero = ({ onOrderClick }: any) => {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#070A14]">

      <style>{`
        @keyframes upDown1 {
          0%, 100% { transform: translateY(-20px) translateX(-50%); }
          50% { transform: translateY(40px) translateX(-50%); }
        }
        @keyframes upDown2 {
          0%, 100% { transform: translateY(20px); }
          50% { transform: translateY(-40px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* 1. Upar wali Purple Light jo Upar Neeche Hilegi */}
      <div
        style={{ animation: 'upDown1 6s ease-in-out infinite, pulseGlow 6s ease-in-out infinite' }}
        className="absolute top-[10%] left-1/2 w-[900px] h-[500px] bg-[#7c3aed]/30 rounded-full blur-[150px] pointer-events-none"
      />

      {/* 2. Neeche wali Cyan Light jo Upar Neeche Hilegi */}
      <div
        style={{ animation: 'upDown2 7s ease-in-out infinite reverse, pulseGlow 7s ease-in-out infinite' }}
        className="absolute bottom-[10%] right-[10%] w-[700px] h-[500px] bg-[#06b6d4]/25 rounded-full blur-[150px] pointer-events-none"
      />

      {/* 3. Center ki halki light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-white/70 mb-8 backdrop-blur-xl">
        ✨ AI POWERED AGENCY
      </div>

      <h1 className="relative z-10 text-5xl md:text-7xl lg:text-[72px] font-black leading-[0.95] max-w-4xl tracking-tight">
        <span className="text-white/90">We Build </span>
        <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Websites</span>
        <span className="text-white/90 block mt-2">That Bring Orders</span>
      </h1>

      <p className="relative z-10 mt-6 text-[15px] text-white/40 max-w-2xl">
        Premium AI Automations & High-converting designs.
      </p>

      <button
        onClick={onOrderClick}
        className="relative z-10 mt-8 group bg-white text-black px-8 py-4 rounded-full font-bold text-[14px] shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] active:scale-95"
      >
        <span className="flex items-center gap-2">
          Get Your Website
          <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">🚀</span>
        </span>
      </button>

      <p className="relative z-10 mt-4 text-[10px] text-white/20 tracking-widest uppercase">Hover on button to see magic ✨</p>

    </section>
  );
};

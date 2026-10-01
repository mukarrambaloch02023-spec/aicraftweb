const Hero = ({ onOrderClick }: any) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#070A14] [perspective:1200px]">
      {/* background blobs */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#6d28d9]/30 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-[#2563eb]/25 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center [transform-style:preserve-3d] hover:[transform:rotateY(10deg)_rotateX(10deg)] transition-transform duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-widest text-white/60 mb-8 [transform:translateZ(60px)]">
          ✨ AI POWERED AGENCY
        </div>

        <h1 className="text-[48px] md:text-[72px] font-black leading-[0.9] tracking-tight [transform:translateZ(100px)]">
          <span className="text-white">We Build </span>
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Websites</span>
          <span className="text-white block mt-1">That Bring Orders</span>
        </h1>

        <p className="mt-6 text-[14px] text-white/30 max-w-xl [transform:translateZ(50px)]">
          Premium AI Automations & High-converting designs.
        </p>

        <button onClick={onOrderClick} className="mt-8 bg-white text-black px-8 py-3.5 rounded-full font-bold text-[13px] shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-110 transition-all cursor-pointer [transform:translateZ(120px)]">
          Get Your Website 🚀
        </button>
      </div>
    </section>
  );
};

<div className="relative w-full bg-[#080F25] py-24 px-6 overflow-hidden border-y border-blue-900/20">

  {/* ==== GRID BACKGROUND ==== */}
  <div className="absolute inset-0 opacity-[0.04]" style={{
    backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
    backgroundSize: '40px 40px'
  }}></div>

  {/* ==== BOX LINES PE CHALTI HUI LIGHTS ==== */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Top line light */}
    <div className="absolute top-0 left-0 h-[1px] w-full overflow-hidden">
      <div className="h-full w-[200px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[slideRight_3s_linear_infinite]"></div>
    </div>
    {/* Bottom line light */}
    <div className="absolute bottom-0 left-0 h-[1px] w-full overflow-hidden">
      <div className="h-full w-[200px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[slideLeft_3s_linear_infinite_1s]"></div>
    </div>
    {/* Left side vertical light */}
    <div className="absolute top-0 left-0 w-[1px] h-full overflow-hidden">
      <div className="w-full h-[150px] bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-[slideDown_4s_linear_infinite]"></div>
    </div>
    {/* Right side vertical light */}
    <div className="absolute top-0 right-0 w-[1px] h-full overflow-hidden">
      <div className="w-full h-[150px] bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-[slideUp_4s_linear_infinite_1.5s]"></div>
    </div>
  </div>

  <style>{`
    @keyframes slideRight { 0%{transform:translateX(-200px)} 100%{transform:translateX(100vw)} }
    @keyframes slideLeft { 0%{transform:translateX(100vw)} 100%{transform:translateX(-200px)} }
    @keyframes slideDown { 0%{transform:translateY(-150px)} 100%{transform:translateY(100vh)} }
    @keyframes slideUp { 0%{transform:translateY(100vh)} 100%{transform:translateY(-150px)} }
  `}</style>

  {/* ==== TERA CONTENT - SAME AS BEFORE ==== */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-[11px] tracking-widest text-cyan-400">
      🛡️ UNCOMPROMISED CYBERSECURITY PROTOCOL
    </div>
    <h2 className="mt-6 text-4xl md:text-5xl font-black text-white leading-tight">
      Why Our Websites Never Get<br/>Hacked?
    </h2>
    <p className="mt-6 text-slate-300/80 text-[15px] leading-relaxed">
      Over 80% of Pakistani and global business websites get defaced or injected with malware due to nulled themes and amateur code. At <span className="text-cyan-400 font-bold">AiCraftWeb</span>, developer Mukarram Ali applies bank-grade defense layers to every project.
    </p>
  </div>
</div>

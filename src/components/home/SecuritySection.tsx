export function SecuritySection() {
  return (
    <div className="relative w-full bg-[#080F25] py-24 px-6 overflow-hidden border-y border-blue-900/20">

      {/* ==== YE HAI TERA GRID + LIGHTS WALA BACKGROUND ==== */}
      <div className="absolute inset-0">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>

        {/* Light 1 - Horizontal chalegi */}
        <div className="absolute top-[20%] left-0 h-[1px] w-full">
          <div className="absolute h-[2px] w-[100px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[0.5px] shadow-[0_0_10px_#22d3ee]" style={{ animation: 'gridRight 6s linear infinite' }}></div>
        </div>
        {/* Light 2 - Horizontal */}
        <div className="absolute top-[60%] left-0 h-[1px] w-full">
          <div className="absolute h-[2px] w-[120px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[0.5px] shadow-[0_0_10px_#3b82f6]" style={{ animation: 'gridRight 7s linear infinite 2s' }}></div>
        </div>
        {/* Light 3 - Vertical */}
        <div className="absolute left-[30%] top-0 w-[1px] h-full">
          <div className="absolute w-[2px] h-[100px] bg-gradient-to-b from-transparent via-purple-400 to-transparent blur-[0.5px] shadow-[0_0_10px_#a855f7]" style={{ animation: 'gridDown 5s linear infinite' }}></div>
        </div>
        {/* Light 4 - Vertical */}
        <div className="absolute left-[75%] top-0 w-[1px] h-full">
          <div className="absolute w-[2px] h-[120px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[0.5px] shadow-[0_0_10px_#22d3ee]" style={{ animation: 'gridDown 6.5s linear infinite 1s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes gridRight { 0%{transform:translateX(-150px)} 100%{transform:translateX(100vw)} }
        @keyframes gridDown { 0%{transform:translateY(-150px)} 100%{transform:translateY(100vh)} }
      `}</style>

      {/* Tera Content Upar Rahega */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-[11px] tracking-widest text-cyan-400">
          🛡️ UNCOMPROMISED CYBERSECURITY PROTOCOL
        </div>
        <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
          Why Our Websites Never Get<br/>Hacked?
        </h2>
        <p className="mt-6 text-slate-300/80 text-[15px]">
          At <span className="text-cyan-400 font-bold">AiCraftWeb</span>, developer Mukarram Ali applies bank-grade defense layers.
        </p>
      </div>
    </div>
  )
}

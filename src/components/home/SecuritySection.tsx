export default function SecuritySection() {
  return (
    <div className="relative w-full bg-[#080F25] py-24 px-6 overflow-hidden border-y border-blue-900/20">

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* === BOX LINES PE LIGHTS - FIXED VERSION === */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-[1px] w-full overflow-hidden">
          <div style={{ height: '100%', width: '200px', background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)', animation: 'slideRight 3s linear infinite' }}></div>
        </div>
        <div className="absolute bottom-0 left-0 h-[1px] w-full overflow-hidden">
          <div style={{ height: '100%', width: '200px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)', animation: 'slideLeft 3s linear infinite' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes slideRight { 0%{transform:translateX(-200px)} 100%{transform:translateX(100vw)} }
        @keyframes slideLeft { 0%{transform:translateX(100vw)} 100%{transform:translateX(-200px)} }
      `}</style>

      {/* Content */}
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
  )
}

export function SecuritySection() {
  return (
    <div className="relative w-full bg-[#080F25] py-24 px-6 overflow-hidden border-y border-blue-900/20">

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-[11px] tracking-widest text-cyan-400">
            🛡️ UNCOMPROMISED CYBERSECURITY PROTOCOL
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">Why Our Websites Never Get Hacked?</h2>
        </div>

        {/* ==== YE HAIN TERE BOXS - HAR BOX PE LIGHT ==== */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* BOX 1 */}
          <div className="relative p-6 rounded-2xl bg-[#0C1836] border border-blue-900/30 overflow-hidden group">
            {/* Light jo box ki top line pe hilegi */}
            <div className="absolute top-0 left-0 h-[1px] w-full overflow-hidden">
              <div style={{ height: '100%', width: '120px', background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)', animation: 'slideRight 2.5s linear infinite' }}></div>
            </div>
            <h3 className="text-white font-bold">🔒 No Nulled Themes</h3>
            <p className="text-slate-400 text-sm mt-2">100% original code, no pirated plugins.</p>
          </div>

          {/* BOX 2 */}
          <div className="relative p-6 rounded-2xl bg-[#0C1836] border border-blue-900/30 overflow-hidden group">
            <div className="absolute top-0 left-0 h-[1px] w-full overflow-hidden">
              <div style={{ height: '100%', width: '120px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)', animation: 'slideRight 2.5s linear infinite 0.8s' }}></div>
            </div>
            <h3 className="text-white font-bold">🛡️ WAF Protection</h3>
            <p className="text-slate-400 text-sm mt-2">Bank-grade firewall on every site.</p>
          </div>

          {/* BOX 3 */}
          <div className="relative p-6 rounded-2xl bg-[#0C1836] border border-blue-900/30 overflow-hidden group">
            <div className="absolute top-0 left-0 h-[1px] w-full overflow-hidden">
              <div style={{ height: '100%', width: '120px', background: 'linear-gradient(90deg, transparent, #a855f7, transparent)', animation: 'slideRight 2.5s linear infinite 1.6s' }}></div>
            </div>
            <h3 className="text-white font-bold">⚡ Malware Scan</h3>
            <p className="text-slate-400 text-sm mt-2">Daily auto scanning by Mukarram Ali.</p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slideRight { 0%{transform:translateX(-120px)} 100%{transform:translateX(400px)} }
      `}</style>
    </div>
  )
}

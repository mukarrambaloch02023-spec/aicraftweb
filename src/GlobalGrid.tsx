export function GlobalGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }}></div>

      {/* Lights - puri website pe hilengi */}
      <div className="absolute top-[15%] left-0 h-[1px] w-full"><div className="h-[2px] w-[120px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]" style={{ animation: 'moveR 6s linear infinite' }}></div></div>
      <div className="absolute top-[45%] left-0 h-[1px] w-full"><div className="h-[2px] w-[150px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_12px_#3b82f6]" style={{ animation: 'moveR 8s linear infinite 2s' }}></div></div>
      <div className="absolute top-[80%] left-0 h-[1px] w-full"><div className="h-[2px] w-[100px] bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_12px_#a855f7]" style={{ animation: 'moveR 7s linear infinite 1s' }}></div></div>

      <div className="absolute left-[25%] top-0 w-[1px] h-full"><div className="w-[2px] h-[120px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]" style={{ animation: 'moveD 7s linear infinite' }}></div></div>
      <div className="absolute left-[70%] top-0 w-[1px] h-full"><div className="w-[2px] h-[150px] bg-gradient-to-b from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#60a5fa]" style={{ animation: 'moveD 6s linear infinite 2.5s' }}></div></div>

      <style>{`
        @keyframes moveR { 0%{transform:translateX(-200px)} 100%{transform:translateX(100vw)} }
        @keyframes moveD { 0%{transform:translateY(-200px)} 100%{transform:translateY(100vh)} }
      `}</style>
    </div>
  )
}

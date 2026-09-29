export const Services = () => {
  return (
    <section className="relative py-20 px-6 bg-[#080F26] overflow-hidden">
      <style>{`
        @keyframes beam { 0%{left:-100px} 100%{left:100%} }
        @keyframes beamRev { 0%{left:100%} 100%{left:-100px} }
        @keyframes floatBg { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
      `}</style>

      <div style={{animation:'floatBg 6s ease-in-out infinite'}} className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center text-white">Specialized Services by<br/> AiCraftWeb</h2>
        <p className="text-center text-white/40 text-sm max-w-2xl mx-auto mt-4">Every website is custom engineered from Pakistan by Mukarram Ali.</p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="relative rounded-[20px] bg-[#0F172A] border border-white/10 p-7 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
              <div style={{animation:'beam 3s linear infinite'}} className="absolute w-[80px] h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
              <div style={{animation:'beamRev 3s linear infinite'}} className="absolute w-[80px] h-full bg-gradient-to-r from-transparent via-violet-400 to-transparent"></div>
            </div>
            <div className="text-white font-bold mt-4">Hack-Proof Website</div>
            <p className="text-white/40 text-xs mt-2">Bespoke hardened development protected against attacks.</p>
          </div>

          <div className="relative rounded-[20px] bg-[#0F172A] border border-white/10 p-7 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
              <div style={{animation:'beam 3s linear infinite 0.5s'}} className="absolute w-[80px] h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
              <div style={{animation:'beamRev 3s linear infinite 0.5s'}} className="absolute w-[80px] h-full bg-gradient-to-r from-transparent via-violet-400 to-transparent"></div>
            </div>
            <div className="text-white font-bold mt-4">E-Commerce Stores</div>
            <p className="text-white/40 text-xs mt-2">High-converting stores with JazzCash, EasyPaisa.</p>
          </div>

          <div className="relative rounded-[20px] bg-[#0F172A] border border-white/10 p-7 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
              <div style={{animation:'beam 3s linear infinite 1s'}} className="absolute w-[80px] h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
              <div style={{animation:'beamRev 3s linear infinite 1s'}} className="absolute w-[80px] h-full bg-gradient-to-r from-transparent via-violet-400 to-transparent"></div>
            </div>
            <div className="text-white font-bold mt-4">Ultra Speed (95+)</div>
            <p className="text-white/40 text-xs mt-2">Loads in under 1.5 seconds with full optimization.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

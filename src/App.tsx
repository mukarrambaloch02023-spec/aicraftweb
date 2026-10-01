"use client"

export default function Page() {
  return (
    <main className="bg-[#070A14] text-white overflow-x-hidden">
      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes borderRotate { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes footerLine { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
      `}</style>

      {/* HEADER WITH MOVING LIGHT */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Moving Lights */}
        <div style={{animation:'float1 6s ease-in-out infinite'}} className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#6d28d9]/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div style={{animation:'float2 7s ease-in-out infinite'}} className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-[#2563eb]/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 inline-flex px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-widest text-white/60 mb-8">✨ AI POWERED AGENCY</div>
        <h1 className="relative z-10 text-[48px] md:text-[72px] font-black leading-[0.9]">We Build <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Websites</span><span className="block">That Bring Orders</span></h1>
        <button onClick={()=> document.getElementById("boxes")?.scrollIntoView({behavior:"smooth"})} className="relative z-10 mt-8 bg-white text-black px-8 py-3.5 rounded-full font-bold text-[13px]">Get Your Website 🚀</button>
      </section>

      {/* BODY BOXES WITH MOVING LINE LIGHT */}
      <section id="boxes" className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {[1,2,3].map((i)=>(
          <div key={i} className="relative rounded-[20px] p-[1px] overflow-hidden bg-white/10">
            {/* Yeh ghoomne wali line light hai */}
            <div className="absolute inset-0">
              <div style={{animation:'borderRotate 3s linear infinite'}} className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-[conic-gradient(from_0deg,transparent,transparent,#a78bfa,#22d3ee,transparent,transparent,transparent)]"></div>
            </div>
            <div className="relative bg-[#0F1221] rounded-[19px] p-8 h-full">
              <h3 className="font-bold text-lg">Premium Box {i}</h3>
              <p className="text-white/40 text-sm mt-2">Iske border pe light line ghoom rahi hai.</p>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER WITH MOVING LINE LIGHT */}
      <footer className="relative mt-20 border-t border-white/10 py-10 text-center overflow-hidden">
        {/* Yeh footer ki chalti hui line hai */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
          <div style={{animation:'footerLine 2.5s linear infinite'}} className="w-1/2 h-full bg-gradient-to-r from-transparent via-violet-400 to-transparent"></div>
        </div>
        <p className="text-white/20 text-[10px] tracking-widest">© 2025 AICRAFTWEB - MADE WITH ✨</p>
      </footer>

    </main>
  )
}

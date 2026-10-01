"use client"

export default function Page() {
  return (
    <main className="bg-[#070A14] min-h-screen text-white">

      {/* HERO - bilkul pehle jaisa */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#6d28d9]/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-[#2563eb]/25 rounded-full blur-[150px]" />

        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-widest text-white/60 mb-8">
          ✨ AI POWERED AGENCY
        </div>

        <h1 className="relative z-10 text-[48px] md:text-[72px] font-black leading-[0.9] tracking-tight">
          <span>We Build </span>
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Websites</span>
          <span className="block mt-1">That Bring Orders</span>
        </h1>

        <p className="relative z-10 mt-6 text-[14px] text-white/30 max-w-xl">
          Premium AI Automations & High-converting designs.
        </p>

        <button
          onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
          className="relative z-10 mt-8 bg-white text-black px-8 py-3.5 rounded-full font-bold text-[13px] shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-transform"
        >
          Get Your Website 🚀
        </button>

      </section>

      {/* NEXT SECTION */}
      <section className="py-20 text-center border-t border-white/10">
        <h2 className="text-3xl font-bold">Our Work</h2>
        <p className="text-white/40 mt-2">Website bilkul pehle jaisi restore ho gayi hai.</p>
      </section>

    </main>
  )
}

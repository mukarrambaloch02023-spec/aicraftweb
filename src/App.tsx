"use client"

export default function Page() {
  const handleOrder = () => {
    document.getElementById("next")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="bg-[#070A14] text-white overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Background blobs */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#6d28d9]/30 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-[#2563eb]/25 rounded-full blur-[150px] pointer-events-none"></div>

        {/* 3D CONTAINER */}
        <div
          className="relative z-10 flex flex-col items-center"
          style={{ perspective: "1000px" }}
        >
          <div
            className="flex flex-col items-center transition-transform duration-700 hover:rotate-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-widest text-white/60 mb-8"
              style={{ transform: "translateZ(60px)" }}
            >
              ✨ AI POWERED AGENCY
            </div>

            <h1
              className="text-[48px] md:text-[72px] font-black leading-[0.9] tracking-tight"
              style={{ transform: "translateZ(80px)" }}
            >
              <span className="text-white">We Build </span>
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Websites</span>
              <span className="text-white block mt-1">That Bring Orders</span>
            </h1>

            <p className="mt-6 text-[14px] text-white/30 max-w-xl" style={{ transform: "translateZ(40px)" }}>
              Premium AI Automations & High-converting designs.
            </p>

            <button
              onClick={handleOrder}
              className="mt-8 bg-white text-black px-8 py-3.5 rounded-full font-bold text-[13px] shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
              style={{ transform: "translateZ(100px)" }}
            >
              Get Your Website 🚀
            </button>

            <p className="mt-4 text-[9px] tracking-[0.2em] text-white/20 uppercase">Hover for 3D ✨</p>
          </div>
        </div>
      </section>

      {/* NEXT SECTION - Test for button */}
      <section id="next" className="py-20 px-6 text-center border-t border-white/10">
        <h2 className="text-3xl font-bold">Next Section</h2>
        <p className="text-white/40 mt-2">Button working hai is liye yahan aaya!</p>
      </section>
    </main>
  )
}

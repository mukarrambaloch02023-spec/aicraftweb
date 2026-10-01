"use client"
import { useEffect, useRef } from "react"

export const Hero = ({ onOrderClick }: any) => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if(!hero) return
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * -20
      hero.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#070A14]" style={{ perspective: "1200px" }}>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(0,-30px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(0,30px)} }
      `}</style>

      <div style={{animation:'float1 6s ease-in-out infinite'}} className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#6d28d9]/30 rounded-full blur-[150px] pointer-events-none"></div>
      <div style={{animation:'float2 7s ease-in-out infinite'}} className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-[#2563eb]/25 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#070A14] blur-[50px] pointer-events-none"></div>

      {/* YE MAIN 3D WRAPPER HAI */}
      <div ref={heroRef} style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }} className="relative z-10 flex flex-col items-center">

        <div style={{ transform: "translateZ(60px)" }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-widest text-white/60 mb-8">
          ✨ AI POWERED AGENCY
        </div>

        <h1 style={{ transform: "translateZ(80px)" }} className="text-[48px] md:text-[72px] font-black leading-[0.9] tracking-tight">
          <span className="text-white">We Build </span>
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Websites</span>
          <span className="text-white block mt-1">That Bring Orders</span>
        </h1>

        <p style={{ transform: "translateZ(40px)" }} className="mt-6 text-[14px] text-white/30 max-w-xl">
          Premium AI Automations & High-converting designs.
        </p>

        <button onClick={onOrderClick} style={{ transform: "translateZ(100px)" }} className="mt-8 bg-white text-black px-8 py-3.5 rounded-full font-bold text-[13px] shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-transform cursor-pointer">
          Get Your Website 🚀
        </button>

        <p style={{ transform: "translateZ(20px)" }} className="mt-4 text-[9px] tracking-[0.2em] text-white/20 uppercase">Move mouse to see 3D magic ✨</p>

      </div>
    </section>
  );
};

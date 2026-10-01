const cardRef = useRef(null)
"use client"
import { useEffect, useRef } from "react"

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const card = cardRef.current
    if(!card) return
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * -40
      card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <div style={{ background: "#0a0a0a", color: "white", fontFamily: "sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px 60px", position: "sticky", top: 0, background: "#0a0a0af0", backdropFilter: "blur(10px)", zIndex: 100, borderBottom: "1px solid #222" }}>
        <h2 style={{ fontWeight: 900 }}>YOUR BRAND</h2>
        <div style={{ display: "flex", gap: "30px" }}><span>Home</span><span>Services</span><span>About</span><span>Contact</span></div>
      </nav>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "80px 60px", minHeight: "90vh", flexWrap: "wrap" }}>
        <div style={{ maxWidth: "550px" }}>
          <h1 style={{ fontSize: "75px", fontWeight: 900, lineHeight: "75px" }}>We Build<br/><span style={{ color: "#ff0055" }}>3D Future</span></h1>
          <p style={{ color: "#888", marginTop: "20px", fontSize: "18px", lineHeight: "28px" }}>Mouse hilao 3D card ghoomega. Ye tera main hero section hai jo Vercel pe live hoga.</p>
          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <button style={{ padding: "15px 40px", background: "white", color: "black", border: "none", borderRadius: "30px", fontWeight: 900 }}>Get Started</button>
            <button style={{ padding: "15px 40px", background: "transparent", color: "white", border: "1px solid #333", borderRadius: "30px", fontWeight: 700 }}>Learn More</button>
          </div>
        </div>
        <div style={{ perspective: "1000px", marginTop: "40px" }}>
          <div ref={cardRef} style={{ width: "380px", height: "480px", background: "linear-gradient(45deg, #ff0055, #7000ff)", borderRadius: "30px", display: "flex", justifyContent: "center", alignItems: "center", transition: "transform 0.1s", transformStyle: "preserve-3d", boxShadow: "0 50px 100px rgba(255,0,85,0.4)" }}>
            <h1 style={{ fontSize: "60px", fontWeight: "900", transform: "translateZ(80px)", textAlign: "center" }}>3D<br/>HERO</h1>
          </div>
        </div>
      </div>

      <div style={{ padding: "80px 60px", background: "#111" }}>
        <h2 style={{ fontSize: "40px", fontWeight: 800, textAlign: "center" }}>Our Services</h2>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "50px", flexWrap: "wrap" }}>
          <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "20px", width: "300px" }}><h3>Fast Deploy</h3><p style={{ color: "#888", marginTop: "10px" }}>Vercel pe 1 second me live.</p></div>
          <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "20px", width: "300px" }}><h3>3D Design</h3><p style={{ color: "#888", marginTop: "10px" }}>Mouse move pe 3D animation.</p></div>
          <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "20px", width: "300px" }}><h3>Modern UI</h3><p style={{ color: "#888", marginTop: "10px" }}>Clean aur premium look.</p></div>
        </div>
      </div>

      <div style={{ padding: "40px", textAlign: "center", borderTop: "1px solid #222", color: "#666" }}>© 2026 Your Brand - All Rights Reserved</div>
    </div>
  )
}

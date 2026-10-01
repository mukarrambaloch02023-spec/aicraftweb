"use client"
import { useEffect, useRef } from "react"

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if(!card) return
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60
      const y = (e.clientY / window.innerHeight - 0.5) * -60
      card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <div style={{ height: "100vh", background: "black", display: "flex", justifyContent: "center", alignItems: "center", perspective: "1000px" }}>
      <div ref={cardRef} style={{ width: "400px", height: "500px", background: "linear-gradient(45deg, #ff0055, #7000ff)", borderRadius: "30px", display: "flex", justifyContent: "center", alignItems: "center", transition: "transform 0.1s", transformStyle: "preserve-3d", boxShadow: "0 50px 100px rgba(255,0,85,0.4)" }}>
        <h1 style={{ color: "white", fontSize: "60px", fontWeight: "900", transform: "translateZ(80px)" }}>3D<br/>HERO</h1>
      </div>
    </div>
  )
}

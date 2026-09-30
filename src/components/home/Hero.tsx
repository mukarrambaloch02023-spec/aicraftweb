"use client"
import { useEffect, useRef, useState } from "react"

function Reveal({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShow(true)
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: show? 1 : 0,
      transform: show? "translateY(0px)" : "translateY(60px)",
      transition: "all 0.8s ease-out"
    }}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <div style={{ background: "black", color: "white" }}>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <Reveal>
          <h1 style={{ fontSize: "80px", fontWeight: "900", lineHeight: "0.9" }}>
            WE CREATE<br />DIGITAL<br />EXPERIENCES
          </h1>
        </Reveal>
      </div>

      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Reveal>
          <div style={{ background: "white", color: "black", padding: "60px", borderRadius: "40px", textAlign: "center" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "800" }}>Scroll Animation Working</h2>
            <p>Ye neeche se upar aa raha hai</p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

"use client"
import { useEffect, useRef, useState } from "react"

export default function ScrollReveal({ children, delay = 0 }: any) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible? 1 : 0,
        transform: isVisible? "translateY(0px)" : "translateY(60px)",
        transition: `all 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

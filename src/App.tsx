"use client"
import ScrollReveal from "@/components/ScrollReveal"

export default function Page() {
  return (
    <div className="bg-black min-h-[200vh] p-10">
      <h1 className="text-white text-6xl h-screen">Neeche scroll karo 👇</h1>

      <ScrollReveal>
        <div className="bg-white text-black p-20 text-4xl rounded-3xl font-bold">
          AGAR YE BOX ANIMATION SE AYA TO CODE OK HAI
        </div>
      </ScrollReveal>
    </div>
  )
}

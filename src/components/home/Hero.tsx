import ScrollReveal from "./components/ScrollReveal"

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO SECTION */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <ScrollReveal>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            WE CREATE <br />
            <span className="text-zinc-500">DIGITAL</span> <br />
            EXPERIENCES
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-zinc-400 max-w-xl text-lg">
            Premium animations on scroll - smooth & modern like Apple website
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <button className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold">
            Explore Work
          </button>
        </ScrollReveal>
      </div>

      {/* DUSRA SECTION - SCROLL KARNE PE AYEGA */}
      <div className="min-h-screen flex justify-center items-center px-6">
        <ScrollReveal>
          <div className="bg-white text-black p-12 rounded-[2rem] max-w-2xl text-center">
            <h2 className="text-5xl font-bold">Ye neeche se upar ayega</h2>
            <p className="mt-4 text-zinc-600">Scroll karo to dekhega animation</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

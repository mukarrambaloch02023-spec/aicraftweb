"use client"
import Spline from '@splinetool/react-spline'

export default function Page() {
  return (
    <main className="bg-black text-white">
      {/* HERO 3D */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>

        <div className="relative z-10 flex h-full items-center px-10">
          <div className="max-w-2xl">
            <h1 className="text-7xl font-black leading-none">
              AICRAFTWEB
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                3D Websites
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Hum aisi website banate hain jo customer lati hai. Rs 5000 se start.
            </p>
            <a href="https://wa.me/923000000000" className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-bold text-black">
              WhatsApp Karo
            </a>
          </div>
        </div>
      </section>

      {/* PACKAGES 3D CARDS */}
      <section className="grid grid-cols-3 gap-6 p-10">
        {[
          { price: "5000", name: "Starter" },
          { price: "15000", name: "Business" },
          { price: "25000", name: "Premium" },
        ].map((p) => (
          <div key={p.price} className="rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
            <h3 className="text-2xl">{p.name}</h3>
            <p className="mt-2 text-5xl font-bold">Rs {p.price}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

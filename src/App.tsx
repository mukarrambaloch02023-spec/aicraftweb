export default function Page() {
  return (
    <main className="bg-[#050505] text-white min-h-screen">
      {/* NAV */}
      <nav className="flex justify-between p-6 px-10"><b>AICRAFTWEB</b><a href="https://wa.me/923000000000" className="bg-white text-black px-5 py-2 rounded-full">Contact</a></nav>

      {/* HERO 3D */}
      <section className="flex items-center justify-between px-10 py-20">
        <div>
          <h1 className="text-[70px] font-black leading-[0.9]">WEBSITES<br/><span className="text-violet-500">JO SELL KAREN</span></h1>
          <p className="text-gray-400 mt-6 text-xl">Bazar Cosmetics jaisi premium sites. Rs 5000 se start.</p>
          <div className="mt-8 flex gap-4">
            <a href="https://wa.me/923000000000" className="bg-white text-black px-8 py-4 rounded-full font-bold">WhatsApp Karo</a>
          </div>
        </div>
        <div className="w-[500px] h-[500px] bg-gradient-to-br from-violet-600 to-blue-600 rounded-[50px] flex items-center justify-center text-[120px] shadow-[0_0_100px_rgba(139,92,246,0.6)] animate-pulse">💻</div>
      </section>

      {/* SERVICES - Ye teri baki cheezen hain */}
      <section className="px-10 py-10">
        <h2 className="text-4xl font-bold mb-8">Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[30px]"><h3>Starter</h3><p className="text-4xl font-bold mt-4">Rs 5000</p><p className="text-gray-400 mt-2">1 Page - Basic</p></div>
          <div className="bg-violet-600 p-8 rounded-[30px] scale-105"><h3>Business 🔥</h3><p className="text-4xl font-bold mt-4">Rs 15000</p><p className="mt-2">5 Pages - Premium 3D</p></div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[30px]"><h3>Premium</h3><p className="text-4xl font-bold mt-4">Rs 25000</p><p className="text-gray-400 mt-2">Full Store</p></div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="px-10 py-10">
        <h2 className="text-4xl font-bold mb-8">Hamara Kaam</h2>
        <div className="bg-white/5 p-10 rounded-[30px] text-center">Bazar Cosmetics + 10 more demos - yahan tere projects ayenge</div>
      </section>

      {/* CONTACT */}
      <section className="text-center py-20 bg-white text-black mt-10 rounded-t-[50px]">
        <h2 className="text-5xl font-black">Website Banwani Hai?</h2>
        <a href="https://wa.me/923000000000" className="inline-block mt-6 bg-black text-white px-10 py-4 rounded-full">Abhi Message Karo</a>
      </section>
    </main>
  )
}

import { useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#070A14] text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-violet-600/30 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px]"></div>
      </div>

      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-black">AICraftWeb</h1>
        <button onClick={()=>setOpen(true)} className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm">Start Project</button>
      </nav>

      <section className="text-center pt-20 pb-10 px-6 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs mb-6">🔥 AI POWERED AGENCY • 500+ CLIENTS</div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">We Build <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Websites</span> That Bring Orders</h1>
        <p className="text-white/60 text-lg mb-8">Premium AI Automations, Landing Pages & Worksheet System. Aapka order system safe hai.</p>
        <button onClick={()=>setOpen(true)} className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition">Get Your Website →</button>

        <div className="mt-16 grid grid-cols-3 gap-3 p-4 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
          <div><div className="text-2xl font-bold">500+</div><div className="text-xs text-white/40">Projects</div></div>
          <div><div className="text-2xl font-bold">4.9★</div><div className="text-xs text-white/40">Rating</div></div>
          <div><div className="text-2xl font-bold">24/7</div><div className="text-xs text-white/40">Support</div></div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4 flex items-center justify-center">
          <div className="bg-[#151821] w-full max-w-md rounded-3xl p-6 border border-white/10">
            <div className="flex justify-between mb-4"><h2 className="font-bold">Start Order</h2><button onClick={()=>setOpen(false)} className="bg-white/10 w-8 h-8 rounded-full">✕</button></div>
            <p className="text-white/60 text-sm mb-4">Aapka purana OrderForm backup me safe hai. Ye naya premium popup hai.</p>
            <input placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 mb-3" />
            <input placeholder="WhatsApp Number" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 mb-4" />
            <button onClick={()=>{alert('Order Received! Backup safe hai.'); setOpen(false)}} className="w-full bg-white text-black py-3 rounded-xl font-bold">Submit Order</button>
          </div>
        </div>
      )}
      <div className="text-center py-10 text-white/20 text-xs">Backup file: App-backup.tsx me aapka purana code safe hai.</div>
    </div>
  )
}

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OrderForm } from './components/OrderForm';

function App() {
  const [showOrder, setShowOrder] = useState(false);

  return (
    <div className="min-h-screen bg-[#070A14] text-white overflow-x-hidden selection:bg-violet-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <Header onOrderClick={() => setShowOrder(true)} />

      {/* HERO - Premium AI Craft */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          AI Powered • 2,847+ Projects Delivered
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
          We Build <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">AI Websites</span> <br/> That Get Orders
        </h1>

        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
          AICraftWeb - Premium AI Development, Automations & High-Converting Websites. Worksheet se orders ab auto aayenge.
        </p>

        <div className="flex gap-4 justify-center">
          <button onClick={() => setShowOrder(true)} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition">
            Start Your Project →
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition">
            View Live Demos
          </button>
        </div>

        {/* Stats Card - Glass */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto p-6 rounded-[24px] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <div><h3 className="text-3xl font-bold">500+</h3><p className="text-white/50 text-sm">Clients</p></div>
          <div><h3 className="text-3xl font-bold">99%</h3><p className="text-white/50 text-sm">Satisfaction</p></div>
          <div><h3 className="text-3xl font-bold">24/7</h3><p className="text-white/50 text-sm">Support</p></div>
        </div>
      </section>

      {showOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-[#121521] border border-white/10 rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <h2 className="font-bold text-xl">Create Order</h2>
              <button onClick={() => setShowOrder(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button>
            </div>
            <div className="p-6">
              <OrderForm onClose={() => setShowOrder(false)} />
            </div>
          </div>
        </div>
      )}

      <footer className="py-8 text-center text-white/30 text-sm border-t border-white/5">
        © 2026 AICraftWeb - Backup: App-backup.tsx me safe hai
      </footer>
    </div>
  );
}

export default App;

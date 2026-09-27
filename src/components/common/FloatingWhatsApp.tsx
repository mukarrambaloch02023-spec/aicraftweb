import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { AdminSettings } from '../../types';

interface FloatingWhatsAppProps {
  settings: AdminSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const handleDirectChat = () => {
    window.open('https://wa.me/923097425011?text=Hi, I need a website', '_blank');
  };

  const handleSend = () => {
    const textToSend = quickMsg.trim() || 'Hi, I need a website';
    const url = `https://wa.me/923097425011?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setQuickMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Chat Popup Drawer */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#0A1633] border-2 border-emerald-400 p-4 shadow-[0_0_35px_rgba(52,211,153,0.4)] text-left animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A1633]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {settings.ownerName}
                </h4>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  Online • Typically replies instantly
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              aria-label="Close chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-[#060C1D] rounded-xl p-3 border border-blue-950 text-xs text-slate-300 mb-3 space-y-1">
            <p className="font-semibold text-white">Assalam-o-Alaikum!</p>
            <p>
              I am <span className="text-cyan-400 font-bold">Mukarram Ali</span>, lead developer at AiCraftWeb. How can I help you build a hack-proof website today?
            </p>
          </div>

          <div className="space-y-2">
            <textarea
              rows={2}
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              placeholder="Type your message or project requirements..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#070D1F] border border-blue-900 focus:border-emerald-400 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <button
              onClick={handleSend}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 shadow-[0_0_15px_rgba(52,211,153,0.5)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 fill-slate-950" />
              <span>Send Message on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Persistent Floating WhatsApp Pill/Button */}
      <button
        onClick={handleDirectChat}
        className="group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-[#0D261E] via-[#05382B] to-[#0D4032] border-2 border-emerald-400/80 hover:border-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.6)] hover:shadow-[0_0_35px_rgba(52,211,153,0.9)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
        aria-label="Chat with Mukarram Ali on WhatsApp"
      >
        {/* Pulsing Emerald Dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping absolute" />
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
        </div>

        <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-300">
          <MessageCircle className="w-4 h-4 fill-emerald-400 text-slate-900" />
        </div>

        {/* Mandatory Exact Label */}
        <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide whitespace-nowrap">
          Chat with Mukarram Ali
        </span>
      </button>
    </div>
  );
};

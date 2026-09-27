import React from 'react';
import { ShieldCheck, UserCheck, Terminal, MapPin, Award, CheckCircle, Code2 } from 'lucide-react';
import { AdminSettings } from '../../types';

interface AboutProps {
  settings: AdminSettings;
  onOrderClick: () => void;
}

export const AboutSection: React.FC<AboutProps> = ({ settings, onOrderClick }) => {
  return (
    <section id="about" className="py-20 bg-[#0A1122] circuit-subtle relative border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Profile Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#070D1F] border border-blue-500/30 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,136,255,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Developer Avatar / Tech Badge */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#0088FF] to-cyan-400 p-1 shadow-[0_0_25px_rgba(0,136,255,0.6)]">
                  <div className="w-full h-full rounded-[14px] bg-[#070D1F] flex items-center justify-center text-cyan-300">
                    <UserCheck className="w-12 h-12" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-20 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Available for Projects</span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-1">
                {settings.ownerName}
              </h3>
              <p className="text-sm font-mono text-cyan-400 mb-4">
                Founder, Lead Developer & Cyber Architect
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-300 mb-6 bg-[#0A1633] px-3 py-2 rounded-xl border border-blue-900/60">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>Operating from {settings.location} (Worldwide Delivery)</span>
              </div>

              {/* Verified Metrics */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-[#050B1A] p-3 rounded-xl border border-blue-900/40">
                  <div className="text-2xl font-black text-white tabular-nums">0%</div>
                  <div className="text-[11px] text-slate-400">Security Breach Rate</div>
                </div>
                <div className="bg-[#050B1A] p-3 rounded-xl border border-blue-900/40">
                  <div className="text-2xl font-black text-white tabular-nums">100%</div>
                  <div className="text-[11px] text-slate-400">Clean Licensed Themes</div>
                </div>
                <div className="bg-[#050B1A] p-3 rounded-xl border border-blue-900/40">
                  <div className="text-2xl font-black text-white tabular-nums">&lt; 1s</div>
                  <div className="text-[11px] text-slate-400">Average Load Time</div>
                </div>
                <div className="bg-[#050B1A] p-3 rounded-xl border border-blue-900/40">
                  <div className="text-2xl font-black text-cyan-400 tabular-nums">24h</div>
                  <div className="text-[11px] text-slate-400">WhatsApp SLA Response</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder's Manifesto */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A1633] border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>THE AICRAFTWEB PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              "We Don't Just Build Websites; We Armor-Plate Your Digital Presence."
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                My name is <strong className="text-white">Mukarram Ali</strong>. I founded <span className="text-cyan-400 font-semibold">AiCraftWeb</span> after witnessing hundreds of businesses lose revenue and reputations to hacked WordPress sites, cheap nulled plugins, and bloated spaghetti code.
              </p>
              <p>
                Our promise is clear: <span className="text-white font-medium">Websites built by us never get hacked.</span> We enforce zero-trust architecture, genuine licensed Astra Pro frameworks, automated off-site backups, and rigorous SQL/XSS sanitization on every single endpoint.
              </p>
              <p>
                Whether you need a sleek 1-page landing page, a multi-page corporate portal, or a high-volume e-commerce store with Pakistani payment gateways, you get direct engineering attention from me with zero outsourcing.
              </p>
            </div>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Direct WhatsApp contact with Mukarram Ali</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>100% Genuine Astra Pro License</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Automated daily cloud backups</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Money-back speed & security guarantee</span>
              </div>
            </div>

            <button
              onClick={onOrderClick}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] hover:opacity-95 shadow-[0_0_20px_rgba(0,136,255,0.6)] cursor-pointer"
            >
              Order Your Website from Mukarram Ali
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

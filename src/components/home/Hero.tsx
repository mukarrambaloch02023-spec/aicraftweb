import React from 'react';
import { ShieldCheck, Zap, Lock, Award, MessageCircle, ArrowRight, CheckCircle2, Server, Terminal } from 'lucide-react';
import { Logo } from '../common/Logo';
import { AdminSettings } from '../../types';

interface HeroProps {
  settings: AdminSettings;
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onOrderClick }) => {
  const whatsappUrl = 'https://wa.me/923097425011?text=Hi, I need a website';

  return (
    <section id="hero" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden circuit-bg border-b border-blue-900/30">
      {/* Background Cyber Glowing Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Decorative Technical Grid Lines & Nodes */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#0088FF" strokeWidth="0.5" strokeDasharray="6 6" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#0088FF" strokeWidth="0.5" strokeDasharray="6 6" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#0088FF" strokeWidth="0.5" strokeDasharray="6 6" />
          <circle cx="10%" cy="50%" r="3" fill="#00F0FF" />
          <circle cx="90%" cy="50%" r="3" fill="#00F0FF" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Official Brand Emblem */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00F0FF]/30 to-[#0088FF]/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            <div className="relative px-6 py-3.5 rounded-2xl bg-[#081024]/90 border border-blue-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(0,136,255,0.3)] backdrop-blur-md">
              <Logo
                size="md"
                variant={settings.activeLogoType || 'brain'}
                customLogoUrl={settings.customLogoUrl}
                showTagline={true}
              />
            </div>
          </div>
        </div>

        {/* Lead Engineer & Location Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1633]/90 border border-blue-500/30 text-xs text-cyan-300 mb-8 shadow-[0_0_15px_rgba(0,136,255,0.25)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-3.5" />
          <span className="font-semibold">Engineered by Mukarram Ali</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Pakistan • Serving Worldwide</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6 text-balance">
          We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#0088FF] to-[#38BDF8] drop-shadow-[0_0_25px_rgba(0,136,255,0.5)]">Hack-Proof, Secure</span> & Blazing Fast Websites
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          We deliver highly secure, professional work. Websites built by us never get hacked. <span className="text-white font-medium">100% Safe, Optimized & Managed.</span>
        </p>

        {/* 4 Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#0A1633]/80 border border-blue-500/25 shadow-[0_0_15px_rgba(0,136,255,0.12)]">
            <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">100% Secure</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#0A1633]/80 border border-blue-500/25 shadow-[0_0_15px_rgba(0,136,255,0.12)]">
            <Lock className="w-5 h-5 text-[#0088FF] flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">Hack-Proof</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#0A1633]/80 border border-blue-500/25 shadow-[0_0_15px_rgba(0,136,255,0.12)]">
            <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">Fast Loading</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#0A1633]/80 border border-blue-500/25 shadow-[0_0_15px_rgba(0,136,255,0.12)]">
            <Award className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">Trusted by Businesses</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10">
          <button
            onClick={onOrderClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#0070F3] to-[#00A3FF] hover:from-[#0060df] hover:to-[#0090ff] shadow-[0_0_25px_rgba(0,136,255,0.7)] hover:shadow-[0_0_35px_rgba(0,240,255,0.9)] border border-cyan-300/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Order Your Website Now</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-[#0D2447] hover:bg-[#12315e] border border-blue-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,136,255,0.3)] transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="text-xs text-cyan-300 uppercase tracking-wider font-semibold">WhatsApp Direct</div>
              <div className="text-sm font-bold">Chat with Mukarram Ali</div>
            </div>
          </a>
        </div>

        {/* Prominent WhatsApp Number Display */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
          <span className="text-slate-400">Direct WhatsApp Hotline:</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono font-bold text-[#00F0FF] hover:text-white transition-colors bg-[#08152e] px-3 py-1.5 rounded-lg border border-blue-500/30 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{settings.whatsappNumber}</span>
          </a>
          <span className="text-xs text-slate-500">(Immediate Response in Pakistan & Overseas)</span>
        </div>

        {/* Technical Architecture Preview Card */}
        <div className="mt-16 max-w-4xl mx-auto rounded-2xl bg-[#091329]/90 border border-blue-500/30 p-4 sm:p-6 shadow-[0_0_40px_rgba(0,136,255,0.15)] text-left relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-slate-300">AICRAFT-SECURITY-SHIELD // v3.2 ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-emerald-400">100% DEFENDED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-[#060c1d] p-3 rounded-lg border border-blue-900/40">
              <div className="text-slate-400 mb-1">Theme Integrity:</div>
              <div className="text-cyan-300 font-semibold">100% Clean Astra Pro Licensed</div>
              <div className="text-[10px] text-slate-500 mt-1">Zero nulled themes or backdoor files</div>
            </div>
            <div className="bg-[#060c1d] p-3 rounded-lg border border-blue-900/40">
              <div className="text-slate-400 mb-1">Defense Perimeter:</div>
              <div className="text-emerald-400 font-semibold">Cloudflare WAF + SSL SHA-256</div>
              <div className="text-[10px] text-slate-500 mt-1">Anti-DDoS, zero SQL/XSS vulnerability</div>
            </div>
            <div className="bg-[#060c1d] p-3 rounded-lg border border-blue-900/40">
              <div className="text-slate-400 mb-1">Performance Benchmarks:</div>
              <div className="text-amber-300 font-semibold">Google PageSpeed 98/100</div>
              <div className="text-[10px] text-slate-500 mt-1">Sub-second loading on 4G/5G networks</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

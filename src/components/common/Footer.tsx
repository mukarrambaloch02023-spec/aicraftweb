import React, { useState } from 'react';
import { Logo } from './Logo';
import { ShieldCheck, MessageCircle, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { AdminSettings } from '../../types';

interface FooterProps {
  settings: AdminSettings;
  onNavigate: (target: string) => void;
  customLogoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  customLogoUrl,
}) => {
  const whatsappUrl = 'https://wa.me/923097425011?text=Hi, I need a website';

  return (
    <footer className="relative bg-[#050A18] border-t border-blue-900/40 text-slate-300 overflow-hidden circuit-bg">
      {/* Background Circuit Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="footerCircuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 0 50 L 40 50 L 50 40 L 70 40 L 80 50 L 100 50" fill="none" stroke="#0088FF" strokeWidth="0.8" />
            <circle cx="50" cy="40" r="2" fill="#00F0FF" />
            <circle cx="70" cy="40" r="2" fill="#00F0FF" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footerCircuit)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/40">
          {/* Col 1 & 2: Brand Lockup & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo
              size="lg"
              showTagline={true}
              variant={settings.activeLogoType || 'brain'}
              customLogoUrl={customLogoUrl}
              onClick={() => onNavigate('hero')}
            />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mt-3">
              AiCraftWeb is Pakistan's premier cybersecurity-focused web engineering agency. We design and deploy hack-proof, ultra-fast websites and high-converting e-commerce stores that never get compromised.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/90 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Zero-Breach Track Record</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-cyan-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('security')} className="hover:text-cyan-400 transition-colors">
                  Security Defense
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('budget-meter')} className="hover:text-cyan-400 transition-colors">
                  Interactive Budget Meter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-cyan-400 transition-colors">
                  Pricing Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('order-form')} className="hover:text-cyan-400 transition-colors">
                  Custom Order Form
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">
                  About Mukarram Ali
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Mandatory Information */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Contact & Ownership
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono w-28">Official URL:</span>
                <a
                  href="https://www.aicraftweb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 font-mono hover:underline font-bold"
                >
                  www.aicraftweb.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono w-28">Website Name:</span>
                <span className="text-white font-bold">AiCraftWeb</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono w-28">Owner:</span>
                <span className="text-cyan-300 font-semibold">{settings.ownerName}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono w-28">Location:</span>
                <span className="text-slate-200">{settings.location}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono w-28">WhatsApp:</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-mono hover:underline flex items-center gap-1 font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{settings.whatsappNumber}</span>
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono w-28">Phone Number:</span>
                <span className="text-slate-200 font-mono">{settings.phone}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono w-28">Email:</span>
                <a href={`mailto:${settings.email}`} className="text-cyan-300 hover:underline font-mono">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="select-none text-slate-400">
            © {new Date().getFullYear()} <strong className="text-slate-300">AiCraftWeb by Mukarram Ali</strong>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-slate-600">Pakistan Web Engineering • 100% Hack-Proof</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

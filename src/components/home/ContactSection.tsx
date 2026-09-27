import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { AdminSettings } from '../../types';

interface ContactSectionProps {
  settings: AdminSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const whatsappUrl = 'https://wa.me/923097425011?text=Hi, I need a website';

  return (
    <section id="contact" className="py-20 bg-[#070D1F] circuit-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A1633] border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>DIRECT FOUNDER ACCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Connect Directly with Mukarram Ali
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            No middle managers. Discuss requirements, get instant quotations, and kick off your hack-proof web build immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: WhatsApp Primary */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-[#0A1633] border-2 border-emerald-500/40 hover:border-emerald-400 p-6 sm:p-8 transition-all hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                Fastest Response
              </span>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp Direct</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Chat with Developer Mukarram Ali. Send project briefs, voice notes, and reference links anytime.
              </p>
            </div>

            <div className="pt-4 border-t border-blue-900/50 flex items-center justify-between font-mono text-sm font-bold text-emerald-300">
              <span>{settings.whatsappNumber}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* Card 2: Phone Hotline */}
          <div className="rounded-2xl bg-[#070D1F] border border-blue-500/25 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-cyan-400 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
                Phone Hotline
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Voice Call</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Available Sunday through Friday for in-depth consultation and requirements gathering.
              </p>
            </div>

            <div className="pt-4 border-t border-blue-900/50 font-mono text-sm font-bold text-slate-200">
              {settings.phone}
            </div>
          </div>

          {/* Card 3: Official Email */}
          <div className="rounded-2xl bg-[#070D1F] border border-blue-500/25 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-cyan-400 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
                Formal RFPs & Inquiries
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Official Email</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Send formal project scopes, NDAs, and corporate RFP documents for review.
              </p>
            </div>

            <div className="pt-4 border-t border-blue-900/50 font-mono text-xs font-bold text-slate-200 truncate">
              {settings.email}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Database, RefreshCw, Cpu, Check, X, FileCode } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-20 bg-[#0A1122] circuit-subtle relative border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A1633] border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>UNCOMPROMISED CYBERSECURITY PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Our Websites Never Get Hacked?
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Over 80% of Pakistani and global business websites get defaced or injected with malware due to nulled themes and amateur code. At <span className="text-cyan-400 font-semibold">AiCraftWeb</span>, developer Mukarram Ali applies bank-grade defense layers to every project.
          </p>
        </div>

        {/* 3 Core Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Column 1 */}
          <div className="group rounded-2xl bg-[#070D1F] border border-blue-500/20 hover:border-cyan-400/60 p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,136,255,0.25)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <FileCode className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                Secure Coding & Clean Astra Pro
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Zero nulled plugins or cracked scripts. We only deploy official, licensed Astra Pro themes and sanitized code with zero backdoors or hidden crypto miners.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-blue-900/40 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Original verified Astra Pro theme files</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>No pirated GPL or modified PHP backdoors</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Strict WordPress salts & hardened wp-config</span>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="group rounded-2xl bg-[#070D1F] border border-blue-500/30 hover:border-cyan-400/80 p-8 transition-all duration-300 shadow-[0_0_25px_rgba(0,136,255,0.15)] hover:shadow-[0_0_35px_rgba(0,136,255,0.35)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-cyan-500 to-blue-600 text-[10px] font-bold text-white rounded-bl-lg tracking-wider uppercase">
              Maximum Defense
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-[#00F0FF] mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                SSL + Cloudflare + Daily Backups
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Enterprise Cloudflare Web Application Firewall (WAF) blocks automated botnets, DDoS surges, and brute force attacks before they ever reach your server.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-blue-900/40 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>256-bit TLS/SSL End-to-End Encryption</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Automatic Daily Offsite Backups to Cloud</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero-downtime Disaster Recovery within minutes</span>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="group rounded-2xl bg-[#070D1F] border border-blue-500/20 hover:border-cyan-400/60 p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,136,255,0.25)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                SQL & XSS Injection Protection
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                All form inputs, inquiries, and queries are strictly validated and HTML-escaped. We eliminate cross-site scripting (XSS) and SQL injection vulnerabilities at the core.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-blue-900/40 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Sanitized form fields & anti-CSRF token defense</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Blocked XML-RPC & disabled dangerous REST routes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Custom login URL + 2FA brute force blocker</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security Comparison Table */}
        <div className="rounded-2xl bg-[#070D1F] border border-blue-900/50 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-1">Standard Market Websites vs. AiCraftWeb Security</h3>
            <p className="text-xs text-slate-400">See why businesses switch to Mukarram Ali's hardened infrastructure</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-blue-900/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 px-2">Security Benchmark</th>
                  <th className="pb-3 px-4 text-rose-400">Cheap / Standard Developers</th>
                  <th className="pb-3 px-4 text-cyan-400">AiCraftWeb Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-950/60 text-xs sm:text-sm">
                <tr>
                  <td className="py-3 px-2 font-medium text-slate-200">Theme & Plugin Licenses</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 flex-shrink-0" /> Nulled/Pirated (high infection risk)
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 flex-shrink-0" /> 100% Clean Astra Pro Licensed
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium text-slate-200">Firewall & DDoS Defense</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 flex-shrink-0" /> None or basic hosting default
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 flex-shrink-0" /> Cloudflare Edge WAF Included
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium text-slate-200">Automated Daily Backups</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 flex-shrink-0" /> No backups or manual only
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 flex-shrink-0" /> Offsite Cloud Automated Backups
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium text-slate-200">SQL & XSS Sanitization</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 flex-shrink-0" /> Neglected, vulnerable forms
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 flex-shrink-0" /> Strict Input Sanitization
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

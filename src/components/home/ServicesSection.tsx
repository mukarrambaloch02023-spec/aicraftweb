import React from 'react';
import { Layers, ShieldCheck, Zap, ShoppingBag, Megaphone, Palette, Wrench, CheckCircle } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: ShieldCheck,
      title: 'Hack-Proof Website Engineering',
      desc: 'Bespoke, hardened web development built on clean Astra Pro and custom code. Protected against SQL injection, XSS, brute-force exploits, and unauthorized access.',
      points: ['Official Astra Pro genuine license', 'Custom login URLs & 2FA protection', 'Hardened file permissions & headers'],
    },
    {
      icon: ShoppingBag,
      title: 'High-Converting E-Commerce Stores',
      desc: 'Turnkey online stores with seamless payment gateway integrations (JazzCash, EasyPaisa, Stripe, Credit Cards), fast checkout, and inventory tracking.',
      points: ['Local Pakistani & international payments', 'Abandoned cart recovery workflows', 'Mobile-first instant ordering'],
    },
    {
      icon: Zap,
      title: 'Ultra Speed Optimization (95+)',
      desc: 'We optimize CSS, JS payloads, server response time, and WebP assets to ensure your website loads in under 1 second on mobile networks.',
      points: ['Google PageSpeed 95+ score', 'Next-gen WebP image compression', 'Redis caching & Cloudflare CDN'],
    },
    {
      icon: Wrench,
      title: 'Monthly Website Management',
      desc: 'Hands-off peace of mind. We handle 24/7 uptime monitoring, daily offsite cloud backups, emergency restoration, plugin updates, and security scans.',
      points: ['Weekly health & security reports', 'Unlimited small text & image updates', 'Zero downtime emergency rollback'],
    },
    {
      icon: Megaphone,
      title: 'Targeted Ad Campaign Management',
      desc: 'High-ROI Meta & Google ads management tailored for Pakistani and global target audiences. 2 high-converting ads per week to scale sales.',
      points: ['Audience targeting & pixel tracking', 'Ad budget optimization', 'Weekly ROI and conversion reporting'],
    },
    {
      icon: Palette,
      title: 'Ad Posts & Creative Graphic Design',
      desc: 'Eye-catching, thumb-stopping social media creatives, promotional posters, and product highlight graphics designed to maximize CTR.',
      points: ['Modern dark cyber & luxury aesthetics', 'Optimized for Instagram, Facebook, TikTok', 'High-res source graphics included'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#070D1F] circuit-bg relative border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A1633] border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>FULL-STACK AGENCY CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Specialized Services by AiCraftWeb
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Every website is custom engineered from Pakistan by Mukarram Ali to deliver unmatched security, blinding speed, and high conversion rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl bg-[#0A1122]/90 border border-blue-500/20 hover:border-cyan-400/60 p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,136,255,0.2)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {srv.desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-blue-900/40">
                  {srv.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

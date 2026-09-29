import React from 'react';

export const Services = () => {
  const services = [
    {
      icon: "🛡️",
      title: "Hack-Proof Website Engineering",
      desc: "Bespoke, hardened web development built on clean Astra Pro and custom code. Protected against SQL injections & XSS attacks.",
    },
    {
      icon: "🛒",
      title: "High-Converting E-Commerce Stores",
      desc: "Turnkey online stores with seamless payment gateway integrations (JazzCash, EasyPaisa, Stripe, PayPal) & COD optimization.",
    },
    {
      icon: "⚡",
      title: "Ultra Speed Optimization (95+)",
      desc: "We optimize CSS, JS payloads, server response time, and WebP assets to ensure your website loads in under 1.5 seconds.",
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-[#080F26] overflow-hidden">
      <style>{`
        @keyframes beam {
          0% { left: -100px; }
          100% { left: 100%; }
        }
        @keyframes beamReverse {
          0% { left: 100%; }
          100% { left: -100px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      {/* Floating Background Glow - Upar Neeche Hilega */}
      <div style={{animation: 'float 6s ease-in-out infinite'}} className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/20 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center text-white leading-tight">
          Specialized Services by<br/> AiCraftWeb
        </h2>
        <p className="text-center text-white/40 text-[14px] max-w-2xl mx-auto mt-4">
          Every website is custom engineered from Pakistan by Mukarram Ali to deliver unmatched security, blinding speed, and high conversion rates.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {services.map((s, i) => (
            <div key={i} className="group relative rounded-[20px] bg-[#0F172A] border border-white/10 p-7 overflow-hidden hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,214,0.15)]">

              {/* TOP Running Light - Right se Left */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-white/5 overflow-hidden">
                <div style={{animation: `beam ${3+i}s linear infinite`}} className="absolute top-0 w-[90px] h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee]"></div>
              </div>

              {/* BOTTOM Running Light - Left se Right */}
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white/5 overflow-hidden">
                <div style={{animation: `beamReverse ${3+i}s linear infinite`}} className="absolute top-0 w-[90px] h-full bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_8px_#a78bfa]"></div>
              </div>

              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[18px] group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>

              <h3 className="text-white font-bold text-[16px] mt-6 leading-tight">{s.title}</h3>
              <p className="text-white/40 text-[13px] mt-3 leading-relaxed">{s.desc}</p>

              <div className="mt-5 text-cyan-400/70 text-[12px] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

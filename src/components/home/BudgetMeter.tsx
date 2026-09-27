import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Shield, ShoppingCart, Globe2 } from 'lucide-react';
import { formatCurrencyPKR } from '../../utils/security';

interface BudgetMeterProps {
  onSelectBudget: (budget: number, packageType: string) => void;
}

export const BudgetMeter: React.FC<BudgetMeterProps> = ({ onSelectBudget }) => {
  const [budget, setBudget] = useState<number>(10000);

  // Determine dynamic package based on slider position
  const getPackageInfo = (val: number) => {
    if (val < 8000) {
      return {
        name: 'Basic Package',
        tier: 'Basic',
        tag: 'Fast Launch',
        description: 'Perfect for professionals, quick portfolios, or single landing pages with instant WhatsApp conversions.',
        pages: '1 Custom High-Speed Page',
        badge: 'Rs. 5,000 Base',
        features: [
          'High-speed Single Landing Page Architecture',
          'Licensed Astra Theme Setup',
          'WhatsApp Floating Live Chat & Inquiry Routing',
          'Mobile & Tablet 100% Responsive',
          'SSL Security & HTTPS Setup',
          'Sanitized Contact & Lead Form'
        ],
        icon: Globe2,
        recommended: false,
      };
    } else if (val < 16000) {
      return {
        name: 'Pro Package',
        tier: 'Pro',
        tag: 'Most Popular',
        description: 'Complete 5-page business website with genuine Astra Pro, 95+ speed score, and advanced on-page SEO.',
        pages: '5 Full Pages (Home, About, Services, Portfolio, Contact)',
        badge: 'Rs. 10,000 Base',
        features: [
          '5 Full Responsive High-Converting Pages',
          'Genuine Astra Pro Theme License Included',
          'Speed Optimization (Score 95+)',
          'Hack-Proof Security & Anti-XSS Sanitization',
          'Advanced On-Page Technical SEO',
          'WhatsApp Instant Lead Routing',
          'Portfolio & Testimonials Showcase'
        ],
        icon: Shield,
        recommended: true,
      };
    } else {
      return {
        name: 'Premium E-Commerce Package',
        tier: 'Premium',
        tag: 'Full E-Commerce',
        description: 'Turnkey online store with local payments (JazzCash/EasyPaisa), automated checkout, Cloudflare defense, and free logo design.',
        pages: 'Complete E-Commerce Store with Unlimited Products',
        badge: 'Rs. 20,000 Base',
        features: [
          'Full E-Commerce Store & WooCommerce Setup',
          'Payment Gateway Integration (JazzCash / EasyPaisa / Stripe)',
          '1 Month Free Priority Technical Support by Mukarram Ali',
          'Free Technical Brand Logo Design',
          'Cloudflare Enterprise WAF & Anti-DDoS',
          'Automated Daily Offsite Backups',
          'Speed Score 98+ & Zero-Breach Setup'
        ],
        icon: ShoppingCart,
        recommended: false,
      };
    }
  };

  const currentPkg = getPackageInfo(budget);
  const IconComponent = currentPkg.icon;

  const handleApply = () => {
    onSelectBudget(budget, currentPkg.tier);
  };

  return (
    <section id="budget-meter" className="py-20 bg-[#070D1F] circuit-bg relative border-b border-blue-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A1633] border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE MONEY METER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            What is Your Budget?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Slide the futuristic budget meter between <span className="text-cyan-400 font-semibold">Rs. 5,000</span> and <span className="text-cyan-400 font-semibold">Rs. 20,000</span> to preview your tailor-made website package in real time.
          </p>
        </div>

        {/* Futuristic Slider Card */}
        <div className="rounded-3xl bg-[#0A1122]/90 border border-blue-500/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,136,255,0.2)] mb-10">
          {/* Neon Value Meter Display */}
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-2">
              Selected Budget Level
            </span>
            <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-[#0088FF] drop-shadow-[0_0_25px_rgba(0,136,255,0.8)] tabular-nums">
              {formatCurrencyPKR(budget)}
            </div>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-blue-950/80 border border-cyan-400/40 text-xs font-bold text-cyan-300">
              <span>{currentPkg.tag}</span>
              <span>•</span>
              <span>Tier: {currentPkg.tier}</span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="px-2 sm:px-6 mb-8">
            <div className="relative flex items-center">
              <input
                type="range"
                min={5000}
                max={20000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-3 cursor-pointer z-10"
                aria-label="Adjust budget slider"
              />
            </div>

            {/* Quick-Snap Budget Milestones */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mt-4 px-1">
              <button
                type="button"
                onClick={() => setBudget(5000)}
                className={`transition-colors hover:text-cyan-300 text-left ${budget === 5000 ? 'text-cyan-400 font-bold' : ''}`}
              >
                Rs. 5,000
                <span className="block text-[10px] text-slate-500">Basic</span>
              </button>
              <button
                type="button"
                onClick={() => setBudget(10000)}
                className={`transition-colors hover:text-cyan-300 text-center ${budget === 10000 ? 'text-cyan-400 font-bold' : ''}`}
              >
                Rs. 10,000
                <span className="block text-[10px] text-cyan-400 font-semibold">Pro (Popular)</span>
              </button>
              <button
                type="button"
                onClick={() => setBudget(20000)}
                className={`transition-colors hover:text-cyan-300 text-right ${budget === 20000 ? 'text-cyan-400 font-bold' : ''}`}
              >
                Rs. 20,000
                <span className="block text-[10px] text-slate-500">Premium E-Commerce</span>
              </button>
            </div>
          </div>

          {/* Live Package Details Box */}
          <div className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
            currentPkg.recommended 
              ? 'bg-[#0E1C38] border-2 border-cyan-400/80 shadow-[0_0_30px_rgba(0,136,255,0.3)]' 
              : 'bg-[#070D1F] border border-blue-900/60'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-900/50 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    {currentPkg.name}
                    {currentPkg.recommended && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-400 text-slate-950 uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-300">{currentPkg.pages}</p>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#0088FF] to-[#00F0FF] hover:from-[#0070df] hover:to-[#00d0ef] text-slate-950 shadow-[0_0_20px_rgba(0,136,255,0.6)] flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02]"
              >
                <span className="text-slate-950 font-black">Choose {currentPkg.tier} Package</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {currentPkg.description}
            </p>

            {/* Included Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentPkg.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

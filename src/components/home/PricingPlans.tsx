import React from 'react';
import { Check, Star, Zap, Shield, ArrowRight } from 'lucide-react';
import { ServicePackage } from '../../types';
import { formatCurrencyPKR } from '../../utils/security';

interface PricingPlansProps {
  services: ServicePackage[];
  onSelectPlan: (pkg: ServicePackage) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ services, onSelectPlan }) => {
  // New fixed prices - you can change here anytime
  const getUpdatedPrice = (planName: string, originalPrice: number) => {
    const name = planName.toLowerCase();
    if (name.includes('starter') || name.includes('basic')) return 25000;
    if (name.includes('pro') || name.includes('standard')) return 45000;
    if (name.includes('premium') || name.includes('advance')) return 65000;
    return originalPrice;
  };

  return (
    <section id="pricing" className="py-20 bg-[#0A1122] circuit-subtle relative border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A1633] border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>TRANSPARENT VALUE PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Fixed Pricing Plans, Zero Hidden Fees
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Engineered with bank-grade security protocols. Choose the tier that matches your business vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {services.map((plan) => {
            const isPopularTier = plan.isPopular || plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('standard');
            const updatedPrice = getUpdatedPrice(plan.name, plan.price);

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopularTier
                    ? 'bg-[#0D1C3D] border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,136,255,0.4)] transform md:-translate-y-3 z-10'
                    : 'bg-[#070D1F] border border-blue-500/25 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,136,255,0.2)]'
                }`}
              >
                {isPopularTier && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-[#0088FF] text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.6)] flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-slate-950" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                    <span className="text-xs font-mono text-cyan-300/80 px-2.5 py-1 rounded bg-[#0A1633] border border-blue-800">
                      {plan.deliveryTime}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-blue-900/50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums">
                        {formatCurrencyPKR(updatedPrice)}
                      </span>
                    </div>
                    <span className="text-[11px] text-cyan-400/90 font-medium block mt-1">
                      {plan.pages}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Included with this package:
                    </div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan({ ...plan, price: updatedPrice })}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    isPopularTier
                      ? 'bg-gradient-to-r from-cyan-400 to-[#0088FF] text-slate-950 hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.7)]'
                      : 'bg-[#0A1633] hover:bg-[#12244f] text-white border border-blue-500/40 hover:border-cyan-400'
                  }`}
                >
                  <span>Order {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

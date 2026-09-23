import React from 'react';
import { BRAND_CONFIG } from '../data/products';
import { Sparkles, PackageCheck, Flame, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function WhyFaudi() {
  const { whyFaudi } = BRAND_CONFIG;

  const iconMap = {
    Sparkles: Sparkles,
    PackageCheck: PackageCheck,
    Flame: Flame,
  };

  return (
    <section id="why-faudi" className="relative w-full py-20 sm:py-28 bg-[#FAF7EE] border-b-2 border-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-faudi-pill bg-brand-yellow border-2 border-brand-black text-xs font-sub font-bold uppercase tracking-wider mb-4 shadow-bold-sm">
            <span>NO FLUFF. NO SHORTCUTS.</span>
          </div>
          <h2 className="font-display text-section uppercase tracking-tight text-brand-black leading-none">
            WHY FAUDI HITS DIFFERENT
          </h2>
          <p className="mt-3 text-base sm:text-lg text-brand-black/70 font-body">
            Commercial consistency meets bold, uncompromising attitude. Here is what we stand for:
          </p>
        </div>

        {/* 3 Bold Statements with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyFaudi.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <div
                key={item.id}
                className="relative flex flex-col justify-between p-8 rounded-faudi-lg bg-white border-3 border-brand-black shadow-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-bold-lg group"
              >
                {/* Floating Badge */}
                <div className="absolute -top-3.5 right-6">
                  <span className="px-3 py-1 rounded-faudi bg-brand-black text-brand-yellow font-sub font-bold text-xs uppercase tracking-wider shadow-bold-sm">
                    {item.badge}
                  </span>
                </div>

                <div>
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-faudi bg-brand-yellow/30 border-2 border-brand-black flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors shadow-bold-sm">
                    <Icon className="w-8 h-8 text-brand-black group-hover:text-white transition-colors" />
                  </div>

                  <span className="text-xs font-sub font-bold uppercase tracking-wider text-brand-black/50 block mb-1">
                    PILLAR 0{index + 1}
                  </span>

                  <h3 className="font-display text-2xl sm:text-3xl text-brand-black uppercase leading-tight tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base text-brand-black/75 font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t-2 border-brand-black/10 flex items-center justify-between text-xs font-sub font-bold uppercase tracking-wider text-brand-black/60">
                  <span>UNCOMPROMISED RECIPE</span>
                  <span className="text-brand-orange">✓ VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

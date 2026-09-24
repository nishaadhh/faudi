import React from 'react';
import { useData } from '../context/DataContext';
import { SNACKS_DATA } from '../data/products';
import { ArrowUpRight, Flame, Clock } from 'lucide-react';

export default function SnacksZone() {
  const { products, getWhatsAppOrderLink } = useData();
  const { headline, subheadline } = SNACKS_DATA;

  // Filter dynamic snacks
  const snackItems = products.filter((p) => p.category === 'snacks' && p.is_active !== false);

  // Gentle playful rotations for asymmetrical look
  const rotationClasses = [
    '-rotate-1 hover:rotate-0',
    'rotate-1 hover:rotate-0',
    '-rotate-2 hover:rotate-0',
    'rotate-2 hover:rotate-0',
    '-rotate-1 hover:rotate-0',
  ];

  return (
    <section id="snacks" className="relative w-full py-20 sm:py-28 bg-[#FFF5E9] border-b-2 border-brand-black overflow-hidden">
      {/* Background graphic sticker accent */}
      <div className="absolute top-10 right-4 sm:right-12 pointer-events-none opacity-20 lg:opacity-30">
        <span className="font-display text-8xl sm:text-9xl text-amber-500 uppercase tracking-tighter">
          CRUNCH
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-faudi bg-brand-orange text-white font-sub font-bold text-xs uppercase tracking-wider mb-3 shadow-bold-sm">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>ZONE 01 — TRADITION MEETS PUNCH</span>
            </div>
            <h2 className="font-display text-section text-brand-black uppercase leading-none tracking-tight">
              {headline}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-brand-black/75 font-body max-w-xl">
              {subheadline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-faudi bg-white border-2 border-brand-black text-xs font-sub font-bold uppercase shadow-bold-sm">
              FRESH BATCHES CRAFTED DAILY
            </span>
          </div>
        </div>

        {/* Asymmetrical Snack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {snackItems.map((item, index) => {
            const rotClass = rotationClasses[index % rotationClasses.length];
            const imgSrc = item.image_url || item.image;
            const packSize = item.pack_size || item.packSize;
            const isComingSoon = Boolean(item.is_coming_soon || item.isComingSoon);

            return (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between p-5 sm:p-6 rounded-faudi-lg bg-white border-3 border-brand-black shadow-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-bold-lg ${rotClass}`}
              >
                {/* Sticker Badge */}
                {item.badge && (
                  <div className="absolute -top-3.5 left-5 z-20">
                    <span className={`px-3 py-1 rounded-faudi border-2 border-brand-black text-xs font-sub font-bold uppercase tracking-wider shadow-bold-sm ${item.badge_color || item.badgeColor || 'bg-red-500 text-white'}`}>
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Top Image */}
                <div className="relative w-full h-52 sm:h-56 rounded-faudi overflow-hidden border-2 border-brand-black bg-[#FAF5EE] my-2 flex items-center justify-center group">
                  {isComingSoon ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gray-50 border-2 border-dashed border-gray-300">
                      <Clock className="w-8 h-8 text-gray-400 mb-2 animate-pulse" />
                      <span className="font-sub font-bold text-xs uppercase tracking-wider text-gray-700">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-gray-500 font-body mt-1">
                        Upcoming batch dropping soon
                      </span>
                    </div>
                  ) : imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-amber-50">
                      <Flame className="w-8 h-8 text-brand-orange mb-1" />
                      <span className="font-sub font-bold text-xs uppercase tracking-wider text-brand-black">
                        {item.name}
                      </span>
                    </div>
                  )}

                  {/* Pack Size Pill */}
                  {packSize && (
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="px-2.5 py-1 rounded-faudi bg-brand-black text-white font-sub text-xs font-bold uppercase tracking-wider">
                        {packSize}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="mt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl text-brand-black tracking-tight uppercase leading-tight">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-brand-black/70 font-body line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing and WhatsApp Order Action */}
                  <div className="mt-5 pt-4 border-t-2 border-brand-black/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-sub font-bold uppercase tracking-wider text-brand-black/50 block">
                        MRP (INCL. TAXES)
                      </span>
                      <span className="font-display text-2xl sm:text-3xl text-brand-black">
                        {item.mrp}
                      </span>
                    </div>

                    {isComingSoon ? (
                      <span className="inline-flex items-center gap-1 px-3 py-2 rounded-faudi bg-gray-100 text-gray-500 font-sub font-bold text-xs uppercase tracking-wider border border-gray-300">
                        COMING SOON
                      </span>
                    ) : (
                      <a
                        href={getWhatsAppOrderLink(item.name, "Kasaragod Snacks", `Pack: ${packSize}, Price: ${item.mrp}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-faudi bg-brand-orange text-white font-sub font-bold text-xs uppercase tracking-wider hover:bg-brand-black transition-colors shadow-bold-sm active:translate-y-0.5"
                      >
                        <span>Order</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

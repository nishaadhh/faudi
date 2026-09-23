import React, { useRef } from 'react';
import { NUT_CHOCOLATE_DATA, BRAND_CONFIG, getWhatsAppOrderLink } from '../data/products';
import { ArrowUpRight, Gift, ChevronRight, ChevronLeft, Sparkles, MessageCircle } from 'lucide-react';

export default function NutChocolateZone() {
  const { headline, subheadline, heroImage, variants, giftBox } = NUT_CHOCOLATE_DATA;
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="chocolate" className="relative w-full py-20 sm:py-32 bg-[#120C0A] text-white border-b-2 border-brand-black overflow-hidden">
      {/* Editorial Headline Layer: Placed partly behind/overlapping hero shot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-faudi bg-[#E5A93C] text-black font-sub font-bold text-xs uppercase tracking-wider mb-4 shadow-bold-sm">
          <Sparkles className="w-3.5 h-3.5 fill-black" />
          <span>ZONE 03 — HEAVYWEIGHT DARK CHOCOLATE</span>
        </div>

        {/* Huge Headline */}
        <h2 className="font-display text-section uppercase leading-[0.88] tracking-tight text-white mb-2 max-w-4xl">
          {headline}
        </h2>
        <p className="text-base sm:text-lg text-white/70 font-body max-w-xl mb-8">
          {subheadline}
        </p>

        {/* Hero Shot Overlapping Headline */}
        <div className="relative w-full rounded-faudi-lg overflow-hidden border-3 border-[#E5A93C]/40 bg-[#1E1513] shadow-2xl mb-16 sm:mb-24 group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={heroImage}
              alt="FAUDI Nut Chocolate Bars"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay for Editorial Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120C0A] via-transparent to-transparent opacity-80" />
            
            {/* Overlay Watermark Typography */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-faudi bg-brand-yellow text-black font-sub font-bold text-xs uppercase tracking-wider shadow-bold-sm inline-block mb-2">
                  100% WHOLE ROASTED NUTS
                </span>
                <p className="font-serif italic text-2xl sm:text-3xl text-amber-200">
                  Crafted for serious chocolate obsessives
                </p>
              </div>

              <a
                href={getWhatsAppOrderLink("Whole Almond Dark Bar", "Nut Chocolate Bars")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-faudi bg-white text-black font-sub font-bold text-xs uppercase tracking-wider hover:bg-[#E5A93C] transition-colors shadow-bold-sm"
              >
                <span>Order Signature Bar</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Variants Section Header with Scroll Controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-sub font-bold uppercase tracking-wider text-[#E5A93C] block mb-1">
              SLAB COLLECTION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
              CHOOSE YOUR NUT CRUNCH
            </h3>
          </div>

          {/* Scroll Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Shelf of Variants */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {variants.map((bar) => (
            <div
              key={bar.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex flex-col justify-between p-5 rounded-faudi-lg bg-[#1D1412] border-2 border-white/15 hover:border-[#E5A93C] transition-all duration-300 hover:-translate-y-2 shadow-xl group"
            >
              <div>
                {/* Variant Image */}
                <div className="relative w-full h-48 rounded-faudi overflow-hidden border border-white/10 bg-black/40 mb-4">
                  <img
                    src={bar.image}
                    alt={bar.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-faudi bg-[#E5A93C] text-black font-sub text-[10px] font-bold uppercase tracking-wider">
                      {bar.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-white font-sub text-[10px] font-bold uppercase">
                      {bar.packSize}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-sub font-bold uppercase tracking-wider text-[#E5A93C]">
                  {bar.nutType}
                </span>
                <h4 className="font-display text-xl uppercase tracking-tight text-white mt-1 group-hover:text-[#E5A93C] transition-colors leading-tight">
                  {bar.name}
                </h4>
                <p className="mt-1.5 text-xs text-white/70 font-body line-clamp-2">
                  {bar.description}
                </p>
              </div>

              {/* Price and Order Button */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-sub font-bold uppercase tracking-wider text-white/50 block">
                    PRICE
                  </span>
                  <span className="font-display text-2xl text-white">
                    {bar.mrp}
                  </span>
                </div>

                <a
                  href={getWhatsAppOrderLink(bar.name, "Nut Chocolate Bars", `Pack: ${bar.packSize}, Price: ${bar.mrp}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-faudi bg-white text-black font-sub font-bold text-xs uppercase tracking-wider hover:bg-[#E5A93C] transition-colors shadow-sm"
                >
                  <span>Order</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* GIFT BOX SUB-SECTION: "MADE TO SHARE. MADE TO GIFT." */}
        <div className="mt-16 sm:mt-24 rounded-faudi-lg border-3 border-[#E5A93C] bg-gradient-to-br from-[#241714] via-[#1B110F] to-[#120C0A] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Gift Box Photo Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-faudi-lg overflow-hidden border-2 border-white/20 shadow-2xl group">
                <img
                  src={giftBox.image}
                  alt={giftBox.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-faudi bg-[#E5A93C] text-black font-sub font-bold text-xs uppercase tracking-wider shadow-bold-sm">
                    {giftBox.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Gift Box Details & Bulk CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-sub font-bold uppercase tracking-wider text-[#E5A93C] mb-2">
                  <Gift className="w-4 h-4" />
                  <span>{giftBox.subtitle}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
                  {giftBox.title}
                </h3>

                {/* Editorial Serif Subtitle */}
                <p className="font-serif italic text-xl sm:text-2xl text-amber-200 mt-2">
                  Gifting that leaves an unforgettable impression.
                </p>

                <p className="mt-4 text-sm sm:text-base text-white/80 font-body leading-relaxed">
                  {giftBox.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-faudi bg-white/10 border border-white/20 text-xs font-sub font-bold uppercase">
                    {giftBox.packSize}
                  </span>
                  <span className="px-3 py-1 rounded-faudi bg-white/10 border border-white/20 text-xs font-sub font-bold uppercase">
                    Custom Ribbon & Card Available
                  </span>
                </div>
              </div>

              {/* Price and Bulk Inquiry Button */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-sub font-bold uppercase tracking-wider text-white/50 block">
                    PRICE PER GIFT BOX
                  </span>
                  <span className="font-display text-3xl sm:text-4xl text-[#E5A93C]">
                    {giftBox.mrp}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppOrderLink(giftBox.title, "Gift Box", giftBox.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-faudi bg-[#E5A93C] text-black font-sub font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-bold-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>Bulk & Gift Orders →</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

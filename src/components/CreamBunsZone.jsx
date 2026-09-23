import React, { useState } from 'react';
import { CREAM_BUNS_DATA, getWhatsAppOrderLink } from '../data/products';
import { ArrowUpRight, Check, Sparkles, MessageCircle, Package, Heart } from 'lucide-react';

export default function CreamBunsZone() {
  const { headline, subheadline, flavors, howToOrder, boxMockup } = CREAM_BUNS_DATA;
  const [selectedFlavorId, setSelectedFlavorId] = useState(flavors[0].id);

  const activeFlavor = flavors.find((f) => f.id === selectedFlavorId) || flavors[0];

  return (
    <section id="buns" className="relative w-full py-20 sm:py-28 bg-[#FAF4E8] border-b-2 border-brand-black overflow-hidden">
      {/* Background Graphic Watermark */}
      <div className="absolute top-12 left-4 sm:left-12 pointer-events-none opacity-10 select-none">
        <span className="font-display text-8xl sm:text-9xl text-amber-900 uppercase tracking-tighter">
          PILLOWY
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-faudi bg-[#653416] text-white font-sub font-bold text-xs uppercase tracking-wider mb-3 shadow-bold-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ZONE 02 — THE FILLED BRIOCHE OBSESSION</span>
          </div>
          <h2 className="font-display text-section text-brand-black uppercase leading-none tracking-tight">
            {headline}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-brand-black/75 font-body max-w-xl">
            {subheadline}
          </p>
        </div>

        {/* Interactive "Pick Your Cream" Feature */}
        <div className="bg-white rounded-faudi-lg border-3 border-brand-black shadow-bold-lg p-6 sm:p-10 lg:p-12 mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            
            {/* Left Column: Product Photography Display */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-md rounded-faudi-lg overflow-hidden border-3 border-brand-black bg-[#F5EDE0] shadow-bold group">
                <img
                  key={activeFlavor.id}
                  src={activeFlavor.image}
                  alt={activeFlavor.name}
                  className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105"
                />

                {/* Badge Sticker */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-faudi bg-brand-yellow text-brand-black font-sub font-bold text-xs uppercase tracking-wider border-2 border-brand-black shadow-bold-sm">
                    {activeFlavor.badge}
                  </span>
                </div>

                {/* Script Font Tag from Attached Image ("Dubai Chewy Cookie" style callout) */}
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="px-4 py-1.5 rounded-faudi bg-white/95 backdrop-blur-sm border-2 border-brand-black font-script text-xl sm:text-2xl text-brand-black shadow-bold-sm transform -rotate-3 inline-block">
                    {activeFlavor.scriptTag}
                  </span>
                </div>
              </div>

              {/* Pack info pill */}
              <div className="mt-4 flex items-center gap-3 text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70">
                <span>{activeFlavor.packSize}</span>
                <span>•</span>
                <span>Chilled Delivery Ready</span>
              </div>
            </div>

            {/* Right Column: Interactive Flavor Picker & Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-sub font-bold uppercase tracking-wider text-brand-orange block mb-2">
                  INTERACTIVE SELECTOR • PICK YOUR CREAM
                </span>

                {/* Massive Selected Flavor Title */}
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-black uppercase leading-tight tracking-tight">
                  {activeFlavor.name}
                </h3>

                {/* Elegant Italic Script Accent */}
                <p className="font-script text-2xl sm:text-3xl text-amber-800 mt-1">
                  ~ {activeFlavor.scriptTag} ~
                </p>

                <p className="mt-3 text-base text-brand-black/80 font-body leading-relaxed">
                  {activeFlavor.description}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-faudi bg-amber-50 border border-amber-200 text-xs font-body text-amber-900">
                  <Heart className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                  <span>{activeFlavor.notes}</span>
                </div>

                {/* Flavor Selection Buttons */}
                <div className="mt-6">
                  <label className="text-xs font-sub font-bold uppercase tracking-wider text-brand-black/60 block mb-2.5">
                    Available Cream Flavors:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {flavors.map((flavor) => {
                      const isSelected = flavor.id === selectedFlavorId;
                      return (
                        <button
                          key={flavor.id}
                          onClick={() => setSelectedFlavorId(flavor.id)}
                          className={`flex items-center justify-between p-3 rounded-faudi border-2 text-left transition-all ${
                            isSelected
                              ? 'bg-brand-black text-white border-brand-black shadow-bold-sm scale-[1.02]'
                              : 'bg-[#FAF4E8] text-brand-black border-brand-black/20 hover:border-brand-black hover:bg-white'
                          }`}
                        >
                          <span className="font-sub font-bold text-xs sm:text-sm uppercase tracking-wide truncate">
                            {flavor.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-brand-yellow shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Price & Order Action */}
              <div className="mt-8 pt-6 border-t-2 border-brand-black/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-sub font-bold uppercase tracking-wider text-brand-black/50 block">
                    PRICE PER BUN
                  </span>
                  <span className="font-display text-3xl sm:text-4xl text-brand-black">
                    {activeFlavor.mrp}
                  </span>
                </div>

                <a
                  href={getWhatsAppOrderLink(
                    `${activeFlavor.name} Cream Bun`,
                    "Cream Buns",
                    `Flavor: ${activeFlavor.name}, Size: ${activeFlavor.packSize}, Price: ${activeFlavor.mrp}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-faudi bg-brand-orange text-white font-sub font-bold text-sm uppercase tracking-wider hover:bg-brand-black transition-all shadow-bold hover:shadow-bold-hover"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order {activeFlavor.name} →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Sub-Features: Square White Takeaway Box Mockup + How To Order Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Square White Box Mockup */}
          <div className="lg:col-span-5 bg-white rounded-faudi-lg border-3 border-brand-black p-6 sm:p-8 shadow-bold flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-faudi bg-brand-yellow border-2 border-brand-black text-xs font-sub font-bold uppercase tracking-wider mb-4 shadow-bold-sm">
                <Package className="w-3.5 h-3.5 text-brand-black" />
                <span>PACKAGING SPEC</span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl text-brand-black uppercase leading-tight">
                {boxMockup.title}
              </h4>
              <p className="mt-2 text-sm text-brand-black/70 font-body">
                {boxMockup.desc}
              </p>
            </div>

            {/* Stylized White Takeaway Box Graphic */}
            <div className="my-6 relative w-full aspect-[4/3] rounded-faudi border-2 border-brand-black bg-[#F8F8F8] flex flex-col items-center justify-center p-6 shadow-inner overflow-hidden">
              <div className="w-3/4 aspect-square bg-white border-3 border-brand-black rounded-xl shadow-bold p-4 flex flex-col justify-between relative transform -rotate-2 hover:rotate-0 transition-transform">
                <div className="flex justify-between items-center border-b border-brand-black/10 pb-2">
                  <span className="font-display text-base tracking-tighter text-brand-black">FAUDI</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span>
                </div>
                <div className="text-center my-auto py-2">
                  <span className="font-display text-2xl sm:text-3xl text-brand-black uppercase tracking-tight block">
                    BUN BOX
                  </span>
                  <span className="font-script text-lg text-brand-orange block">
                    Freshly Filled Daily
                  </span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-sub font-bold uppercase tracking-widest text-brand-black/50 border-t border-brand-black/10 pt-2">
                  <span>CHILLED PACK</span>
                  <span>100% BRIOCHE</span>
                </div>
              </div>
            </div>

            <div className="text-xs font-sub font-bold uppercase tracking-wider text-brand-black/60 flex items-center justify-between">
              <span>HOLDS 2 OR 4 FRESH BUNS</span>
              <span className="text-brand-orange">FOOD-SAFE BOARD</span>
            </div>
          </div>

          {/* "How To Order" Strip */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-faudi-lg border-3 border-brand-black p-6 sm:p-8 shadow-bold flex flex-col justify-between">
            <div>
              <span className="text-xs font-sub font-bold uppercase tracking-wider text-brand-black/60 block mb-2">
                FAST DIRECT ORDERING
              </span>
              <h4 className="font-display text-2xl sm:text-3xl text-brand-black uppercase leading-tight">
                HOW TO ORDER FAUDI BUNS
              </h4>
              <p className="mt-1 text-sm text-brand-black/70 font-body">
                Fresh cream buns made in limited daily drops. Secure yours in 3 quick steps:
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {howToOrder.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-faudi bg-[#FAF4E8] border-2 border-brand-black shadow-bold-sm flex flex-col justify-between"
                >
                  <span className="font-display text-2xl text-brand-orange">
                    {step.step}
                  </span>
                  <div className="mt-2">
                    <h5 className="font-sub font-bold text-sm uppercase tracking-wide text-brand-black">
                      {step.title}
                    </h5>
                    <p className="mt-1 text-xs text-brand-black/70 font-body">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-brand-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-brand-black/70 font-body">
                Same-day & pre-orders accepted on WhatsApp
              </span>
              <a
                href={getWhatsAppOrderLink("Bun Box Assortment (4-Pack)", "Cream Buns", "Interested in a 4-pack assortment box.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-faudi bg-brand-black text-white font-sub font-bold text-xs uppercase tracking-wider hover:bg-brand-orange transition-colors"
              >
                <span>Order 4-Pack Box →</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ArrowDownRight, Sparkles, Flame, Cookie } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Hero() {
  const { siteSettings } = useData();
  const heroHeadline = siteSettings.tagline || "GOOD FOOD. BIG MOOD.";

  const worlds = [
    {
      id: "snacks",
      title: "Kasaragod Snacks",
      sub: "Crunchy Savouries & Cakes",
      href: "#snacks",
      badge: "ZONE 01",
      bgColor: "bg-[#FFF2DE] hover:bg-[#FFE7C2]",
      borderColor: "border-[#F79824]",
      accentTag: "Kasaragod Crunch",
      image: "/images/snacks/soratta.jpg",
      isPhotoPlaceholder: false,
      placeholderLabel: "Add photo: snacks/soratta.jpg",
      icon: Flame,
      tagColor: "bg-red-500 text-white",
    },
    {
      id: "buns",
      title: "Cream Buns",
      sub: "Overloaded Fresh Creams",
      href: "#buns",
      badge: "ZONE 02",
      bgColor: "bg-[#FAF0E4] hover:bg-[#F3E3D1]",
      borderColor: "border-[#4A2810]",
      accentTag: "Pistachio & Hazelnut",
      image: "/images/buns/chocolate-hazelnut.jpg",
      isPhotoPlaceholder: false,
      icon: Sparkles,
      tagColor: "bg-amber-800 text-white",
    },
    {
      id: "chocolate",
      title: "Nut Chocolate Bars",
      sub: "Whole Nuts & Dark Cocoa",
      href: "#chocolate",
      badge: "ZONE 03",
      bgColor: "bg-[#1E1513] hover:bg-[#271B19] text-white",
      borderColor: "border-[#E5A93C]",
      accentTag: "Heavyweight Slabs",
      image: "/images/chocolate/nut-bars-hero.jpg",
      isPhotoPlaceholder: false,
      icon: Cookie,
      tagColor: "bg-[#E5A93C] text-black",
    },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Brand Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-faudi-pill bg-brand-yellow border-2 border-brand-black font-sub font-bold text-xs uppercase tracking-wider shadow-bold-sm">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
          COMMERCIAL FOOD REVOLUTION
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs font-sub font-bold uppercase tracking-wider text-brand-black/60">
          <span>KASARAGOD ROOTS</span>
          <span>•</span>
          <span>MODERN MOOD</span>
          <span>•</span>
          <span>WHATSAPP DIRECT</span>
        </div>
      </div>

      {/* Enormous FAUDI Wordmark with tight leading */}
      <div className="relative text-center select-none my-2 sm:my-4">
        <h1 className="font-display text-giant text-brand-black tracking-tighter uppercase transition-transform duration-300 hover:scale-[1.01]">
          FAUDI
        </h1>
        {/* Floating Playful Sticker */}
        <div className="absolute -top-3 right-2 sm:right-16 md:right-32 rotate-12 animate-wobble-subtle pointer-events-none">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-brand-orange text-white font-sub font-bold text-xs sm:text-sm uppercase rounded-faudi border-2 border-brand-black shadow-bold-sm">
            BOLD & PLAYFUL!
          </span>
        </div>
      </div>

      {/* Bold Confident Headline */}
      <div className="max-w-4xl mx-auto text-center mt-2 mb-10 sm:mb-16">
        <p className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-black tracking-tight leading-none uppercase">
          {heroHeadline}
        </p>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-brand-black/70 font-body max-w-2xl mx-auto">
          High-voltage packaging, heavy crunch, and loaded fillings. Three distinct food worlds crafted to satisfy serious cravings.
        </p>
      </div>

      {/* 3 Large Rounded Tiles: One per Product World */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {worlds.map((world, idx) => {
          const IconComponent = world.icon;
          const isDarkTile = world.id === 'chocolate';

          return (
            <a
              key={world.id}
              href={world.href}
              onClick={(e) => handleScrollTo(e, world.href)}
              className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-faudi-lg border-3 border-brand-black shadow-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-bold-lg ${world.bgColor}`}
            >
              {/* Top Tile Row */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-faudi text-xs font-sub font-bold uppercase tracking-wider ${world.tagColor}`}>
                  {world.badge}
                </span>
                <span className="p-2 rounded-full bg-white text-brand-black border-2 border-brand-black group-hover:bg-brand-yellow group-hover:rotate-45 transition-all duration-300 shadow-bold-sm">
                  <ArrowDownRight className="w-5 h-5" />
                </span>
              </div>

              {/* Product Preview Photo / Neutral Placeholder Box */}
              <div className="relative w-full h-48 sm:h-56 rounded-faudi overflow-hidden border-2 border-brand-black bg-white/40 my-3 flex items-center justify-center">
                {world.isPhotoPlaceholder ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-amber-50/80 border border-dashed border-brand-black/30">
                    <IconComponent className="w-10 h-10 text-brand-orange mb-2 animate-bounce" />
                    <span className="font-sub font-bold text-xs uppercase tracking-wider text-brand-black">
                      {world.placeholderLabel}
                    </span>
                    <span className="text-[11px] text-brand-black/60 font-body mt-1">
                      Ready for high-res photo upload
                    </span>
                  </div>
                ) : (
                  <img
                    src={world.image}
                    alt={world.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                
                {/* Floating pill over image */}
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-black/80 backdrop-blur-sm text-white font-sub text-[11px] font-bold uppercase tracking-wider">
                    {world.accentTag}
                  </span>
                </div>
              </div>

              {/* Bottom Label and Subtext */}
              <div className="mt-3">
                <h3 className={`font-display text-2xl sm:text-3xl tracking-tight leading-tight uppercase group-hover:text-brand-orange transition-colors ${
                  isDarkTile ? 'text-white' : 'text-brand-black'
                }`}>
                  {world.title}
                </h3>
                <p className={`mt-1 text-sm font-body ${
                  isDarkTile ? 'text-white/70' : 'text-brand-black/70'
                }`}>
                  {world.sub}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-sub font-bold uppercase tracking-wider text-brand-orange group-hover:translate-x-1 transition-transform">
                  <span>Explore World</span>
                  <span>→</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

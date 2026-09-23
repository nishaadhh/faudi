import React, { useState, useEffect } from 'react';
import { BRAND_CONFIG, getWhatsAppOrderLink } from '../data/products';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Adaptive styling based on active section
  const isDarkSection = activeSection === 'chocolate';

  const navLinks = [
    { label: "Snacks", href: "#snacks", id: "snacks" },
    { label: "Cream Buns", href: "#buns", id: "buns" },
    { label: "Nut Chocolate", href: "#chocolate", id: "chocolate" },
    { label: "Why FAUDI", href: "#why-faudi", id: "why-faudi" },
    { label: "Retail / Bulk", href: "#retailers", id: "retailers" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDarkSection
              ? 'bg-[#140D0B]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
              : 'bg-white/90 backdrop-blur-md border-b border-brand-black/10 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex items-center gap-2"
          >
            <span
              className={`font-display text-3xl sm:text-4xl tracking-tighter transition-colors ${
                isDarkSection ? 'text-white group-hover:text-brand-yellow' : 'text-brand-black group-hover:text-brand-orange'
              }`}
            >
              FAUDI
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse"></span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-faudi text-sm font-sub font-bold uppercase tracking-wider transition-all duration-200 ${
                    isDarkSection
                      ? isActive
                        ? 'bg-brand-yellow text-brand-black'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      : isActive
                      ? 'bg-brand-black text-white'
                      : 'text-brand-black/80 hover:text-brand-black hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: WhatsApp Pill Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppOrderLink("General Menu", "Order")}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-faudi-pill font-sub font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-bold-sm ${
                isDarkSection
                  ? 'bg-brand-yellow text-brand-black hover:bg-white border-2 border-brand-yellow'
                  : 'bg-brand-black text-white hover:bg-brand-orange border-2 border-brand-black'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>ORDER ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={getWhatsAppOrderLink("Menu Quick Order", "Mobile")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="p-2 rounded-full bg-emerald-500 text-white shadow-bold-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`p-2.5 rounded-faudi transition-colors ${
                isDarkSection
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-brand-black text-white hover:bg-brand-orange'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-black text-white flex flex-col justify-between p-6 pt-24 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-5 my-auto">
            <span className="text-xs font-sub font-bold tracking-widest text-brand-yellow uppercase">
              FAUDI FOOD DIRECTORY
            </span>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-display text-4xl hover:text-brand-orange transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-6 h-6 text-brand-yellow" />
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <a
              href={getWhatsAppOrderLink("Mobile Quick Order", "All")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-faudi bg-brand-yellow text-brand-black font-sub font-bold text-center flex items-center justify-center gap-2 text-base shadow-bold"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
              <span>ORDER ON WHATSAPP</span>
            </a>
            <p className="text-xs text-white/50 text-center font-body">
              Instant customer response • {BRAND_CONFIG.whatsappNumber}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react';
import { BRAND_CONFIG, getWhatsAppOrderLink } from '../data/products';
import { ArrowUp, MessageCircle, Phone, Mail, MapPin, Award } from 'lucide-react';

export default function Footer() {
  const { contact } = BRAND_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: "Snacks", href: "#snacks" },
    { label: "Cream Buns", href: "#buns" },
    { label: "Nut Chocolate", href: "#chocolate" },
    { label: "Why FAUDI", href: "#why-faudi" },
    { label: "Retailers", href: "#retailers" },
  ];

  return (
    <footer className="relative w-full bg-brand-black text-white pt-16 sm:pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Navigation & Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Vision */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-4xl text-white tracking-tighter">FAUDI</span>
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse"></span>
            </div>
            <p className="text-sm text-white/70 font-body leading-relaxed max-w-sm">
              Commercial food brand with youth-driven energy, oversized typography, and obsessively crafted recipes. Good food, big mood.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-orange text-white flex items-center justify-center transition-colors border border-white/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-orange text-white flex items-center justify-center transition-colors border border-white/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a
                href={getWhatsAppOrderLink("General Inquiry", "Customer Care")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors border border-white/20"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="font-sub font-bold text-xs uppercase tracking-widest text-brand-yellow mb-4">
              FOOD WORLDS
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base text-white/80 hover:text-brand-orange transition-colors font-body flex items-center gap-1.5"
                  >
                    <span>•</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clearly Tagged Placeholders (Contact & Regulatory) */}
          <div className="lg:col-span-5">
            <h4 className="font-sub font-bold text-xs uppercase tracking-widest text-brand-yellow mb-4">
              BUSINESS DETAILS (PLACEHOLDERS)
            </h4>
            <div className="space-y-3 text-sm text-white/75 font-body">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-sub font-bold uppercase tracking-wider text-white/40 block">Phone</span>
                  <span>{contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-sub font-bold uppercase tracking-wider text-white/40 block">Email</span>
                  <span>{contact.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-sub font-bold uppercase tracking-wider text-white/40 block">Registered Facility</span>
                  <span>{contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                <Award className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-sub font-bold uppercase tracking-wider text-brand-yellow/80 block">Regulatory Compliance</span>
                  <span className="font-mono text-xs">{contact.fssai}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Giant FAUDI Wordmark across bottom */}
        <div className="relative pt-12 pb-6 flex items-center justify-between">
          <div className="w-full text-center">
            <span className="font-display text-[clamp(4.5rem,18vw,16rem)] text-white/10 hover:text-white/20 transition-colors uppercase leading-none select-none tracking-tighter block">
              FAUDI
            </span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="absolute right-0 bottom-8 p-3 rounded-full bg-brand-yellow text-brand-black hover:bg-brand-orange hover:text-white transition-colors shadow-bold"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-body">
          <p>© {new Date().getFullYear()} FAUDI. All rights reserved. Commercial food brand.</p>
          <p className="flex items-center gap-2">
            <span>Built with bold typography & craft.</span>
            <span>•</span>
            <a href="#hero" className="text-white/70 hover:text-white underline">Back to top</a>
          </p>
        </div>

      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { MessageCircle, Store, Send, CheckCircle2 } from 'lucide-react';

export default function RetailersCTA() {
  const { getWhatsAppBulkLink, submitInquiry } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitInquiry(formData);
    const link = getWhatsAppBulkLink(formData);
    window.open(link, '_blank');
  };

  return (
    <section id="retailers" className="relative w-full py-20 sm:py-28 bg-[#FF5500] text-white border-b-2 border-brand-black overflow-hidden">
      {/* Decorative Brand Text Background */}
      <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-10 select-none hidden lg:block">
        <span className="font-display text-[16rem] text-white uppercase leading-none">
          STOCK
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Editorial Pitch */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-faudi bg-brand-black text-brand-yellow font-sub font-bold text-xs uppercase tracking-wider mb-4 shadow-bold-sm">
              <Store className="w-4 h-4 text-brand-yellow" />
              <span>COMMERCIAL DISTRIBUTION & CAFES</span>
            </div>

            <h2 className="font-display text-section uppercase leading-[0.92] tracking-tight text-white">
              STOCK FAUDI IN YOUR STORE.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/90 font-body max-w-xl leading-relaxed">
              Supermarket shelves, modern cafes, college kiosks, and gourmet food marts. Fast-moving packaging, irresistible shelf presence, and dependable commercial replenishment.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-faudi bg-black/20 border border-white/20">
                <span className="font-display text-2xl text-brand-yellow block">01</span>
                <span className="font-sub font-bold text-sm uppercase text-white block mt-1">High Margins</span>
                <span className="text-xs text-white/70 font-body">Lucrative wholesale slabs for retail partners.</span>
              </div>
              <div className="p-4 rounded-faudi bg-black/20 border border-white/20">
                <span className="font-display text-2xl text-brand-yellow block">02</span>
                <span className="font-sub font-bold text-sm uppercase text-white block mt-1">Fast Delivery</span>
                <span className="text-xs text-white/70 font-body">Direct batch shipping with zero supply bottlenecks.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Contact Form */}
          <div className="lg:col-span-6">
            <div className="bg-white text-brand-black p-6 sm:p-8 lg:p-10 rounded-faudi-lg border-3 border-brand-black shadow-bold-lg">
              <div className="mb-6">
                <span className="text-xs font-sub font-bold uppercase tracking-wider text-brand-orange block">
                  INSTANT WHATSAPP DIRECT INQUIRY
                </span>
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-brand-black mt-1">
                  Send Your Store Details
                </h3>
                <p className="text-xs sm:text-sm text-brand-black/70 font-body mt-1">
                  Submitting will open WhatsApp with your prefilled details ready to send.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                      Your Name / Store Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul / Metro Supermart"
                      className="w-full px-4 py-3 rounded-faudi border-2 border-brand-black/30 focus:border-brand-black focus:ring-0 text-sm font-body outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-faudi border-2 border-brand-black/30 focus:border-brand-black focus:ring-0 text-sm font-body outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Kasaragod, Mangalore, Kannur, Kochi"
                    className="w-full px-4 py-3 rounded-faudi border-2 border-brand-black/30 focus:border-brand-black focus:ring-0 text-sm font-body outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    Message / Products of Interest
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Interested in stocking Kasaragod Snacks and Cream Buns in 2 stores..."
                    className="w-full px-4 py-3 rounded-faudi border-2 border-brand-black/30 focus:border-brand-black focus:ring-0 text-sm font-body outline-none transition-all placeholder:text-gray-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-faudi bg-brand-black text-white font-sub font-bold text-sm uppercase tracking-wider hover:bg-brand-orange transition-colors flex items-center justify-center gap-2 shadow-bold active:translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                  <span>Send Retail Inquiry on WhatsApp</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-brand-black/60 font-body pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct connection with FAUDI wholesale desk</span>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

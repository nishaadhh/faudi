import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import SnacksZone from './components/SnacksZone';
import CreamBunsZone from './components/CreamBunsZone';
import NutChocolateZone from './components/NutChocolateZone';
import WhyFaudi from './components/WhyFaudi';
import RetailersCTA from './components/RetailersCTA';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'snacks', 'buns', 'chocolate', 'why-faudi', 'retailers'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-black selection:bg-brand-yellow selection:text-brand-black relative">
      {/* Sticky Adaptive Navigation */}
      <Navbar activeSection={activeSection} />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Marquee Strip 1 */}
        <MarqueeStrip
          text="FAUDI FOODS ★ CRUNCH HARDER ★ KASARAGOD SNACKS ★ OBSESSIVELY CRAFTED ★ GOOD FOOD. BIG MOOD. ★"
          bg="bg-brand-black"
          textColor="text-brand-yellow"
          py="py-3.5 sm:py-4"
        />

        {/* Zone 1: Kasaragod Snacks */}
        <SnacksZone />

        {/* Marquee Strip 2 */}
        <MarqueeStrip
          text="BUN. FILLED. DONE. ★ PILLOWY BRIOCHE ★ PISTACHIO KUNAFA ★ CHOCOLATE HAZELNUT ★ FRESH CHILLED DROPS ★"
          bg="bg-brand-orange"
          textColor="text-white"
          reverse={true}
          py="py-3.5 sm:py-4"
        />

        {/* Zone 2: Cream Buns */}
        <CreamBunsZone />

        {/* Marquee Strip 3 */}
        <MarqueeStrip
          text="NUTS ABOUT CHOCOLATE ★ HEAVYWEIGHT DARK BARS ★ WHOLE ROASTED NUTS ★ MADE TO SHARE ★ MADE TO GIFT ★"
          bg="bg-[#E5A93C]"
          textColor="text-brand-black"
          py="py-3.5 sm:py-4"
        />

        {/* Zone 3: Nut Chocolate Bars */}
        <NutChocolateZone />

        {/* Why FAUDI */}
        <WhyFaudi />

        {/* Retailers / Bulk Orders CTA */}
        <RetailersCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

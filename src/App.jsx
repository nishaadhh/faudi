import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import SnacksZone from './components/SnacksZone';
import CreamBunsZone from './components/CreamBunsZone';
import NutChocolateZone from './components/NutChocolateZone';
import WhyFaudi from './components/WhyFaudi';
import RetailersCTA from './components/RetailersCTA';
import Footer from './components/Footer';
import AdminPortal from './admin/AdminPortal';

function MainApp() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentPath, setCurrentPath] = useState(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  const { siteSettings } = useData();

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  // Secret Keyboard shortcut: Ctrl + Shift + A / Cmd + Shift + A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (currentPath === '/god' || currentPath.startsWith('/god/')) {
          navigate('/');
        } else {
          navigate('/god');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPath]);

  const isGodAdmin =
    currentPath === '/god' ||
    currentPath.startsWith('/god/') ||
    (typeof window !== 'undefined' && window.location.search.includes('admin=true'));

  // If visiting /god, show dedicated full-page Admin Portal
  if (isGodAdmin) {
    return (
      <AdminPortal
        isStandalonePage={true}
        isOpen={true}
        onClose={() => navigate('/')}
      />
    );
  }

  // Otherwise, render Public Customer Storefront
  return (
    <div className="min-h-screen bg-brand-cream text-brand-black selection:bg-brand-yellow selection:text-brand-black relative">
      {/* Sticky Adaptive Navigation */}
      <Navbar activeSection={activeSection} />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Marquee Strip 1: Kasaragod Snacks */}
        <MarqueeStrip
          text={
            siteSettings.marquee_snacks ||
            'FAUDI FOODS ★ CRUNCH HARDER ★ KASARAGOD SNACKS ★ OBSESSIVELY CRAFTED ★ GOOD FOOD. BIG MOOD. ★'
          }
          bg="bg-brand-black"
          textColor="text-brand-yellow"
          py="py-3.5 sm:py-4"
        />

        {/* Zone 1: Kasaragod Snacks */}
        <SnacksZone />

        {/* Marquee Strip 2: Cream Buns */}
        <MarqueeStrip
          text={
            siteSettings.marquee_buns ||
            'BUN. FILLED. DONE. ★ PILLOWY BRIOCHE ★ PISTACHIO KUNAFA ★ CHOCOLATE HAZELNUT ★ FRESH CHILLED DROPS ★'
          }
          bg="bg-brand-orange"
          textColor="text-white"
          reverse={true}
          py="py-3.5 sm:py-4"
        />

        {/* Zone 2: Cream Buns */}
        <CreamBunsZone />

        {/* Marquee Strip 3: Nut Chocolate Bars */}
        <MarqueeStrip
          text={
            siteSettings.marquee_chocolate ||
            'NUTS ABOUT CHOCOLATE ★ HEAVYWEIGHT DARK BARS ★ WHOLE ROASTED NUTS ★ MADE TO SHARE ★ MADE TO GIFT ★'
          }
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

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}

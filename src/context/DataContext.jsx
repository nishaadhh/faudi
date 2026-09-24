import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  BRAND_CONFIG as DEFAULT_BRAND,
  SNACKS_DATA as DEFAULT_SNACKS,
  CREAM_BUNS_DATA as DEFAULT_BUNS,
  NUT_CHOCOLATE_DATA as DEFAULT_CHOCO,
} from '../data/products';

// Consolidate static default products from data/products.js into a unified array
const INITIAL_PRODUCTS = [
  // Snacks
  ...DEFAULT_SNACKS.products.map((p, idx) => ({
    id: p.id,
    category: 'snacks',
    name: p.name,
    description: p.description,
    pack_size: p.packSize,
    mrp: p.mrp,
    image_url: p.image,
    badge: p.badge,
    badge_color: p.badgeColor,
    is_coming_soon: Boolean(p.isComingSoon),
    is_active: true,
    sort_order: (idx + 1) * 10,
  })),
  // Buns
  ...DEFAULT_BUNS.flavors.map((b, idx) => ({
    id: b.id,
    category: 'buns',
    name: b.name,
    description: b.description,
    pack_size: b.packSize,
    mrp: b.mrp,
    image_url: b.image,
    badge: b.badge,
    badge_color: 'bg-brand-yellow text-brand-black',
    script_tag: b.scriptTag,
    notes: b.notes,
    is_coming_soon: false,
    is_active: true,
    sort_order: (idx + 1) * 10,
  })),
  // Chocolate
  ...DEFAULT_CHOCO.variants.map((c, idx) => ({
    id: c.id,
    category: 'chocolate',
    name: c.name,
    description: c.description,
    pack_size: c.packSize,
    mrp: c.mrp,
    image_url: c.image,
    badge: c.badge,
    badge_color: 'bg-[#E5A93C] text-black',
    nut_type: c.nutType,
    is_coming_soon: false,
    is_active: true,
    sort_order: (idx + 1) * 10,
  })),
  // Gift Box
  {
    id: 'luxury-gift-box',
    category: 'gift',
    name: DEFAULT_CHOCO.giftBox.title,
    description: DEFAULT_CHOCO.giftBox.description,
    pack_size: DEFAULT_CHOCO.giftBox.packSize,
    mrp: DEFAULT_CHOCO.giftBox.mrp,
    image_url: DEFAULT_CHOCO.giftBox.image,
    badge: DEFAULT_CHOCO.giftBox.badge,
    badge_color: 'bg-[#E5A93C] text-black',
    nut_type: DEFAULT_CHOCO.giftBox.subtitle,
    notes: DEFAULT_CHOCO.giftBox.whatsappMessage,
    is_coming_soon: false,
    is_active: true,
    sort_order: 100,
  },
];

const INITIAL_SETTINGS = {
  name: DEFAULT_BRAND.name,
  tagline: DEFAULT_BRAND.tagline,
  whatsapp_number: DEFAULT_BRAND.whatsappNumber,
  phone: DEFAULT_BRAND.contact.phone,
  email: DEFAULT_BRAND.contact.email,
  address: DEFAULT_BRAND.contact.address,
  fssai: DEFAULT_BRAND.contact.fssai,
  instagram: DEFAULT_BRAND.contact.instagram,
  facebook: DEFAULT_BRAND.contact.facebook,
  marquee_snacks: 'FAUDI FOODS ★ CRUNCH HARDER ★ KASARAGOD SNACKS ★ OBSESSIVELY CRAFTED ★ GOOD FOOD. BIG MOOD. ★',
  marquee_buns: 'BUN. FILLED. DONE. ★ PILLOWY BRIOCHE ★ PISTACHIO KUNAFA ★ CHOCOLATE HAZELNUT ★ FRESH CHILLED DROPS ★',
  marquee_chocolate: 'NUTS ABOUT CHOCOLATE ★ HEAVYWEIGHT DARK BARS ★ WHOLE ROASTED NUTS ★ MADE TO SHARE ★ MADE TO GIFT ★',
};

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('faudi_cached_products');
      return cached ? JSON.parse(cached) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('faudi_cached_settings');
      return cached ? JSON.parse(cached) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const cached = localStorage.getItem('faudi_cached_inquiries');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Sync with Supabase on mount
  const syncWithSupabase = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setDbConnected(false);
      return;
    }

    try {
      setLoading(true);

      // 1. Fetch Products
      const { data: dbProducts, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!prodErr && dbProducts && dbProducts.length > 0) {
        setProducts(dbProducts);
        localStorage.setItem('faudi_cached_products', JSON.stringify(dbProducts));
      }

      // 2. Fetch Settings
      const { data: dbSettings, error: setErr } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (!setErr && dbSettings) {
        setSiteSettings(prev => {
          const merged = { ...prev, ...dbSettings };
          localStorage.setItem('faudi_cached_settings', JSON.stringify(merged));
          return merged;
        });
      }

      // 3. Fetch Inquiries
      const { data: dbInquiries, error: inqErr } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!inqErr && dbInquiries) {
        setInquiries(dbInquiries);
        localStorage.setItem('faudi_cached_inquiries', JSON.stringify(dbInquiries));
      }

      setDbConnected(true);
      setLastSyncTime(new Date());
    } catch (err) {
      console.warn('Supabase sync warning (using cached data):', err);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  // Real-time CRUD operations
  const updateProduct = async (id, updatedFields) => {
    // 1. Optimistic local update
    const updated = products.map(p => (p.id === id ? { ...p, ...updatedFields } : p));
    setProducts(updated);
    localStorage.setItem('faudi_cached_products', JSON.stringify(updated));

    // 2. Remote update if Supabase available
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('products').update(updatedFields).eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to update product in Supabase:', err);
      }
    }
  };

  const addProduct = async (newProduct) => {
    const item = {
      ...newProduct,
      id: newProduct.id || `item-${Date.now()}`,
      created_at: new Date().toISOString(),
      is_active: newProduct.is_active !== undefined ? newProduct.is_active : true,
      sort_order: newProduct.sort_order || (products.length + 1) * 10,
    };

    const updated = [...products, item];
    setProducts(updated);
    localStorage.setItem('faudi_cached_products', JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('products').insert([item]);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to insert product into Supabase:', err);
      }
    }
  };

  const deleteProduct = async (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('faudi_cached_products', JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Failed to delete product from Supabase:', err);
      }
    }
  };

  const updateSettings = async (newSettings) => {
    const merged = { ...siteSettings, ...newSettings };
    setSiteSettings(merged);
    localStorage.setItem('faudi_cached_settings', JSON.stringify(merged));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('site_settings')
          .upsert({ id: 'default', ...newSettings });
        if (error) throw error;
      } catch (err) {
        console.error('Failed to update site settings in Supabase:', err);
      }
    }
  };

  const submitInquiry = async (formData) => {
    const entry = {
      ...formData,
      id: Date.now(),
      status: 'new',
      created_at: new Date().toISOString(),
    };

    const updated = [entry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('faudi_cached_inquiries', JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('inquiries').insert([{
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          message: formData.message || '',
        }]);
      } catch (err) {
        console.warn('Inquiry remote save warning:', err);
      }
    }
  };

  // WhatsApp Link Builder using dynamic phone number
  const getWhatsAppOrderLink = (productName, category = 'General', extraNote = '') => {
    const base = `https://wa.me/${siteSettings.whatsapp_number}`;
    const text = encodeURIComponent(
      `Hi FAUDI! I'd like to order:\n• Product: ${productName} (${category})\n${extraNote ? `• Note: ${extraNote}\n` : ''}Please share price details and delivery availability. Thank you!`
    );
    return `${base}?text=${text}`;
  };

  const getWhatsAppBulkLink = (formData = {}) => {
    const base = `https://wa.me/${siteSettings.whatsapp_number}`;
    const text = encodeURIComponent(
      `Hi FAUDI! I want to stock FAUDI in my store / place a bulk order:\n• Name: ${formData.name || '[Your Name]'}\n• Phone: ${formData.phone || '[Phone Number]'}\n• City: ${formData.city || '[City]'}\n• Message: ${formData.message || 'Looking for wholesale catalog & pricing.'}`
    );
    return `${base}?text=${text}`;
  };

  return (
    <DataContext.Provider
      value={{
        products,
        siteSettings,
        inquiries,
        loading,
        dbConnected,
        lastSyncTime,
        syncWithSupabase,
        updateProduct,
        addProduct,
        deleteProduct,
        updateSettings,
        submitInquiry,
        getWhatsAppOrderLink,
        getWhatsAppBulkLink,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

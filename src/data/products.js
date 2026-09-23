// FAUDI Central Configuration & Product Catalog
// All content, pricing, whatsapp phone numbers, and placeholders can be edited here without modifying components.

export const BRAND_CONFIG = {
  name: "FAUDI",
  tagline: "GOOD FOOD. BIG MOOD.",
  // Alternate headline options:
  // tagline: "MEET FAUDI.",
  
  // WhatsApp ordering phone number (Placeholder: Replace with your actual WhatsApp business number with country code, e.g., "919876543210")
  whatsappNumber: "91XXXXXXXXXX", 
  
  contact: {
    phone: "+91 XXXXXXXXXX", // [PLACEHOLDER]
    email: "hello@faudifood.com", // [PLACEHOLDER]
    address: "Kasaragod, Kerala, India - 671121", // [PLACEHOLDER]
    fssai: "FSSAI Lic. No. 1XXXXXXXXXXXXX", // [PLACEHOLDER]
    instagram: "https://instagram.com/faudifood", // [PLACEHOLDER]
    facebook: "https://facebook.com/faudifood", // [PLACEHOLDER]
  },
  
  whyFaudi: [
    {
      id: "flavours",
      title: "Bold Flavours",
      desc: "Unapologetic, punchy tastes that hit different. No boring bites.",
      icon: "Sparkles", // Lucide icon name
      badge: "100% INTENSE"
    },
    {
      id: "packaging",
      title: "Packed to Impress",
      desc: "Freshness-locked bold packaging that looks as electric as it tastes.",
      icon: "PackageCheck",
      badge: "ICONIC PACKS"
    },
    {
      id: "fresh",
      title: "Made Fresh",
      desc: "Small commercial batches crafted with obsessively picked ingredients.",
      icon: "Flame",
      badge: "ALWAYS CRISP"
    }
  ]
};

// Helper function to build direct WhatsApp order link
export const getWhatsAppOrderLink = (productName, category = "General", extraNote = "") => {
  const base = `https://wa.me/${BRAND_CONFIG.whatsappNumber}`;
  const text = encodeURIComponent(
    `Hi FAUDI! I'd like to order:\n• Product: ${productName} (${category})\n${extraNote ? `• Note: ${extraNote}\n` : ""}Please share price details and delivery availability. Thank you!`
  );
  return `${base}?text=${text}`;
};

// Helper for wholesale / bulk inquiries
export const getWhatsAppBulkLink = (formData = {}) => {
  const base = `https://wa.me/${BRAND_CONFIG.whatsappNumber}`;
  const text = encodeURIComponent(
    `Hi FAUDI! I want to stock FAUDI in my store / place a bulk order:\n• Name: ${formData.name || "[Your Name]"}\n• Phone: ${formData.phone || "[Phone Number]"}\n• City: ${formData.city || "[City]"}\n• Message: ${formData.message || "Looking for wholesale catalog & pricing."}`
  );
  return `${base}?text=${text}`;
};

// ZONE 1: KASARAGOD SNACKS
export const SNACKS_DATA = {
  headline: "KASARAGOD. CRUNCH. REPEAT.", // [PLACEHOLDER - easy to edit]
  subheadline: "Crisp, bold, nostalgic savouries rooted in Kasaragod's fiery snacking culture.",
  products: [
    {
      id: "soratta",
      name: "Soratta",
      description: "Traditional Kasaragod spiral crunchy rings, dusted with spicy savoury seasoning.",
      packSize: "200g Pack", // [PLACEHOLDER]
      mrp: "₹65", // [PLACEHOLDER]
      badge: "KASARAGOD ICON",
      badgeColor: "bg-red-500 text-white",
      image: "/images/snacks/soratta.jpg",
      isComingSoon: false,
    },
    {
      id: "dalda-cake",
      name: "Dalda Cake",
      description: "Old-school bakery-style soft, aromatic golden tea cake slice with caramelized edges.",
      packSize: "250g Box", // [PLACEHOLDER]
      mrp: "₹95", // [PLACEHOLDER]
      badge: "FRESH BATCH",
      badgeColor: "bg-amber-400 text-black",
      image: "/images/snacks/dalda-cake.jpg",
      isComingSoon: false,
    },
    {
      id: "spicy-mixture-placeholder",
      name: "Fiery Malabar Mixture",
      description: "Crunchy sev, roasted peanuts, and fried curry leaves tossed in crushed red chili.",
      packSize: "200g Pack", // [PLACEHOLDER]
      mrp: "₹75", // [PLACEHOLDER]
      badge: "NEW RECIPE",
      badgeColor: "bg-emerald-500 text-white",
      image: "/images/snacks/malabar-mixture.jpg",
      isComingSoon: false,
    },
    {
      id: "coming-soon-1",
      name: "Pepper Banana Chips",
      description: "Wafer-thin Nendran banana crisps tossed in freshly crushed Tellicherry black pepper.",
      packSize: "Coming Soon", // [PLACEHOLDER]
      mrp: "₹TBA", // [PLACEHOLDER]
      badge: "NEXT DROP",
      badgeColor: "bg-purple-600 text-white",
      image: "/images/snacks/banana-chips.jpg",
      isComingSoon: true,
    },
    {
      id: "coming-soon-2",
      name: "Spiced Cashew Crunch",
      description: "Whole roasted W240 cashews glazed in spicy Kasaragod red chili crunch.",
      packSize: "Coming Soon", // [PLACEHOLDER]
      mrp: "₹TBA", // [PLACEHOLDER]
      badge: "COMING SOON",
      badgeColor: "bg-blue-600 text-white",
      image: "/images/snacks/cashew-crunch.jpg",
      isComingSoon: true,
    }
  ]
};

// ZONE 2: CREAM BUNS
export const CREAM_BUNS_DATA = {
  headline: "BUN. FILLED. DONE.", // [PLACEHOLDER]
  subheadline: "Ultra-pillowy brioche buns loaded to the brim with luscious, velvety artisan creams.",
  howToOrder: [
    { step: "01", title: "Choose Flavor", desc: "Select your favorite cream filling from our freshly whipped options." },
    { step: "02", title: "WhatsApp Us", desc: "One click sends your bun flavor, quantity, and delivery address." },
    { step: "03", title: "Enjoy Fresh", desc: "Delivered chilled and cloud-soft, ready to dive into." }
  ],
  boxMockup: {
    title: "FAUDI BUN BOX",
    label: "WHITE TAKEAWAY BOX",
    desc: "Sturdy square takeaway box with bold FAUDI BUN graphic print. Built to keep your buns fresh, chilled, and pillowy during transit."
  },
  flavors: [
    {
      id: "chocolate-hazelnut",
      name: "Chocolate Hazelnut",
      scriptTag: "Rich Cocoa Silk",
      description: "Thick roasted Italian hazelnut cocoa cream loaded inside a golden brioche bun, finished with crushed toasted hazelnuts and powdered sugar.",
      packSize: "Single Bun (140g)", // [PLACEHOLDER]
      mrp: "₹120", // [PLACEHOLDER]
      image: "/images/buns/chocolate-hazelnut.jpg",
      accentBg: "#3E2113",
      accentTextColor: "#FFE6C2",
      badge: "BESTSELLER",
      notes: "Made with authentic roasted hazelnut paste"
    },
    {
      id: "pistachio-kunafa",
      name: "Pistachio Kunafa",
      scriptTag: "Dubai Pistachio Paste",
      description: "Inspired by the viral Dubai treat: decadent creamy pistachio filling blended with golden buttery toasted crunchy kunafa pastry.",
      packSize: "Single Bun (140g)", // [PLACEHOLDER]
      mrp: "₹160", // [PLACEHOLDER]
      image: "/images/buns/pistachio-kunafa.jpg",
      accentBg: "#3A5A35",
      accentTextColor: "#E8F5E9",
      badge: "VIRAL HIT",
      notes: "Homemade pistachio paste & toasted kataifi crunch"
    },
    {
      id: "vanilla-honeycomb",
      name: "Whipped Madagascar Vanilla",
      scriptTag: "Pure Bean Whipped",
      description: "Cold-infused real Madagascar vanilla bean cream whipped to cloud texture, paired with golden honeycomb crunch shards.",
      packSize: "Single Bun (140g)", // [PLACEHOLDER]
      mrp: "₹110", // [PLACEHOLDER]
      image: "/images/buns/vanilla-cream.jpg",
      accentBg: "#C48824",
      accentTextColor: "#FFFBEA",
      badge: "CLASSIC",
      notes: "Real vanilla bean speckles in every bite"
    },
    {
      id: "speculoos-biscoff",
      name: "Spiced Speculoos Cookie",
      scriptTag: "Caramelized Crumble",
      description: "Deep caramelized Belgian spiced cookie butter cream whipped light, topped with crunchy cinnamon biscuit crumble.",
      packSize: "Single Bun (140g)", // [PLACEHOLDER]
      mrp: "₹140", // [PLACEHOLDER]
      image: "/images/buns/speculoos-cream.jpg",
      accentBg: "#633B24",
      accentTextColor: "#FEEAE0",
      badge: "PREMIUM",
      notes: "Sweet caramel spice with cookie crunch"
    }
  ]
};

// ZONE 3: NUT CHOCOLATE BARS
export const NUT_CHOCOLATE_DATA = {
  headline: "NUTS ABOUT CHOCOLATE.", // [PLACEHOLDER]
  subheadline: "Heavyweight dark chocolate bars embedded with roasted whole nuts and nutrient-rich seeds.",
  heroImage: "/images/chocolate/nut-bars-hero.jpg",
  variants: [
    {
      id: "almond-crunch",
      name: "Whole Almond Dark Bar",
      description: "Silky 55% dark chocolate bar studded with a dense row of golden roasted California almonds.",
      packSize: "85g Slab", // [PLACEHOLDER]
      mrp: "₹180", // [PLACEHOLDER]
      nutType: "California Almonds",
      image: "/images/chocolate/nut-bars-hero.jpg",
      badge: "TOP PICK"
    },
    {
      id: "pistachio-emerald",
      name: "Roasted Pistachio Emerald Bar",
      description: "Rich dark cocoa base packed with vibrant toasted Iranian pistachios for salty-sweet balance.",
      packSize: "85g Slab", // [PLACEHOLDER]
      mrp: "₹220", // [PLACEHOLDER]
      nutType: "Salted Pistachios",
      image: "/images/chocolate/pistachio-bar.jpg",
      badge: "LIMITED BATCH"
    },
    {
      id: "roasted-peanut",
      name: "Golden Peanut Crunch Bar",
      description: "Heavily loaded with slow-roasted crunchy golden peanuts embedded in creamy dark chocolate.",
      packSize: "85g Slab", // [PLACEHOLDER]
      mrp: "₹150", // [PLACEHOLDER]
      nutType: "Roasted Peanuts",
      image: "/images/chocolate/peanut-bar.jpg",
      badge: "EVERYDAY CRUNCH"
    },
    {
      id: "multi-seeds",
      name: "Multi-Seed Power Bar",
      description: "Pumpkin seeds, sunflower kernels, and white sesame seeds clustered over dark chocolate.",
      packSize: "85g Slab", // [PLACEHOLDER]
      mrp: "₹170", // [PLACEHOLDER]
      nutType: "Pumpkin & Sunflower Seeds",
      image: "/images/chocolate/seeds-bar.jpg",
      badge: "CRUNCH BOMB"
    },
    {
      id: "fruit-and-nut",
      name: "Berry & Nut Velvet Bar",
      description: "Tart freeze-dried cranberries and plump golden sultanas paired with roasted almond crunch.",
      packSize: "85g Slab", // [PLACEHOLDER]
      mrp: "₹190", // [PLACEHOLDER]
      nutType: "Berries & Almonds",
      image: "/images/chocolate/fruit-nut-bar.jpg",
      badge: "FRUITY VELVET"
    },
    {
      id: "nut-discs",
      name: "Nut Chocolate Medallions",
      description: "Bite-sized thick circular milk & dark chocolate discs loaded with whole hazelnuts and almonds.",
      packSize: "Box of 6 Discs (180g)", // [PLACEHOLDER]
      mrp: "₹240", // [PLACEHOLDER]
      nutType: "Hazelnut & Almond Discs",
      image: "/images/chocolate/nut-discs.jpg",
      badge: "POPULAR SHARE"
    }
  ],
  giftBox: {
    title: "MADE TO SHARE. MADE TO GIFT.",
    subtitle: "THE FAUDI LUXURY BAR BOX",
    description: "An elegant presentation of 8 handcrafted chocolate bars featuring freeze-dried berries, whole roasted nuts, and edible gold dust. Perfect for festivals, corporate hampers, and celebrations.",
    packSize: "Box of 8 Assorted Bars", // [PLACEHOLDER]
    mrp: "₹899", // [PLACEHOLDER]
    image: "/images/chocolate/gift-box.jpg",
    badge: "LUXURY GIFT EDITION",
    whatsappMessage: "Hi FAUDI! I'm interested in bulk/gift ordering the 'MADE TO SHARE' FAUDI Luxury Nut Chocolate Gift Box. Please share corporate catalog and quantity discounts."
  }
};

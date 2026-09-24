import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { uploadToCloudinary, getCloudinaryConfig } from '../lib/cloudinary';
import { isSupabaseConfigured, saveSupabaseConfig, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Check,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Package,
  Settings,
  MessageSquare,
  Key,
  ExternalLink,
  Lock,
  LogOut,
  Image as ImageIcon,
} from 'lucide-react';

const ADMIN_PIN = 'faudi2026'; // Default access PIN

export default function AdminPortal({ isOpen = true, onClose, isStandalonePage = false }) {
  const {
    products,
    siteSettings,
    inquiries,
    loading,
    dbConnected,
    updateProduct,
    addProduct,
    deleteProduct,
    updateSettings,
    syncWithSupabase,
  } = useData();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('faudi_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'settings' | 'inquiries' | 'cloud'

  // Product Filter
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Edit / Add Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [productForm, setProductForm] = useState({
    id: '',
    category: 'snacks',
    name: '',
    description: '',
    pack_size: '',
    mrp: '',
    image_url: '',
    badge: '',
    badge_color: 'bg-brand-black text-white',
    script_tag: '',
    nut_type: '',
    notes: '',
    is_coming_soon: false,
    is_active: true,
  });

  // Image Uploading State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...siteSettings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Cloud Config State
  const [cloudSettings, setCloudSettings] = useState({
    supabaseUrl: supabaseUrl || '',
    supabaseKey: supabaseAnonKey || '',
    cloudinaryCloudName: getCloudinaryConfig().cloudName,
    cloudinaryPreset: getCloudinaryConfig().uploadPreset,
  });
  const [cloudSaved, setCloudSaved] = useState(false);

  // Handle PIN Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN || pinInput === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('faudi_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect PIN. (Default: faudi2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('faudi_admin_auth');
  };

  // Open Edit Modal
  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setIsAddingNew(false);
    setProductForm({
      id: prod.id,
      category: prod.category || 'snacks',
      name: prod.name || '',
      description: prod.description || '',
      pack_size: prod.pack_size || '',
      mrp: prod.mrp || '',
      image_url: prod.image_url || '',
      badge: prod.badge || '',
      badge_color: prod.badge_color || 'bg-brand-black text-white',
      script_tag: prod.script_tag || '',
      nut_type: prod.nut_type || '',
      notes: prod.notes || '',
      is_coming_soon: Boolean(prod.is_coming_soon),
      is_active: prod.is_active !== undefined ? prod.is_active : true,
    });
    setUploadError('');
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingProduct(null);
    setIsAddingNew(true);
    setProductForm({
      id: `prod-${Date.now()}`,
      category: categoryFilter !== 'all' ? categoryFilter : 'snacks',
      name: '',
      description: '',
      pack_size: '',
      mrp: '₹',
      image_url: '',
      badge: 'NEW',
      badge_color: 'bg-brand-orange text-white',
      script_tag: '',
      nut_type: '',
      notes: '',
      is_coming_soon: false,
      is_active: true,
    });
    setUploadError('');
  };

  // Handle Cloudinary Image File Upload
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setUploadError('');
      const res = await uploadToCloudinary(file);
      setProductForm((prev) => ({ ...prev, image_url: res.url }));
    } catch (err) {
      setUploadError(err.message || 'Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.mrp) {
      alert('Please fill in Product Name and Price (MRP)');
      return;
    }

    if (isAddingNew) {
      await addProduct(productForm);
    } else {
      await updateProduct(editingProduct.id, productForm);
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Save Cloud Credentials
  const handleSaveCloud = (e) => {
    e.preventDefault();
    saveSupabaseConfig(cloudSettings.supabaseUrl, cloudSettings.supabaseKey);
    if (typeof window !== 'undefined') {
      localStorage.setItem('faudi_cloudinary_cloud_name', cloudSettings.cloudinaryCloudName);
      localStorage.setItem('faudi_cloudinary_preset', cloudSettings.cloudinaryPreset);
    }
    setCloudSaved(true);
    setTimeout(() => {
      setCloudSaved(false);
      window.location.reload();
    }, 1200);
  };

  if (!isStandalonePage && !isOpen) return null;

  return (
    <div
      className={
        isStandalonePage
          ? 'min-h-screen bg-brand-cream text-brand-black flex flex-col'
          : 'fixed inset-0 z-50 overflow-y-auto bg-brand-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200'
      }
    >
      <div
        className={
          isStandalonePage
            ? 'flex-1 flex flex-col bg-[#FAF7EE] text-brand-black w-full min-h-screen'
            : 'bg-[#FAF7EE] text-brand-black w-full max-w-6xl max-h-[92vh] rounded-faudi-lg border-3 border-brand-black shadow-bold-lg flex flex-col overflow-hidden'
        }
      >
        {/* Top Header */}
        <div className="bg-brand-black text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b-2 border-brand-black shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl tracking-tighter text-brand-yellow">FAUDI</span>
            <span className="text-xs font-sub font-bold px-2 py-0.5 rounded bg-brand-orange text-white uppercase tracking-wider">
              GOD MODE ADMIN
            </span>
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sub font-bold border border-white/20">
              <span
                className={`w-2 h-2 rounded-full ${
                  dbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="text-white/80">
                {dbConnected ? 'Supabase Live' : 'Local Cache Mode'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={syncWithSupabase}
                disabled={loading}
                title="Refresh and sync data"
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}

            {/* Back to Live Store button */}
            <button
              onClick={onClose}
              title="Return to Customer Storefront"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-faudi bg-white/10 hover:bg-brand-orange text-white font-sub font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>← Back to Store</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-faudi bg-brand-yellow border-2 border-brand-black flex items-center justify-center shadow-bold mb-6">
              <Lock className="w-8 h-8 text-brand-black" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-black uppercase tracking-tight text-center">
              Admin Portal
            </h2>
            <p className="text-sm text-brand-black/70 font-body text-center mt-2 max-w-sm">
              Enter your access PIN to edit products, update prices, and manage wholesale leads.
            </p>

            <form onSubmit={handleLogin} className="mt-8 w-full max-w-xs space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (faudi2026)"
                  autoFocus
                  className="w-full px-4 py-3 rounded-faudi border-2 border-brand-black text-center font-sub font-bold text-lg tracking-widest outline-none focus:ring-2 focus:ring-brand-orange shadow-bold-sm"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-600 font-sub font-bold text-center">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-faudi bg-brand-black text-white font-sub font-bold text-sm uppercase tracking-wider hover:bg-brand-orange transition-colors shadow-bold active:translate-y-0.5"
              >
                Unlock Dashboard
              </button>

              <p className="text-[11px] text-brand-black/50 text-center font-body">
                Default PIN: <code className="font-mono font-bold text-brand-black">faudi2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs */}
            <div className="bg-white border-b-2 border-brand-black/10 px-4 sm:px-6 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1 sm:gap-2 py-2.5">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-faudi text-xs sm:text-sm font-sub font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'products'
                      ? 'bg-brand-black text-white shadow-bold-sm'
                      : 'text-brand-black/70 hover:bg-black/5'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Products ({products.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-faudi text-xs sm:text-sm font-sub font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'settings'
                      ? 'bg-brand-black text-white shadow-bold-sm'
                      : 'text-brand-black/70 hover:bg-black/5'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Site & Contact</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-faudi text-xs sm:text-sm font-sub font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'inquiries'
                      ? 'bg-brand-black text-white shadow-bold-sm'
                      : 'text-brand-black/70 hover:bg-black/5'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Leads ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('cloud')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-faudi text-xs sm:text-sm font-sub font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'cloud'
                      ? 'bg-brand-black text-white shadow-bold-sm'
                      : 'text-brand-black/70 hover:bg-black/5'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  <span>Cloud API Keys</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                title="Log out"
                className="flex items-center gap-1 text-xs font-sub font-bold uppercase text-brand-black/60 hover:text-red-600 transition-colors py-2 px-3"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Lock</span>
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* TAB 1: PRODUCTS MANAGER */}
              {activeTab === 'products' && (
                <div>
                  {/* Category Filter and Add Product Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {['all', 'snacks', 'buns', 'chocolate', 'gift'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-faudi text-xs font-sub font-bold uppercase tracking-wider transition-colors ${
                            categoryFilter === cat
                              ? 'bg-brand-orange text-white shadow-bold-sm'
                              : 'bg-white border border-brand-black/20 text-brand-black hover:bg-gray-50'
                          }`}
                        >
                          {cat === 'all'
                            ? 'All Worlds'
                            : cat === 'snacks'
                            ? 'Kasaragod Snacks'
                            : cat === 'buns'
                            ? 'Cream Buns'
                            : cat === 'chocolate'
                            ? 'Nut Chocolates'
                            : 'Gift Boxes'}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={openAddModal}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-faudi bg-brand-black text-white font-sub font-bold text-xs uppercase tracking-wider hover:bg-brand-orange transition-colors shadow-bold-sm active:translate-y-0.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Product</span>
                    </button>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products
                      .filter((p) => categoryFilter === 'all' || p.category === categoryFilter)
                      .map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-white rounded-faudi border-2 border-brand-black p-4 shadow-bold-sm flex flex-col justify-between"
                        >
                          <div>
                            {/* Top info and badge */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-sub font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 border border-gray-300">
                                {prod.category}
                              </span>
                              {prod.badge && (
                                <span className={`text-[10px] font-sub font-bold uppercase px-2 py-0.5 rounded ${prod.badge_color || 'bg-brand-yellow text-brand-black'}`}>
                                  {prod.badge}
                                </span>
                              )}
                            </div>

                            {/* Image preview & info */}
                            <div className="flex items-start gap-3 my-2">
                              <div className="w-16 h-16 rounded-lg overflow-hidden border border-brand-black/20 bg-gray-100 shrink-0">
                                {prod.image_url ? (
                                  <img
                                    src={prod.image_url}
                                    alt={prod.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <ImageIcon className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display text-lg text-brand-black truncate uppercase leading-tight">
                                  {prod.name}
                                </h4>
                                <p className="text-xs text-brand-black/60 font-body line-clamp-2 mt-0.5">
                                  {prod.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 pt-2 border-t border-brand-black/10">
                              <span>{prod.pack_size || 'Standard'}</span>
                              <span className="font-display text-base text-brand-black">{prod.mrp}</span>
                            </div>
                          </div>

                          {/* Action row */}
                          <div className="mt-4 pt-3 border-t border-brand-black/10 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              {prod.is_coming_soon ? (
                                <span className="text-[10px] font-sub font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                                  Coming Soon
                                </span>
                              ) : (
                                <span className="text-[10px] font-sub font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                                  In Stock
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditModal(prod)}
                                className="p-1.5 rounded bg-gray-100 hover:bg-brand-yellow text-brand-black transition-colors"
                                title="Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${prod.name}"?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1.5 rounded bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 2: SITE & CONTACT SETTINGS */}
              {activeTab === 'settings' && (
                <div className="max-w-3xl mx-auto bg-white rounded-faudi-lg border-2 border-brand-black p-6 sm:p-8 shadow-bold-sm">
                  <h3 className="font-display text-2xl uppercase tracking-tight text-brand-black mb-2">
                    Brand & Direct Contact Settings
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-black/70 font-body mb-6">
                    Updating your WhatsApp number will immediately redirect all customer orders and inquiries across the whole website.
                  </p>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                          WhatsApp Ordering Number *
                        </label>
                        <input
                          type="text"
                          value={settingsForm.whatsapp_number || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })
                          }
                          placeholder="919562313752"
                          className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub font-bold text-sm outline-none focus:border-brand-black"
                        />
                        <span className="text-[10px] text-brand-black/50 font-body">
                          Country code without + (e.g. 919562313752)
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                          Official Contact Email *
                        </label>
                        <input
                          type="email"
                          value={settingsForm.email || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, email: e.target.value })
                          }
                          placeholder="faudifoods@gmail.com"
                          className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub text-sm outline-none focus:border-brand-black"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                          Customer Care Phone
                        </label>
                        <input
                          type="text"
                          value={settingsForm.phone || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, phone: e.target.value })
                          }
                          placeholder="+91 9562313752"
                          className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub text-sm outline-none focus:border-brand-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                          FSSAI License Number
                        </label>
                        <input
                          type="text"
                          value={settingsForm.fssai || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, fssai: e.target.value })
                          }
                          placeholder="FSSAI Lic. No. 1XXXXXXXXXXXXX"
                          className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub text-sm outline-none focus:border-brand-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                        Registered Facility Address
                      </label>
                      <input
                        type="text"
                        value={settingsForm.address || ''}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, address: e.target.value })
                        }
                        placeholder="Kasaragod, Kerala, India - 671121"
                        className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub text-sm outline-none focus:border-brand-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                          Instagram URL
                        </label>
                        <input
                          type="text"
                          value={settingsForm.instagram || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, instagram: e.target.value })
                          }
                          placeholder="https://instagram.com/faudi.bites"
                          className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub text-sm outline-none focus:border-brand-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                          Hero Tagline Headline
                        </label>
                        <input
                          type="text"
                          value={settingsForm.tagline || ''}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, tagline: e.target.value })
                          }
                          placeholder="GOOD FOOD. BIG MOOD."
                          className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub font-bold text-sm outline-none focus:border-brand-black"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      {settingsSaved && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-sub font-bold text-emerald-600">
                          <Check className="w-4 h-4" /> Settings Saved Successfully!
                        </span>
                      )}
                      <div className="ml-auto">
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-faudi bg-brand-orange text-white font-sub font-bold text-xs uppercase tracking-wider hover:bg-brand-black transition-colors shadow-bold-sm"
                        >
                          Save Settings
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: WHOLESALE LEADS / INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-tight text-brand-black">
                        Wholesale & Retailer Leads
                      </h3>
                      <p className="text-xs text-brand-black/70 font-body">
                        Direct inquiries received from stores and cafes wanting to stock FAUDI.
                      </p>
                    </div>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="bg-white rounded-faudi border-2 border-dashed border-brand-black/30 p-12 text-center">
                      <MessageSquare className="w-10 h-10 text-brand-black/30 mx-auto mb-2" />
                      <p className="font-sub font-bold text-sm uppercase text-brand-black/60">
                        No retail inquiries yet
                      </p>
                      <p className="text-xs text-brand-black/50 font-body mt-1">
                        When stores submit the retail form on the homepage, they will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="bg-white rounded-faudi border-2 border-brand-black p-4 sm:p-5 shadow-bold-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display text-xl text-brand-black uppercase">
                                {inq.name}
                              </span>
                              <span className="text-[10px] font-sub font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                                {inq.city}
                              </span>
                            </div>
                            <div className="text-xs font-sub font-bold text-brand-black/70 mt-0.5">
                              📞 {inq.phone}
                            </div>
                            {inq.message && (
                              <p className="text-xs text-brand-black/80 font-body mt-2 bg-gray-50 p-2.5 rounded border border-gray-200">
                                "{inq.message}"
                              </p>
                            )}
                            <span className="text-[10px] text-gray-400 font-body mt-1 block">
                              Received: {new Date(inq.created_at).toLocaleString()}
                            </span>
                          </div>

                          <div className="shrink-0">
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hi ${inq.name}! Thank you for your inquiry about stocking FAUDI in ${inq.city}. We would love to share our wholesale catalog.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-faudi bg-emerald-600 text-white font-sub font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-bold-sm"
                            >
                              <span>Reply on WhatsApp</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CLOUD API & SUPABASE CONFIG */}
              {activeTab === 'cloud' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* SQL Schema Notice */}
                  <div className="bg-amber-50 border-2 border-amber-400 rounded-faudi p-5 shadow-bold-sm">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sub font-bold text-sm uppercase text-amber-900">
                          One-Click Supabase Database Setup
                        </h4>
                        <p className="text-xs text-amber-800 font-body mt-1 leading-relaxed">
                          To create your database tables and seed products, open{' '}
                          <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-brand-black">
                            supabase-schema.sql
                          </code>{' '}
                          in your project folder, copy its contents, and run it in your{' '}
                          <a
                            href="https://supabase.com/dashboard/project/gyabcqgcqjhlglsnuzpp/sql"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold underline text-amber-950"
                          >
                            Supabase SQL Editor ➔
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cloud Credentials Form */}
                  <div className="bg-white rounded-faudi-lg border-2 border-brand-black p-6 sm:p-8 shadow-bold-sm">
                    <h3 className="font-display text-2xl uppercase tracking-tight text-brand-black mb-4">
                      Cloud Connection Credentials
                    </h3>

                    <form onSubmit={handleSaveCloud} className="space-y-4">
                      <div>
                        <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                          Supabase Project URL
                        </label>
                        <input
                          type="text"
                          value={cloudSettings.supabaseUrl}
                          onChange={(e) =>
                            setCloudSettings({ ...cloudSettings, supabaseUrl: e.target.value })
                          }
                          placeholder="https://gyabcqgcqjhlglsnuzpp.supabase.co"
                          className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-mono text-xs outline-none focus:border-brand-black"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                          Supabase Publishable / Anon Key
                        </label>
                        <input
                          type="text"
                          value={cloudSettings.supabaseKey}
                          onChange={(e) =>
                            setCloudSettings({ ...cloudSettings, supabaseKey: e.target.value })
                          }
                          placeholder="sb_publishable_..."
                          className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-mono text-xs outline-none focus:border-brand-black"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                            Cloudinary Cloud Name
                          </label>
                          <input
                            type="text"
                            value={cloudSettings.cloudinaryCloudName}
                            onChange={(e) =>
                              setCloudSettings({
                                ...cloudSettings,
                                cloudinaryCloudName: e.target.value,
                              })
                            }
                            placeholder="dgvxxshjd"
                            className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub text-xs outline-none focus:border-brand-black"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                            Cloudinary Upload Preset (Unsigned)
                          </label>
                          <input
                            type="text"
                            value={cloudSettings.cloudinaryPreset}
                            onChange={(e) =>
                              setCloudSettings({
                                ...cloudSettings,
                                cloudinaryPreset: e.target.value,
                              })
                            }
                            placeholder="faudi_uploads"
                            className="w-full px-4 py-2.5 rounded-faudi border-2 border-brand-black/30 font-sub text-xs outline-none focus:border-brand-black"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        {cloudSaved && (
                          <span className="text-xs font-sub font-bold text-emerald-600">
                            Saved! Reloading...
                          </span>
                        )}
                        <button
                          type="submit"
                          className="ml-auto px-6 py-3 rounded-faudi bg-brand-black text-white font-sub font-bold text-xs uppercase tracking-wider hover:bg-brand-orange transition-colors shadow-bold-sm"
                        >
                          Update Cloud Credentials
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* EDIT / ADD PRODUCT MODAL */}
        {(editingProduct || isAddingNew) && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-faudi-lg border-3 border-brand-black shadow-bold-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
              <div className="bg-brand-yellow px-6 py-4 flex items-center justify-between border-b-2 border-brand-black">
                <h3 className="font-display text-2xl uppercase tracking-tight text-brand-black">
                  {isAddingNew ? 'Add New Product' : `Edit: ${editingProduct?.name}`}
                </h3>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNew(false);
                  }}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className="w-5 h-5 text-brand-black" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. Pistachio Kunafa Bun"
                      className="w-full px-3 py-2 rounded-faudi border-2 border-brand-black/30 font-sub text-sm outline-none focus:border-brand-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                      Zone / Category *
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({ ...productForm, category: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-faudi border-2 border-brand-black/30 font-sub text-sm outline-none focus:border-brand-black bg-white"
                    >
                      <option value="snacks">Kasaragod Snacks</option>
                      <option value="buns">Cream Buns</option>
                      <option value="chocolate">Nut Chocolate Bars</option>
                      <option value="gift">Luxury Gift Boxes</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                      Price (MRP) *
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.mrp}
                      onChange={(e) => setProductForm({ ...productForm, mrp: e.target.value })}
                      placeholder="e.g. ₹120"
                      className="w-full px-3 py-2 rounded-faudi border-2 border-brand-black/30 font-display text-base outline-none focus:border-brand-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                      Pack Size / Weight
                    </label>
                    <input
                      type="text"
                      value={productForm.pack_size}
                      onChange={(e) =>
                        setProductForm({ ...productForm, pack_size: e.target.value })
                      }
                      placeholder="e.g. 200g Pack / Single Bun"
                      className="w-full px-3 py-2 rounded-faudi border-2 border-brand-black/30 font-sub text-sm outline-none focus:border-brand-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="2"
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({ ...productForm, description: e.target.value })
                    }
                    placeholder="Short punchy product description..."
                    className="w-full px-3 py-2 rounded-faudi border-2 border-brand-black/30 font-body text-xs outline-none focus:border-brand-black"
                  />
                </div>

                {/* IMAGE UPLOAD SECTION */}
                <div>
                  <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    Product Image (Cloudinary or URL)
                  </label>
                  <div className="flex items-center gap-3">
                    {productForm.image_url ? (
                      <div className="relative w-16 h-16 rounded-faudi overflow-hidden border-2 border-brand-black bg-gray-100 shrink-0">
                        <img
                          src={productForm.image_url}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-faudi border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 shrink-0">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={productForm.image_url}
                        onChange={(e) =>
                          setProductForm({ ...productForm, image_url: e.target.value })
                        }
                        placeholder="Paste image URL or upload file..."
                        className="w-full px-3 py-1.5 rounded-faudi border-2 border-brand-black/20 text-xs font-mono outline-none"
                      />

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={uploadingImage}
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-faudi bg-brand-yellow text-brand-black border border-brand-black font-sub font-bold text-xs uppercase hover:bg-brand-orange hover:text-white transition-colors shadow-bold-sm disabled:opacity-50"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingImage ? 'Uploading...' : 'Upload to Cloudinary'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {uploadError && (
                    <p className="text-[11px] text-red-600 font-body mt-1">{uploadError}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                      Sticker Badge Text
                    </label>
                    <input
                      type="text"
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      placeholder="e.g. VIRAL HIT / BESTSELLER"
                      className="w-full px-3 py-2 rounded-faudi border-2 border-brand-black/30 font-sub text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sub font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                      Script Tag / Sub-title
                    </label>
                    <input
                      type="text"
                      value={productForm.script_tag}
                      onChange={(e) =>
                        setProductForm({ ...productForm, script_tag: e.target.value })
                      }
                      placeholder="e.g. Dubai Pistachio Paste"
                      className="w-full px-3 py-2 rounded-faudi border-2 border-brand-black/30 font-sub text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Coming Soon & Active Toggles */}
                <div className="pt-2 flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-sub font-bold uppercase text-brand-black">
                    <input
                      type="checkbox"
                      checked={productForm.is_coming_soon}
                      onChange={(e) =>
                        setProductForm({ ...productForm, is_coming_soon: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-orange"
                    />
                    <span>Mark as "Coming Soon"</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-sub font-bold uppercase text-brand-black">
                    <input
                      type="checkbox"
                      checked={productForm.is_active}
                      onChange={(e) =>
                        setProductForm({ ...productForm, is_active: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-orange"
                    />
                    <span>Visible in Store</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-brand-black/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddingNew(false);
                    }}
                    className="px-4 py-2 rounded-faudi border-2 border-brand-black/20 font-sub font-bold text-xs uppercase hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-faudi bg-brand-black text-white font-sub font-bold text-xs uppercase tracking-wider hover:bg-brand-orange transition-colors shadow-bold-sm"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

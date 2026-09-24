import { createClient } from '@supabase/supabase-js';

// Environment variables or localStorage override (for quick configuration in Admin UI)
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('faudi_supabase_url') || '' : '';
const storedKey = typeof window !== 'undefined' ? localStorage.getItem('faudi_supabase_key') || '' : '';

export const supabaseUrl = storedUrl || envUrl;
export const supabaseAnonKey = storedKey || envKey;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('placeholder')
);

// Create client if configured, otherwise null (app will gracefully use local storage / fallback)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Save new Supabase credentials and re-initialize
 */
export function saveSupabaseConfig(url, key) {
  if (typeof window !== 'undefined') {
    if (url) localStorage.setItem('faudi_supabase_url', url.trim());
    else localStorage.removeItem('faudi_supabase_url');
    
    if (key) localStorage.setItem('faudi_supabase_key', key.trim());
    else localStorage.removeItem('faudi_supabase_key');
  }
}

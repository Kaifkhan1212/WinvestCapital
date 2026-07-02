import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://jdyukwmrfdpaijfxwdei.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Lazy initialization check
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase is not fully configured. Please provide VITE_SUPABASE_ANON_KEY in your environment variables.');
  }
  // Use a fallback dummy key to prevent the Supabase SDK from throwing an error on startup
  return createClient(supabaseUrl, supabaseAnonKey || 'dummy-anon-key-placeholder');
};

export const supabase = getSupabaseClient();

import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

// const supabaseUrl = 'YOUR_REACT_NATIVE_SUPABASE_URL';
// const supabaseAnonKey = 'YOUR_REACT_NATIVE_SUPABASE_ANON_KEY';

const supabaseUrl = 'https://gwncmcvzuqpezzsomebm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bmNtY3Z6dXFwZXp6c29tZWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NTAwMDYsImV4cCI6MjAyODUyNjAwNn0.Lnbo4pRCg06eLqWgNVtQkXk0OP2jpw-oXsYcJOjQiFI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
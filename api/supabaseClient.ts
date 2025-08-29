import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://utemtccknfzxndecreyq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0ZW10Y2NrbmZ6eG5kZWNyZXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjM3NTMsImV4cCI6MjA3MTczOTc1M30.2EdA5yIRFCm2LZYQhQpJKytfSK5D25dUKnMW4Q4tFSM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
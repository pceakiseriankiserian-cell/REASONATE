
import { createClient } from '@supabase/supabase-js';

// We use environment variables for safety, fallback to the provided values conceptually
const supabaseUrl = 'https://alnpknzkqbrawywgvznx.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_jLYgEkc_SoedhgQ7Po-liw_U16pPV9G';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

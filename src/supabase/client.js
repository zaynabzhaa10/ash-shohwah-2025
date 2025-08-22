import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irkbnuklwymtjqtzetxh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlya2JudWtsd3ltdGpxdHpldHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NDQ1MjMsImV4cCI6MjA3MDEyMDUyM30.D5zH6igpvypgmn2uqTVP2nBE7Fmk2AcD2hjV4aSm59c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
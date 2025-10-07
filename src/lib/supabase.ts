import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Event = {
  id: string;
  title: string;
  description: string;
  genre: 'afro' | 'dancehall' | 'reggaeton';
  city: string;
  venue: string;
  event_date: string;
  price: number;
  image_url: string;
  capacity: number;
  tickets_sold: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type GalleryImage = {
  id: string;
  event_id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
};

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type TicketPurchase = {
  event_id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  quantity: number;
  total_amount: number;
};

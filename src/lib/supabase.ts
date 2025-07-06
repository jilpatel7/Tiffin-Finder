import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database schema
export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address?: string;
  description?: string;
  food_type: "veg" | "non-veg" | "both";
  experience_years?: number;
  specialties?: string[];
  timing_lunch?: string;
  timing_dinner?: string;
  allow_single_tiffin: boolean;
  rating: number;
  review_count: number;
  status: "pending" | "approved" | "rejected" | "suspended";
  created_at: string;
  updated_at: string;
}

export interface ProviderArea {
  id: string;
  provider_id: string;
  area: string;
  created_at: string;
}

export interface ProviderCuisine {
  id: string;
  provider_id: string;
  cuisine: string;
  created_at: string;
}

export interface ProviderDeliveryType {
  id: string;
  provider_id: string;
  delivery_type: string;
  created_at: string;
}

export interface TiffinItem {
  id: string;
  provider_id: string;
  name: string;
  price: number;
  description?: string;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TiffinItemContent {
  id: string;
  tiffin_item_id: string;
  content_item: string;
  sort_order: number;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  provider_id: string;
  plan_type: "weekly" | "monthly";
  meals_per_day: 1 | 2;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  description?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProviderTestimonial {
  id: string;
  provider_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  is_verified: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface ProviderGallery {
  id: string;
  provider_id: string;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface DeliverySlot {
  id: string;
  provider_id: string;
  slot_time: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

// Combined type for provider with all related data
export interface ProviderWithDetails extends Provider {
  areas: string[];
  cuisines: string[];
  delivery_types: string[];
  tiffin_items: (TiffinItem & { contents: string[] })[];
  pricing_plans: PricingPlan[];
  testimonials: ProviderTestimonial[];
  gallery: ProviderGallery[];
  delivery_slots: string[];
}

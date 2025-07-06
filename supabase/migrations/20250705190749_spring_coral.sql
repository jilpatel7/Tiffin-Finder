/*
  # Provider Management System

  1. New Tables
    - `providers`
      - Basic provider information (name, contact, description, etc.)
    - `provider_areas`
      - Service areas for each provider (many-to-many relationship)
    - `provider_cuisines`
      - Cuisines offered by each provider (many-to-many relationship)
    - `provider_delivery_types`
      - Delivery options for each provider (many-to-many relationship)
    - `tiffin_items`
      - Individual tiffin items offered by providers
    - `tiffin_item_contents`
      - Contents/ingredients of each tiffin item
    - `pricing_plans`
      - Weekly/monthly subscription plans
    - `provider_testimonials`
      - Customer reviews and testimonials
    - `provider_gallery`
      - Image gallery for each provider

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated provider management

  3. Indexes
    - Performance indexes for common queries
*/

-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  whatsapp text,
  address text,
  description text,
  food_type text CHECK (food_type IN ('veg', 'non-veg', 'both')),
  experience_years integer,
  specialties text[],
  timing_lunch text,
  timing_dinner text,
  allow_single_tiffin boolean DEFAULT true,
  rating numeric(2,1) DEFAULT 0,
  review_count integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create provider_areas table (many-to-many)
CREATE TABLE IF NOT EXISTS provider_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  area text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(provider_id, area)
);

-- Create provider_cuisines table (many-to-many)
CREATE TABLE IF NOT EXISTS provider_cuisines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  cuisine text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(provider_id, cuisine)
);

-- Create provider_delivery_types table (many-to-many)
CREATE TABLE IF NOT EXISTS provider_delivery_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  delivery_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(provider_id, delivery_type)
);

-- Create tiffin_items table
CREATE TABLE IF NOT EXISTS tiffin_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  description text,
  is_available boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tiffin_item_contents table
CREATE TABLE IF NOT EXISTS tiffin_item_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tiffin_item_id uuid REFERENCES tiffin_items(id) ON DELETE CASCADE,
  content_item text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  plan_type text NOT NULL CHECK (plan_type IN ('weekly', 'monthly')),
  meals_per_day integer NOT NULL CHECK (meals_per_day IN (1, 2)),
  price numeric(10,2) NOT NULL,
  original_price numeric(10,2),
  discount_percentage integer CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  description text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create provider_testimonials table
CREATE TABLE IF NOT EXISTS provider_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  is_verified boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create provider_gallery table
CREATE TABLE IF NOT EXISTS provider_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  is_primary boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create delivery_slots table
CREATE TABLE IF NOT EXISTS delivery_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  slot_time text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_cuisines ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_delivery_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiffin_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiffin_item_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_slots ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (approved providers only)
CREATE POLICY "Public can read approved providers"
  ON providers
  FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Public can read provider areas"
  ON provider_areas
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = provider_areas.provider_id 
      AND providers.status = 'approved'
    )
  );

CREATE POLICY "Public can read provider cuisines"
  ON provider_cuisines
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = provider_cuisines.provider_id 
      AND providers.status = 'approved'
    )
  );

CREATE POLICY "Public can read provider delivery types"
  ON provider_delivery_types
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = provider_delivery_types.provider_id 
      AND providers.status = 'approved'
    )
  );

CREATE POLICY "Public can read tiffin items"
  ON tiffin_items
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = tiffin_items.provider_id 
      AND providers.status = 'approved'
    )
  );

CREATE POLICY "Public can read tiffin item contents"
  ON tiffin_item_contents
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM tiffin_items 
      JOIN providers ON providers.id = tiffin_items.provider_id
      WHERE tiffin_items.id = tiffin_item_contents.tiffin_item_id 
      AND providers.status = 'approved'
    )
  );

CREATE POLICY "Public can read pricing plans"
  ON pricing_plans
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = pricing_plans.provider_id 
      AND providers.status = 'approved'
    )
  );

CREATE POLICY "Public can read testimonials"
  ON provider_testimonials
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = provider_testimonials.provider_id 
      AND providers.status = 'approved'
    )
  );

CREATE POLICY "Public can read gallery"
  ON provider_gallery
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = provider_gallery.provider_id 
      AND providers.status = 'approved'
    )
  );

CREATE POLICY "Public can read delivery slots"
  ON delivery_slots
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = delivery_slots.provider_id 
      AND providers.status = 'approved'
    )
  );

-- Create policies for provider registration (anyone can insert)
CREATE POLICY "Anyone can register as provider"
  ON providers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can add provider areas during registration"
  ON provider_areas
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can add provider cuisines during registration"
  ON provider_cuisines
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can add provider delivery types during registration"
  ON provider_delivery_types
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can add tiffin items during registration"
  ON tiffin_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can add tiffin item contents during registration"
  ON tiffin_item_contents
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can add pricing plans during registration"
  ON pricing_plans
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can add delivery slots during registration"
  ON delivery_slots
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_providers_status ON providers(status);
CREATE INDEX IF NOT EXISTS idx_providers_rating ON providers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_provider_areas_area ON provider_areas(area);
CREATE INDEX IF NOT EXISTS idx_provider_cuisines_cuisine ON provider_cuisines(cuisine);
CREATE INDEX IF NOT EXISTS idx_tiffin_items_provider ON tiffin_items(provider_id);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_provider ON pricing_plans(provider_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_provider ON provider_testimonials(provider_id);
CREATE INDEX IF NOT EXISTS idx_gallery_provider ON provider_gallery(provider_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_providers_updated_at 
  BEFORE UPDATE ON providers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tiffin_items_updated_at 
  BEFORE UPDATE ON tiffin_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_plans_updated_at 
  BEFORE UPDATE ON pricing_plans 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
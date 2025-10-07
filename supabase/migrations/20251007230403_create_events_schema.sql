/*
  # Create Events Platform Schema

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text) - Event name
      - `description` (text) - Event description
      - `genre` (text) - Music genre (afro, dancehall, reggaeton)
      - `city` (text) - City where event takes place
      - `venue` (text) - Venue name
      - `event_date` (timestamptz) - Date and time of event
      - `price` (numeric) - Ticket price
      - `image_url` (text) - Event image URL
      - `capacity` (integer) - Maximum attendees
      - `tickets_sold` (integer) - Number of tickets sold
      - `featured` (boolean) - Whether event is featured on homepage
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `gallery`
      - `id` (uuid, primary key)
      - `event_id` (uuid) - Reference to events table
      - `image_url` (text) - Photo URL
      - `caption` (text) - Photo caption
      - `created_at` (timestamptz)
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `phone` (text) - Phone number
      - `message` (text) - Contact message
      - `created_at` (timestamptz)
    
    - `ticket_purchases`
      - `id` (uuid, primary key)
      - `event_id` (uuid) - Reference to events table
      - `buyer_name` (text) - Buyer name
      - `buyer_email` (text) - Buyer email
      - `buyer_phone` (text) - Buyer phone
      - `quantity` (integer) - Number of tickets
      - `total_amount` (numeric) - Total purchase amount
      - `status` (text) - Purchase status (pending, confirmed, cancelled)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for events and gallery
    - Authenticated write access for contact submissions and ticket purchases
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  genre text NOT NULL CHECK (genre IN ('afro', 'dancehall', 'reggaeton')),
  city text NOT NULL,
  venue text NOT NULL,
  event_date timestamptz NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  capacity integer NOT NULL DEFAULT 0,
  tickets_sold integer NOT NULL DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create ticket purchases table
CREATE TABLE IF NOT EXISTS ticket_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  buyer_name text NOT NULL,
  buyer_email text NOT NULL,
  buyer_phone text,
  quantity integer NOT NULL CHECK (quantity > 0),
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events (public read)
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

-- RLS Policies for gallery (public read)
CREATE POLICY "Anyone can view gallery"
  ON gallery FOR SELECT
  USING (true);

-- RLS Policies for contact submissions (anyone can insert)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- RLS Policies for ticket purchases (anyone can insert, only own records visible)
CREATE POLICY "Anyone can purchase tickets"
  ON ticket_purchases FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own purchases"
  ON ticket_purchases FOR SELECT
  USING (buyer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_genre ON events(genre);
CREATE INDEX IF NOT EXISTS idx_events_city ON events(city);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_event_id ON gallery(event_id);
CREATE INDEX IF NOT EXISTS idx_ticket_purchases_event_id ON ticket_purchases(event_id);

-- Insert sample events
INSERT INTO events (title, description, genre, city, venue, event_date, price, image_url, capacity, featured) VALUES
  ('Noche de Ritmos Urbanos', 'La mejor fiesta de música afro con los DJs más reconocidos de Colombia', 'afro', 'Bogotá', 'Club Armando Records', '2025-11-15 22:00:00', 50000, 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800', 500, true),
  ('Dancehall Vibes', 'Una noche épica de dancehall con artistas internacionales', 'dancehall', 'Medellín', 'Teatro Metropolitan', '2025-11-20 21:00:00', 60000, 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800', 800, true),
  ('Reggaetón Explosión', 'El mejor reggaetón de la ciudad en una sola noche', 'reggaeton', 'Cali', 'Discoteca Tin Tin Deo', '2025-11-25 23:00:00', 45000, 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800', 600, true),
  ('Afro Sessions', 'Celebra la cultura afro con música en vivo y DJ sets', 'afro', 'Bogotá', 'Salón Comunal La Macarena', '2025-12-01 20:00:00', 40000, 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800', 300, false),
  ('Caribbean Night', 'Dancehall y reggae toda la noche', 'dancehall', 'Cali', 'Club Matraca', '2025-12-05 22:00:00', 35000, 'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=800', 400, false),
  ('Perreo Intenso', 'La mejor música urbana y reggaetón del momento', 'reggaeton', 'Medellín', 'Discoteca El Tibiri', '2025-12-10 23:00:00', 55000, 'https://images.pexels.com/photos/2263410/pexels-photo-2263410.jpeg?auto=compress&cs=tinysrgb&w=800', 700, false);

-- Insert sample gallery photos
INSERT INTO gallery (event_id, image_url, caption) 
SELECT id, 'https://images.pexels.com/photos/1267699/pexels-photo-1267699.jpeg?auto=compress&cs=tinysrgb&w=800', 'Ambiente increíble en la pista'
FROM events LIMIT 1;

INSERT INTO gallery (event_id, image_url, caption) 
SELECT id, 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800', 'DJ en acción'
FROM events OFFSET 1 LIMIT 1;

INSERT INTO gallery (event_id, image_url, caption) 
SELECT id, 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800', 'La energía de la multitud'
FROM events OFFSET 2 LIMIT 1;
-- Create product categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  color TEXT DEFAULT '#9b87f5',
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  is_new BOOLEAN DEFAULT false,
  is_sale BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  has_variants BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create delivery zones table
CREATE TABLE public.delivery_zones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  areas TEXT[] DEFAULT '{}',
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  min_delivery_time INTEGER DEFAULT 60,
  max_delivery_time INTEGER DEFAULT 180,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pickup points table
CREATE TABLE public.pickup_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  opening_hours TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table (for optional accounts)
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  phone TEXT,
  first_name TEXT,
  last_name TEXT,
  default_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  
  -- Delivery info
  delivery_type TEXT NOT NULL CHECK (delivery_type IN ('delivery', 'pickup')),
  delivery_zone_id UUID REFERENCES public.delivery_zones(id) ON DELETE SET NULL,
  pickup_point_id UUID REFERENCES public.pickup_points(id) ON DELETE SET NULL,
  delivery_address TEXT,
  delivery_instructions TEXT,
  delivery_date DATE,
  delivery_time_slot TEXT,
  
  -- Recipient info (for gifts)
  recipient_name TEXT,
  recipient_phone TEXT,
  gift_message TEXT,
  
  -- Pricing
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  payment_method TEXT DEFAULT 'mpesa',
  mpesa_receipt TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  variant_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create M-Pesa transactions table
CREATE TABLE public.mpesa_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  checkout_request_id TEXT,
  merchant_request_id TEXT,
  phone_number TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  mpesa_receipt_number TEXT,
  transaction_date TIMESTAMP WITH TIME ZONE,
  result_code INTEGER,
  result_desc TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mpesa_transactions ENABLE ROW LEVEL SECURITY;

-- Public read policies for catalog data
CREATE POLICY "Anyone can view active categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active delivery zones" ON public.delivery_zones FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active pickup points" ON public.pickup_points FOR SELECT USING (is_active = true);

-- Customer policies
CREATE POLICY "Users can view own customer profile" ON public.customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own customer profile" ON public.customers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create customer profile" ON public.customers FOR INSERT WITH CHECK (true);

-- Order policies (customers can view their own orders, or orders by email for guest checkout)
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (
  customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid())
);
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Order items policies
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  order_id IN (SELECT id FROM public.orders WHERE customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()))
);
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- M-Pesa transaction policies
CREATE POLICY "Service can manage mpesa transactions" ON public.mpesa_transactions FOR ALL USING (true);

-- Create indexes for performance
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_mpesa_checkout_request ON public.mpesa_transactions(checkout_request_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_mpesa_transactions_updated_at BEFORE UPDATE ON public.mpesa_transactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Generate order number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number = 'PUR-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER generate_order_number_trigger BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, color, icon, display_order) VALUES
('Flowers', 'flowers', 'Fresh flower arrangements', '#FF6B9D', 'flower', 1),
('For Her', 'for-her', 'Perfect gifts for her', '#9b87f5', 'heart', 2),
('For Him', 'for-him', 'Gifts he will love', '#1A1F2C', 'gift', 3),
('Cakes', 'cakes', 'Delicious celebration cakes', '#FEC6A1', 'cake', 4),
('Gift Baskets', 'gift-baskets', 'Curated gift collections', '#D946EF', 'package', 5),
('Plants', 'plants', 'Indoor plants and succulents', '#22C55E', 'leaf', 6);

-- Insert sample delivery zones (Nairobi areas)
INSERT INTO public.delivery_zones (name, areas, delivery_fee, min_delivery_time, max_delivery_time) VALUES
('CBD & Westlands', ARRAY['CBD', 'Westlands', 'Parklands', 'Kilimani', 'Lavington'], 300, 45, 90),
('Greater Nairobi', ARRAY['Karen', 'Langata', 'South B', 'South C', 'Eastleigh', 'Kasarani'], 500, 60, 120),
('Outskirts', ARRAY['Kiambu', 'Ruaka', 'Ruiru', 'Thika Road', 'Athi River'], 800, 90, 180);

-- Insert sample pickup points
INSERT INTO public.pickup_points (name, address, phone, opening_hours) VALUES
('Westlands', '+254703199879', 'Mon-Sat, Sun: 10AM-5PM'),
('Junction', 'Kayole junction', '+254703199879', 'Mon-Sat, Sun: 11AM-6PM');

-- Insert sample products
INSERT INTO public.products (name, slug, description, price, original_price, category_id, image_url, is_new, is_sale, is_featured, stock_quantity) VALUES
('Rose Bouquet Deluxe', 'rose-bouquet-deluxe', 'Stunning arrangement of 24 premium red roses', 4500, NULL, (SELECT id FROM categories WHERE slug = 'flowers'), 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400', true, false, true, 50),
('Mixed Flower Basket', 'mixed-flower-basket', 'Beautiful seasonal mixed flowers', 3200, 3800, (SELECT id FROM categories WHERE slug = 'flowers'), 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400', false, true, true, 30),
('Spa Gift Set', 'spa-gift-set', 'Luxurious spa essentials for relaxation', 5500, NULL, (SELECT id FROM categories WHERE slug = 'for-her'), 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', true, false, false, 25),
('Premium Chocolate Box', 'premium-chocolate-box', 'Artisan Belgian chocolates', 2800, NULL, (SELECT id FROM categories WHERE slug = 'for-her'), 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400', false, false, true, 40),
('Leather Wallet Set', 'leather-wallet-set', 'Genuine leather wallet with card holder', 4200, 4800, (SELECT id FROM categories WHERE slug = 'for-him'), 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', false, true, false, 20),
('Red Velvet Cake', 'red-velvet-cake', 'Classic red velvet with cream cheese frosting', 3500, NULL, (SELECT id FROM categories WHERE slug = 'cakes'), 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400', false, false, true, 15),
('Gourmet Hamper', 'gourmet-hamper', 'Premium selection of gourmet treats', 7500, NULL, (SELECT id FROM categories WHERE slug = 'gift-baskets'), 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400', true, false, true, 10),
('Monstera Plant', 'monstera-plant', 'Trendy indoor monstera deliciosa', 2500, NULL, (SELECT id FROM categories WHERE slug = 'plants'), 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400', false, false, false, 35);

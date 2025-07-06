/*
  # Seed Sample Provider Data

  This migration adds sample provider data to demonstrate the system functionality.
  In production, this would be replaced with actual provider registrations.
*/

-- Insert sample providers
INSERT INTO providers (id, name, email, phone, whatsapp, address, description, food_type, experience_years, specialties, timing_lunch, timing_dinner, allow_single_tiffin, rating, review_count, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Maharani Kitchen', 'maharanikitchen@gmail.com', '+91 9876543210', '+91 9876543210', '123 Koramangala 4th Block, Bangalore', 'Authentic North Indian homemade meals prepared with love and traditional recipes passed down through generations.', 'both', 15, ARRAY['Dal Makhani', 'Butter Chicken', 'Naan', 'Biryani'], '12:00 PM - 2:00 PM', '7:00 PM - 9:00 PM', true, 4.8, 156, 'approved'),
('550e8400-e29b-41d4-a716-446655440002', 'South Spice Tiffins', 'southspice@gmail.com', '+91 9876543211', '+91 9876543211', '456 Indiranagar 1st Stage, Bangalore', 'Traditional South Indian tiffin service offering authentic Karnataka and Tamil Nadu cuisines with fresh ingredients.', 'veg', 12, ARRAY['Sambar Rice', 'Rasam', 'Curd Rice', 'Bisi Bele Bath'], '11:30 AM - 1:30 PM', '6:30 PM - 8:30 PM', true, 4.6, 203, 'approved'),
('550e8400-e29b-41d4-a716-446655440003', 'Ghar Ka Khana', 'gharkakhana@gmail.com', '+91 9876543212', '+91 9876543212', '789 HSR Layout Sector 2, Bangalore', 'Multi-cuisine homemade meals with a focus on healthy and nutritious food prepared in a clean home kitchen.', 'both', 8, ARRAY['Chicken Curry', 'Fried Rice', 'Mixed Vegetables', 'Dal Tadka'], '12:30 PM - 2:30 PM', '7:30 PM - 9:30 PM', true, 4.7, 89, 'approved'),
('550e8400-e29b-41d4-a716-446655440004', 'Moms Kitchen', 'momskitchen@gmail.com', '+91 9876543213', '+91 9876543213', '321 Whitefield Main Road, Bangalore', 'Like mother''s cooking, we prepare healthy and delicious meals with fresh ingredients and lots of love.', 'veg', 20, ARRAY['Bengali Fish Curry', 'Gujarati Thali', 'Aloo Paratha', 'Homemade Sweets'], '12:00 PM - 2:00 PM', '7:00 PM - 9:00 PM', false, 4.9, 234, 'approved'),
('550e8400-e29b-41d4-a716-446655440005', 'Punjabi Tadka', 'punjabitadka@gmail.com', '+91 9876543214', '+91 9876543214', '654 Marathahalli Bridge, Bangalore', 'Authentic Punjabi flavors with rich gravies and fresh bread, bringing the taste of Punjab to your doorstep.', 'both', 10, ARRAY['Butter Chicken', 'Chole Bhature', 'Sarson Ka Saag', 'Makki Roti'], '12:00 PM - 2:30 PM', '7:00 PM - 10:00 PM', true, 4.5, 167, 'approved'),
('550e8400-e29b-41d4-a716-446655440006', 'Coastal Delights', 'coastaldelights@gmail.com', '+91 9876543215', '+91 9876543215', '987 BTM Layout 2nd Stage, Bangalore', 'Specializing in coastal Karnataka and Kerala cuisines with fresh seafood and coconut-based curries.', 'non-veg', 18, ARRAY['Fish Curry', 'Chicken Ghee Roast', 'Prawn Curry', 'Neer Dosa'], '11:30 AM - 2:00 PM', '6:30 PM - 9:00 PM', true, 4.4, 98, 'approved');

-- Insert provider areas
INSERT INTO provider_areas (provider_id, area) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Koramangala'),
('550e8400-e29b-41d4-a716-446655440001', 'BTM Layout'),
('550e8400-e29b-41d4-a716-446655440001', 'HSR Layout'),
('550e8400-e29b-41d4-a716-446655440002', 'Indiranagar'),
('550e8400-e29b-41d4-a716-446655440002', 'Whitefield'),
('550e8400-e29b-41d4-a716-446655440003', 'HSR Layout'),
('550e8400-e29b-41d4-a716-446655440003', 'Koramangala'),
('550e8400-e29b-41d4-a716-446655440004', 'Whitefield'),
('550e8400-e29b-41d4-a716-446655440004', 'Marathahalli'),
('550e8400-e29b-41d4-a716-446655440005', 'Marathahalli'),
('550e8400-e29b-41d4-a716-446655440005', 'Whitefield'),
('550e8400-e29b-41d4-a716-446655440006', 'BTM Layout'),
('550e8400-e29b-41d4-a716-446655440006', 'Jayanagar');

-- Insert provider cuisines
INSERT INTO provider_cuisines (provider_id, cuisine) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'North Indian'),
('550e8400-e29b-41d4-a716-446655440001', 'Punjabi'),
('550e8400-e29b-41d4-a716-446655440002', 'South Indian'),
('550e8400-e29b-41d4-a716-446655440002', 'Tamil'),
('550e8400-e29b-41d4-a716-446655440002', 'Karnataka'),
('550e8400-e29b-41d4-a716-446655440003', 'North Indian'),
('550e8400-e29b-41d4-a716-446655440003', 'Chinese'),
('550e8400-e29b-41d4-a716-446655440003', 'Continental'),
('550e8400-e29b-41d4-a716-446655440004', 'North Indian'),
('550e8400-e29b-41d4-a716-446655440004', 'Bengali'),
('550e8400-e29b-41d4-a716-446655440004', 'Gujarati'),
('550e8400-e29b-41d4-a716-446655440005', 'Punjabi'),
('550e8400-e29b-41d4-a716-446655440005', 'North Indian'),
('550e8400-e29b-41d4-a716-446655440006', 'Coastal'),
('550e8400-e29b-41d4-a716-446655440006', 'Kerala'),
('550e8400-e29b-41d4-a716-446655440006', 'Mangalorean');

-- Insert provider delivery types
INSERT INTO provider_delivery_types (provider_id, delivery_type) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Both Delivery & Pickup'),
('550e8400-e29b-41d4-a716-446655440002', 'Delivery at Doorstep'),
('550e8400-e29b-41d4-a716-446655440003', 'Both Delivery & Pickup'),
('550e8400-e29b-41d4-a716-446655440004', 'Pickup Only'),
('550e8400-e29b-41d4-a716-446655440005', 'Delivery at Doorstep'),
('550e8400-e29b-41d4-a716-446655440006', 'Both Delivery & Pickup');

-- Insert tiffin items
INSERT INTO tiffin_items (id, provider_id, name, price, description, sort_order) VALUES
-- Maharani Kitchen
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Dal Makhani Special', 150.00, 'Rich and creamy dal makhani with aromatic spices', 1),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Rajma Chawal Combo', 130.00, 'Traditional kidney bean curry with rice', 2),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Paneer Butter Masala', 180.00, 'Rich paneer curry with Indian bread', 3),
-- South Spice Tiffins
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Sambar Rice Special', 120.00, 'Traditional South Indian sambar rice meal', 1),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Curd Rice Combo', 100.00, 'Cooling curd rice with South Indian sides', 2),
('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'Bisi Bele Bath', 140.00, 'Karnataka special mixed rice with vegetables', 3),
-- Ghar Ka Khana
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 'Chicken Curry Meal', 200.00, 'Homestyle chicken curry with Indian bread', 1),
('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'Veg Thali', 160.00, 'Complete vegetarian meal with variety', 2),
('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440003', 'Fried Rice Combo', 180.00, 'Indo-Chinese style fried rice meal', 3),
-- Moms Kitchen
('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440004', 'Bengali Fish Curry', 170.00, 'Traditional Bengali fish curry with rice', 1),
('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440004', 'Gujarati Thali', 150.00, 'Complete Gujarati meal with variety', 2),
('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440004', 'Aloo Paratha Combo', 130.00, 'Stuffed parathas with traditional sides', 3),
-- Punjabi Tadka
('660e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440005', 'Butter Chicken Meal', 220.00, 'Rich and creamy butter chicken with bread', 1),
('660e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440005', 'Chole Bhature', 160.00, 'Spicy chickpeas with fried bread', 2),
('660e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440005', 'Sarson Ka Saag', 180.00, 'Traditional mustard greens with corn bread', 3),
-- Coastal Delights
('660e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440006', 'Fish Curry Rice', 180.00, 'Coconut-based fish curry with steamed rice', 1),
('660e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440006', 'Chicken Ghee Roast', 200.00, 'Mangalorean style chicken with neer dosa', 2),
('660e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440006', 'Prawn Curry Combo', 220.00, 'Spicy prawn curry with rice and sides', 3);

-- Insert tiffin item contents
INSERT INTO tiffin_item_contents (tiffin_item_id, content_item, sort_order) VALUES
-- Dal Makhani Special
('660e8400-e29b-41d4-a716-446655440001', 'Dal Makhani', 1),
('660e8400-e29b-41d4-a716-446655440001', 'Basmati Rice', 2),
('660e8400-e29b-41d4-a716-446655440001', '2 Vegetable Curry', 3),
('660e8400-e29b-41d4-a716-446655440001', '4 Roti', 4),
('660e8400-e29b-41d4-a716-446655440001', 'Pickle', 5),
('660e8400-e29b-41d4-a716-446655440001', 'Salad', 6),
-- Rajma Chawal Combo
('660e8400-e29b-41d4-a716-446655440002', 'Rajma Curry', 1),
('660e8400-e29b-41d4-a716-446655440002', 'Basmati Rice', 2),
('660e8400-e29b-41d4-a716-446655440002', '1 Dry Vegetable', 3),
('660e8400-e29b-41d4-a716-446655440002', '3 Roti', 4),
('660e8400-e29b-41d4-a716-446655440002', 'Pickle', 5),
('660e8400-e29b-41d4-a716-446655440002', 'Papad', 6),
-- Paneer Butter Masala
('660e8400-e29b-41d4-a716-446655440003', 'Paneer Butter Masala', 1),
('660e8400-e29b-41d4-a716-446655440003', 'Jeera Rice', 2),
('660e8400-e29b-41d4-a716-446655440003', '1 Dal', 3),
('660e8400-e29b-41d4-a716-446655440003', '4 Roti', 4),
('660e8400-e29b-41d4-a716-446655440003', 'Raita', 5),
('660e8400-e29b-41d4-a716-446655440003', 'Sweet', 6),
-- Sambar Rice Special
('660e8400-e29b-41d4-a716-446655440004', 'Sambar Rice', 1),
('660e8400-e29b-41d4-a716-446655440004', 'Rasam', 2),
('660e8400-e29b-41d4-a716-446655440004', '2 Vegetable Curry', 3),
('660e8400-e29b-41d4-a716-446655440004', 'Pickle', 4),
('660e8400-e29b-41d4-a716-446655440004', 'Papad', 5),
('660e8400-e29b-41d4-a716-446655440004', 'Curd', 6),
-- Curd Rice Combo
('660e8400-e29b-41d4-a716-446655440005', 'Curd Rice', 1),
('660e8400-e29b-41d4-a716-446655440005', '1 Vegetable Curry', 2),
('660e8400-e29b-41d4-a716-446655440005', 'Pickle', 3),
('660e8400-e29b-41d4-a716-446655440005', 'Papad', 4),
('660e8400-e29b-41d4-a716-446655440005', 'Banana', 5),
-- Continue for other items...
('660e8400-e29b-41d4-a716-446655440006', 'Bisi Bele Bath', 1),
('660e8400-e29b-41d4-a716-446655440006', 'Raita', 2),
('660e8400-e29b-41d4-a716-446655440006', 'Pickle', 3),
('660e8400-e29b-41d4-a716-446655440006', 'Papad', 4),
('660e8400-e29b-41d4-a716-446655440006', 'Sweet', 5),
('660e8400-e29b-41d4-a716-446655440006', 'Ghee', 6);

-- Insert pricing plans
INSERT INTO pricing_plans (provider_id, plan_type, meals_per_day, price, original_price, discount_percentage, description, sort_order) VALUES
-- Maharani Kitchen
('550e8400-e29b-41d4-a716-446655440001', 'weekly', 1, 850.00, 1050.00, 19, '7 days lunch (1 meal/day)', 1),
('550e8400-e29b-41d4-a716-446655440001', 'weekly', 2, 1600.00, 2100.00, 24, '7 days lunch & dinner (2 meals/day)', 2),
('550e8400-e29b-41d4-a716-446655440001', 'monthly', 1, 3200.00, 4500.00, 29, '30 days lunch (1 meal/day)', 3),
('550e8400-e29b-41d4-a716-446655440001', 'monthly', 2, 6000.00, 9000.00, 33, '30 days lunch & dinner (2 meals/day)', 4),
-- South Spice Tiffins
('550e8400-e29b-41d4-a716-446655440002', 'weekly', 1, 750.00, 840.00, 11, '7 days lunch (1 meal/day)', 1),
('550e8400-e29b-41d4-a716-446655440002', 'monthly', 1, 2800.00, 3600.00, 22, '30 days lunch (1 meal/day)', 2),
-- Ghar Ka Khana
('550e8400-e29b-41d4-a716-446655440003', 'weekly', 1, 1100.00, 1400.00, 21, '7 days lunch (1 meal/day)', 1),
('550e8400-e29b-41d4-a716-446655440003', 'monthly', 1, 4000.00, 6000.00, 33, '30 days lunch (1 meal/day)', 2),
-- Moms Kitchen
('550e8400-e29b-41d4-a716-446655440004', 'weekly', 1, 850.00, 1190.00, 29, '7 days lunch (1 meal/day)', 1),
('550e8400-e29b-41d4-a716-446655440004', 'monthly', 1, 3100.00, 5100.00, 39, '30 days lunch (1 meal/day)', 2),
-- Punjabi Tadka
('550e8400-e29b-41d4-a716-446655440005', 'weekly', 1, 1200.00, 1540.00, 22, '7 days lunch (1 meal/day)', 1),
('550e8400-e29b-41d4-a716-446655440005', 'monthly', 1, 4500.00, 6600.00, 32, '30 days lunch (1 meal/day)', 2),
-- Coastal Delights
('550e8400-e29b-41d4-a716-446655440006', 'weekly', 1, 1000.00, 1260.00, 21, '7 days lunch (1 meal/day)', 1),
('550e8400-e29b-41d4-a716-446655440006', 'monthly', 1, 3800.00, 5400.00, 30, '30 days lunch (1 meal/day)', 2);

-- Insert testimonials
INSERT INTO provider_testimonials (provider_id, customer_name, rating, comment, is_verified) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Amit Sharma', 5, 'Excellent food quality and timely delivery. The dal makhani is absolutely delicious!', true),
('550e8400-e29b-41d4-a716-446655440001', 'Priya Patel', 4, 'Good home-style cooking. The variety in weekly menu is great.', true),
('550e8400-e29b-41d4-a716-446655440001', 'Rohit Kumar', 5, 'Best tiffin service in the area. Feels like mom''s cooking!', true),
('550e8400-e29b-41d4-a716-446655440002', 'Lakshmi Iyer', 5, 'Authentic South Indian taste! Reminds me of home.', true),
('550e8400-e29b-41d4-a716-446655440002', 'Suresh Kumar', 4, 'Great variety and consistent quality.', true),
('550e8400-e29b-41d4-a716-446655440003', 'Rajesh Gupta', 5, 'Amazing variety and taste. Love the Chinese dishes!', true),
('550e8400-e29b-41d4-a716-446655440003', 'Neha Singh', 4, 'Healthy and delicious food. Great for working professionals.', true),
('550e8400-e29b-41d4-a716-446655440004', 'Anita Das', 5, 'Tastes exactly like my mother''s cooking!', true),
('550e8400-e29b-41d4-a716-446655440004', 'Vikram Joshi', 5, 'Best Bengali food in Whitefield. Highly recommended!', true),
('550e8400-e29b-41d4-a716-446655440005', 'Harpreet Singh', 5, 'Authentic Punjabi taste! Best butter chicken in town.', true),
('550e8400-e29b-41d4-a716-446655440005', 'Simran Kaur', 4, 'Rich flavors and generous portions. Love it!', true),
('550e8400-e29b-41d4-a716-446655440006', 'Ramesh Shetty', 5, 'Authentic coastal flavors! Best fish curry in Bangalore.', true),
('550e8400-e29b-41d4-a716-446655440006', 'Deepa Nair', 4, 'Fresh seafood and great taste. Highly recommended!', true);

-- Insert gallery images
INSERT INTO provider_gallery (provider_id, image_url, alt_text, is_primary, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Maharani Kitchen main dish', true, 1),
('550e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', 'North Indian cuisine', false, 2),
('550e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', 'Dal makhani special', false, 3),
('550e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', 'Traditional thali', false, 4),
('550e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', 'South Indian tiffin', true, 1),
('550e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Sambar rice', false, 2),
('550e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg', 'South Indian meal', false, 3),
('550e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', 'Multi-cuisine meal', true, 1),
('550e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', 'Chicken curry', false, 2),
('550e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', 'Veg thali', false, 3),
('550e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', 'Bengali cuisine', true, 1),
('550e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Gujarati thali', false, 2),
('550e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', 'Homemade meal', false, 3),
('550e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', 'Punjabi cuisine', true, 1),
('550e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Butter chicken', false, 2),
('550e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', 'Chole bhature', false, 3),
('550e8400-e29b-41d4-a716-446655440006', 'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg', 'Coastal cuisine', true, 1),
('550e8400-e29b-41d4-a716-446655440006', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', 'Fish curry', false, 2),
('550e8400-e29b-41d4-a716-446655440006', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Seafood special', false, 3);

-- Insert delivery slots
INSERT INTO delivery_slots (provider_id, slot_time, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440001', '11:30 AM - 12:30 PM', 1),
('550e8400-e29b-41d4-a716-446655440001', '12:30 PM - 1:30 PM', 2),
('550e8400-e29b-41d4-a716-446655440001', '6:30 PM - 7:30 PM', 3),
('550e8400-e29b-41d4-a716-446655440001', '7:30 PM - 8:30 PM', 4),
('550e8400-e29b-41d4-a716-446655440002', '11:00 AM - 12:00 PM', 1),
('550e8400-e29b-41d4-a716-446655440002', '12:00 PM - 1:00 PM', 2),
('550e8400-e29b-41d4-a716-446655440002', '6:00 PM - 7:00 PM', 3),
('550e8400-e29b-41d4-a716-446655440002', '7:00 PM - 8:00 PM', 4),
('550e8400-e29b-41d4-a716-446655440003', '12:00 PM - 1:00 PM', 1),
('550e8400-e29b-41d4-a716-446655440003', '1:00 PM - 2:00 PM', 2),
('550e8400-e29b-41d4-a716-446655440003', '7:00 PM - 8:00 PM', 3),
('550e8400-e29b-41d4-a716-446655440003', '8:00 PM - 9:00 PM', 4),
('550e8400-e29b-41d4-a716-446655440004', '11:30 AM - 12:30 PM', 1),
('550e8400-e29b-41d4-a716-446655440004', '1:00 PM - 2:00 PM', 2),
('550e8400-e29b-41d4-a716-446655440004', '6:30 PM - 7:30 PM', 3),
('550e8400-e29b-41d4-a716-446655440004', '8:00 PM - 9:00 PM', 4),
('550e8400-e29b-41d4-a716-446655440005', '11:30 AM - 12:30 PM', 1),
('550e8400-e29b-41d4-a716-446655440005', '1:30 PM - 2:30 PM', 2),
('550e8400-e29b-41d4-a716-446655440005', '6:30 PM - 7:30 PM', 3),
('550e8400-e29b-41d4-a716-446655440005', '8:30 PM - 9:30 PM', 4),
('550e8400-e29b-41d4-a716-446655440006', '11:00 AM - 12:00 PM', 1),
('550e8400-e29b-41d4-a716-446655440006', '12:30 PM - 1:30 PM', 2),
('550e8400-e29b-41d4-a716-446655440006', '6:00 PM - 7:00 PM', 3),
('550e8400-e29b-41d4-a716-446655440006', '8:00 PM - 9:00 PM', 4);
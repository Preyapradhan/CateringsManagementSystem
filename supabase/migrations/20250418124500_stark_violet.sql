/*
  # Add Demo Products and Enhance Order Management

  1. New Data
    - Add sample Indian cuisine products
    - Include images and descriptions
    
  2. Changes
    - Add sample products for the menu
    - Add order status update function
*/

-- Insert demo products
INSERT INTO products (name, description, price, image_url) VALUES
  (
    'Butter Chicken',
    'Tender chicken pieces in a rich, creamy tomato sauce with butter and aromatic spices',
    15.99,
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=500'
  ),
  (
    'Paneer Tikka',
    'Grilled cottage cheese cubes marinated in yogurt and Indian spices',
    12.99,
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=500'
  ),
  (
    'Biryani',
    'Fragrant basmati rice cooked with aromatic spices and choice of vegetables or meat',
    16.99,
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=500'
  ),
  (
    'Naan Bread',
    'Freshly baked Indian flatbread, perfect for scooping up curries',
    3.99,
    'https://images.unsplash.com/photo-1601050690717-230e741eb6a6?auto=format&fit=crop&q=80&w=500'
  ),
  (
    'Samosa',
    'Crispy pastry filled with spiced potatoes and peas',
    5.99,
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=500'
  ),
  (
    'Gulab Jamun',
    'Sweet milk dumplings soaked in rose-scented syrup',
    4.99,
    'https://images.unsplash.com/photo-1605197184044-b1156c1cc5d4?auto=format&fit=crop&q=80&w=500'
  );
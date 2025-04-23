export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'customer';
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}
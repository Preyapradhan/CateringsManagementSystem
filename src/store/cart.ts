import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/database';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  loadCart: () => Promise<void>;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      loadCart: async () => {
        // This ensures cart is loaded after authentication
        const stored = localStorage.getItem('cart-storage');
        if (stored) {
          const { state } = JSON.parse(stored);
          set({ items: state.items || [] });
        }
      },
      total: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
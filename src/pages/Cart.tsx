import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/auth';
import { Trash2, Plus, Minus, Printer } from 'lucide-react';

interface DeliveryInfo {
  address: string;
  contact: string;
  instructions: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    address: '',
    contact: '',
    instructions: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      // Calculate estimated delivery time (2 hours from now)
      const estimatedDelivery = new Date();
      estimatedDelivery.setHours(estimatedDelivery.getHours() + 2);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            total_amount: total(),
            status: 'pending',
            delivery_address: deliveryInfo.address,
            delivery_contact: deliveryInfo.contact,
            delivery_instructions: deliveryInfo.instructions,
            estimated_delivery_time: estimatedDelivery.toISOString(),
            delivery_status: 'pending'
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setShowInvoice(true);
    } catch (err) {
      setError('Failed to place order');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const completeOrder = () => {
    clearCart();
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  if (showInvoice) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold">Order Confirmation</h1>
            <p className="text-gray-600">Thank you for your order!</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Printer size={20} />
            Print Invoice
          </button>
        </div>

        <div className="mb-8">
          <h2 className="font-semibold mb-2">Delivery Information</h2>
          <p className="text-gray-700">{deliveryInfo.address}</p>
          <p className="text-gray-700">{deliveryInfo.contact}</p>
          {deliveryInfo.instructions && (
            <p className="text-gray-700">Note: {deliveryInfo.instructions}</p>
          )}
        </div>

        <div className="border-t border-gray-200 py-4 mb-4">
          <h2 className="font-semibold mb-4">Order Items</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 mb-8">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>${total().toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={completeOrder}
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Track Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="ml-4 text-lg font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <div className="mt-6 text-right">
              <div className="text-xl font-bold">
                Total: ₹{total().toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
            <form onSubmit={handleCheckout}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <textarea
                    required
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={deliveryInfo.contact}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, contact: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    value={deliveryInfo.instructions}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={2}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
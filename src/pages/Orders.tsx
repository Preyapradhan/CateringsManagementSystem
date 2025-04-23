import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/auth';
import { Database } from '../types/database';
import { Clock, MapPin, Phone, FileText } from 'lucide-react';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'] & {
  product: Database['public']['Tables']['products']['Row'];
};

type OrderWithItems = Order & {
  items: OrderItem[];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'confirmed':
    case 'preparing':
      return 'bg-blue-100 text-blue-800';
    case 'out_for_delivery':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

const getDeliveryTime = (estimatedTime: string) => {
  const now = new Date();
  const estimated = new Date(estimatedTime);
  const diff = estimated.getTime() - now.getTime();
  const minutes = Math.round(diff / 60000);

  if (minutes <= 0) return 'Arriving soon';
  if (minutes < 60) return `${minutes} minutes`;
  return `${Math.round(minutes / 60)} hours`;
};

export default function Orders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        const ordersWithItems: OrderWithItems[] = [];

        for (const order of ordersData) {
          const { data: itemsData, error: itemsError } = await supabase
            .from('order_items')
            .select(`
              *,
              product:products(*)
            `)
            .eq('order_id', order.id);

          if (itemsError) throw itemsError;

          ordersWithItems.push({
            ...order,
            items: itemsData as OrderItem[]
          });
        }

        setOrders(ordersWithItems);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handlePrint = (orderId: string) => {
    setSelectedOrder(orderId);
    setTimeout(() => {
      window.print();
      setSelectedOrder(null);
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">No orders found</h2>
        <p className="mt-2 text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
      
      {orders.map((order) => (
        <div key={order.id} className={`bg-white rounded-lg shadow-md overflow-hidden
          ${selectedOrder === order.id ? 'print:shadow-none' : ''}`}>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(order.created_at!).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className={`
                  inline-block px-3 py-1 rounded-full text-sm font-semibold
                  ${getStatusColor(order.status)}
                `}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {order.delivery_status !== 'delivered' && order.estimated_delivery_time && (
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Clock size={20} />
                <span>Estimated delivery in: {getDeliveryTime(order.estimated_delivery_time)}</span>
              </div>
            )}

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <MapPin size={20} className="text-gray-500 mt-1" />
                <p className="text-gray-600">{order.delivery_address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-gray-500" />
                <p className="text-gray-600">{order.delivery_contact}</p>
              </div>
              {order.delivery_instructions && (
                <p className="text-gray-600 italic">
                  Note: {order.delivery_instructions}
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image_url || 'https://via.placeholder.com/80'}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-gray-600">
                          Quantity: {item.quantity} × ${item.unit_price}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.quantity * Number(item.unit_price)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <div className="text-lg font-bold">
                  Total: ${order.total_amount}
                </div>
                <button
                  onClick={() => handlePrint(order.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <FileText size={20} />
                  Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
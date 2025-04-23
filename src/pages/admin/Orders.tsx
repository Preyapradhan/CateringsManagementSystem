import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  products: {
    name: string;
  };
}

interface Order {
  id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_amount: number;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  };
  order_items: OrderItem[];
}

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          ),
          order_items (
            id,
            quantity,
            unit_price,
            products (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        className="text-gray-500 hover:text-gray-700 mr-2"
                      >
                        {expandedOrder === order.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      <div className="text-sm text-gray-900">#{order.id.slice(0, 8)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order.profiles?.full_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.profiles?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className={`px-2 py-1 rounded-full text-sm font-semibold
                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ${order.total_amount}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Order Items</h4>
                        <div className="space-y-2">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <div>
                                {item.quantity}x {item.products.name}
                              </div>
                              <div className="text-gray-600">
                                ${(item.quantity * Number(item.unit_price)).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
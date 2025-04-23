import React from 'react';
import { ShoppingBag, Package, Users, TrendingUp, Clock, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your catering services with elegance and efficiency</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-amber-100 p-3 rounded-xl">
                <TrendingUp className="h-8 w-8 text-amber-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">₹45,289</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Today's Revenue</h3>
            <p className="text-gray-500 mt-1">+18% from yesterday</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-green-100 p-3 rounded-xl">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">24</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Pending Orders</h3>
            <p className="text-gray-500 mt-1">4 require immediate attention</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">1,289</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Total Customers</h3>
            <p className="text-gray-500 mt-1">+12 new today</p>
          </div>

          {/* Main Actions */}
          <Link 
            to="/admin/products" 
            className="group bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all hover:border-amber-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-amber-50 p-4 rounded-xl group-hover:bg-amber-100 transition-colors">
                <Package className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-amber-700">Menu Management</h2>
                <p className="text-gray-600 mt-1">Update your product catalog</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/orders" 
            className="group bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all hover:border-green-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 p-4 rounded-xl group-hover:bg-green-100 transition-colors">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-700">Order Processing</h2>
                <p className="text-gray-600 mt-1">Manage customer orders</p>
              </div>
            </div>
          </Link>

          <div className="group bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all hover:border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-50 p-4 rounded-xl group-hover:bg-purple-100 transition-colors">
                <ChefHat className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700">Kitchen Operations</h2>
                <p className="text-gray-600 mt-1">Monitor food preparation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { time: '2 minutes ago', text: 'New order #1234 received from John Doe' },
              { time: '15 minutes ago', text: 'Order #1233 marked as delivered' },
              { time: '1 hour ago', text: 'New menu item "Paneer Tikka" added' },
              { time: '2 hours ago', text: 'Customer feedback received for order #1232' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-600">{activity.text}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
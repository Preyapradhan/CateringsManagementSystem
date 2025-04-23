import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { ShoppingCart, Package, User, LogOut, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Indian Flavour
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <Package size={20} />
              <span>Products</span>
            </Link>

            {user ? (
              <>
                <Link to="/cart" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                </Link>
                
                <Link to="/orders" className="text-gray-600 hover:text-gray-900">Orders</Link>
                
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    <LayoutDashboard size={20} />
                    <span>Admin</span>
                  </Link>
                )}

                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Pencil, Trash2, LogOut } from 'lucide-react';
import HomeEditor from '../components/admin/HomeEditor';
import LoginForm from '../components/admin/LoginForm';

export default function Admin() {
  const { isAuthenticated, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useShop();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'home'>('products');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    stock: 0,
  });

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct);
    setNewProduct({ name: '', price: 0, description: '', image: '', stock: 0 });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Products
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'home'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Edit Home Page
            </button>
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {activeTab === 'products' ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product form fields remain the same */}
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Manage Products</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  {/* Product list items remain the same */}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <HomeEditor />
      )}
    </div>
  );
}
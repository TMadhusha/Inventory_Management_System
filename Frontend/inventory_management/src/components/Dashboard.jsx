import React, { useState } from 'react'; // 👈 Added useState
import CategoryList from './CategoryList'; 
import ProductManager from './ProductManager';
import ProductList from './ProductList';       
import { ChevronLeft } from 'lucide-react';

export default function Dashboard({ 
  products = [], 
  categories = [], 
  setCategories,
  isModalOpen,
  setIsModalOpen,
  editingProduct,
  setEditingProduct,
  handleAddOrEditProduct,
  handleDeleteProduct,
  handleAdjustStock,
  onNavigate
}) {
  
  // 1. Local view controller state ('products' or 'categories')
  const [activeTab, setActiveTab] = useState('products');

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);

  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-400 to-indigo-300 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('welcome')}
              className='p-1 rounded-md bg-white hover:bg-gray-100 transition-colors duration-200 text-purple-700 mr-2 md:mr-3'
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Inventory Management System Dashboard</h1>
          </div>
          <button
            onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium shadow transition-colors"
          >
            + Add New Product
          </button>
        </header>

        {/* 2. Interactive Navigation Tabs Strip */}
        <div className="flex items-center justify-center space-x-4 mb-6 bg-white bg-opacity-40 backdrop-blur-sm py-2 px-4 rounded-lg w-max mx-auto shadow-sm">
          <button 
            onClick={() => setActiveTab('products')}
            className={`text-sm font-bold tracking-wide uppercase transition-colors px-3 py-1 rounded-md ${
              activeTab === 'products' ? 'bg-purple-700 text-white' : 'text-gray-800 hover:text-purple-900'
            }`}
          >
            Products
          </button>
          <span className="text-gray-600 font-light">|</span>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`text-sm font-bold tracking-wide uppercase transition-colors px-3 py-1 rounded-md ${
              activeTab === 'categories' ? 'bg-purple-700 text-white' : 'text-gray-800 hover:text-purple-900'
            }`}
          >
            Categories
          </button>
        </div>

        {/* Overview Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
            <span className="text-gray-500 font-medium uppercase tracking-wider text-sm">Total Unique Products</span>
            <span className="text-3xl font-bold text-gray-800 mt-2">{totalProducts}</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
            <span className="text-gray-500 font-medium uppercase tracking-wider text-sm">Total Inventory Value</span>
            <span className="text-3xl font-bold text-gray-800 mt-2">${totalValue.toFixed(2)}</span>
          </div>
        </div>

        {/* Stock Breakdown Breakdown Row */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Stock Breakdown per Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <div key={cat} className="bg-gray-50 p-3 rounded-md border text-center">
                <div className="text-sm font-medium text-gray-600 truncate">{cat}</div>
                <div className="text-xl font-bold text-gray-800 mt-1">{categoryCounts[cat] || 0} items</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Conditional rendering grid block based on active tab select status */}
        <div className="w-full">
          {activeTab === 'categories' ? (
            <div className="max-w-md mx-auto">
              <CategoryList
                categories={categories} 
                onAddCategory={(newCat) => setCategories([...categories, newCat])} 
              />
            </div>
          ) : (
            <ProductList
              products={products} 
              categories={categories}
              onEdit={(prod) => { setEditingProduct(prod); setIsModalOpen(true); }}
              onDelete={handleDeleteProduct}
              onAdjustStock={handleAdjustStock}
            />
          )}
        </div>

        <ProductManager
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
          onSubmit={handleAddOrEditProduct}
          initialValues={editingProduct}
          categories={categories}
        />
      </div>
    </div>
  );
}
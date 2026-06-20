import React, { useState } from 'react';
import ProductManager from './ProductManager';
import { Edit2, Trash2 } from 'lucide-react';

export default function ProductList({ 
  products = [], 
  categories = [], 
  onEdit, 
  onDelete, 
  onAdjustStock,
  isModalOpen,
  setIsModalOpen,
  editingProduct,
  setEditingProduct,
  handleAddOrEditProduct
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('');

  // Filtering System
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesStatus = stockStatus === '' || (stockStatus === 'in' ? product.quantity > 0 : product.quantity === 0);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 overflow-hidden transition-colors duration-200">
      
      {/* Header Layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Product List</h2>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white px-5 py-2.5 rounded-lg font-medium shadow transition-colors text-sm"
        >
          + Add New Product
        </button>
      </div>

      {/* Search and Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 text-sm shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 text-sm shadow-sm outline-none transition-colors"
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select 
          value={stockStatus} 
          onChange={(e) => setStockStatus(e.target.value)} 
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 text-sm shadow-sm outline-none transition-colors"
        >
          <option value="">All Stock Statuses</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Product</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">SKU</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Category</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Price</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center">Stock Quantity Status</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400 dark:text-gray-500">
                  No products match criteria.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.sku} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{product.name}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{product.sku}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{product.category}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">${Number(product.price).toFixed(2)}</td>
                  
                  {/* Stock Adjusting Status Column */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => onAdjustStock(product.sku, -1)} 
                        className="px-2 py-0.5 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 rounded text-xs font-bold"
                      >
                        -
                      </button>
                      <span className={`w-12 inline-block font-semibold ${
                        product.quantity === 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        {product.quantity}
                      </span>
                      <button 
                        onClick={() => onAdjustStock(product.sku, 1)} 
                        className="px-2 py-0.5 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40 rounded text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                    {product.quantity === 0 && (
                      <span className="text-[10px] text-red-500 dark:text-red-400 font-bold uppercase block mt-1">Out of Stock</span>
                    )}
                  </td>
                  
                  {/* Actions Row Controls */}
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <button 
                      onClick={() => onEdit(product)} 
                      className="hover:text-purple-900 dark:hover:text-purple-300 font-medium text-xs bg-purple-100 dark:bg-purple-950/60 p-1.5 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/60 rounded-full transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(product.sku)} 
                      className=" text-xs bg-red-100 dark:bg-red-950/60 p-1.5 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-full transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Product Management Form Modal */}
      <ProductManager
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
        onSubmit={handleAddOrEditProduct}
        initialValues={editingProduct}
        categories={categories}
      />
    </div>
  );
}
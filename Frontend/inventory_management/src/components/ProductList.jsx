import React, { useState } from 'react'

export default function ProductList({ products = [], categories =[], onEdit, onDelete, onAdjustStock }) {
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
    <div className="bg-white rounded-lg shadow p-4 overflow-hidden">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm shadow-sm"
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm shadow-sm">
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={stockStatus} onChange={(e) => setStockStatus(e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm shadow-sm">
          <option value="">All Stock Statuses</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Responsive View Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">Product</th>
              <th className="px-4 py-3 font-semibold text-gray-700">SKU</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 font-semibold text-gray-700 text-center">Stock Quantity Status</th>
              <th className="px-4 py-3 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8 text-gray-400">No products match criteria.</td></tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.sku} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-gray-500">{product.sku}</td>
                  <td className="px-4 py-3 text-gray-500">{product.category}</td>
                  <td className="px-4 py-3 text-gray-900">${Number(product.price).toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button onClick={() => onAdjustStock(product.sku, -1)} className="px-2 py-0.5 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-bold">-</button>
                      <span className={`w-12 inline-block font-semibold ${product.quantity === 0 ? 'text-red-600' : 'text-gray-800'}`}>
                        {product.quantity}
                      </span>
                      <button onClick={() => onAdjustStock(product.sku, 1)} className="px-2 py-0.5 bg-green-100 hover:bg-green-200 text-green-700 rounded text-xs font-bold">+</button>
                    </div>
                    {product.quantity === 0 && <span className="text-[10px] text-red-500 font-bold uppercase block mt-1">Out of Stock</span>}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => onEdit(product)} className="text-purple-600 hover:text-purple-900 font-medium">Edit</button>
                    <button onClick={() => onDelete(product.sku)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

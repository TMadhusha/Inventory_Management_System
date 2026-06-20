import React, { useState } from 'react';
import CategoryManager from './CategoryManager';
import { Trash2 } from 'lucide-react'; 

export default function CategoryList({ categories = [], onAddCategory, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-2xl mx-auto transition-colors duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Inventory Categories</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow transition-colors text-sm"
        >
          + Add New 
        </button>
      </div>

      {/* Grid Display of Categories */}
      {categories.length === 0 ? (
        <p className="text-center py-6 text-gray-400 dark:text-gray-500 text-sm">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div 
              key={cat} 
              className="bg-gray-50 dark:bg-gray-700/40 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between shadow-sm hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">{cat}</span>
              
              <button 
                onClick={() => onDelete(cat)} 
                className="text-xs bg-red-100 dark:bg-red-950/60 p-1.5 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-full font-medium transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Category Manager Modal Dialog */}
      <CategoryManager
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddCategory}
        categories={categories}
      />
    </div>
  );
}
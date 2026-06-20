import React, { useState } from 'react';
import CategoryManager from './CategoryManager';
import { Delete, Trash2 } from 'lucide-react';

export default function CategoryList({ categories = [], onAddCategory, onDelete, }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Inventory Categories</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-colors text-sm"
        >
          + Add New 
        </button>
      </div>

      {/* Grid Display of Categories */}
      {categories.length === 0 ? (
        <p className="text-center py-6 text-gray-400 text-sm">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div 
              key={cat} 
              className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm hover:border-purple-300 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-700 truncate">{cat}</span>
              <button onClick={() => onDelete(cat)} className="text-xs bg-purple-100  px-2 py-0.5 rounded-full font-medium">
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
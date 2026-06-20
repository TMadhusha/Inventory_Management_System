import React, { useState, useEffect } from 'react';

export default function CategoryManager({ isOpen, onClose, onSubmit, categories = [] }) {
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  // Reset internal states whenever the overlay modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setNewCategory('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCategory = newCategory.trim();

    //Validations
    if (!trimmedCategory) {
      setError('Category name cannot be empty.');
      return;
    }

    if (categories.some(cat => cat.toLowerCase() === trimmedCategory.toLowerCase())) {
      setError('This category already exists!');
      return;
    }

    // Submit the new category to the parent component
    if (typeof onSubmit === 'function') {
      onSubmit(trimmedCategory);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/0 backdrop-blur-lg flex items-center justify-center bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-fade-in">
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex justify-between items-center text-gray-800 ">
          <h3 className="text-lg font-bold">Create New Category</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-purple-200 text-xl font-bold transition-colors focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Electronics, Apparel, Home"
              className={`w-full border rounded-lg p-2.5 text-sm shadow-sm outline-none transition-all ${
                error 
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-1 focus:ring-purple-500 focus:border-purple-500'
              }`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs font-medium mt-1.5">{error}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow transition-colors"
            >
              Save Category
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
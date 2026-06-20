import React, { useState } from 'react'

export default function CategoryList({ categories = [], onAddCategory }) {
    const [newCategory, setNewCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const trimmedCategory = newCategory.trim();

        // 1. Validation check: Prevent empty submissions or duplicate categories
        if (trimmedCategory && !categories.includes(trimmedCategory)) {
            // 2. Safeguard: Check if the parent actually passed the prop function before calling it
            if (typeof onAddCategory === 'function') {
                onAddCategory(trimmedCategory);
            } else {
                console.error("onAddCategory prop was not passed down correctly to CategoryList!");
            }
            // 3. Reset the input field
            setNewCategory('');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Create Custom Category</h3>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g., Electronics, Apparel"
                    className="flex-1 border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 text-sm"
                />
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Add
                </button>
            </form>
        </div>
    );
}
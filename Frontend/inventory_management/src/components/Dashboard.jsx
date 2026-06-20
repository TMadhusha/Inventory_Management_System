import React, { useEffect, useState } from 'react';
import CategoryList from './CategoryList'; 
import ProductList from './ProductList';       
import { ChevronLeft, Moon, Sun } from 'lucide-react';

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
  handleDeleteCategory,
  onNavigate = () => {} 
}) {
  
  const [activeTab, setActiveTab] = useState('products');

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);

  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat).length;
    return acc;
  }, {});

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-400 to-indigo-300 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('welcome')}
                className='p-1 rounded-md bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors duration-200 mr-2 md:mr-3 shadow-sm'
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                Inventory Management System Dashboard
              </h1>
            </div>
            
            {/* Dark/Light mode toggle button*/}
            <button 
              onClick={toggleDarkMode}
              className="p-2 ml-4 bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 shadow-sm transition-colors duration-200"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Navigation Tabs Container */}
        <div className="flex items-center justify-center space-x-4 mb-6 bg-white bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-40 backdrop-blur-sm py-2 px-4 rounded-lg w-max mx-auto shadow-sm transition-colors">
          <button 
            onClick={() => setActiveTab('products')}
            className={`text-sm font-bold tracking-wide uppercase transition-colors px-3 py-1 rounded-md ${
              activeTab === 'products' ? 'bg-purple-700 text-white' : 'text-gray-800 dark:text-gray-200 hover:text-purple-950 dark:hover:text-purple-400'
            }`}
          >
            Products
          </button>
          <span className="text-gray-600 dark:text-gray-400 font-light">|</span>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`text-sm font-bold tracking-wide uppercase transition-colors px-3 py-1 rounded-md ${
              activeTab === 'categories' ? 'bg-purple-700 text-white' : 'text-gray-800 dark:text-gray-200 hover:text-purple-950 dark:hover:text-purple-400'
            }`}
          >
            Categories
          </button>
        </div>

        {/* Overview Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col justify-between transition-colors">
            <span className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Unique Products</span>
            <span className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{totalProducts}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col justify-between transition-colors">
            <span className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Inventory Value</span>
            <span className="text-3xl font-bold text-gray-800 dark:text-white mt-2">${totalValue.toFixed(2)}</span>
          </div>
        </div>

        {/* Stock Breakdown Row */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 transition-colors">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">Stock Available per Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <div key={cat} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border dark:border-gray-600 text-center transition-colors">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">{cat}</div>
                <div className="text-xl font-bold text-gray-800 dark:text-white mt-1">{categoryCounts[cat] || 0} items</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full">
          {activeTab === 'categories' ? (
            <div className="max-w-xl mx-auto">
              <CategoryList
                categories={categories} 
                onAddCategory={(newCat) => setCategories([...categories, newCat])}
                onDelete={handleDeleteCategory}
              />
            </div>
          ) : (
            <ProductList
              products={products} 
              categories={categories}
              onEdit={(prod) => { setEditingProduct(prod); setIsModalOpen(true); }}
              onDelete={handleDeleteProduct}
              onAdjustStock={handleAdjustStock}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              handleAddOrEditProduct={handleAddOrEditProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}
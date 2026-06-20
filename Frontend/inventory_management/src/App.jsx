import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import { localStorage } from './dataPersistense/localStorage';
import Welcome from './components/Welcome';

const INITIAL_CATEGORIES = ['Electronics', 'Clothing', 'Groceries', 'Books'];

export default function App() {
  const [products, setProducts] = localStorage('inventory_products', []);
  const [categories, setCategories] = localStorage('inventory_categories', INITIAL_CATEGORIES);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentView, setCurrentView] = useState('welcome');

  const handleAddOrEditProduct = (values) => {
    if (editingProduct) {
      setProducts(products.map(p => p.sku === values.sku ? values : p));
    } else {
      if (products.some(p => p.sku === values.sku)) {
        alert('Error: A product with this ID/SKU already exists!');
        return;
      }
      setProducts([...products, values]);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (sku) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      setProducts(products.filter(p => p.sku !== sku));
    }
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete the category "${category}"? This will also remove all products in this category.`)) {
      setCategories(categories.filter(cat => cat !== category));
      setProducts(products.filter(p => p.category !== category));
    }
  };

  const handleAdjustStock = (sku, delta) => {
    setProducts(products.map(p => {
      if (p.sku === sku) {
        const updatedQty = p.quantity + delta;
        return { ...p, quantity: updatedQty < 0 ? 0 : updatedQty };
      }
      return p;
    }));
  };

  if (currentView === 'welcome') {
    return <Welcome onNavigate={setCurrentView} />;
  }

  return (
    <Dashboard 
      products={products}
      categories={categories}
      setCategories={setCategories}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      editingProduct={editingProduct}
      setEditingProduct={setEditingProduct}
      handleAddOrEditProduct={handleAddOrEditProduct}
      handleDeleteProduct={handleDeleteProduct}
      handleAdjustStock={handleAdjustStock}
      onNavigate={setCurrentView}
      handleDeleteCategory={handleDeleteCategory}
    />
  );
}
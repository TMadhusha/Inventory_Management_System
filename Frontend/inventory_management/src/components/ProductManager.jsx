import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { productValidationSchema } from '../validation/validation';

export default function ProductManager({ isOpen, onClose, onSubmit, initialValues, categories, products = [] }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedExisting, setSelectedExisting] = useState(null); 
  const suggestionsRef = useRef(null);

  const generateSKU = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `PRD-${randomNumber}`;
  };

  const defaultValues = initialValues || {
    name: '',
    sku: generateSKU(),
    category: '',
    price: '',
    quantity: ''
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleNameChange = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue('name', value);

    if (selectedExisting) {
      setSelectedExisting(null);
      setFieldValue('sku', generateSKU());
      setFieldValue('category', '');
      setFieldValue('price', '');
      setFieldValue('quantity', '');
    }

    if (value.trim().length >= 3 && !initialValues) {
      const matches = products.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase().trim())
      );
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (product, setFieldValue) => {
    setFieldValue('name', product.name);
    setFieldValue('sku', product.sku);
    setFieldValue('category', product.category);
    setFieldValue('price', product.price);
    setFieldValue('quantity', product.quantity);

    setSelectedExisting(product);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const isEditMode = !!initialValues;               
  const isSuggestionSelected = !!selectedExisting; 

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl transition-colors duration-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {isEditMode ? 'Edit Product' : isSuggestionSelected ? 'Update Existing Product' : 'Add New Product'}
        </h2>

        {isSuggestionSelected && (
          <div className="mb-4 px-3 py-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg">
            <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
              Editing an existing product
            </p>
          </div>
        )}

        <Formik
          initialValues={defaultValues}
          validationSchema={productValidationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            setSelectedExisting(null);
            onClose();
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">

              {/* Product Name with Suggestion */}
              <div className="relative" ref={suggestionsRef}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product Name
                </label>
                <Field name="name">
                  {({ field }) => (
                    <input
                      {...field}
                      type="text"
                      autoComplete="off"
                      disabled={isSuggestionSelected} 
                      onChange={(e) => handleNameChange(e, setFieldValue)}
                      onFocus={(e) => {
                        if (e.target.value.trim().length >= 3 && suggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      className={`mt-1 block w-full border rounded-md p-2 shadow-sm outline-none transition-colors
                        ${isSuggestionSelected
                          ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-purple-500 focus:border-purple-500'
                        }`}
                    />
                  )}
                </Field>
                <ErrorMessage name="name" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden">

                    {/* Dropdown Header */}
                    <div className="flex items-center justify-between px-3 py-2 bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-700">
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                        Similar products already exist — click to select
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowSuggestions(false)}
                        className="text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-200 text-sm font-bold leading-none ml-2"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Suggestion Items — clickable */}
                    <ul className="max-h-48 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                      {suggestions.map(product => (
                        <li
                          key={product.sku}
                          onClick={() => handleSelectSuggestion(product, setFieldValue)}
                          className="px-3 py-2.5 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {product.sku} · {product.category}
                              </p>
                            </div>
                            <div className="text-right ml-4 shrink-0">
                              <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                                ${Number(product.price).toFixed(2)}
                              </p>
                              <p className={`text-xs font-medium ${
                                product.quantity === 0
                                  ? 'text-red-500 dark:text-red-400'
                                  : 'text-green-600 dark:text-green-400'
                              }`}>
                                {product.quantity === 0 ? 'Out of Stock' : `${product.quantity} in stock`}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product ID / SKU
                </label>
                <Field
                  name="sku"
                  type="text"
                  disabled={true}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-md p-2 shadow-sm outline-none cursor-not-allowed transition-colors"
                />
                <ErrorMessage name="sku" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                  {isSuggestionSelected && (
                    <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 font-normal">(locked)</span>
                  )}
                </label>
                <Field
                  as="select"
                  name="category"
                  disabled={isSuggestionSelected || isEditMode}
                  className={`mt-1 block w-full border rounded-md p-2 shadow-sm outline-none transition-colors
                    ${isSuggestionSelected || isEditMode
                      ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-purple-500 focus:border-purple-500'
                    }`}
                >
                  <option value="" className="dark:bg-gray-700">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="dark:bg-gray-700">{cat}</option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price ($)
                  </label>
                  <Field
                    name="price"
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  />
                  <ErrorMessage name="price" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stock Quantity
                  </label>
                  <Field
                    name="quantity"
                    type="number"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowSuggestions(false); setSelectedExisting(null); onClose(); }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isSuggestionSelected ? 'Update Product' : 'Save'}
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
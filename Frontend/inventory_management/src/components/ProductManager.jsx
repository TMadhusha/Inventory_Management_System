import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { productValidationSchema } from '../validation/validation';

export default function ProductManager({ isOpen, onClose, onSubmit, initialValues, categories, products = [] }) {
  if (!isOpen) return null;

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNameChange = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue('name', value);

    if (value.trim().length >= 3 && !initialValues) {
      // Only search when adding (not editing)
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

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl transition-colors duration-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {initialValues ? 'Edit Product' : 'Add New Product'}
        </h2>

        <Formik
          initialValues={defaultValues}
          validationSchema={productValidationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">

              {/* Product Name Field with Suggestion Popup */}
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
                      onChange={(e) => handleNameChange(e, setFieldValue)}
                      onFocus={(e) => {
                        // Re-show suggestions if input already has 3+ chars on focus
                        if (e.target.value.trim().length >= 3 && suggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    />
                  )}
                </Field>
                <ErrorMessage name="name" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />

                {/* Suggestions Popup */}
                {showSuggestions && (
                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 bg-amber-50 dark:bg-amber-900/30 border-b">
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                        Similar products are there
                      </span>
                    </div>

                    {/* Suggestion Items */}
                    <ul className="max-h-48 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                      {suggestions.map(product => (
                        <li
                          key={product.sku}
                          className="px-3 py-2.5 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors cursor-default"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                {product.name}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* SKU Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product ID / SKU</label>
                <Field
                  name="sku"
                  type="text"
                  disabled={true}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none disabled:bg-gray-100 dark:disabled:bg-gray-600 dark:disabled:text-gray-400 transition-colors"
                />
                <ErrorMessage name="sku" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                >
                  <option value="" className="dark:bg-gray-700">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="dark:bg-gray-700">{cat}</option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />
              </div>

              {/* Price & Quantity Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
                  <Field
                    name="price"
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  />
                  <ErrorMessage name="price" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity</label>
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
                  onClick={() => { setShowSuggestions(false); onClose(); }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
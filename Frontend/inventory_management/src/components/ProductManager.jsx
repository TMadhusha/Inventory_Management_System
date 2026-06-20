import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import { productValidationSchema } from '../validation/validation';

export default function ProductManager({ isOpen, onClose, onSubmit, initialValues, categories }) {
    if(!isOpen) return null;

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
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
                <Field 
                  name="name" 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors" 
                />
                <ErrorMessage name="name" component="div" className="text-red-500 dark:text-red-400 text-xs mt-1" />
              </div>

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

              {/* Action Sheet Footer Controls */}
              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  type="button" 
                  onClick={onClose} 
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
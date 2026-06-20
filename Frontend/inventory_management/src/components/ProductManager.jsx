import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import { productValidationSchema } from '../validation/validation';

export default function ProductManager({ isOpen, onClose, onSubmit, initialValues, categories }) {
    if(!isOpen) return null;

    const defaultValues = initialValues || {
        name: '',
        sku: '',
        category: '',
        price: '',
        quantity: ''
    };

  return (
    <div className="fixed inset-0 bg-white/0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{initialValues ? 'Edit Product' : 'Add New Product'}</h2>
        
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
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <Field name="name" type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Product ID / SKU</label>
                <Field name="sku" type="text" disabled={!!initialValues} className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm disabled:bg-gray-100" />
                <ErrorMessage name="sku" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <Field as="select" name="category" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <Field name="price" type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
                  <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                  <Field name="quantity" type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Save</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
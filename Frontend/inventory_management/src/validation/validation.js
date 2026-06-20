import * as Yup from 'yup';

export const productValidationSchema = Yup.object().shape({
  name: Yup.string().required('Product Name is required'),
  sku: Yup.string().required('Product ID / SKU is required'),
  category: Yup.string().required('Please select a category'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  quantity: Yup.number()
    .typeError('Stock quantity must be a number')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock quantity is required'),
});
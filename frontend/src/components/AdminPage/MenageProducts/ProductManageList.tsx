import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ProductType } from '../../../utils/types/types';
import ProductsGrid from '../../productsGrid/ProductsGrid';

interface ProductManageListProps {
  products: ProductType[];
  onEdit: (product: ProductType) => void;
  onDelete: (product: ProductType) => void;
}

const ProductManageList: React.FC<ProductManageListProps> = ({ products, onEdit, onDelete }) => (
  <Paper sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 2px 16px rgba(30, 60, 90, 0.07)', border: '1px solid #e3e8ee' }}>
    <Typography variant="h5" fontWeight={700} mb={3} color="#2563eb">
      Manage Products
    </Typography>
    <ProductsGrid products={products} admin onEdit={onEdit} />
  </Paper>
);

export default ProductManageList;
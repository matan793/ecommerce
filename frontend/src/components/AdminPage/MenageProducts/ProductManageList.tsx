import React from 'react';
import { Paper, Typography, Grid, Button, Box } from '@mui/material';
import { ProductType } from '../../../utils/types/types';
import ProductsGrid from '../../productsGrid/ProductsGrid';

interface ProductManageListProps {
  products: ProductType[];
  onEdit: (product: ProductType) => void;
  onDelete: (product: ProductType) => void;
}

const ProductManageList: React.FC<ProductManageListProps> = ({ products, onEdit, onDelete }) => (
  <Paper sx={{ p: 4, borderRadius: 4, background: 'rgba(255,255,255,0.97)' }}>
    <Typography variant="h5" fontWeight={700} mb={3}>
      Manage Products
    </Typography>
   <ProductsGrid products={products} admin />
  </Paper>
);

export default ProductManageList;
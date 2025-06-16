import { Grid } from '@mui/material';
import React from 'react';
import { ProductType } from '../../utils/types/types';
import ParfumeCard from '../parfumeCard/parfumeCard';
import ParfumUserButtons from '../parfumeCard/ParfumUserButtons';
import ParfumAdminButtons from '../parfumeCard/ParfumeAdminButtons';

interface ProductsGridProps {
  products: ProductType[];
  admin?: boolean;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, admin }) => {
  return (
    <Grid container spacing={3}>
      {products.map((parfume: ProductType) => (
        <Grid item xs={12} sm={6} md={4} key={parfume.productId}>
          <ParfumeCard product={parfume}>
            {admin ? <ParfumAdminButtons product={parfume} /> : <ParfumUserButtons product={parfume} />}
          </ParfumeCard>
        </Grid>
      ))}
    </Grid> 
  );
};

export default ProductsGrid;
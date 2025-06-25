import { Grid } from '@mui/material';
import React from 'react';
import { ProductType } from '../../utils/types/types';
import ParfumeCard from '../parfumeCard/parfumeCard';
import ParfumUserButtons from '../parfumeCard/ParfumUserButtons';
import ParfumAdminButtons from '../parfumeCard/ParfumeAdminButtons';

interface ProductsGridProps {
  products: ProductType[];
  admin?: boolean;
  onEdit?: (product: ProductType) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, admin, onEdit }) => {
  return (
    <Grid container spacing={3}>
      {products.map((parfume: ProductType) => (
        <Grid key={parfume.productId}>
          <ParfumeCard product={parfume}>
            {admin ? <ParfumAdminButtons onEdit={onEdit} product={parfume} /> : <ParfumUserButtons product={parfume} />}
          </ParfumeCard>
        </Grid>
      ))}
    </Grid> 
  );
};

export default ProductsGrid;
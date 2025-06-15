import { Grid } from '@mui/material';
import React from 'react';
import { ProductType } from '../../utils/types/types';
import ParfumeCard from '../parfumeCard/parfumeCard';

interface ProductsGridProps {
  products: ProductType[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  return (
    <>
      {products.map((parfume: ProductType) => (
        <Grid>
          <ParfumeCard key={parfume.productId}
            product={parfume} />
        </Grid>
      ))}
    </>
  );
};

export default ProductsGrid;
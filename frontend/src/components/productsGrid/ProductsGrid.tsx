import { Grid } from '@mui/material';
import React from 'react';
import { ProductType } from '../../utils/types/types';
import ParfumeCard from '../parfumeCard/parfumeCard';

interface ProductsGridProps {
  products: ProductType[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({products}) => {  
    return (
        <>
        {products.map((parfume: ProductType) => (
          <Grid>
            <ParfumeCard key={parfume.id}
              name={parfume.name}
              brand={parfume.brand.name}
              price={parfume.price}
              imageUrl={parfume.imageUrl} />
          </Grid>
        ))}
        </>
    );
};

export default ProductsGrid;
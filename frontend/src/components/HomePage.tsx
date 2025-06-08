import React, { useEffect, useState } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import ParfumeCard from './parfumeCard/parfumeCard';
import {useProducts} from '../hooks/useProducts';

interface Product {
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

const HomePage: React.FC = () => {
const { products } = useProducts();


  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        Welcome to Parfume Store
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" mb={5}>
        Discover our exclusive collection of fragrances
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((parfume: Product, idx) => (
          <Grid key={idx} >
            <ParfumeCard
              name={parfume.name}
              brand={parfume.brand}
              price={parfume.price}
              imageUrl={parfume.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
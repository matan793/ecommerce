import React, { useMemo, useState } from 'react';
import { Typography, Grid, Container, alpha, InputBase, styled } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import Navbar from './Navbar/Navbar';
import ProductsGrid from './productsGrid/ProductsGrid';
import { useBrands } from '../hooks/useBrands';
import { BrandType, ProductType } from '../utils/types/types';
import { CategoryType, useCategories } from '../hooks/useCategories';
import FilterBar from './filterBar/FilterBar';
import SearchBar from './SearchBar/SearchBar';

interface filterOptions {
  brand: string;
  category: string;
  search: string;
}
const bannerStyle: React.CSSProperties = {
  width: '100%',
  height: '180px',
  background: 'linear-gradient(90deg, #fddfa1 0%, #FFF8DC 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '32px',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(255, 215, 0, 0.2)',
  overflow: 'hidden'
};

const styles = {
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: '16px',
  }
};



const HomePage: React.FC = () => {
  const { products } = useProducts();
  const { brands } = useBrands();
  const { categories } = useCategories();
  const [filter, setFilter] = useState<filterOptions>({
    brand: 'All',
    category: 'All',
    search: '',
  });

  const filteredProducts = useMemo(
    () =>
      products.filter((product: ProductType) => {
        const brandMatch =
          filter.brand === 'All' || product.brand.name.toLowerCase() === filter.brand.toLowerCase();
        const categoryMatch =
          filter.category === 'All' || product.category.name.toLowerCase() === filter.category.toLowerCase();
        const searchMatch =
          filter.search === '' ||
          product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
          product.brand.name.toLowerCase().includes(filter.search.toLowerCase());
        return brandMatch && categoryMatch && searchMatch;
      }),
    [products, filter]
  );



  return (
    <>
      <Navbar />

      <div style={{ ...bannerStyle, height: '270px', paddingLeft: 40, paddingRight: 40, justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: 240,
              marginRight: 56,
              filter: 'drop-shadow(0 4px 16px rgba(218,165,32,0.25))',
            }}
          />
          <div>
            <Typography variant="h2" align="center" fontWeight="bold" color="#6d4c00">
              Matan Parfumerie
            </Typography>
            <Typography variant="h5" align="center" color="#7c6f57">
              Discover our exclusive collection of fragrances
            </Typography>
          </div>
        </div>
      </div>
      <Container sx={styles.filterContainer} >
        <FilterBar lable='brand' options={brands.map((brand: BrandType) => brand.name)} changeCallback={(value: string) => setFilter((prev) => ({ ...prev, brand: value }))}
        />
        <FilterBar
          lable='category'
          options={categories.map((category: CategoryType) => category.name)}
          changeCallback={(value: string) => setFilter((prev) => ({ ...prev, category: value }))}
        />
        <SearchBar onSearch={(query: string) => setFilter((prev) => ({ ...prev, search: query }))}
        />
      </Container>
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          <ProductsGrid products={filteredProducts} />
        </Grid>
      </Container></>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import ProductSidebar from './ProductSidebar';
import ProductCreateForm from './ProductCreateForm';
import ProductManageList from './ProductManageList';
import { api } from '../../../api/api';
import { ProductType, BrandType, CategoryType } from '../../../utils/types/types';
import { useProducts } from '../../../hooks/useProducts';
import { useBrands } from '../../../hooks/useBrands';
import { useCategories } from '../../../hooks/useCategories';

const MenageProducts: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState(0);
    const {products} = useProducts()
    const {brands} = useBrands();
    const {categories} = useCategories();


    // Dummy handlers for now
    const handleEdit = (product: ProductType) => { };
    const handleDelete = (product: ProductType) => { };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: "100%",
                background: 'linear-gradient(120deg, #fffbe6 0%, #f5e6ca 100%)',
                py: 6,
                px: 15,
                gap: 10,
                display: 'flex',
                // alignItems: 'flex-start',
                justifyContent: 'space-between',
            }}
        >


            <ProductSidebar selected={selectedSection} onSelect={setSelectedSection} />

            <Grid sx={{maxWidth:1200}} >
                {selectedSection === 0 && (
                    <ProductCreateForm brands={brands} categories={categories} />
                )}
                {selectedSection === 1 && (
                    <ProductManageList
                        products={products}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </Grid>

        </Box>
    );
};

export default MenageProducts;
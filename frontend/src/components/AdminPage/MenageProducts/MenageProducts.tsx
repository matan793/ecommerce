import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import ProductSidebar from './ProductSidebar';
import ProductCreateForm from './ProductCreateForm';
import ProductManageList from './ProductManageList';
import { ProductType } from '../../../utils/types/types';
import { useProducts } from '../../../hooks/useProducts';
import { useBrands } from '../../../hooks/useBrands';
import { useCategories } from '../../../hooks/useCategories';
import EditProduct from '../../EditProduct/EditProduct'; // Import the modal

const MenageProducts: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState(0);
    const { products, fetchProducts } = useProducts();
    const { brands } = useBrands();
    const { categories } = useCategories();

    // Modal state
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<ProductType | null>(null);

    // Open modal with selected product
    const handleEdit = (product: ProductType) => {
        setProductToEdit(product);
        setEditModalOpen(true);
    };

    // Close modal
    const handleCloseEdit = () => {
        setEditModalOpen(false);
        setProductToEdit(null);
    };

    // Optionally refresh products after edit
    const handleEditSuccess = () => {
        fetchProducts();
    };

    const handleDelete = (product: ProductType) => { /* ... */ };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: "100%",
                background: 'linear-gradient(120deg, #f7fafd 0%, #e3e8ee 100%)',
                py: 6,
                px: 15,
                gap: 10,
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <ProductSidebar selected={selectedSection} onSelect={setSelectedSection} />

            <Grid sx={{ maxWidth: 1200 }} >
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

            {/* EditProduct Modal */}
            {productToEdit && (
                <EditProduct
                    open={editModalOpen}
                    onClose={handleCloseEdit}
                    product={productToEdit}
                    brands={brands}
                    categories={categories}
                    onEditSuccess={handleEditSuccess}
                />
            )}
        </Box>
    );
};

export default MenageProducts;
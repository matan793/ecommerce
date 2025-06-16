import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { api } from '../../api/api';
import { BrandType } from '../../utils/types/types';
import BrandCard from './BrandCard';
import { useNavigate } from 'react-router-dom';
import { Banner } from '../Banner/Banner';

const BrandsPage: React.FC = () => {
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const brandsData = await api.getBrands();
                setBrands(brandsData);
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const handleBrandClick = (brand: BrandType) => {
        // navigate(`/brands/${brand.id}`);
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Banner />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        mb: 4,
                        fontWeight: 'bold',
                        color: '#333'
                    }}
                >
                    Our Brands
                </Typography>

                <Grid container spacing={3}>
                    {brands.map((brand) => (
                        <Grid key={brand.id}>
                            <BrandCard
                                brand={brand}
                                onClick={handleBrandClick}
                            />
                        </Grid>
                    ))}
                </Grid>

                {brands.length === 0 && !loading && (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="200px"
                    >
                        <Typography variant="h6" color="text.secondary">
                            No brands available at the moment.
                        </Typography>
                    </Box>
                )}
            </Container>
        </>
    );
};

export default BrandsPage;
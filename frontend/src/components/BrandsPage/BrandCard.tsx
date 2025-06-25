import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { BrandType } from '../../utils/types/types';

interface BrandCardProps {
    brand: BrandType;
    onClick?: (brand: BrandType) => void;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, onClick }) => {
    return (
        <Card 
            sx={{ 
                maxWidth: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                }
            }}
            onClick={() => onClick?.(brand)}
        >
            <CardMedia
                component="img"
                height="200"
                image={brand.imageUrl}
                alt={brand.name}
                sx={{
                    objectFit: 'contain',
                    padding: 2,
                    backgroundColor: '#f5f5f5'
                }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div"
                    sx={{ 
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                >
                    {brand.name}
                </Typography>
                {brand.description && (
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                            textAlign: 'center',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {brand.description}
                    </Typography>
                )}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                    >
                        {/* {brand.poducts.length} Products Available */}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BrandCard;
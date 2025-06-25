import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';
import { ProductType } from '../../utils/types/types';
import ParfumUserButtons from './ParfumUserButtons';

interface ParfumeCardProps {
    product: ProductType;
    children?: React.ReactNode;
}

const ParfumeCard: React.FC<ParfumeCardProps> = ({product, children }) => {

    const styles = {
        card: { width: 220, borderRadius: 2 },
        media: { borderRadius: 1 },
        price: { fontWeight: 'bold', mt: 1 },
        actions: { display: 'flex', gap: 6, marginTop: 12 },
        button: { minHeight: 22, padding: '0px 6px', fontSize: '0.68rem' },
    };
    return (
        <Card sx={styles.card}>
            <CardMedia
                component="img"
                height="180"
                style={{ objectFit: 'contain' }}
                image={product.imageUrl}
                alt={product.name}
                sx={{ borderRadius: 1 }}
            />
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand.name}
                </Typography>
                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 'bold', mt: 1 }}>
                    ${product.price.toFixed(2)}
                </Typography>
                {children}
            </CardContent>
        </Card>
    );
};

export default ParfumeCard;